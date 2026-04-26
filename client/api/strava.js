export default async function handler(req, res) {
    const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
        return res.status(500).json({ error: "Missing Strava environment variables" });
    }

    try {
        // Refresh the access token
        const tokenRes = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id: STRAVA_CLIENT_ID,
                client_secret: STRAVA_CLIENT_SECRET,
                refresh_token: STRAVA_REFRESH_TOKEN,
                grant_type: "refresh_token",
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
            return res.status(500).json({ error: "Failed to refresh token" });
        }

        // Fetch last 30 activities for summary calculations
        const activitiesRes = await fetch(
            "https://www.strava.com/api/v3/athlete/activities?per_page=30",
            { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
        );

        const raw = await activitiesRes.json();

        if (!Array.isArray(raw) || raw.length === 0) {
            return res.status(404).json({ error: "No activities found" });
        }

        // Shape last 3 activities for display
        const activities = raw.slice(0, 3).map((a) => ({
            id: a.id,
            name: a.name,
            type: a.sport_type,
            distance: a.distance,
            movingTime: a.moving_time,
            date: a.start_date_local,
            elevationGain: a.total_elevation_gain ?? null,
            avgHeartRate: a.average_heartrate ?? null,
            avgSpeed: a.average_speed,
        }));

        // --- Week boundary helpers using pure ms arithmetic ---
        // Avoids all Date mutation bugs and comparison ambiguity.
        // We parse start_date_local ("2026-04-25T10:00:00") as a local-naive
        // timestamp by replacing the T with a space, which Node treats as local time.
        const nowMs = Date.now();
        const msPerDay = 86400000;
        const msPerWeek = 7 * msPerDay;

        // Midnight UTC of today
        const midnightTodayMs = nowMs - (nowMs % msPerDay);
        // Midnight UTC of the most recent Sunday
        const dayOfWeek = new Date(nowMs).getUTCDay(); // 0=Sun … 6=Sat
        const currentSundayMs = midnightTodayMs - dayOfWeek * msPerDay;
        const lastSundayMs = currentSundayMs - msPerWeek;

        // Parse a Strava start_date_local string to a UTC-equivalent ms timestamp.
        // "2026-04-25T10:30:00" → treat as UTC for consistent bucketing.
        const parseActivity = (a) => Date.parse(a.start_date_local.replace("T", " ") + " UTC");

        // Sparkline: volumes for last 5 weeks
        const weeklyVolumes = [];
        for (let i = 4; i >= 0; i--) {
            const weekStartMs = currentSundayMs - i * msPerWeek;
            const weekEndMs = weekStartMs + msPerWeek;
            const total = raw
                .filter((a) => { const t = parseActivity(a); return t >= weekStartMs && t < weekEndMs; })
                .reduce((sum, a) => sum + a.distance, 0);
            weeklyVolumes.push(total);
        }

        // Weekly summary
        const thisWeek = raw.filter((a) => parseActivity(a) >= currentSundayMs);
        const lastWeek = raw.filter((a) => {
            const t = parseActivity(a);
            return t >= lastSundayMs && t < currentSundayMs;
        });

        const currentDistance = thisWeek.reduce((s, a) => s + a.distance, 0);
        const currentTime = thisWeek.reduce((s, a) => s + a.moving_time, 0);
        const lastDistance = lastWeek.reduce((s, a) => s + a.distance, 0);

        return res.status(200).json({
            activities,
            weeklySummary: {
                currentDistance,
                currentTime,
                lastDistance,
                weeklyVolumes,
            },
            syncedAt: new Date().toISOString(),
        });

    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch Strava data" });
    }
}

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

        // Compute weekly volumes for last 5 weeks (for sparkline)
        // Use UTC day boundaries to avoid server timezone ambiguity.
        // Strava's start_date (UTC) is used for all comparisons.
        const now = new Date();

        // Sunday midnight UTC of the current week
        const currentSundayUTC = new Date(Date.UTC(
            now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay()
        ));

        const weeklyVolumes = [];
        for (let i = 4; i >= 0; i--) {
            const weekStart = new Date(currentSundayUTC);
            weekStart.setUTCDate(currentSundayUTC.getUTCDate() - i * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekStart.getUTCDate() + 7);

            const total = raw
                .filter((a) => {
                    const d = new Date(a.start_date); // UTC ISO string from Strava
                    return d >= weekStart && d < weekEnd;
                })
                .reduce((sum, a) => sum + a.distance, 0);

            weeklyVolumes.push(total);
        }

        // Weekly summary: current week vs last week (UTC boundaries)
        const lastWeekStart = new Date(currentSundayUTC);
        lastWeekStart.setUTCDate(currentSundayUTC.getUTCDate() - 7);

        const thisWeek = raw.filter((a) => new Date(a.start_date) >= currentSundayUTC);
        const lastWeek = raw.filter((a) => {
            const d = new Date(a.start_date);
            return d >= lastWeekStart && d < currentSundayUTC;
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

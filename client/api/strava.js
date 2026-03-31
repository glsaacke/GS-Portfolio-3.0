export default async function handler(req, res) {
    const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
        return res.status(500).json({
            error: "Missing Strava environment variables",
            hasId: !!STRAVA_CLIENT_ID,
            hasSecret: !!STRAVA_CLIENT_SECRET,
            hasToken: !!STRAVA_REFRESH_TOKEN,
        });
    }

    try {
        // Refresh the access token
        const tokenRes = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: STRAVA_CLIENT_ID,
                client_secret: STRAVA_CLIENT_SECRET,
                refresh_token: STRAVA_REFRESH_TOKEN,
                grant_type: "refresh_token",
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
            return res.status(500).json({ error: "Failed to refresh token", details: tokenData });
        }

        // Fetch latest activity
        const activityRes = await fetch(
            "https://www.strava.com/api/v3/athlete/activities?per_page=1",
            {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            }
        );

        const activities = await activityRes.json();

        if (!activities || activities.length === 0) {
            return res.status(404).json({ error: "No activities found" });
        }

        const activity = activities[0];

        return res.status(200).json({
            name: activity.name,
            type: activity.sport_type,
            distance: activity.distance,
            movingTime: activity.moving_time,
            date: activity.start_date_local,
            id: activity.id,
        });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch Strava data", message: err.message });
    }
}

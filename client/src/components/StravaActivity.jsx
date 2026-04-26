import "../styles/StravaActivity.css";
import { useState, useEffect } from "react";

// --- Helpers ---

const formatDistance = (meters) => `${(meters / 1609.34).toFixed(1)} mi`;

const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
};

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatSpeed = (metersPerSec, type) => {
    if (type === "Run") {
        const secPerMile = 1609.34 / metersPerSec;
        const mins = Math.floor(secPerMile / 60);
        const secs = Math.round(secPerMile % 60).toString().padStart(2, "0");
        return `${mins}:${secs}/mi`;
    }
    return `${(metersPerSec * 2.23694).toFixed(1)} mph`;
};

const activityIcon = (type) =>
    ({ Ride: "🚴", Run: "🏃", Walk: "🚶", Swim: "🏊", Hike: "🥾", Workout: "💪" }[type] || "🏅");

const getEffort = (distance, avgDistance) => {
    if (!avgDistance) return { label: "Moderate", cls: "effort-moderate" };
    const ratio = distance / avgDistance;
    if (ratio >= 1.2) return { label: "Strong effort", cls: "effort-strong" };
    if (ratio >= 0.8) return { label: "Moderate", cls: "effort-moderate" };
    return { label: "Easy / Recovery", cls: "effort-easy" };
};

const getInsight = (distance, avgDistance) => {
    if (!avgDistance || avgDistance === 0) return null;
    const pct = Math.round(((distance - avgDistance) / avgDistance) * 100);
    if (pct > 5) return `+${pct}% longer than recent average`;
    if (pct < -5) return `${Math.abs(pct)}% shorter than recent average`;
    return "About average distance";
};

// --- ActivityCard ---

const ActivityCard = ({ activity, avgDistance }) => {
    const effort = getEffort(activity.distance, avgDistance);
    const insight = getInsight(activity.distance, avgDistance);
    return (
        <a
            className="sa-card"
            href={`https://www.strava.com/activities/${activity.id}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="sa-card-main">
                <div className="sa-card-header">
                    <span className="sa-type">{activityIcon(activity.type)} {activity.type}</span>
                    <span className="sa-date">{formatDate(activity.date)}</span>
                </div>
                <h3 className="sa-name">{activity.name}</h3>
                <div className="sa-stats">
                    <div className="sa-stat">
                        <span className="sa-stat-value">{formatDistance(activity.distance)}</span>
                        <span className="sa-stat-label">Distance</span>
                    </div>
                    <div className="sa-stat">
                        <span className="sa-stat-value">{formatTime(activity.movingTime)}</span>
                        <span className="sa-stat-label">Time</span>
                    </div>
                    <div className="sa-stat">
                        <span className="sa-stat-value">{formatSpeed(activity.avgSpeed, activity.type)}</span>
                        <span className="sa-stat-label">{activity.type === "Run" ? "Pace" : "Avg Speed"}</span>
                    </div>
                </div>
                <div className="sa-card-footer">
                    {insight && <span className="sa-insight">{insight}</span>}
                    <span className={`sa-effort ${effort.cls}`}>{effort.label}</span>
                </div>
            </div>
            <div className="sa-card-hover">
                {activity.elevationGain != null && (
                    <span className="sa-hover-stat">↑ {Math.round(activity.elevationGain * 3.28084)} ft gain</span>
                )}
                {activity.avgHeartRate && (
                    <span className="sa-hover-stat">♥ {Math.round(activity.avgHeartRate)} bpm avg HR</span>
                )}
                <span className="sa-hover-link">View on Strava →</span>
            </div>
        </a>
    );
};

// --- Main component ---

const StravaActivity = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/strava")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((d) => { setData(d); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, []);

    if (loading) return (
        <section className="sa-container">
            <h2>Off the Clock</h2>
            <p className="sa-blurb sa-blurb--loading">Loading latest activity...</p>
        </section>
    );
    if (error || !data) return null;

    const { activities } = data;

    const avgDistance = activities.length > 1
        ? activities.slice(1).reduce((s, a) => s + a.distance, 0) / (activities.length - 1)
        : null;

    return (
        <section className="sa-container">
            <h2>Off the Clock</h2>
            <p className="sa-blurb">When I'm not shipping code, I'm usually out logging miles. Here's a look at what I've been up to:</p>
            <div className="sa-activity-list">
                {activities.map((a) => (
                    <ActivityCard key={a.id} activity={a} avgDistance={avgDistance} />
                ))}
            </div>
            <p className="sa-attribution">Live data via Strava API</p>
        </section>
    );
};

export default StravaActivity;

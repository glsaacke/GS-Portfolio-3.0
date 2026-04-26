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

// Effort level based on distance vs average of other recent activities
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

// --- Sub-components ---

const Sparkline = ({ values }) => {
    if (!values || values.length === 0) return null;
    const max = Math.max(...values, 1);
    const W = 130, H = 36, barW = 18;
    const gap = (W - barW * values.length) / (values.length - 1);
    return (
        <svg width={W} height={H} className="sparkline">
            {values.map((v, i) => {
                const barH = Math.max((v / max) * H, v > 0 ? 3 : 0);
                return (
                    <rect
                        key={i}
                        x={i * (barW + gap)}
                        y={H - barH}
                        width={barW}
                        height={barH}
                        rx={3}
                        className={`sparkline-bar${i === values.length - 1 ? " sparkline-bar--current" : ""}`}
                    />
                );
            })}
        </svg>
    );
};

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
            {/* Hover-reveal details */}
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

const WeeklySummary = ({ summary, syncedAt }) => {
    const { currentDistance, currentTime, lastDistance, weeklyVolumes } = summary;
    const pctChange = lastDistance > 0
        ? Math.round(((currentDistance - lastDistance) / lastDistance) * 100)
        : null;
    const syncMins = syncedAt
        ? Math.round((Date.now() - new Date(syncedAt).getTime()) / 60000)
        : null;

    return (
        <div className="sa-weekly">
            <div className="sa-weekly-stats">
                <div className="sa-weekly-stat">
                    <span className="sa-weekly-value">{formatDistance(currentDistance)}</span>
                    <span className="sa-weekly-label">Distance</span>
                </div>
                <div className="sa-weekly-stat">
                    <span className="sa-weekly-value">{formatTime(currentTime)}</span>
                    <span className="sa-weekly-label">Time</span>
                </div>
            </div>
            {pctChange !== null && (
                <p className={`sa-weekly-change ${pctChange >= 0 ? "sa-change-up" : "sa-change-down"}`}>
                    {pctChange >= 0 ? "+" : ""}{pctChange}% vs last week
                </p>
            )}
            <div className="sa-sparkline-wrap">
                <Sparkline values={weeklyVolumes} />
                <p className="sa-sparkline-label">Last 5 weeks</p>
            </div>
            {syncMins !== null && (
                <p className="sa-synced">
                    Synced {syncMins < 1 ? "just now" : `${syncMins}m ago`}
                </p>
            )}
        </div>
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
            <h2>Beyond the Code</h2>
            <p className="sa-blurb sa-blurb--loading">Loading latest activity...</p>
        </section>
    );
    if (error || !data) return null;

    const { activities, weeklySummary, syncedAt } = data;

    // Average distance of all but the most recent, used for derived insights
    const avgDistance = activities.length > 1
        ? activities.slice(1).reduce((s, a) => s + a.distance, 0) / (activities.length - 1)
        : null;

    return (
        <section className="sa-container">
            <h2>Beyond the Code</h2>
            <p className="sa-blurb">When I'm not shipping code, I'm usually out logging miles. Here's a look at what I've been up to:</p>
            <div className="sa-layout">
                <div className="sa-left">
                    <h3 className="sa-col-title">Recent Activity</h3>
                    <div className="sa-activity-list">
                        {activities.map((a) => (
                            <ActivityCard key={a.id} activity={a} avgDistance={avgDistance} />
                        ))}
                    </div>
                </div>
                <div className="sa-right">
                    <h3 className="sa-col-title">This Week</h3>
                    <WeeklySummary summary={weeklySummary} syncedAt={syncedAt} />
                </div>
            </div>
        </section>
    );
};

export default StravaActivity;

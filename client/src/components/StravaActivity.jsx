import "../styles/StravaActivity.css";
import { useState, useEffect } from "react";

const StravaActivity = () => {
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/strava")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                setActivity(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const formatDistance = (meters) => {
        const miles = meters / 1609.34;
        return `${miles.toFixed(2)} mi`;
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
        return `${mins}m ${secs}s`;
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading) return <section className="strava-container"><p>Loading latest activity...</p></section>;
    if (error || !activity) return null;

    return (
        <section className="strava-container">
            <h2>Beyond the Code</h2>
            <p className="strava-blurb">When I'm not building software, I'm usually outside on a bike or on the track. Here's what I've been up to lately:</p>
            <a
                className="strava-card"
                href={`https://www.strava.com/activities/${activity.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="strava-header">
                    <span className="strava-type">{activity.type}</span>
                    <span className="strava-date">{formatDate(activity.date)}</span>
                </div>
                <h3 className="strava-name">{activity.name}</h3>
                <div className="strava-stats">
                    <div className="strava-stat">
                        <p className="strava-stat-value">{formatDistance(activity.distance)}</p>
                        <p className="strava-stat-label">Distance</p>
                    </div>
                    <div className="strava-stat">
                        <p className="strava-stat-value">{formatTime(activity.movingTime)}</p>
                        <p className="strava-stat-label">Time</p>
                    </div>
                </div>
                <p className="strava-view">View on Strava →</p>
            </a>
        </section>
    );
}


export default StravaActivity;

export default function AdminStats({ feedback }) {
    if (!feedback || feedback.length === 0)
        return <div className="stats-grid"><div className="stat-card">No feedback yet</div></div>;

    const total = feedback.length;
    const avg = (feedback.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);

    const counts = [5, 4, 3, 2, 1].map(star =>
        feedback.filter(f => f.rating === star).length
    );

    return (
        <div className="stats-grid">
            <div className="stat-card"><strong>Total</strong><br />{total}</div>
            <div className="stat-card"><strong>Avg Rating</strong><br />{avg} ★</div>
            <div className="stat-card">
                <strong>Distribution</strong><br />
                5★ {counts[0]}<br />
                4★ {counts[1]}<br />
                3★ {counts[2]}<br />
                2★ {counts[3]}<br />
                1★ {counts[4]}
            </div>
        </div>
    );
}

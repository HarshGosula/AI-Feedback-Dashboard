export default function AdminFeedbackTable({ feedback }) {
    if (!feedback || feedback.length === 0) return null;

    return (
        <table className="feedback-table">
            <thead>
                <tr>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>AI Summary</th>
                    <th>Recommended Actions</th>
                    <th>Time</th>
                </tr>
            </thead>

            <tbody>
                {feedback.map(item => (
                    <tr key={item.id}>
                        <td>
                            {Array(item.rating).fill("★").map((s, i) =>
                                <span key={i} className="rating-star">{s}</span>
                            )}
                        </td>
                        <td>{item.review}</td>
                        <td>{item.ai_summary}</td>
                        <td>{item.ai_recommended_actions}</td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

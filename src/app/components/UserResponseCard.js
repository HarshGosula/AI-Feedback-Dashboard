export default function UserResponseCard({ response }) {
    if (!response) return null;

    return (
        <div className="ai-response-box">
            <strong>AI Response</strong>
            <br /><br />
            {response}
        </div>
    );
}

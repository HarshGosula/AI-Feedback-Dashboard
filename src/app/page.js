import "./styles/user.css";
import FeedbackForm from "./components/FeedbackForm";

export default function HomePage() {
  return (
    <div className="page-container">
      <h1>Share Your Experience</h1>
      <FeedbackForm />
    </div>
  );
}

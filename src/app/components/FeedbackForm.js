"use client";
import { useState } from "react";
import StarRating from "./StarRating";
import UserResponseCard from "./UserResponseCard";

export default function FeedbackForm() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState("");

    const handleSubmit = async () => {
        if (!rating || !review) return alert("Please enter rating and review");
        setLoading(true);

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, review }),
            });

            const data = await res.json();
            setAiResponse(data.userResponse);
            setReview("");
            setRating(0);
        } catch (err) {
            alert("Error submitting feedback");
        }

        setLoading(false);
    };

    return (
        <>
            <StarRating rating={rating} setRating={setRating} />

            <textarea
                placeholder="Write a short review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

            <button
                className="submit-btn"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? "Submitting..." : "Submit Review"}
            </button>

            <UserResponseCard response={aiResponse} />
        </>
    );
}

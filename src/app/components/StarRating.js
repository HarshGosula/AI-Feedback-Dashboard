"use client";
import { useState } from "react";

export default function StarRating({ rating, setRating }) {
    const handleClick = (r) => setRating(r);

    return (
        <div className="star-row">
            {[1, 2, 3, 4, 5].map((r) => (
                <span
                    key={r}
                    className={`star ${rating >= r ? "active" : ""}`}
                    onClick={() => handleClick(r)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import "../styles/admin.css";
import AdminStats from "../components/AdminStats";
import AdminFeedbackTable from "../components/AdminFeedbackTable";
import { supabaseClient } from "../lib/supabaseClient";

export default function AdminPage() {
    const [feedback, setFeedback] = useState([]);

    // Initial fetch
    const fetchData = async () => {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        setFeedback(data);
    };

    useEffect(() => {
        fetchData();

        // Realtime subscription
        const channel = supabaseClient
            .channel("feedback-changes")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "feedback" },
                (payload) => {
                    setFeedback(prev => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => supabaseClient.removeChannel(channel);
    }, []);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>
            <AdminStats feedback={feedback} />
            <AdminFeedbackTable feedback={feedback} />
        </div>
    );
}

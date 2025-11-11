import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

export const useWorkerReview = (workerId) => {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reviewerId = user?.id;

  const fetchReviews = useCallback(async () => {
    if (!workerId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("worker_review")
        .select(
          `
          id,
          rating,
          message,
          created_at,
          reviewer:reviewer_id (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `
        )
        .eq("worker_id", workerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error("Failed to load reviews:", err.message);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [workerId]);

  const addReview = useCallback(
    async ({ rating, message }) => {
      if (!workerId || !reviewerId || !rating)
        throw new Error("Missing required fields");

      try {
        setSubmitting(true);

        const { data, error } = await supabase
          .from("worker_review")
          .upsert(
            {
              worker_id: workerId,
              reviewer_id: reviewerId,
              rating,
              message,
            },
            { onConflict: "worker_id,reviewer_id" }
          )
          .select(
            `
            id,
            rating,
            message,
            created_at,
            reviewer:reviewer_id (
              id,
              first_name,
              last_name,
              avatar_url
            )
          `
          )
          .single();

        if (error) throw error;

        setReviews((prev) => {
          const exists = prev.find((r) => r.reviewer?.id === reviewerId);
          if (exists) {
            return prev.map((r) => (r.reviewer?.id === reviewerId ? data : r));
          }
          return [data, ...prev];
        });

        return data;
      } catch (err) {
        console.error("Failed to submit review:", err.message);
        setError("Failed to submit review");
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [workerId, reviewerId]
  );

  const stats = useMemo(() => {
    if (!reviews.length) return { average: 0, count: 0 };
    const total = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return {
      average: (total / reviews.length).toFixed(1),
      count: reviews.length,
    };
  }, [reviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    submitting,
    addReview,
    refetch: fetchReviews,
    stats,
  };
};

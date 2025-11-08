import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useFetchWorkersBySlug = (slug) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchWorkers = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("worker")
          .select(
            `
            id,
            profile:profile_id (
              first_name,
              last_name,
              avatar_url,
              phone_number
            ),
            cover_photo_url,
            address,
            gender,
            dob,
            about,
            average_rating,
            review_count,
            worker_service!inner (
              experience,
              service:service_id!inner (
                id,
                title,
                description,
                image_url,
                slug
              ),
              category:category_id (
                title
              )
            ),
            worker_company (
              company_name,
              gst_number
            )
          `
          )
          .eq("worker_service.service.slug", slug);

        if (error) throw error;
        if (!data?.length) {
          setWorkers([]);
          return;
        }

        const uniqueWorkers = Array.from(
          new Map(data.map((w) => [w.id, w])).values()
        );

        const formattedWorkers = uniqueWorkers.map((w) => {
          const fullName = [w.profile?.first_name, w.profile?.last_name]
            .filter(Boolean)
            .join(" ");

          return {
            id: w.id,
            name: fullName,
            avatar: w.profile?.avatar_url,
            phone: w.profile?.phone_number,
            image: w.cover_photo_url,
            location: w.address,
            about: w.about,
            roles: w.worker_service?.map((ws) => ws.category?.title) || [],
            company: w.worker_company?.[0]?.company_name || null,
            rating: w.average_rating,
            reviews: w.review_count,
          };
        });

        setWorkers(formattedWorkers);
      } catch (err) {
        console.error("Worker fetch by slug error:", err);
        setError(err.message || "Failed to load workers");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [slug]);

  return { workers, loading, error };
};

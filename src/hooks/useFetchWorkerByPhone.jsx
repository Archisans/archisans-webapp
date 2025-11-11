import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useFetchWorkerByPhoneNumber = (phoneNumber) => {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchWorker = async () => {
      try {
        setLoading(true);
        setError("");

        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("id")
          .eq("phone_number", phoneNumber)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profileData) {
          if (isMounted) {
            setWorker(null);
            setError("No profile found with this phone number");
          }
          return;
        }

        const { data, error: workerError } = await supabase
          .from("worker")
          .select(
            `
            id,
            cover_photo_url,
            address,
            gender,
            dob,
            about,
            average_rating,
            review_count,
            profile:profile_id (
              id,
              first_name,
              last_name,
              avatar_url,
              phone_number
            ),
            worker_service (
              experience,
              service:service_id (
                id,
                title,
                description,
                image_url,
                slug
              ),
              category:category_id (
                id,
                title
              )
            ),
            worker_company (
              company_name,
              work_permit_number,
              gst_number,
              working_hours
            ),
            worker_social (*)
          `
          )
          .eq("profile_id", profileData.id)
          .maybeSingle();

        if (workerError) throw workerError;

        if (!data) {
          if (isMounted) {
            setWorker(null);
            setError("No worker profile found for this user");
          }
          return;
        }

        const companyData = data.worker_company?.[0];

        const formatted = {
          id: data.id,
          userId: profileData.id,
          name: [data.profile?.first_name, data.profile?.last_name]
            .filter(Boolean)
            .join(" "),
          avatar: data.profile?.avatar_url,
          phone: data.profile?.phone_number,
          image: data.cover_photo_url,
          location: data.address,
          gender: data.gender,
          dob: data.dob,
          about: data.about,
          rating: data.average_rating,
          reviews: data.review_count,
          roles:
            data.worker_service
              ?.map((ws) => ws.category?.title)
              .filter(Boolean) || [],
          services:
            data.worker_service?.map((ws) => ({
              title: ws.service?.title,
              slug: ws.service?.slug,
              description: ws.service?.description,
              experience: ws.experience,
              image: ws.service?.image_url,
            })) || [],
          company: companyData
            ? {
                companyName: companyData.company_name,
                workPermitNumber: companyData.work_permit_number,
                gstNumber: companyData.gst_number,
                workingHours: companyData.working_hours,
              }
            : null,
          social: data.worker_social || [],
        };

        if (isMounted) {
          setWorker(formatted);
        }
      } catch (err) {
        console.error("Worker fetch by phone error:", err);
        if (isMounted) {
          setError(err.message || "Failed to load worker details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWorker();

    return () => {
      isMounted = false;
    };
  }, [phoneNumber]);

  return { worker, loading, error };
};

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { validateImage } from "@/lib/storage/validation/validateImage";
import {
  deleteCoverPhoto,
  uploadCoverPhoto,
} from "@/lib/storage/workerStorage";
import { from24Hour, to24Hour } from "@/utils/time";

const WorkerContext = createContext(null);

export const WorkerProvider = ({ children }) => {
  const {
    user,
    profile,
    handleSaveProfile,
    handleImageUpload: handleProfileImageUpload,
    isWorker,
    setIsWorker,
  } = useUser();
  const [worker, setWorker] = useState({
    personal: {},
    contact: {},
    socialMedia: [],
    professions: [],
    company: {},
    coverPhoto: null,
  });
  const [coverPhotoLoading, setCoverPhotoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWorker = useCallback(async () => {
    if (!user?.id) {
      console.log("No user ID available");
      return null;
    }

    setLoading(true);
    setError("");

    try {
      let { data: workerData, error: workerError } = await supabase
        .from("worker")
        .select(
          `
        *,
        worker_service (
          id,
          worker_id,
          service_id,
          category_id,
          experience,
          category:category_id (*),
          service:service_id (*)
        ),
        worker_social (*),
        worker_company (*)
        `
        )
        .eq("profile_id", user.id)
        .maybeSingle();

      if (workerError) throw workerError;
      if (!workerData) {
        console.log("No worker data found");
        return null;
      }

      const groupedProfessions = Object.values(
        workerData.worker_service.reduce((acc, ws) => {
          const category = ws.category;
          const service = ws.service;

          if (!category || !service) return acc;

          if (!acc[category.id]) {
            acc[category.id] = {
              categoryId: category.id,
              categoryTitle: category.title,
              services: [],
            };
          }

          acc[category.id].services.push({
            id: service.id,
            title: service.title,
            description: service.description,
            imageUrl: service.image_url,
            experience: ws.experience,
          });

          return acc;
        }, {})
      );

      const formattedSocialMedia = workerData.worker_social.reduce(
        (acc, social) => {
          acc[social.platform] = social.url;
          return acc;
        },
        {}
      );

      const companyData = workerData.worker_company?.[0];

      const workerPayload = {
        personal: {
          fullName: profile.fullName,
          imageUrl: profile.imageUrl,
          dob: workerData.dob,
          gender: workerData.gender,
          aadhaar: workerData.aadhaar,
        },
        contact: {
          phone: profile.phoneNumber,
          altPhone: workerData.alt_phone_number,
          email: workerData.email,
          address: workerData.address,
        },
        socialMedia: formattedSocialMedia,
        professions: groupedProfessions,
        company:
          (companyData && {
            companyName: companyData?.company_name,
            workPermitNumber: companyData?.work_permit_number,
            gstNumber: companyData?.gst_number,
            workingHours:
              companyData?.work_start_time && companyData?.work_end_time
                ? {
                    startTime: from24Hour(companyData.work_start_time),
                    endTime: from24Hour(companyData.work_end_time),
                  }
                : null,
          }) ||
          {},
        coverPhoto: workerData.cover_photo_url,
        about: workerData.about,
      };

      setWorker(workerPayload);
      return workerPayload;
    } catch (err) {
      console.error("Worker fetch error:", err);
      setError(err.message || "Failed to fetch worker data");
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.id, profile]);

  useEffect(() => {
    if (user?.id && isWorker) {
      fetchWorker();
    } else if (!isWorker) {
      setWorker({
        personal: {},
        contact: {},
        socialMedia: [],
        professions: [],
        company: {},
        coverPhoto: null,
      });
    }
  }, [user?.id, isWorker, fetchWorker]);

  const saveWorker = async (workerData) => {
    if (!user?.id) throw new Error("No user ID found");

    setLoading(true);
    setError("");

    try {
      const { data: existingWorker, error: fetchError } = await supabase
        .from("worker")
        .select("id")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      const isNewWorker = !existingWorker;

      const dataToSave = {
        profile_id: user.id,
        ...workerData,
      };

      const { data, error: upsertError } = await supabase
        .from("worker")
        .upsert(dataToSave, { onConflict: "profile_id" })
        .select()
        .single();

      if (upsertError) throw upsertError;

      if (isNewWorker) {
        const { error: profileUpdateError } = await supabase
          .from("profile")
          .update({ is_worker: true })
          .eq("id", user.id);

        if (profileUpdateError) throw profileUpdateError;
        setIsWorker(true);
      }

      return data;
    } catch (err) {
      console.error("Worker save error:", err);
      setError(err.message || "Failed to save worker");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveServices = async (servicesData, workerId) => {
    if (!workerId) throw new Error("No worker found");

    setLoading(true);
    setError("");

    try {
      await supabase.from("worker_service").delete().eq("worker_id", workerId);

      if (!servicesData?.length) {
        return [];
      }

      const insertData = servicesData.map((s) => ({
        worker_id: workerId,
        category_id: s.categoryId,
        service_id: s.serviceId || s.id,
        experience: s.experience || null,
      }));

      const { data, error: insertError } = await supabase
        .from("worker_service")
        .insert(insertData).select(`
          *,
          category:category_id (*)
        `);

      if (insertError) throw insertError;

      return data;
    } catch (err) {
      console.error("Services save error:", err);
      setError(err.message || "Failed to save services");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveSocialLinks = async (links, workerId) => {
    if (!workerId) throw new Error("No worker found");

    setLoading(true);
    setError("");

    try {
      await supabase.from("worker_social").delete().eq("worker_id", workerId);

      if (!links?.length) {
        return [];
      }

      const validLinks = links.filter((l) => l.url && l.url.trim());

      if (!validLinks.length) {
        return [];
      }

      const { data, error: insertError } = await supabase
        .from("worker_social")
        .insert(
          validLinks.map((l) => ({
            worker_id: workerId,
            platform: l.platform,
            url: l.url.trim(),
          }))
        )
        .select();

      if (insertError) throw insertError;

      return data;
    } catch (err) {
      console.error("Social links save error:", err);
      setError(err.message || "Failed to save social links");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveWorkerCompany = async (workerCompany, workerId) => {
    if (!workerId) throw new Error("No worker found");

    setLoading(true);
    setError("");

    try {
      await supabase.from("worker_company").delete().eq("worker_id", workerId);

      const hasValidCompanyData =
        workerCompany &&
        workerCompany.companyName &&
        workerCompany.companyName.trim() !== "" &&
        workerCompany.gstNumber &&
        workerCompany.gstNumber.trim() !== "" &&
        workerCompany.workingHours &&
        workerCompany.workingHours.startTime &&
        workerCompany.workingHours.endTime;

      if (!hasValidCompanyData) {
        return null;
      }

      const companyData = {
        worker_id: workerId,
        company_name: workerCompany.companyName.trim(),
        work_permit_number: workerCompany.workPermitNumber?.trim(),
        gst_number: workerCompany.gstNumber.trim(),
        work_start_time: workerCompany.workingHours?.startTime
          ? to24Hour(workerCompany.workingHours.startTime)
          : null,

        work_end_time: workerCompany.workingHours?.endTime
          ? to24Hour(workerCompany.workingHours.endTime)
          : null,
      };

      const { data, error: insertError } = await supabase
        .from("worker_company")
        .insert([companyData])
        .select()
        .single();

      if (insertError) throw insertError;

      return data;
    } catch (err) {
      console.error("Company save error:", err);
      setError(err.message || "Failed to save company info");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveCoverPhoto = async (file, workerId) => {
    if (!file || !workerId) return;

    setCoverPhotoLoading(true);
    setError("");

    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      setCoverPhotoLoading(false);
      return;
    }

    try {
      await deleteCoverPhoto(workerId);
      const coverPhotoUrl = await uploadCoverPhoto(workerId, file);

      const { error: updateError } = await supabase
        .from("worker")
        .update({ cover_photo_url: coverPhotoUrl })
        .eq("id", workerId);

      if (updateError) throw updateError;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update cover photo"
      );
    } finally {
      setCoverPhotoLoading(false);
    }
  };

  const saveCompleteProfile = async ({
    personal,
    contact,
    company,
    professions,
    socialMedia,
    coverPhoto,
    about,
  }) => {
    if (!user?.id) throw new Error("No user ID found");

    setLoading(true);
    setError("");

    try {
      if (personal.fullName != profile.fullName) {
        const parts = personal.fullName.trim().split(/\s+/);
        const firstName = parts[0];
        const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
        await handleSaveProfile({ firstName, lastName });
      }

      if (personal.imageUrl != profile.imageUrl) {
        await handleProfileImageUpload(personal.file);
      }

      const workerPayload = {
        aadhaar: personal.aadhaar || null,
        dob: personal.dob,
        gender: personal.gender,
        alt_phone_number: formatAltPhone(contact.altPhone),
        email: contact.email,
        address: contact.address,
        about,
      };

      const savedWorker = await saveWorker(workerPayload);

      await saveWorkerCompany(company, savedWorker.id);

      if (professions && Array.isArray(professions)) {
        const flatServices = professions.flatMap((prof) =>
          prof.services.map((service) => ({
            categoryId: prof.categoryId,
            serviceId: service.id,
            experience: service.experience,
          }))
        );
        await saveServices(flatServices, savedWorker.id);
      }

      if (socialMedia) {
        const links = Object.entries(socialMedia)
          .filter(([_, url]) => url && url.trim())
          .map(([platform, url]) => ({
            platform: platform,
            url: url.trim(),
          }));

        if (links.length > 0) {
          await saveSocialLinks(links, savedWorker.id);
        }
      }

      if (coverPhoto) {
        await saveCoverPhoto(coverPhoto.file, savedWorker.id);
      } else {
        if (worker.coverPhoto) {
          await deleteCoverPhoto(savedWorker.id);
        }
      }

      const updatedWorker = await fetchWorker();
      return updatedWorker;
    } catch (err) {
      console.error("Complete profile save error:", err);
      setError(err.message || "Failed to save complete profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const formatAltPhone = (phone) => {
    if (!phone) return null;
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 12 && digits.startsWith("91")) {
      return `+${digits}`;
    } else if (digits.length === 10) {
      return `+91${digits}`;
    } else {
      return null;
    }
  };

  const value = {
    worker,
    coverPhotoLoading,
    loading,
    error,
    fetchWorker,
    saveWorker,
    saveServices,
    saveSocialLinks,
    saveCompleteProfile,
  };

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};

export const useWorker = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error("useWorker must be used within a WorkerProvider");
  }
  return context;
};

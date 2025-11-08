import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../lib/supabaseClient";
import {
  uploadProfileImage,
  deleteProfileImage,
} from "@/lib/storage/profileStorage";
import { validateImage } from "@/lib/storage/validation/validateImage";

const TOAST_DURATION = 3000;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    phoneNumber: "",
    imageUrl: "",
    isWorker: false,
  });
  const [edit, setEdit] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isSignedIn = !!user;
  const isWorker = profile?.isWorker || false;

  useEffect(() => {
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchProfile = useCallback(async (userId) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("profile")
        .select("first_name, last_name, avatar_url, phone_number, is_worker")
        .eq("id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

      if (data) {
        setProfile({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          fullName: [data.first_name, data.last_name].filter(Boolean).join(" "),
          phoneNumber: data.phone_number || "",
          imageUrl: data.avatar_url || "",
          isWorker: data.is_worker || false,
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  const handleSaveProfile = useCallback(
    async (profileData) => {
      if (!user?.id) return false;

      setSaving(true);
      setError(null);

      if (
        isWorker &&
        (!profileData.firstName.trim() || !profileData.lastName.trim())
      ) {
        setError("Worker name cannot be empty.");
        setSaving(false);
        return false;
      }

      try {
        const { error: updateError } = await supabase
          .from("profile")
          .update({
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            phone_number: profileData.phoneNumber,
          })
          .eq("id", user.id);

        if (updateError) throw updateError;

        setProfile((prev) => ({
          ...prev,
          ...profileData,
          fullName: [profileData.firstName, profileData.lastName]
            .filter(Boolean)
            .join(" "),
        }));

        setSuccess(true);
        setEdit(true);
        setTimeout(() => setSuccess(false), TOAST_DURATION);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update profile."
        );
        return false;
      } finally {
        setSaving(false);
      }
    },
    [user?.id, isWorker]
  );

  const handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file || !user?.id) return;

      const validationError = validateImage(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setImageLoading(true);
      setError(null);

      try {
        await deleteProfileImage(user.id);
        const avatarUrl = await uploadProfileImage(user.id, file);

        const { error: updateError } = await supabase
          .from("profile")
          .update({ avatar_url: avatarUrl, updated_at: new Date() })
          .eq("id", user.id);

        if (updateError) throw updateError;

        setProfile((prev) => ({
          ...prev,
          imageUrl: avatarUrl,
        }));
        setSuccess(true);
        setTimeout(() => setSuccess(false), TOAST_DURATION);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update profile image"
        );
      } finally {
        setImageLoading(false);
      }
    },
    [user?.id]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        loading,
        profile,
        setProfile,
        edit,
        setEdit,
        saving,
        imageLoading,
        error,
        setError,
        success,
        isSignedIn,
        isWorker,
        handleSaveProfile,
        handleImageUpload,
        fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

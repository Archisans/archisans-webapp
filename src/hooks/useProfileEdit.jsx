import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export const useProfileEdit = () => {
  const { user, isLoaded } = useUser();
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (isLoaded && user) {
      setValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.primaryPhoneNumber?.phoneNumber || "",
      });
    }
  }, [isLoaded, user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setImageLoading(true);
    setError(null);

    try {
      await user.setProfileImage({ file });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to update profile image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await user.update({
        firstName: values.firstName,
        lastName: values.lastName,
      });

      await user.reload();
      setSuccess(true);
      setEdit(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoaded,
    edit,
    setEdit,
    loading,
    error,
    success,
    imageLoading,
    values,
    setValues,
    handleImageUpload,
    handleSave,
  };
};

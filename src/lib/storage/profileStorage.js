import { supabase } from "../supabaseClient";

export const uploadProfileImage = async (userId, file) => {
  console.log(file);
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
};

export const deleteProfileImage = async (userId) => {
  const { data: profileData } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (profileData?.avatar_url) {
    const oldPath = profileData.avatar_url.split("/").pop();
    await supabase.storage.from("avatars").remove([`${userId}/${oldPath}`]);
  }
};

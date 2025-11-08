import { supabase } from "../supabaseClient";

export const uploadCoverPhoto = async (workerId, file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `cover_${Date.now()}.${fileExt}`;
  const filePath = `${workerId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("workers")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("workers").getPublicUrl(filePath);

  return data.publicUrl;
};

export const deleteCoverPhoto = async (workerId) => {
  const { data: workerData } = await supabase
    .from("worker")
    .select("cover_photo_url")
    .eq("id", workerId)
    .single();

  if (workerData?.cover_photo_url) {
    const oldPath = workerData.cover_photo_url.split("/").pop();
    await supabase.storage.from("workers").remove([`${workerId}/${oldPath}`]);
  }
};

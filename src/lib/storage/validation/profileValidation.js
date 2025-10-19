const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateProfileImage = (file) => {
  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    return "Invalid file type. Please use JPEG, PNG, or WebP.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds 5MB limit.";
  }

  return null;
};

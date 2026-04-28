import api from "./api.js";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.imageUrl;
}

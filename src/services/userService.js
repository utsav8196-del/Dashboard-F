import api from "./api.js";

export async function fetchUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function updateUserStatus(id, payload) {
  const { data } = await api.put(`/users/${id}/status`, payload);
  return data;
}

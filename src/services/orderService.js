import api from "./api.js";

export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data;
}

export async function fetchOrders() {
  const { data } = await api.get("/orders");
  return data;
}

export async function updateOrder(id, payload) {
  const { data } = await api.put(`/orders/${id}`, payload);
  return data;
}

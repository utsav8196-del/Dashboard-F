import api from "./api.js";

export async function fetchDashboardSummary() {
  const { data } = await api.get("/dashboard/summary");
  return data;
}

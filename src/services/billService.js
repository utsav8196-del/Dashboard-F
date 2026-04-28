import api from "./api.js";

export async function createBill(billData) {
    const { data } = await api.post("/bills", billData);
    return data;
}

export async function getBills(query = {}) {
    const params = new URLSearchParams(query);
    const { data } = await api.get(`/bills?${params}`);
    return data;
}

export async function getBillById(id) {
    const { data } = await api.get(`/bills/${id}`);
    return data;
}

export async function updateBill(id, billData) {
    const { data } = await api.put(`/bills/${id}`, billData);
    return data;
}

export async function updateBillPaymentStatus(id, paymentStatus) {
    const { data } = await api.patch(`/bills/${id}/payment-status`, { paymentStatus });
    return data;
}

export async function deleteBill(id) {
    const { data } = await api.delete(`/bills/${id}`);
    return data;
}

export async function getBillStats() {
    const { data } = await api.get("/bills/stats");
    return data;
}

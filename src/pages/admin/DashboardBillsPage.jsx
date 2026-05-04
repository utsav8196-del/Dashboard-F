import { Plus, Trash2, Eye } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import api from "../../services/api.js";
import { formatCurrency } from "../../utils/format.js";
import BillFormModal from "../../components/admin/BillFormModal.jsx";
import BillViewModal from "../../components/admin/BillViewModal.jsx";

export default function DashboardBillsPage() {
    const [bills, setBills] = useState([]);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionMessage, setActionMessage] = useState("");
    const [actionError, setActionError] = useState("");

    useDocumentTitle("Manage bills");

    const loadBills = useCallback(async (currentPage = 1) => {
        try {
            setLoading(true);
            setActionError("");
            const query = new URLSearchParams({ page: currentPage, limit: 10 });
            if (filter !== "all") {
                query.append("paymentStatus", filter);
            }
            const { data } = await api.get(`/bills?${query}`);
            setBills(data.bills);
            setTotalPages(data.totalPages);
            setPage(currentPage);
        } catch (error) {
            console.error("Failed to load bills:", error);
            setActionError(error.response?.data?.message || "Failed to load bills.");
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadBills(1);
    }, [filter, loadBills]);

    async function handleCreateBill(billData) {
        try {
            setActionError("");
            const { data } = await api.post("/bills", billData);
            setFormModalOpen(false);
            setActionMessage(`Bill ${data.bill.billNumber} created successfully.`);
            await loadBills(1);
            return data;
        } catch (error) {
            console.error("Failed to create bill:", error);
            const message = error.response?.data?.message || "Failed to create bill.";
            setActionError(message);
            throw new Error(message);
        }
    }

    async function handleDeleteBill(billId) {
        if (confirm("Are you sure you want to delete this bill?")) {
            try {
                setActionError("");
                await api.delete(`/bills/${billId}`);
                setActionMessage("Bill deleted successfully.");
                loadBills(page);
            } catch (error) {
                console.error("Failed to delete bill:", error);
                setActionError(error.response?.data?.message || "Failed to delete bill.");
            }
        }
    }

    async function handleUpdatePaymentStatus(billId, newStatus) {
        try {
            setActionError("");
            await api.patch(`/bills/${billId}/payment-status`, { paymentStatus: newStatus });
            setActionMessage(`Payment status updated to ${newStatus}.`);
            loadBills(page);
        } catch (error) {
            console.error("Failed to update payment status:", error);
            setActionError(error.response?.data?.message || "Failed to update payment status.");
        }
    }

    const getStatusBadge = (status) => {
        const badges = {
            paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
        return badges[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <p className="text-sm text-[rgb(var(--muted))]">Billing management</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">Bills</h2>
                </div>
                <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                        setSelectedBill(null);
                        setFormModalOpen(true);
                    }}
                >
                    <Plus size={16} className="mr-2" />
                    Add bill
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {["all", "paid", "pending", "cancelled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => {
                            setActionMessage("");
                            setFilter(status);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === status
                            ? "bg-brand text-white"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {actionMessage ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                    {actionMessage}
                </div>
            ) : null}

            {actionError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
                    {actionError}
                </div>
            ) : null}

            <div className="panel overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-[rgb(var(--muted))]">Loading bills...</div>
                ) : bills.length === 0 ? (
                    <div className="p-8 text-center text-[rgb(var(--muted))]">No bills found</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-900">
                                    <tr>
                                        <th className="px-5 py-4">Bill #</th>
                                        <th className="px-5 py-4">Customer</th>
                                        <th className="px-5 py-4">Total</th>
                                        <th className="px-5 py-4">Status</th>
                                        <th className="px-5 py-4">Payment</th>
                                        <th className="px-5 py-4">Date</th>
                                        <th className="px-5 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.map((bill) => (
                                        <tr key={bill._id} className="border-t">
                                            <td className="px-5 py-4 font-semibold">{bill.billNumber}</td>
                                            <td className="px-5 py-4">{bill.customerName}</td>
                                            <td className="px-5 py-4">{formatCurrency(bill.total)}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(bill.paymentStatus)}`}>
                                                    {bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    value={bill.paymentStatus}
                                                    onChange={(e) => handleUpdatePaymentStatus(bill._id, e.target.value)}
                                                    className="input !py-2 text-xs"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-5 py-4">{new Date(bill.createdAt).toLocaleDateString()}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn-secondary !px-4 !py-2"
                                                        onClick={() => {
                                                            setSelectedBill(bill);
                                                            setViewModalOpen(true);
                                                        }}
                                                    >
                                                        <Eye size={14} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="rounded-full border p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                                        onClick={() => handleDeleteBill(bill._id)}
                                                    >
                                                        <Trash2 size={16} className="hover:text-black" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 border-t p-4">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => loadBills(i + 1)}
                                        className={`px-3 py-2 rounded-lg font-medium ${page === i + 1
                                            ? "bg-brand text-white"
                                            : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            <BillFormModal open={formModalOpen} onClose={() => setFormModalOpen(false)} onSubmit={handleCreateBill} />

            {selectedBill && <BillViewModal open={viewModalOpen} bill={selectedBill} onClose={() => setViewModalOpen(false)} />}
        </div>
    );
}

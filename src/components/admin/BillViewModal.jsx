import { X, Download } from "lucide-react";
import { formatCurrency } from "../../utils/format.js";

export default function BillViewModal({ open, bill, onClose }) {
    if (!open || !bill) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 print:bg-transparent">
            <div className="panel w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6 dark:bg-slate-900 print:hidden">
                    <h2 className="font-display text-2xl font-bold">Bill Details</h2>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="btn-secondary !px-4 !py-2"
                        >
                            <Download size={16} className="mr-2" />
                            Print
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="border-b pb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="font-display text-3xl sm:text-4xl font-bold">BILL</h1>
                                <p className="text-sm text-[rgb(var(--muted))]">{bill.billNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-[rgb(var(--muted))]">Bill Date</p>
                                <p className="font-semibold">{new Date(bill.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${bill.paymentStatus === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            bill.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                            {bill.paymentStatus.toUpperCase()}
                        </div>
                    </div>

                    {/* Bill From/To */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-xs font-semibold text-[rgb(var(--muted))] mb-2">FROM</p>
                            <div className="space-y-1">
                                <p className="font-semibold">Your Company</p>
                                <p className="text-sm">Business Address</p>
                                <p className="text-sm">City, State ZIP</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[rgb(var(--muted))] mb-2">BILL TO</p>
                            <div className="space-y-1">
                                <p className="font-semibold">{bill.customerName}</p>
                                {bill.customerEmail && <p className="text-sm">{bill.customerEmail}</p>}
                                {bill.customerPhone && <p className="text-sm">{bill.customerPhone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                                    <th className="px-4 py-3 text-right font-semibold">Qty</th>
                                    <th className="px-4 py-3 text-right font-semibold">Unit Price</th>
                                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {bill.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3">{item.productName}</td>
                                        <td className="px-4 py-3 text-right">{item.quantity}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(item.price)}</td>
                                        <td className="px-4 py-3 text-right font-semibold">{formatCurrency(item.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-full md:w-80">
                            <div className="space-y-2 divide-y">
                                <div className="flex justify-between py-2">
                                    <span>Subtotal:</span>
                                    <span className="font-semibold">{formatCurrency(bill.subtotal)}</span>
                                </div>
                                {bill.tax > `` && (
                                    <div className="flex justify-between py-2">
                                        <span>Tax:</span>
                                        <span className="font-semibold">{formatCurrency(bill.tax)}</span>
                                    </div>
                                )}
                                {bill.discount > 0 && (
                                    <div className="flex justify-between py-2">
                                        <span>Discount:</span>
                                        <span className="font-semibold">-{formatCurrency(bill.discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between bg-slate-100 py-3 px-2 rounded dark:bg-slate-800">
                                    <span className="font-semibold">Total Due:</span>
                                    <span className="font-display text-2xl font-bold text-emerald-700">{formatCurrency(bill.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method and Notes */}
                    <div className="border-t pt-6 space-y-4">
                        <div>
                            <p className="text-sm font-semibold text-[rgb(var(--muted))]">Payment Method</p>
                            <p className="text-base capitalize">{bill.paymentMethod}</p>
                        </div>
                        {bill.notes && (
                            <div>
                                <p className="text-sm font-semibold text-[rgb(var(--muted))]">Notes</p>
                                <p className="text-base whitespace-pre-wrap">{bill.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t pt-6 text-center">
                        <p className="text-xs text-[rgb(var(--muted))]">Thank you for your business!</p>
                        <p className="text-xs text-[rgb(var(--muted))] mt-2">
                            Created on {new Date(bill.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

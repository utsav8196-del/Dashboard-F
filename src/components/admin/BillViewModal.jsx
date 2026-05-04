import { Download, X } from "lucide-react";
import { formatCurrency } from "../../utils/format.js";

const companyInfo = {
    name: "PulseCart",
    address: "123 Business Street, New Delhi, India",
    phone: "+91 98765 43210",
    email: "billing@pulsecart.com",
    bank: "Really Great Bank",
    account: "0123 4567 8901",
};

export default function BillViewModal({ open, bill, onClose }) {
    if (!open || !bill) return null;

    const handlePrint = () => {
        window.print();
    };

    const invoiceDate = new Date(bill.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 print:block print:bg-transparent print:px-0">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#f3ecdc] shadow-2xl print:max-h-none print:max-w-none print:overflow-visible print:rounded-none print:shadow-none">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/90 p-6 backdrop-blur print:hidden">
                    <h2 className="font-display text-2xl font-bold text-black">Bill Details</h2>
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
                            className="rounded-full p-2 text-black hover:bg-black/5"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-[#f3ecdc] px-10 py-12 text-black print:min-h-0 print:max-w-none print:px-10 print:py-12">
                    <div className="flex items-start justify-between gap-6">
                        <h1 className="text-[74px] font-black leading-none tracking-[-0.05em] sm:text-[96px]">
                            Invoice
                        </h1>
                        <div className="pt-3 text-right">
                            <p className="text-[14px] leading-6">{invoiceDate}</p>
                            <p className="text-[14px] font-bold leading-6">Invoice No. {bill.billNumber}</p>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-black/30 pt-4">
                        <p className="text-[15px] font-bold">Billed to:</p>
                        <div className="mt-2 space-y-1 text-[14px] leading-7">
                            <p>{bill.customerName}</p>
                            {bill.customerPhone ? <p>{bill.customerPhone}</p> : null}
                            {bill.customerEmail ? <p>{bill.customerEmail}</p> : null}
                        </div>
                    </div>

                    <div className="mt-5 border-t border-black/30 pt-24" />

                    <div className="mt-6">
                        <table className="w-full border-collapse text-[14px]">
                            <thead>
                                <tr className="border-y border-black/30">
                                    <th className="py-3 text-left font-bold">Description</th>
                                    <th className="py-3 text-right font-bold">Rate</th>
                                    <th className="py-3 text-right font-bold">Qty</th>
                                    <th className="py-3 text-right font-bold">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bill.items.map((item, index) => (
                                    <tr key={`${item.productId || item.productName}-${index}`} className="border-b border-black/30">
                                        <td className="py-3 pr-4 align-top">{item.productName}</td>
                                        <td className="py-3 text-right align-top">{formatCurrency(item.price)}</td>
                                        <td className="py-3 text-right align-top">{item.quantity}</td>
                                        <td className="py-3 text-right align-top">{formatCurrency(item.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <div className="w-full max-w-[240px] text-[14px]">
                            <div className="flex items-center justify-between py-2">
                                <span className="font-bold">Subtotal</span>
                                <span>{formatCurrency(bill.subtotal)}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-black/30 py-2">
                                <span className="font-bold">Tax ({bill.tax > 0 ? "GST" : "0%"})</span>
                                <span>{formatCurrency(bill.tax)}</span>
                            </div>
                            {bill.discount > 0 ? (
                                <div className="flex items-center justify-between py-2">
                                    <span className="font-bold">Discount</span>
                                    <span>-{formatCurrency(bill.discount)}</span>
                                </div>
                            ) : null}
                            <div className="flex items-center justify-between py-3 text-[15px]">
                                <span className="font-bold">Total</span>
                                <span className="font-black">{formatCurrency(bill.total)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 border-t border-black/30 pt-6">
                        <div className="grid gap-8 sm:grid-cols-2">
                            <div>
                                <p className="mb-4 text-[15px] font-bold">Payment Information</p>
                                <div className="space-y-1 text-[14px] leading-7">
                                    <p>{companyInfo.name}</p>
                                    <p>Bank: {companyInfo.bank}</p>
                                    <p>Account No: {companyInfo.account}</p>
                                    <p className="capitalize">Payment Method: {bill.paymentMethod}</p>
                                    {bill.notes ? <p>Notes: {bill.notes}</p> : null}
                                </div>
                            </div>

                            <div>
                                <p className="mb-4 text-[15px] font-bold">{companyInfo.name}</p>
                                <div className="space-y-1 text-[14px] leading-7">
                                    <p>{companyInfo.address}</p>
                                    <p>{companyInfo.phone}</p>
                                    <p>{companyInfo.email}</p>
                                    <p className="font-semibold uppercase">{bill.paymentStatus}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                            background: #f3ecdc;
                        }

                        @page {
                            size: A4;
                            margin: 0;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}

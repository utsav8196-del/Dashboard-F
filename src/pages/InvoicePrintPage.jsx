import { Printer } from 'lucide-react';
import { formatCurrency } from "../utils/format.js";

const InvoicePrint = ({ bill }) => {
    const handlePrint = () => {
        window.print();
    };

    if (!bill) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-white p-8">
            {/* Print Button */}
            <div className="flex justify-end gap-4 mb-8 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Printer size={20} />
                    Print Invoice
                </button>
            </div>

            {/* A4 Invoice */}
            <div className="max-w-4xl mx-auto bg-white p-12 border border-gray-300">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 pb-8 border-b-2 border-gray-300">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">INVOICE</h1>
                        <p className="text-sm text-gray-600 mt-2">Bill #{bill.billNumber}</p>
                    </div>
                    <div className="text-right">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            PC
                        </div>
                        <p className="text-sm text-gray-600 mt-2">PulseCart</p>
                    </div>
                </div>

                {/* Bill From & To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Bill From</h3>
                        <div className="text-gray-800">
                            <p className="font-semibold">PulseCart Inc.</p>
                            <p className="text-sm">123 Business Street</p>
                            <p className="text-sm">New York, NY 10001</p>
                            <p className="text-sm mt-2">Email: info@pulsecart.com</p>
                            <p className="text-sm">Phone: +1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Bill To</h3>
                        <div className="text-gray-800">
                            <p className="font-semibold">{bill.customerName}</p>
                            <p className="text-sm">{bill.customerEmail}</p>
                            <p className="text-sm">{bill.customerPhone}</p>
                            <p className="text-sm mt-2">
                                <span className="font-semibold">Invoice Date: </span>
                                {new Date(bill.createdAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Payment Status: </span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${bill.paymentStatus === 'paid'
                                    ? 'bg-green-200 text-green-800'
                                    : 'bg-yellow-200 text-yellow-800'
                                    }`}>
                                    {bill.paymentStatus.toUpperCase()}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b-2 border-gray-300 bg-gray-50">
                            <th className="text-left py-3 px-4 font-bold text-gray-800">Description</th>
                            <th className="text-center py-3 px-4 font-bold text-gray-800 w-20">Qty</th>
                            <th className="text-right py-3 px-4 font-bold text-gray-800 w-24">Price</th>
                            <th className="text-right py-3 px-4 font-bold text-gray-800 w-24">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.items.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-200">
                                <td className="py-3 px-4 text-gray-800">{item.productName}</td>
                                <td className="py-3 px-4 text-center text-gray-800">{item.quantity}</td>
                                <td className="py-3 px-4 text-right text-gray-800">{formatCurrency(item.price)}</td>
                                <td className="py-3 px-4 text-right text-gray-800">{formatCurrency(item.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                    <div className="w-64">
                        <div className="flex justify-between py-2 border-b border-gray-300">
                            <span className="text-gray-700">Subtotal:</span>
                            <span className="text-gray-800 font-semibold">{formatCurrency(bill.subtotal)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-300">
                            <span className="text-gray-700">Tax (GST):</span>
                            <span className="text-gray-800 font-semibold">{formatCurrency(bill.tax)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-300">
                            <span className="text-gray-700">Discount:</span>
                            <span className="text-gray-800 font-semibold">-{formatCurrency(bill.discount)}</span>
                        </div>
                        <div className="flex justify-between py-3 bg-gray-100 px-4 rounded mt-2">
                            <span className="text-gray-800 font-bold">Total Amount:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {formatCurrency(bill.total)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                {bill.notes && (
                    <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Notes</h3>
                        <p className="text-gray-800">{bill.notes}</p>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Payment Method</h3>
                    <p className="text-gray-800 font-semibold capitalize">{bill.paymentMethod}</p>
                </div>

                {/* Footer */}
                <div className="border-t-2 border-gray-300 pt-6 text-center text-xs text-gray-600">
                    <p className="mb-2">Thank you for your business!</p>
                    <p>This is an electronically generated invoice. No signature required.</p>
                    <p className="mt-4">PulseCart &copy; 2024 | All rights reserved</p>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default InvoicePrint;

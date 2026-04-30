import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService.js";
import { formatCurrency } from "../../utils/format.js";

export default function BillFormModal({ open, onClose, onSubmit }) {
    const [products, setProducts] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [items, setItems] = useState([]);
    const [taxPercent, setTaxPercent] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            fetchProducts({ limit: 100 }).then((data) => setProducts(data.products));
        }
    }, [open]);

    const addItem = () => {
        setItems([...items, { productId: "", quantity: 1, price: 0 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;

        if (field === "productId") {
            const product = products.find((p) => p._id === value);
            if (product) {
                newItems[index].price = product.price;
            }
        }

        setItems(newItems);
    };

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * taxPercent) / 100;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal + taxAmount - discountAmount;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!customerName || items.length === 0) {
            alert("Please fill in customer name and add at least one item");
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                customerName,
                customerEmail,
                customerPhone,
                items,
                tax: parseFloat(taxAmount.toFixed(2)),
                discount: parseFloat(discountAmount.toFixed(2)),
                taxPercent: parseFloat(taxPercent),
                discountPercent: parseFloat(discountPercent),
                paymentMethod,
                notes,
            });

            // Reset form
            setCustomerName("");
            setCustomerEmail("");
            setCustomerPhone("");
            setItems([]);
            setTaxPercent(0);
            setDiscountPercent(0);
            setPaymentMethod("cash");
            setNotes("");
        } finally {
            setSubmitting(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="panel w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6 dark:bg-black">
                    <h2 className="font-display text-2xl font-bold">Create New Bill</h2>
                    <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Customer Information</h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <input
                                type="text"
                                placeholder="Customer name *"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="input"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="input"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>

                    {/* Bill Items */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Bill Items</h3>
                            <button type="button" onClick={addItem} className="btn-secondary !px-4 !py-2">
                                + Add Item
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <p className="text-sm text-[rgb(var(--muted))]">No items added yet</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-800">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Product</th>
                                            <th className="px-4 py-2 text-left">Quantity</th>
                                            <th className="px-4 py-2 text-left">Price</th>
                                            <th className="px-4 py-2 text-left">Total</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-2">
                                                    <select
                                                        value={item.productId}
                                                        onChange={(e) => updateItem(index, "productId", e.target.value)}
                                                        className="input !py-2"
                                                        required
                                                    >
                                                        <option value="">Select product</option>
                                                        {products.map((product) => (
                                                            <option key={product._id} value={product._id}>
                                                                {product.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                                                        className="input !py-2"
                                                        min="1"
                                                        required
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                                                        className="input !py-2"
                                                        step="0.01"
                                                        required
                                                    />
                                                </td>
                                                <td className="px-4 py-2">{formatCurrency(item.quantity * item.price)}</td>
                                                <td className="px-4 py-2">
                                                    <button type="button" onClick={() => removeItem(index)} className="text-rose-500 hover:text-rose-700">
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Billing Summary */}
                    <div className="space-y-4 border-t pt-4">
                        <h3 className="font-semibold">Billing Summary</h3>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                                <p className="text-xs text-[rgb(var(--muted))]">Subtotal</p>
                                <p className="font-semibold">{formatCurrency(subtotal)}</p>
                            </div>
                            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900">
                                <label className="text-xs font-semibold text-[rgb(var(--muted))]">Tax (%)</label>
                                <input
                                    type="number"
                                    value={taxPercent}
                                    placeholder="0"
                                    onChange={(e) => setTaxPercent(parseFloat(e.target.value))}
                                    className="input mt-2"
                                    step="0.01"
                                    min="0"
                                />
                                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                                    Amount: {formatCurrency(taxAmount)}
                                </p>
                            </div>
                            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900">
                                <label className="text-xs font-semibold text-[rgb(var(--muted))]">Discount (%)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value))}
                                    className="input mt-2"
                                    step="0.01"
                                    min="0"
                                />
                                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                                    Amount: {formatCurrency(discountAmount)}
                                </p>
                            </div>
                            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
                                <p className="text-xs text-[rgb(var(--muted))]">Total</p>
                                <p className="text-xl font-semibold text-emerald-700">{formatCurrency(total)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4 border-t pt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-semibold">Payment Method</label>
                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="input mt-2">
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="check">Check</option>
                                    <option value="online">Online Transfer</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any additional notes..."
                                className="input mt-2"
                                rows="3"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="bg-black text-white p-3 rounded-[30px] btn-primary" disabled={submitting}>
                            {submitting ? "Creating..." : "Create Bill"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

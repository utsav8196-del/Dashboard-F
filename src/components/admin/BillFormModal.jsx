import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService.js";
import { formatCurrency } from "../../utils/format.js";

const createItemFromProduct = (product) => ({
    productId: product._id,
    quantity: 1,
    price: product.price,
});

export default function BillFormModal({ open, onClose, onSubmit }) {
    const [products, setProducts] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [items, setItems] = useState([]);
    const [taxPercent, setTaxPercent] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");

    const resetForm = () => {
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone("");
        setItems([]);
        setTaxPercent(0);
        setDiscountPercent(0);
        setPaymentMethod("cash");
        setPaymentStatus("pending");
        setNotes("");
        setError("");
        setSelectedProductId("");
    };

    useEffect(() => {
        if (open) {
            setError("");
            fetchProducts({ limit: 100 })
                .then((data) => setProducts(data.products || []))
                .catch(() => {
                    setProducts([]);
                    setError("Unable to load products right now.");
                });
        }
    }, [open]);

    const removeItem = (index) => {
        setItems((currentItems) => currentItems.filter((_, i) => i !== index));
    };

    const getProductById = (productId) => products.find((product) => product._id === productId);

    const selectableProducts = products.filter((product) => product.stock > 0);

    const addSelectedProduct = (productId) => {
        const product = getProductById(productId);

        if (!product) {
            return;
        }

        setItems((currentItems) => {
            const existingIndex = currentItems.findIndex((item) => item.productId === productId);

            if (existingIndex >= 0) {
                return currentItems.map((item, index) => {
                    if (index !== existingIndex) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: Math.min(item.quantity + 1, product.stock),
                    };
                });
            }

            return [...currentItems, createItemFromProduct(product)];
        });

        setSelectedProductId("");
    };

    const updateItem = (index, field, value) => {
        setItems((currentItems) => {
            const newItems = currentItems.map((item, itemIndex) => (
                itemIndex === index ? { ...item } : item
            ));

            newItems[index][field] = value;

            if (field === "quantity") {
                const product = getProductById(newItems[index].productId);
                const maxQuantity = product?.stock || Number.MAX_SAFE_INTEGER;
                newItems[index].quantity = Math.max(1, Math.min(value || 1, maxQuantity));
            }

            if (field === "price") {
                newItems[index].price = Math.max(0, value || 0);
            }

            return newItems;
        });
    };

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * taxPercent) / 100;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal + taxAmount - discountAmount;

    const billItems = items.filter((item) => item.productId);

    const handleClose = () => {
        resetForm();
        onClose();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!customerName.trim() || !customerEmail.trim()) {
            setError("Customer name and email are required.");
            return;
        }

        if (billItems.length === 0) {
            setError("Please add at least one product to the bill.");
            return;
        }

        const invalidItem = billItems.find((item) => {
            const product = getProductById(item.productId);
            return !product || item.quantity < 1 || item.price < 0 || item.quantity > product.stock;
        });

        if (invalidItem) {
            setError("Please review selected products, quantities, and prices before creating the bill.");
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                customerName: customerName.trim(),
                customerEmail: customerEmail.trim(),
                customerPhone: customerPhone.trim(),
                items: billItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: parseFloat(Number(item.price).toFixed(2)),
                })),
                tax: parseFloat(taxAmount.toFixed(2)),
                discount: parseFloat(discountAmount.toFixed(2)),
                taxPercent: parseFloat(taxPercent),
                discountPercent: parseFloat(discountPercent),
                paymentMethod,
                paymentStatus,
                notes: notes.trim(),
            });

            resetForm();
            onClose();
        } catch (submitError) {
            setError(submitError.message || "Failed to create bill.");
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
                    <button type="button" onClick={handleClose} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {error ? (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
                            {error}
                        </div>
                    ) : null}

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
                                placeholder="Email *"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="input"
                                required
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
                            {items.length > 0 ? (
                                <button type="button" onClick={() => setItems([])} className="btn-secondary !px-4 !py-2">
                                    Clear All
                                </button>
                            ) : null}
                        </div>

                        {selectableProducts.length === 0 ? (
                            <p className="text-sm text-[rgb(var(--muted))]">No products with stock are available.</p>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold">Select product</label>
                                    <div className="flex flex-col gap-3 md:flex-row">
                                        <select
                                            value={selectedProductId}
                                            onChange={(e) => setSelectedProductId(e.target.value)}
                                            className="input"
                                        >
                                            <option value="">Choose product</option>
                                            {selectableProducts.map((product) => (
                                                <option key={product._id} value={product._id}>
                                                    {product.title} - {formatCurrency(product.price)} - Stock: {product.stock}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => addSelectedProduct(selectedProductId)}
                                            disabled={!selectedProductId}
                                            className="btn-primary whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Add Product
                                        </button>
                                    </div>
                                    <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                                        If you select the same product again, its quantity will increase in the bill.
                                    </p>
                                </div>

                                {items.length === 0 ? (
                                    <p className="text-sm text-[rgb(var(--muted))]">Selected products will appear in the list below.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-slate-50 dark:bg-slate-800">
                                                <tr>
                                                    <th className="px-4 py-2 text-left">Product</th>
                                                    <th className="px-4 py-2 text-left">Stock</th>
                                                    <th className="px-4 py-2 text-left">Quantity</th>
                                                    <th className="px-4 py-2 text-left">Price</th>
                                                    <th className="px-4 py-2 text-left">Total</th>
                                                    <th className="px-4 py-2 text-left">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => {
                                                    const selectedProduct = getProductById(item.productId);

                                                    return (
                                                        <tr key={item.productId} className="border-t">
                                                            <td className="px-4 py-2 font-medium">
                                                                {selectedProduct?.title || "Unknown product"}
                                                            </td>
                                                            <td className="px-4 py-2 text-sm text-[rgb(var(--muted))]">
                                                                {selectedProduct ? selectedProduct.stock : "-"}
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <input
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value, 10) || 1)}
                                                                    className="input !py-2"
                                                                    min="1"
                                                                    max={selectedProduct?.stock || undefined}
                                                                    disabled={!selectedProduct}
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <input
                                                                    type="number"
                                                                    value={item.price}
                                                                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                                                                    className="input !py-2"
                                                                    step="0.01"
                                                                    min="0"
                                                                    disabled={!selectedProduct}
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2">{formatCurrency(item.quantity * item.price)}</td>
                                                            <td className="px-4 py-2">
                                                                <button type="button" onClick={() => removeItem(index)} className="text-rose-500 hover:text-rose-700">
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
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
                                    onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
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
                                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
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
                            <div>
                                <label className="block text-sm font-semibold">Payment Status</label>
                                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="input mt-2">
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="cancelled">Cancelled</option>
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
                        <button type="button" onClick={handleClose} className="btn-secondary">
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

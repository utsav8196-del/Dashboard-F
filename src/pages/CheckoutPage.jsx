import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { createOrder } from "../services/orderService.js";
import { formatCurrency } from "../utils/format.js";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useDocumentTitle("Checkout");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createOrder({
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: form,
        paymentMethod: "Cash on Delivery",
      });
      clearCart();
      navigate("/orders");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid-shell grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <form className="panel space-y-4 p-4 sm:p-6" onSubmit={handleSubmit}>
        <div>
          <p className="text-sm text-[rgb(var(--muted))]">Shipping details</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Checkout</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["fullName", "Full name"],
            ["phone", "Phone"],
            ["city", "City"],
            ["postalCode", "Postal code"],
            ["country", "Country"],
          ].map(([key, label]) => (
            <input
              key={key}
              required
              className="input"
              placeholder={label}
              value={form[key]}
              onChange={(event) => setForm((previous) => ({ ...previous, [key]: event.target.value }))}
            />
          ))}
        </div>
        <textarea
          required
          className="input min-h-32"
          placeholder="Address"
          value={form.address}
          onChange={(event) => setForm((previous) => ({ ...previous, address: event.target.value }))}
        />
        <button type="submit" className="btn-primary w-full" disabled={submitting || !cart.length}>
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>
      <div className="panel h-fit p-4 sm:p-6">
        <p className="text-sm text-[rgb(var(--muted))]">Order summary</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Review your basket</h2>
        <div className="mt-6 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between rounded-3xl border p-4">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-[rgb(var(--muted))]">Qty {item.quantity}</p>
              </div>
              <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between border-t pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}

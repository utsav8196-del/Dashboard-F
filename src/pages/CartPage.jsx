import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import { useShop } from "../context/ShopContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { formatCurrency } from "../utils/format.js";

export default function CartPage() {
  const { cart, removeFromCart, subtotal, updateCartQuantity } = useShop();

  useDocumentTitle("Cart");

  if (!cart.length) {
    return (
      <div className="grid-shell">
        <EmptyState
          title="Your cart is empty"
          description="Add products from the storefront and they will appear here for checkout."
          action={
            <Link to="/" className="btn-primary">
              Start shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="grid-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="panel overflow-hidden">
        {/* Mobile card view */}
        <div className="block sm:hidden space-y-4 p-4">
          {cart.map((item) => (
            <div key={item._id} className="rounded-2xl border p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-sm">{item.title}</p>
                <button type="button" onClick={() => removeFromCart(item._id)} className="rounded-full p-2 text-rose-500">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[rgb(var(--muted))]">{formatCurrency(item.price)} each</span>
                <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
              </div>
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity}
                onChange={(event) => updateCartQuantity(item._id, Number(event.target.value))}
                className="input max-w-24"
              />
            </div>
          ))}
        </div>
        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Qty</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-5 py-4 font-semibold">{item.title}</td>
                  <td className="px-5 py-4">
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(event) => updateCartQuantity(item._id, Number(event.target.value))}
                      className="input max-w-24"
                    />
                  </td>
                  <td className="px-5 py-4">{formatCurrency(item.price)}</td>
                  <td className="px-5 py-4">{formatCurrency(item.price * item.quantity)}</td>
                  <td className="px-5 py-4">
                    <button type="button" onClick={() => removeFromCart(item._id)} className="rounded-full p-2 text-rose-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel h-fit p-4 sm:p-6">
        <p className="text-sm text-[rgb(var(--muted))]">Checkout summary</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Ready to place your order?</h2>
        <div className="mt-6 space-y-3 rounded-3xl border p-4">
          <div className="flex justify-between text-sm">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between border-t pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <Link to="/checkout" className="btn-primary mt-6 w-full">
          Checkout
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

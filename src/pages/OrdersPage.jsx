import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import PageLoader from "../components/PageLoader.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import useSocket from "../hooks/useSocket.js";
import { fetchOrders } from "../services/orderService.js";
import { formatCurrency, formatDate, orderStatusClass } from "../utils/format.js";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useDocumentTitle("My orders");

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const refreshOrders = () => {
      fetchOrders().then(setOrders);
    };

    socket.on("order:updated", refreshOrders);

    return () => {
      socket.off("order:updated", refreshOrders);
    };
  }, [socket]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="grid-shell space-y-6">
      <div>
        <p className="text-sm text-[rgb(var(--muted))]">Order history</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">My orders</h1>
      </div>
      {orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="panel p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-[rgb(var(--muted))]">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <span className={orderStatusClass(order.status)}>{order.status}</span>
                  <p className="mt-2 font-semibold">{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {order.products.map((item) => (
                  <div key={item.product} className="rounded-3xl border p-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-[rgb(var(--muted))]">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No orders yet" description="Your placed orders will appear here in real time." />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import useSocket from "../../hooks/useSocket.js";
import { fetchOrders, updateOrder } from "../../services/orderService.js";
import { formatCurrency, formatDate, orderStatusClass } from "../../utils/format.js";

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState([]);
  const socket = useSocket();

  useDocumentTitle("Manage orders");

  async function loadOrders() {
    const data = await fetchOrders();
    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const refresh = () => loadOrders();

    socket.on("order:new", refresh);
    socket.on("order:updated", refresh);

    return () => {
      socket.off("order:new", refresh);
      socket.off("order:updated", refresh);
    };
  }, [socket]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[rgb(var(--muted))]">Fulfillment center</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">Orders</h2>
      </div>
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-5 py-4 font-semibold">#{order._id.slice(-6)}</td>
                  <td className="px-5 py-4">{order.userId?.name || "Guest"}</td>
                  <td className="px-5 py-4">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-4">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={orderStatusClass(order.status)}>{order.status}</span>
                      <select
                        className="input !w-auto"
                        value={order.status}
                        onChange={(event) => updateOrder(order._id, { status: event.target.value }).then(loadOrders)}
                      >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

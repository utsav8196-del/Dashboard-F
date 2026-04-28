import { formatCurrency, formatDate, orderStatusClass } from "../../utils/format.js";

export default function LiveOrdersFeed({ orders }) {
  return (
    <div className="panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-[rgb(var(--muted))]">Realtime notifications</p>
          <h3 className="font-display text-2xl font-bold">Live order feed</h3>
        </div>
        <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
          Socket.io live
        </span>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="rounded-3xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{order.customer || order.userId?.name}</p>
                <p className="text-sm text-[rgb(var(--muted))]">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <span className={orderStatusClass(order.status)}>{order.status}</span>
                <p className="mt-2 font-semibold">{formatCurrency(order.totalAmount)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

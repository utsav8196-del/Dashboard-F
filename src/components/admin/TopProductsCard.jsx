import { formatCurrency } from "../../utils/format.js";

export default function TopProductsCard({ products }) {
  return (
    <div className="panel p-6">
      <div className="mb-4">
        <p className="text-sm text-[rgb(var(--muted))]">Top selling products</p>
        <h3 className="font-display text-2xl font-bold">Best movers</h3>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-3xl border p-4">
            <img
              src={product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"}
              alt={product.title}
              className="h-auto w-16 rounded-2xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{product.title}</p>
              <p className="text-sm text-[rgb(var(--muted))]">{product.category}</p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="font-semibold">{product.sold} sold</p>
              <p className="text-sm text-[rgb(var(--muted))]">{formatCurrency(product.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

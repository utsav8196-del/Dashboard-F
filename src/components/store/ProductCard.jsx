import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { formatCurrency } from "../../utils/format.js";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel overflow-hidden"
    >
      <Link to={`/products/${product._id}`} className="flex h-56 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[rgb(var(--muted))]">{product.category}</p>
            <Link to={`/products/${product._id}`} className="mt-2 block font-display text-xl font-semibold">
              {product.title}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`rounded-full border p-2 ${isWishlisted(product._id) ? "text-rose-500" : ""}`}
          >
            <Heart size={18} fill={isWishlisted(product._id) ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="line-clamp-2 text-sm text-[rgb(var(--muted))]">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
            <p className="text-xs text-[rgb(var(--muted))]">{product.stock} in stock</p>
          </div>
          <button type="button" onClick={() => addToCart(product)} className="btn-primary">
            <ShoppingCart size={16} className="mr-2" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}

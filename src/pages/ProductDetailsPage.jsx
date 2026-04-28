import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import PageLoader from "../components/PageLoader.jsx";
import { useShop } from "../context/ShopContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { fetchProduct } from "../services/productService.js";
import { formatCurrency } from "../utils/format.js";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(product?.title || "Product details");

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  if (!product) {
    return (
      <div className="grid-shell">
        <EmptyState title="Product missing" description="This product could not be found." />
      </div>
    );
  }

  return (
    <div className="grid-shell">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel flex items-center justify-center overflow-hidden bg-white p-4 dark:bg-slate-900 sm:p-8 lg:p-12 aspect-square md:aspect-[4/3] lg:aspect-auto lg:min-h-[600px]">
          <img
            src={product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="panel space-y-6 p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">{product.category}</p>
            <h1 className="mt-3 font-display text-2xl sm:text-4xl font-bold">{product.title}</h1>
          </div>
          <p className="text-[rgb(var(--muted))]">{product.description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(product.price)}</p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">{product.stock} items left</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button type="button" onClick={() => toggleWishlist(product)} className="btn-secondary flex-1 sm:flex-none">
                <Heart size={16} className="mr-2" fill={isWishlisted(product._id) ? "currentColor" : "none"} />
                Wishlist
              </button>
              <button type="button" onClick={() => addToCart(product)} className="btn-primary flex-1 sm:flex-none">
                <ShoppingCart size={16} className="mr-2" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

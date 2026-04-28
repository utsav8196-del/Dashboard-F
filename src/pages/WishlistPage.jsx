import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import ProductCard from "../components/store/ProductCard.jsx";
import { useShop } from "../context/ShopContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

export default function WishlistPage() {
  const { wishlist } = useShop();

  useDocumentTitle("Wishlist");

  return (
    <div className="grid-shell space-y-6">
      <div>
        <p className="text-sm text-[rgb(var(--muted))]">Saved products</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Wishlist</h1>
      </div>
      {wishlist.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nothing saved yet"
          description="Save products to your wishlist so you can revisit them later."
          action={
            <Link to="/" className="btn-primary">
              Explore products
            </Link>
          }
        />
      )}
    </div>
  );
}

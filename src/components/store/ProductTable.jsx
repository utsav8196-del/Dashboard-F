import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { formatCurrency } from "../../utils/format.js";

export default function ProductTable({ products }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-5 py-4">
                  <Link to={`/products/${product._id}`} className="font-semibold">
                    {product.title}
                  </Link>
                </td>
                <td className="px-5 py-4 text-[rgb(var(--muted))]">{product.category}</td>
                <td className="px-5 py-4">{formatCurrency(product.price)}</td>
                <td className="px-5 py-4">{product.stock}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button type="button" className="btn-secondary !px-4 !py-2" onClick={() => addToCart(product)}>
                      <ShoppingCart size={16} className="mr-2" />
                      Add
                    </button>
                    <button
                      type="button"
                      className={`btn-secondary !px-4 !py-2 ${isWishlisted(product._id) ? "!border-rose-300 !text-rose-500" : ""}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      <Heart size={16} className="mr-2" />
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

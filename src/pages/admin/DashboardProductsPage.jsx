import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProductFormModal from "../../components/admin/ProductFormModal.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  fetchProducts,
  updateProduct as updateProductRequest,
} from "../../services/productService.js";
import { uploadImage } from "../../services/uploadService.js";
import { formatCurrency } from "../../utils/format.js";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useDocumentTitle("Manage products");

  async function loadProducts() {
    const data = await fetchProducts({ limit: 100 });
    setProducts(data.products);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(payload) {
    let image = payload.image;

    if (payload.imageFile) {
      image = await uploadImage(payload.imageFile);
    }

    const requestBody = { ...payload, image };
    delete requestBody.imageFile;

    if (selectedProduct) {
      await updateProductRequest(selectedProduct._id, requestBody);
    } else {
      await createProductRequest(requestBody);
    }

    setModalOpen(false);
    setSelectedProduct(null);
    loadProducts();
  }

  async function handleDelete(id) {
    await deleteProductRequest(id);
    loadProducts();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[rgb(var(--muted))]">Inventory operations</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Products</h2>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setSelectedProduct(null);
            setModalOpen(true);
          }}
        >
          <Plus size={16} className="mr-2" />
          Add product
        </button>
      </div>

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
                  <td className="px-5 py-4 font-semibold">{product.title}</td>
                  <td className="px-5 py-4">{product.category}</td>
                  <td className="px-5 py-4">{formatCurrency(product.price)}</td>
                  <td className="px-5 py-4">{product.stock}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn-secondary !px-4 !py-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-full border p-3 text-rose-500"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

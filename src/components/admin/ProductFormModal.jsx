import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  image: "",
  stock: "",
};

export default function ProductFormModal({ product, open, onClose, onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (product) {
      setImageFile(null);
      setForm({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: product.stock,
            });
              return;
            }

            setForm(initialState);
            setImageFile(null);
  }, [open, product]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4">
      <div className="panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-[rgb(var(--muted))]">Product management</p>
            <h3 className="font-display text-2xl font-bold">{product ? "Edit product" : "Add product"}</h3>
          </div>
          <button type="button" onClick={onClose} className="btn-secondary !px-4 !py-3">
            Close
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit({
              ...form,
              price: Number(form.price),
              stock: Number(form.stock),
              imageFile,
            });
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input" placeholder="Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
            <input className="input" placeholder="Category" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} />
          </div>
          <textarea className="input min-h-32" placeholder="Description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} />
            <input className="input" type="number" placeholder="Stock" value={form.stock} onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))} />
          </div>
          <input className="input" placeholder="Image URL (optional)" value={form.image} onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))} />
          <input className="input" type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
          <button type="submit" className="btn-primary w-full">
            {product ? "Save changes" : "Create product"}
          </button>
        </form>
      </div>
    </div>
  );
}

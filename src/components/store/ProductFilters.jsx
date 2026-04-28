import { LayoutGrid, Rows3, Search } from "lucide-react";

export default function ProductFilters({
  filters,
  onChange,
  categories,
  view,
  onViewChange,
}) {
  return (
    <div className="panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid flex-1 gap-3 md:grid-cols-3">
        <label className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]" />
          <input
            value={filters.q}
            onChange={(event) => onChange("q", event.target.value)}
            className="input pl-11"
            placeholder="Search products"
          />
        </label>
        <select
          value={filters.category}
          onChange={(event) => onChange("category", event.target.value)}
          className="input"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select value={filters.sort} onChange={(event) => onChange("sort", event.target.value)} className="input">
          <option value="newest">Newest</option>
          <option value="popularity">Popularity</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
        </select>
      </div>
      <div className="flex gap-2 self-end">
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          className={`rounded-2xl border p-3 ${view === "grid" ? "border-brand text-brand" : ""}`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          type="button"
          onClick={() => onViewChange("table")}
          className={`rounded-2xl border p-3 ${view === "table" ? "border-brand text-brand" : ""}`}
        >
          <Rows3 size={18} />
        </button>
      </div>
    </div>
  );
}

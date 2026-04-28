import { useDeferredValue, useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import HeroSection from "../components/store/HeroSection.jsx";
import ProductCard from "../components/store/ProductCard.jsx";
import ProductFilters from "../components/store/ProductFilters.jsx";
import ProductTable from "../components/store/ProductTable.jsx";
import useDebounce from "../hooks/useDebounce.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { fetchProducts } from "../services/productService.js";

export default function HomePage() {
  useDocumentTitle("Storefront");

  const [filters, setFilters] = useState({
    q: "",
    category: "All",
    sort: "newest",
    page: 1,
  });
  const deferredSearch = useDeferredValue(filters.q);
  const debouncedSearch = useDebounce(deferredSearch);
  const [view, setView] = useState("grid");
  const [response, setResponse] = useState({ products: [], categories: ["All"], pagination: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchProducts({
      category: filters.category,
      page: filters.page,
      q: debouncedSearch,
      sort: filters.sort,
      limit: view === "grid" ? 8 : 10,
    })
      .then(setResponse)
      .finally(() => setLoading(false));
  }, [debouncedSearch, filters.category, filters.page, filters.sort, view]);

  return (
    <div className="grid-shell space-y-8">
      <HeroSection />
      <ProductFilters
        filters={filters}
        categories={response.categories || ["All"]}
        view={view}
        onViewChange={setView}
        onChange={(key, value) => setFilters((previous) => ({ ...previous, [key]: value, page: 1 }))}
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-96 w-full" />
          ))}
        </div>
      ) : response.products.length ? (
        <>
          {view === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {response.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <ProductTable products={response.products} />
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-[rgb(var(--muted))]">
              Page {response.pagination.page || 1} of {response.pagination.pages || 1}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilters((previous) => ({ ...previous, page: Math.max(previous.page - 1, 1) }))}
                className="btn-secondary !px-4 !py-2"
                disabled={(response.pagination.page || 1) === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setFilters((previous) => ({ ...previous, page: previous.page + 1 }))}
                className="btn-primary !px-4 !py-2"
                disabled={!response.pagination.hasNext}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyState title="No products found" description="Try adjusting your search, category, or sorting filters." />
      )}
    </div>
  );
}

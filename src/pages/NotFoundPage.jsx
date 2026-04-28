import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

export default function NotFoundPage() {
  useDocumentTitle("Not found");

  return (
    <div className="grid-shell grid min-h-[70vh] place-items-center">
      <div className="panel space-y-4 p-6 sm:p-8 text-center">
        <p className="text-sm text-[rgb(var(--muted))]">404</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Page not found</h1>
        <Link to="/" className="btn-primary">
          Back to storefront
        </Link>
      </div>
    </div>
  );
}

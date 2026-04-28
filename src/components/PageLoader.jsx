import LoadingSkeleton from "./LoadingSkeleton.jsx";

export default function PageLoader() {
  return (
    <div className="grid-shell space-y-6">
      <LoadingSkeleton className="h-20 w-full" />
      <div className="grid gap-6 lg:grid-cols-3">
        <LoadingSkeleton className="h-64 w-full" />
        <LoadingSkeleton className="h-64 w-full" />
        <LoadingSkeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

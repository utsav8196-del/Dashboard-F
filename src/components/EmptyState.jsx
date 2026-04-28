export default function EmptyState({ title, description, action }) {
  return (
    <div className="panel flex flex-col items-center justify-center gap-4 p-10 text-center">
      <div className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-accent dark:bg-slate-800 dark:text-orange-300">
        {title}
      </div>
      <p className="max-w-md text-sm text-[rgb(var(--muted))]">{description}</p>
      {action}
    </div>
  );
}

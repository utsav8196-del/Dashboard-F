export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-lg font-bold text-white">
        P
      </div>
      <div>
        <p className="font-display text-lg font-bold">PulseCart</p>
        <p className="text-xs text-[rgb(var(--muted))]">Commerce control center</p>
      </div>
    </div>
  );
}

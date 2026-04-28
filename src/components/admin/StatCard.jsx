import { motion } from "framer-motion";

export default function StatCard({ title, value, accent, note }) {
  return (
    <motion.div layout className="panel p-5">
      <div className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>
        {title}
      </div>
      <p className="font-display text-2xl sm:text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{note}</p>
    </motion.div>
  );
}

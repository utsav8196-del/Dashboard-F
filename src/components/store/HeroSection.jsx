import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel relative overflow-hidden p-8 sm:p-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/60 via-white to-orange-100/50 dark:from-teal-900/40 dark:via-slate-900 dark:to-orange-900/20" />
        <div className="relative max-w-xl space-y-6">
          <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
            Live commerce analytics
          </span>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Run your storefront and your admin war room from one place.
            </h1>
            <p className="text-base text-[rgb(var(--muted))]">
              Browse products, place orders, and watch the dashboard react in real time as customers
              convert and inventory moves.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/overview" className="btn-primary">
              Open dashboard
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <div className="btn-secondary">
              <ShieldCheck size={16} className="mr-2" />
              JWT + RBAC secured
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="panel grid gap-4 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[rgb(var(--muted))]">Realtime pulse</p>
            <h2 className="font-display text-2xl font-bold">Always-on store ops</h2>
          </div>
          <div className="animate-float rounded-full bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
            <Zap />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Auto-refresh", "Socket-powered order events"],
            ["Smart filters", "Search, sort, pagination, views"],
            ["Admin tools", "Manage products, users, orders"],
            ["Responsive UI", "Built for mobile to desktop"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border bg-white/70 p-4 dark:bg-slate-900/60">
              <p className="font-semibold">{title}</p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">{description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

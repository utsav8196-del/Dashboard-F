import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/70 transition hover:border-brand hover:text-brand dark:bg-slate-900/70"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={18} /> : <SunMedium size={18} />}
    </button>
  );
}

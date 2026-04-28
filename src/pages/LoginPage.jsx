import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useDocumentTitle("Sign in");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await login(form);
      // const nextPath =
      //   location.state?.from?.pathname || (response.user.role === "admin" ? "/admin/overview" : "/");
      navigate(nextPath, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to sign in");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid-shell grid min-h-[70vh] place-items-center">
      <div className="panel w-full max-w-lg p-6 sm:p-8">
        <p className="text-sm text-[rgb(var(--muted))]">Welcome back</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Sign in</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="input" type="email" placeholder="Email" autoComplete="email" value={form.email} onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))} />
          <input className="input" type="password" placeholder="Password" autoComplete="current-password" value={form.password} onChange={(event) => setForm((previous) => ({ ...previous, password: event.target.value }))} />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

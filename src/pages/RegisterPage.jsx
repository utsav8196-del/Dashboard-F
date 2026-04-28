import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useDocumentTitle("Register");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await register(form);
      navigate("/");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to register");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid-shell grid min-h-[70vh] place-items-center">
      <div className="panel w-full max-w-lg p-6 sm:p-8">
        <p className="text-sm text-[rgb(var(--muted))]">Create your account</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Join PulseCart</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="input" placeholder="Full name" autoComplete="name" value={form.name} onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))} />
          <input className="input" type="email" placeholder="Email" autoComplete="email" value={form.email} onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))} />
          <input className="input" type="password" placeholder="Password" autoComplete="new-password" value={form.password} onChange={(event) => setForm((previous) => ({ ...previous, password: event.target.value }))} />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-[rgb(var(--muted))]">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-brand">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

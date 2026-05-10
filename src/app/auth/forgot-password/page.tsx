"use client";
import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="animate-slide-up text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Revisa tu email</h1>
        <p className="text-slate-500 mb-2">Enviamos un enlace de recuperación a:</p>
        <p className="font-semibold text-slate-800 mb-8">{email}</p>
        <p className="text-sm text-slate-400 mb-6">¿No llegó? Revisa tu carpeta de spam o espera un momento.</p>
        <Link href="/auth/login">
          <Button variant="secondary" className="w-full justify-center">Volver al inicio de sesión</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <Link href="/auth/login" className="text-sm text-slate-500 hover:text-sky-600 transition-colors flex items-center gap-1 mb-6">
          ← Volver al login
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Recupera tu acceso</h1>
        <p className="mt-2 text-slate-500">Te enviaremos un enlace para restablecer tu contraseña.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <Button type="submit" loading={loading} className="w-full justify-center py-3">
          Enviar enlace <ArrowRight size={16} />
        </Button>
      </form>
    </div>
  );
}

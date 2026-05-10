"use client";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "psychologist" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (form.role === "psychologist") {
      router.push("/dashboard");
    } else {
      router.push("/patient");
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-sky-600 transition-colors flex items-center gap-1 mb-6">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bienvenida de vuelta</h1>
        <p className="mt-2 text-slate-500">Ingresa a tu cuenta de CloudNimbus</p>
      </div>

      {/* Role selector */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
        {[
          { value: "psychologist", label: "Soy psicóloga" },
          { value: "patient", label: "Soy paciente" },
        ].map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setForm((f) => ({ ...f, role: value }))}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-150 ${
              form.role === value ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="tu@email.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Tu contraseña"
              className="w-full pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400" />
            <span className="text-sm text-slate-600">Recordarme</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full justify-center py-3">
          Ingresar <ArrowRight size={16} />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-sky-600 font-semibold hover:text-sky-700">
            Regístrate gratis
          </Link>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="mt-6 p-4 bg-sky-50 rounded-xl border border-sky-100">
        <p className="text-xs font-semibold text-sky-700 mb-2">Credenciales de demo:</p>
        <p className="text-xs text-sky-600">Email: demo@cloudnimbus.com</p>
        <p className="text-xs text-sky-600">Contraseña: cualquiera</p>
      </div>
    </div>
  );
}

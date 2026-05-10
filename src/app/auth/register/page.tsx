"use client";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", lastName: "", email: "", phone: "", password: "", specialty: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard");
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-sky-600 transition-colors flex items-center gap-1 mb-6">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Crea tu cuenta</h1>
        <p className="mt-2 text-slate-500">14 días gratis · Sin tarjeta de crédito</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-400"}`}>
              {s}
            </div>
            {s < 2 && <div className={`h-0.5 w-16 transition-all duration-300 ${step > s ? "bg-sky-500" : "bg-slate-200"}`} />}
          </div>
        ))}
        <span className="ml-2 text-sm text-slate-500">{step === 1 ? "Datos personales" : "Tu práctica"}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <InputField icon={<User size={16} />} placeholder="Nombre" value={form.name} onChange={(v) => update("name", v)} required />
              <InputField placeholder="Apellido" value={form.lastName} onChange={(v) => update("lastName", v)} required />
            </div>
            <InputField icon={<Mail size={16} />} type="email" placeholder="Email profesional" value={form.email} onChange={(v) => update("email", v)} required />
            <InputField icon={<Phone size={16} />} type="tel" placeholder="Teléfono (con código de país)" value={form.phone} onChange={(v) => update("phone", v)} />
            <InputField icon={<Lock size={16} />} type="password" placeholder="Contraseña (mín. 8 caracteres)" value={form.password} onChange={(v) => update("password", v)} required />
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Especialidad</label>
              <select
                value={form.specialty}
                onChange={(e) => update("specialty", e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              >
                <option value="">Selecciona tu especialidad</option>
                {["Psicología Clínica", "Terapia Cognitivo-Conductual", "Psicoanálisis", "Terapia Sistémica", "Neuropsicología", "Psicología Educativa", "Otra"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">¿Cuántos pacientes tienes actualmente?</label>
              <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                <option>1-10 pacientes</option>
                <option>11-30 pacientes</option>
                <option>31-60 pacientes</option>
                <option>Más de 60 pacientes</option>
              </select>
            </div>
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-sky-500" />
                <span className="text-sm text-slate-600">
                  Acepto los <a href="#" className="text-sky-600 font-medium">Términos de Servicio</a> y la{" "}
                  <a href="#" className="text-sky-600 font-medium">Política de Privacidad</a> de CloudNimbus.
                </span>
              </label>
            </div>
          </>
        )}

        <Button type="submit" loading={loading} className="w-full justify-center py-3">
          {step === 1 ? "Continuar" : "Crear cuenta"} <ArrowRight size={16} />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-sky-600 font-semibold hover:text-sky-700">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, type = "text", placeholder, value, onChange, required }: {
  icon?: React.ReactNode; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all`}
      />
    </div>
  );
}

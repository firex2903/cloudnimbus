"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, User, Mail, Phone, Calendar, FileText, Tag, Key, Copy, RefreshCw, CheckCircle } from "lucide-react";
import Link from "next/link";
import { generatePassword } from "@/lib/utils";
import { addPatient } from "@/lib/patient-store";

export default function NewPatientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "", lastName: "", email: "", phone: "", birthDate: "",
    notes: "", status: "ACTIVE", tags: "",
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: generatePassword(),
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setCredentials((c) => ({ ...c, username: form.email }));
      setStep(2);
      return;
    }
    setLoading(true);
    addPatient({
      id: `p_${Date.now()}`,
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      birthDate: form.birthDate ? new Date(form.birthDate) : undefined,
      notes: form.notes,
      status: form.status as "ACTIVE" | "PAUSED" | "INACTIVE",
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      psychologistId: "psy_1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard/patients");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/patients">
          <button className="p-2 hover:bg-white rounded-xl border border-slate-200 transition-colors">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nuevo paciente</h2>
          <p className="text-sm text-slate-500">Paso {step} de 2</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-violet-600 rounded-full transition-all duration-500"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <form onSubmit={handleNext}>
        {step === 1 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] p-6 space-y-5">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <User size={18} className="text-sky-500" /> Datos personales
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre *" icon={<User size={15} />}>
                <input required value={form.name} onChange={(e) => update("name", e.target.value)}
                  placeholder="María" className={inputClass} />
              </Field>
              <Field label="Apellido *" icon={<User size={15} />}>
                <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)}
                  placeholder="González" className={inputClass} />
              </Field>
            </div>

            <Field label="Email *" icon={<Mail size={15} />}>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                placeholder="paciente@email.com" className={inputClass} />
            </Field>

            <Field label="Teléfono" icon={<Phone size={15} />}>
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                placeholder="+56 9 1234 5678" className={inputClass} />
            </Field>

            <Field label="Fecha de nacimiento" icon={<Calendar size={15} />}>
              <input type="date" value={form.birthDate} onChange={(e) => update("birthDate", e.target.value)}
                className={inputClass} />
            </Field>

            <Field label="Tags / Etiquetas" icon={<Tag size={15} />}>
              <input value={form.tags} onChange={(e) => update("tags", e.target.value)}
                placeholder="ansiedad, adulto, online (separados por coma)" className={inputClass} />
            </Field>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <FileText size={15} className="inline mr-1.5 text-slate-400" />
                Notas iniciales
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Motivo de consulta, observaciones iniciales..."
                rows={4}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Estado</label>
              <div className="flex gap-3">
                {[{ value: "ACTIVE", label: "Activo" }, { value: "PAUSED", label: "En pausa" }, { value: "INACTIVE", label: "Inactivo" }].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value={value} checked={form.status === value}
                      onChange={() => update("status", value)}
                      className="w-4 h-4 text-sky-500 border-slate-300 focus:ring-sky-400" />
                    <span className="text-sm text-slate-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full justify-center">
              Continuar — Generar credenciales
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-500" /> Resumen del paciente
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <InfoRow label="Nombre" value={`${form.name} ${form.lastName}`} />
                <InfoRow label="Email" value={form.email} />
                <InfoRow label="Teléfono" value={form.phone || "—"} />
                <InfoRow label="Estado" value={form.status === "ACTIVE" ? "Activo" : form.status === "PAUSED" ? "En pausa" : "Inactivo"} />
              </div>
            </div>

            {/* Credentials */}
            <div className="bg-gradient-to-br from-sky-50 to-violet-50 rounded-2xl border border-sky-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                <Key size={18} className="text-sky-500" /> Credenciales de acceso
              </h3>
              <p className="text-sm text-slate-500 mb-5">
                El paciente usará estas credenciales para ingresar a su portal personal.
              </p>

              <div className="space-y-3">
                <CredentialField
                  label="Usuario (email)"
                  value={credentials.username}
                  onCopy={() => copyToClipboard(credentials.username)}
                  copied={copied}
                />
                <CredentialField
                  label="Contraseña temporal"
                  value={credentials.password}
                  onCopy={() => copyToClipboard(credentials.password)}
                  copied={copied}
                  onRefresh={() => setCredentials((c) => ({ ...c, password: generatePassword() }))}
                />
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-amber-700 font-medium">
                  ⚠️ Guarda estas credenciales. El paciente deberá cambiar su contraseña al primer ingreso.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1 justify-center">
                <ArrowLeft size={16} /> Volver
              </Button>
              <Button type="submit" loading={loading} className="flex-1 justify-center">
                Crear paciente
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent";

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-slate-400 block">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

function CredentialField({ label, value, onCopy, copied, onRefresh }: {
  label: string; value: string; onCopy: () => void; copied: boolean; onRefresh?: () => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
        <span className="flex-1 font-mono text-sm text-slate-800">{value}</span>
        {onRefresh && (
          <button type="button" onClick={onRefresh} className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
            <RefreshCw size={14} />
          </button>
        )}
        <button type="button" onClick={onCopy} className="p-1 hover:bg-sky-50 rounded-lg transition-colors text-sky-500">
          {copied ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

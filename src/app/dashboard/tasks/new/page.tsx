"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getAllPatients } from "@/lib/patient-store";
import { addTask } from "@/lib/task-store";
import type { Patient } from "@/types";
import { ArrowLeft, Plus, X } from "lucide-react";

const taskTypes = [
  { value: "TEXT", label: "Texto libre", desc: "El paciente escribe una respuesta libre", icon: "📝" },
  { value: "CHECKLIST", label: "Checklist", desc: "Lista de ítems que el paciente debe completar", icon: "✅" },
  { value: "REFLECTION", label: "Reflexión", desc: "Preguntas de reflexión guiada", icon: "💭" },
  { value: "EMOTIONAL_DIARY", label: "Diario emocional", desc: "Registro diario de emociones y pensamientos", icon: "📖" },
  { value: "VIDEO", label: "Video + reflexión", desc: "Video para ver y responder preguntas", icon: "🎬" },
  { value: "FORM", label: "Formulario", desc: "Formulario estructurado personalizado", icon: "📋" },
];

export default function NewTaskPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("TEXT");
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => { setPatients(getAllPatients()); }, []);
  const [checklistItems, setChecklistItems] = useState<string[]>(["", ""]);
  const [form, setForm] = useState({
    title: "", description: "", patientId: "", dueDate: "",
    externalLink: "", allowFileUpload: false,
  });

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const addItem = () => setChecklistItems((items) => [...items, ""]);
  const removeItem = (i: number) => setChecklistItems((items) => items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, val: string) => setChecklistItems((items) => items.map((it, idx) => idx === i ? val : it));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const patient = patients.find((p) => p.id === form.patientId);
    addTask({
      patient,
      id: `t_${Date.now()}`,
      title: form.title,
      description: form.description,
      type: type as "TEXT" | "CHECKLIST" | "REFLECTION" | "EMOTIONAL_DIARY" | "VIDEO" | "FORM",
      status: "PENDING",
      patientId: form.patientId,
      psychologistId: "psy_1",
      dueDate: form.dueDate ? new Date(form.dueDate) : undefined,
      checklistItems: type === "CHECKLIST"
        ? checklistItems.filter(Boolean).map((label, i) => ({ id: `ci_${Date.now()}_${i}`, label, completed: false }))
        : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard/tasks");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tasks">
          <button className="p-2 hover:bg-white rounded-xl border border-slate-200 transition-colors">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nueva tarea terapéutica</h2>
          <p className="text-sm text-slate-500">Crea y asigna una tarea a un paciente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Task type */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Tipo de tarea</h3>
          <div className="grid grid-cols-2 gap-3">
            {taskTypes.map(({ value, label, desc, icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  type === value ? "border-sky-500 bg-sky-50" : "border-slate-100 hover:border-slate-200 bg-white"
                }`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className={`text-sm font-semibold ${type === value ? "text-sky-700" : "text-slate-700"}`}>{label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Detalles</h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Título *</label>
            <input required value={form.title} onChange={(e) => update("title", e.target.value)}
              placeholder="Ej: Diario emocional semanal"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción / Instrucciones</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
              placeholder="Escribe las instrucciones claras para tu paciente..."
              rows={4}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none" />
          </div>

          {/* Checklist items */}
          {type === "CHECKLIST" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Ítems del checklist</label>
              <div className="space-y-2">
                {checklistItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-slate-300 flex-shrink-0" />
                    <input value={item} onChange={(e) => updateItem(i, e.target.value)}
                      placeholder={`Ítem ${i + 1}`}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                    {checklistItems.length > 1 && (
                      <button type="button" onClick={() => removeItem(i)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addItem}
                  className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 font-medium">
                  <Plus size={14} /> Agregar ítem
                </button>
              </div>
            </div>
          )}

          {/* External link for VIDEO type */}
          {(type === "VIDEO" || type === "FORM") && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {type === "VIDEO" ? "URL del video" : "URL del formulario"}
              </label>
              <input type="url" value={form.externalLink} onChange={(e) => update("externalLink", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Paciente *</label>
              <select required value={form.patientId} onChange={(e) => update("patientId", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                <option value="">Seleccionar paciente</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} {p.lastName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha límite</label>
              <input type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-10 h-5 rounded-full transition-colors ${form.allowFileUpload ? "bg-sky-500" : "bg-slate-200"}`}
              onClick={() => update("allowFileUpload", !form.allowFileUpload)}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${form.allowFileUpload ? "translate-x-5" : "translate-x-0"}`} />
            </div>
            <span className="text-sm text-slate-700">Permitir que el paciente suba archivos como respuesta</span>
          </label>
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard/tasks" className="flex-1">
            <Button type="button" variant="secondary" className="w-full justify-center">Cancelar</Button>
          </Link>
          <Button type="submit" loading={loading} className="flex-1 justify-center">
            Crear y asignar tarea
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { mockPatients } from "@/lib/mock-data";
import { ArrowLeft, FileText, ExternalLink, Tag, X, Plus } from "lucide-react";

export default function NewClinicalRecordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState({ title: "", url: "", description: "", patientId: "", date: "" });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((t) => [...t, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard/clinical");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clinical">
          <button className="p-2 hover:bg-white rounded-xl border border-slate-200 transition-colors">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nueva ficha clínica</h2>
          <p className="text-sm text-slate-500">Agrega un link a una ficha clínica externa</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
        <p className="text-sm text-amber-700"><strong>🔒 Privado:</strong> Esta ficha solo será visible para ti. Los pacientes no tienen acceso.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <FileText size={14} className="inline mr-1.5 text-slate-400" />Título *
          </label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)}
            placeholder="Ej: Evaluación inicial - María González"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <ExternalLink size={14} className="inline mr-1.5 text-slate-400" />URL de la ficha *
          </label>
          <input required type="url" value={form.url} onChange={(e) => update("url", e.target.value)}
            placeholder="https://drive.google.com/file/..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          <p className="text-xs text-slate-400 mt-1">Google Drive, Notion, Dropbox, o cualquier URL externa</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
            placeholder="Breve descripción del contenido de la ficha..."
            rows={3}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Paciente *</label>
            <select required value={form.patientId} onChange={(e) => update("patientId", e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
              <option value="">Seleccionar paciente</option>
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} {p.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha del documento</label>
            <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <Tag size={14} className="inline mr-1.5 text-slate-400" />Etiquetas
          </label>
          <div className="flex gap-2 mb-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Agregar etiqueta..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
            <Button type="button" variant="secondary" size="sm" onClick={addTag}><Plus size={14} /></Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-700 text-xs rounded-full font-medium">
                {tag}
                <button type="button" onClick={() => setTags((t) => t.filter((t2) => t2 !== tag))}>
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/clinical" className="flex-1">
            <Button type="button" variant="secondary" className="w-full justify-center">Cancelar</Button>
          </Link>
          <Button type="submit" loading={loading} className="flex-1 justify-center">
            Guardar ficha
          </Button>
        </div>
      </form>
    </div>
  );
}

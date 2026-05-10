"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Upload, Link as LinkIcon, FileText, Video, Music, File } from "lucide-react";

const materialTypes = [
  { value: "PDF", label: "PDF", icon: FileText, color: "text-red-500 bg-red-50" },
  { value: "VIDEO", label: "Video", icon: Video, color: "text-purple-500 bg-purple-50" },
  { value: "AUDIO", label: "Audio", icon: Music, color: "text-emerald-500 bg-emerald-50" },
  { value: "DOCUMENT", label: "Documento", icon: File, color: "text-amber-500 bg-amber-50" },
  { value: "LINK", label: "Link externo", icon: LinkIcon, color: "text-sky-500 bg-sky-50" },
];

const categories = ["Mindfulness", "Relajación", "Meditación", "Autoestima", "Ansiedad", "Depresión", "Habilidades sociales", "Otro"];

export default function NewMaterialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("PDF");
  const [form, setForm] = useState({ title: "", description: "", externalUrl: "", category: "" });
  const [dragging, setDragging] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard/materials");
  };

  const isLink = type === "LINK";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/materials">
          <button className="p-2 hover:bg-white rounded-xl border border-slate-200 transition-colors">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Subir material</h2>
          <p className="text-sm text-slate-500">Agrega recursos a tu biblioteca</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type selector */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Tipo de material</h3>
          <div className="flex gap-3 flex-wrap">
            {materialTypes.map(({ value, label, icon: Icon, color }) => (
              <button key={value} type="button" onClick={() => setType(value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${type === value ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${type === value ? color : "bg-slate-100"}`}>
                  <Icon size={13} className={type === value ? "" : "text-slate-400"} />
                </div>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Título *</label>
            <input required value={form.title} onChange={(e) => update("title", e.target.value)}
              placeholder="Ej: Guía de Mindfulness para principiantes"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
              placeholder="Describe brevemente este material..."
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoría</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
              <option value="">Sin categoría</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {isLink ? (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">URL del recurso *</label>
              <input required type="url" value={form.externalUrl} onChange={(e) => update("externalUrl", e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Archivo</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${dragging ? "border-sky-400 bg-sky-50" : "border-slate-200 hover:border-sky-300 hover:bg-sky-50/50"}`}
              >
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center">
                  <Upload size={24} className="text-sky-500" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-700 text-sm">Arrastra tu archivo aquí</p>
                  <p className="text-xs text-slate-400 mt-1">o haz clic para seleccionar</p>
                </div>
                <p className="text-xs text-slate-400">
                  {type === "PDF" ? "PDF hasta 50MB" : type === "VIDEO" ? "MP4, MOV hasta 2GB" : type === "AUDIO" ? "MP3, WAV hasta 100MB" : "Cualquier formato hasta 100MB"}
                </p>
                <input type="file" className="hidden" />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard/materials" className="flex-1">
            <Button type="button" variant="secondary" className="w-full justify-center">Cancelar</Button>
          </Link>
          <Button type="submit" loading={loading} className="flex-1 justify-center">
            <Upload size={16} /> Subir material
          </Button>
        </div>
      </form>
    </div>
  );
}

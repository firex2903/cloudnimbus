"use client";
import { useState } from "react";
import Link from "next/link";
import { mockMaterials } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Plus, Search, FileText, Video, Music, Link as LinkIcon, File, Download, Share2, Library } from "lucide-react";

const typeConfig: Record<string, { icon: typeof FileText; color: string; label: string }> = {
  PDF: { icon: FileText, color: "text-red-500 bg-red-50", label: "PDF" },
  VIDEO: { icon: Video, color: "text-purple-500 bg-purple-50", label: "Video" },
  AUDIO: { icon: Music, color: "text-emerald-500 bg-emerald-50", label: "Audio" },
  LINK: { icon: LinkIcon, color: "text-sky-500 bg-sky-50", label: "Link externo" },
  DOCUMENT: { icon: File, color: "text-amber-500 bg-amber-50", label: "Documento" },
};

const categories = ["Todos", "Mindfulness", "Relajación", "Meditación", "Autoestima", "Ansiedad"];

export default function MaterialsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = mockMaterials.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todos" || m.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Biblioteca de materiales</h2>
          <p className="text-slate-500 text-sm">{mockMaterials.length} recursos disponibles</p>
        </div>
        <Link href="/dashboard/materials/new">
          <Button><Plus size={16} /> Subir material</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(typeConfig).map(([type, config]) => {
          const Icon = config.icon;
          const count = mockMaterials.filter((m) => m.type === type).length;
          return (
            <div key={type} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${config.color}`}>
                <Icon size={16} />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-800">{count}</div>
                <div className="text-xs text-slate-500">{config.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-60">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar materiales..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${category === cat ? "bg-sky-500 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <Library size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="text-slate-400">No se encontraron materiales</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((material) => {
            const config = typeConfig[material.type];
            const Icon = config.icon;
            return (
              <div key={material.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
                {/* Color top bar */}
                <div className={`h-1.5 ${material.type === "PDF" ? "bg-red-400" : material.type === "VIDEO" ? "bg-purple-400" : material.type === "AUDIO" ? "bg-emerald-400" : "bg-sky-400"}`} />

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config.color}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-base leading-tight mb-1">{material.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="gray">{config.label}</Badge>
                        {material.category && <Badge variant="blue">{material.category}</Badge>}
                      </div>
                    </div>
                  </div>

                  {material.description && (
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{material.description}</p>
                  )}

                  <div className="text-xs text-slate-400 mb-4">Subido: {formatDate(material.createdAt)}</div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition-colors">
                      <Share2 size={13} /> Asignar a paciente
                    </button>
                    {(material.fileUrl || material.externalUrl) && (
                      <a href={material.fileUrl || material.externalUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold rounded-lg transition-colors">
                        <Download size={13} /> {material.type === "LINK" ? "Abrir" : "Ver"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

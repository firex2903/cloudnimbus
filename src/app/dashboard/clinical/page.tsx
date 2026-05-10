"use client";
import { useState } from "react";
import Link from "next/link";
import { mockClinicalRecords } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import { Plus, Search, FileText, ExternalLink, Filter, Lock } from "lucide-react";

const sourceIcons: Record<string, string> = {
  "drive.google.com": "🟢",
  "notion.so": "⬛",
  "dropbox.com": "🔵",
};

function getSourceIcon(url: string) {
  for (const [domain, icon] of Object.entries(sourceIcons)) {
    if (url.includes(domain)) return icon;
  }
  return "📎";
}

export default function ClinicalPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const allTags = Array.from(new Set(mockClinicalRecords.flatMap((r) => r.tags || [])));

  const filtered = mockClinicalRecords.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.patient?.name.toLowerCase().includes(search.toLowerCase()) || false;
    const matchTag = !tagFilter || (r.tags || []).includes(tagFilter);
    return matchSearch && matchTag;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Privacy banner */}
      <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl px-5 py-4 flex items-center gap-3">
        <Lock size={20} className="text-rose-500 flex-shrink-0" />
        <div>
          <p className="font-semibold text-rose-700 text-sm">Acceso exclusivo — Psicóloga</p>
          <p className="text-xs text-rose-500">Esta sección es completamente privada. Los pacientes no tienen acceso a las fichas clínicas.</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fichas clínicas</h2>
          <p className="text-slate-500 text-sm">{mockClinicalRecords.length} fichas registradas</p>
        </div>
        <Link href="/dashboard/clinical/new">
          <Button><Plus size={16} /> Nueva ficha</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-60">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por paciente o título..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-400" />
          <button onClick={() => setTagFilter("")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${!tagFilter ? "bg-sky-500 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>
            Todos
          </button>
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setTagFilter(tag)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${tagFilter === tag ? "bg-sky-500 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Records */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
            <FileText size={48} className="mx-auto mb-4 text-slate-200" />
            <p className="text-slate-400">No se encontraron fichas</p>
          </div>
        ) : filtered.map((record) => (
          <div key={record.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-2xl">
                  {getSourceIcon(record.url)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-800">{record.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{record.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-400 mb-1">{formatDate(record.date)}</p>
                    <a href={record.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold rounded-lg transition-colors">
                      Abrir <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  {record.patient && (
                    <div className="flex items-center gap-1.5">
                      <Avatar name={`${record.patient.name} ${record.patient.lastName}`} size="xs" />
                      <span className="text-xs text-slate-600 font-medium">{record.patient.name} {record.patient.lastName}</span>
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    {record.tags?.map((tag) => (
                      <Badge key={tag} variant="red">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

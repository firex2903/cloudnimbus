import { mockMaterials } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { FileText, Video, Music, Link as LinkIcon, File, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const typeConfig: Record<string, { icon: typeof FileText; color: string; label: string; bg: string }> = {
  PDF: { icon: FileText, color: "text-red-500", label: "PDF", bg: "bg-red-50" },
  VIDEO: { icon: Video, color: "text-purple-500", label: "Video", bg: "bg-purple-50" },
  AUDIO: { icon: Music, color: "text-emerald-500", label: "Audio", bg: "bg-emerald-50" },
  LINK: { icon: LinkIcon, color: "text-sky-500", label: "Link externo", bg: "bg-sky-50" },
  DOCUMENT: { icon: File, color: "text-amber-500", label: "Documento", bg: "bg-amber-50" },
};

export default function PatientMaterialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mis materiales</h1>
        <p className="text-slate-500 text-sm">Recursos compartidos por tu psicóloga para apoyar tu proceso terapéutico</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMaterials.map((material) => {
          const config = typeConfig[material.type];
          const Icon = config.icon;
          return (
            <div key={material.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
              <div className={`h-1.5 ${material.type === "PDF" ? "bg-red-400" : material.type === "VIDEO" ? "bg-purple-400" : material.type === "AUDIO" ? "bg-emerald-400" : "bg-sky-400"}`} />
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                    <Icon size={22} className={config.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">{material.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="gray">{config.label}</Badge>
                      {material.category && <Badge variant="blue">{material.category}</Badge>}
                    </div>
                  </div>
                </div>

                {material.description && (
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{material.description}</p>
                )}

                <div className="text-xs text-slate-400 mb-4">Disponible desde: {formatDate(material.createdAt)}</div>

                <a
                  href={material.fileUrl || material.externalUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-sm font-semibold rounded-xl transition-colors"
                >
                  {material.type === "LINK" ? (
                    <><ExternalLink size={15} /> Abrir enlace</>
                  ) : (
                    <><Download size={15} /> {material.type === "VIDEO" ? "Ver video" : material.type === "AUDIO" ? "Escuchar" : "Descargar"}</>
                  )}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {mockMaterials.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-semibold text-slate-600">Sin materiales aún</h3>
          <p className="text-sm text-slate-400">Tu psicóloga compartirá recursos aquí cuando estén disponibles</p>
        </div>
      )}
    </div>
  );
}

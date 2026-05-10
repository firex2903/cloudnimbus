"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPatients } from "@/lib/patient-store";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Patient } from "@/types";
import { Search, Filter, Plus, Phone, Mail, Tag, MoreVertical, ChevronRight, Users } from "lucide-react";

const statusColors = { ACTIVE: "green", INACTIVE: "gray", PAUSED: "orange" } as const;
const statusLabels = { ACTIVE: "Activo", INACTIVE: "Inactivo", PAUSED: "En pausa" };

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("ALL");
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setPatients(getAllPatients());
  }, []);

  const filtered = patients.filter((p) => {
    const matchSearch = `${p.name} ${p.lastName} ${p.email}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Todos los pacientes</h2>
          <p className="text-slate-500 text-sm">{patients.length} pacientes registrados</p>
        </div>
        <Link href="/dashboard/patients/new">
          <Button>
            <Plus size={16} /> Nuevo paciente
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          {["ALL", "ACTIVE", "PAUSED", "INACTIVE"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                filter === s ? "bg-sky-500 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300"
              }`}
            >
              {s === "ALL" ? "Todos" : statusLabels[s as keyof typeof statusLabels]}
            </button>
          ))}
        </div>
      </div>

      {/* Patient grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <Users size={48} className="mx-auto mb-4 text-slate-200" />
          <h3 className="font-semibold text-slate-600 mb-1">No se encontraron pacientes</h3>
          <p className="text-sm text-slate-400">Intenta con otro término de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
}

function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 group overflow-hidden">
      {/* Card header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-3">
          <Avatar name={`${patient.name} ${patient.lastName}`} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg leading-tight truncate">
                {patient.name} {patient.lastName}
              </h3>
              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical size={16} className="text-slate-400" />
              </button>
            </div>
            <Badge variant={statusColors[patient.status]}>
              {statusLabels[patient.status]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 space-y-2 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail size={13} className="flex-shrink-0 text-slate-400" />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone size={13} className="flex-shrink-0 text-slate-400" />
          <span>{patient.phone}</span>
        </div>
        {patient.birthDate && (
          <div className="text-xs text-slate-400">
            Nacimiento: {formatDate(patient.birthDate)}
          </div>
        )}
      </div>

      {/* Tags */}
      {patient.tags && patient.tags.length > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {patient.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">
              <Tag size={10} />{tag}
            </span>
          ))}
        </div>
      )}

      {/* Notes */}
      {patient.notes && (
        <div className="px-5 pb-4">
          <p className="text-xs text-slate-400 line-clamp-2">{patient.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Desde {formatDate(patient.createdAt)}</span>
        <Link href={`/dashboard/patients/${patient.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors">
          Ver perfil <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}

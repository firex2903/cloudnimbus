"use client";
import { mockPatients } from "./mock-data";
import type { Patient } from "@/types";

const KEY = "cn_patients";

function load(): Patient[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(patients: Patient[]) {
  localStorage.setItem(KEY, JSON.stringify(patients));
}

export function getAllPatients(): Patient[] {
  const local = load();
  // Merge: local patients take precedence by id, mock patients fill the rest
  const ids = new Set(local.map((p) => p.id));
  return [...local, ...mockPatients.filter((p) => !ids.has(p.id))];
}

export function addPatient(patient: Patient) {
  const current = load();
  save([patient, ...current]);
}

export function getPatientById(id: string): Patient | undefined {
  return getAllPatients().find((p) => p.id === id);
}

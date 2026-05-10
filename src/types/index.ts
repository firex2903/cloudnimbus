export type UserRole = "PSYCHOLOGIST" | "PATIENT";

export type SessionStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
export type SessionType = "ONLINE" | "PRESENTIAL";
export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
export type TaskType = "TEXT" | "CHECKLIST" | "REFLECTION" | "EMOTIONAL_DIARY" | "FORM" | "VIDEO";
export type MaterialType = "PDF" | "VIDEO" | "AUDIO" | "DOCUMENT" | "LINK";
export type PatientStatus = "ACTIVE" | "INACTIVE" | "PAUSED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Patient {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: Date;
  notes?: string;
  status: PatientStatus;
  psychologistId: string;
  userId?: string;
  tags?: string[];
  nextSession?: TherapySession;
  createdAt: Date;
  updatedAt: Date;
}

export interface TherapySession {
  id: string;
  patientId: string;
  patient?: Patient;
  psychologistId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: SessionStatus;
  type: SessionType;
  meetingUrl?: string;
  notes?: string;
  calendlyEventId?: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  patientId: string;
  patient?: Patient;
  psychologistId: string;
  status: TaskStatus;
  dueDate?: Date;
  fileUrl?: string;
  externalLink?: string;
  checklistItems?: ChecklistItem[];
  response?: string;
  responseFileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface Material {
  id: string;
  title: string;
  description?: string;
  type: MaterialType;
  fileUrl?: string;
  externalUrl?: string;
  category?: string;
  psychologistId: string;
  createdAt: Date;
}

export interface PatientMaterial {
  id: string;
  patientId: string;
  materialId: string;
  material?: Material;
  enabledAt: Date;
  expiresAt?: Date;
}

export interface ClinicalRecord {
  id: string;
  patientId: string;
  patient?: Patient;
  psychologistId: string;
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  date: Date;
  createdAt: Date;
}

export interface WhatsAppLog {
  id: string;
  patientId: string;
  patient?: Patient;
  phone: string;
  message: string;
  status: "SENT" | "FAILED" | "PENDING";
  sentAt?: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: "SESSION" | "TASK" | "MATERIAL" | "SYSTEM";
  createdAt: Date;
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  sessionsThisWeek: number;
  pendingTasks: number;
  remindersSent: number;
  upcomingSessions: TherapySession[];
  recentPatients: Patient[];
}

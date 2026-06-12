/**
 * DATA STORE
 * Central module managing all application data. Reads from localStorage when
 * available (admin edits persist there), otherwise falls back to default data.
 * SSR-safe: localStorage access is guarded so the server-rendered shell does
 * not crash.
 */

import { DEFAULT_SYMPTOMS, type Symptom } from "./symptoms";
import { DEFAULT_SPECIALISTS, type Specialist } from "./specialists";
import { DEFAULT_DISEASES, type Disease } from "./diseases";
import { DEFAULT_HOSPITALS, type Hospital } from "./hospitals";
import { DEFAULT_THERAPY, type TherapyEntry } from "./therapy";

const KEYS = {
  symptoms: "mess_symptoms",
  specialists: "mess_specialists",
  diseases: "mess_diseases",
  hospitals: "mess_hospitals",
  therapy: "mess_therapy",
} as const;

const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

function load<T>(key: string, defaultData: T[]): T[] {
  if (!isBrowser()) return defaultData;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {
    /* ignore */
  }
  return defaultData;
}

function save<T>(key: string, data: T[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getSymptoms(): Symptom[] { return load(KEYS.symptoms, DEFAULT_SYMPTOMS); }
export function saveSymptoms(data: Symptom[]): void { save(KEYS.symptoms, data); }

export function getSpecialists(): Specialist[] { return load(KEYS.specialists, DEFAULT_SPECIALISTS); }
export function saveSpecialists(data: Specialist[]): void { save(KEYS.specialists, data); }

export function getDiseases(): Disease[] { return load(KEYS.diseases, DEFAULT_DISEASES); }
export function saveDiseases(data: Disease[]): void { save(KEYS.diseases, data); }

export function getHospitals(): Hospital[] { return load(KEYS.hospitals, DEFAULT_HOSPITALS); }
export function saveHospitals(data: Hospital[]): void { save(KEYS.hospitals, data); }

export function getTherapy(): TherapyEntry[] { return load(KEYS.therapy, DEFAULT_THERAPY); }
export function saveTherapy(data: TherapyEntry[]): void { save(KEYS.therapy, data); }

export function resetAllData(): void {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}

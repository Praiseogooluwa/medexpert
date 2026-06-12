/**
 * MATCHING ENGINE
 * Rule-based inference: given a set of selected symptom IDs, compare them
 * against each disease's symptom list and return ranked possible conditions
 * along with the recommended specialist, therapy advice, and hospitals.
 *
 * Confidence score = (matched symptoms) / (total symptoms in the disease rule).
 * Diseases below MIN_THRESHOLD are excluded.
 */
import type { Disease } from "@/data/diseases";
import type { Specialist } from "@/data/specialists";
import type { Hospital } from "@/data/hospitals";
import type { TherapyEntry } from "@/data/therapy";

export type MatchResult = {
  disease: Disease;
  confidence: number; // percentage 0-100
  matchedSymptoms: string[];
  specialist: Specialist | null;
  therapy: TherapyEntry | null;
  hospitals: Hospital[];
};

const MIN_THRESHOLD = 25; // percent

export function analyzeSymptoms(
  selectedSymptomIds: string[],
  diseases: Disease[],
  specialists: Specialist[],
  hospitals: Hospital[],
  therapy: TherapyEntry[],
): MatchResult[] {
  if (selectedSymptomIds.length === 0) return [];
  const selected = new Set(selectedSymptomIds);

  const scored: MatchResult[] = diseases
    .map((disease) => {
      const matched = disease.symptoms.filter((id) => selected.has(id));
      if (matched.length === 0) return null;
      const confidence = Math.round((matched.length / disease.symptoms.length) * 100);
      const specialist = specialists.find((sp) => sp.id === disease.specialistId) ?? null;
      const therapyEntry = therapy.find((t) => t.conditionId === disease.id) ?? null;
      const matchedHospitals = hospitals.filter((h) =>
        h.specialists.includes(disease.specialistId),
      );
      return {
        disease,
        confidence,
        matchedSymptoms: matched,
        specialist,
        therapy: therapyEntry,
        hospitals: matchedHospitals,
      } satisfies MatchResult;
    })
    .filter((r): r is MatchResult => r !== null && r.confidence >= MIN_THRESHOLD);

  scored.sort((a, b) => b.confidence - a.confidence);
  return scored;
}

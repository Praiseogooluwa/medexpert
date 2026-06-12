/**
 * SYMPTOMS TABLE
 * Acts as the system's knowledge base for all recognizable patient symptoms.
 * Each symptom has a unique ID used to link to the Disease/Rules table.
 *
 * System Architecture Note:
 * This static JSON-like array simulates the "Symptoms" table in a relational database.
 * In a production system, this would be stored in a database and fetched via API.
 */

export type Symptom = {
  id: string;
  name: string;
  category: string;
};

export const DEFAULT_SYMPTOMS: Symptom[] = [
  { id: "s1", name: "Headache", category: "Neurological" },
  { id: "s2", name: "Fever", category: "General" },
  { id: "s3", name: "Chest Pain", category: "Cardiovascular" },
  { id: "s4", name: "Dizziness", category: "Neurological" },
  { id: "s5", name: "Shortness of Breath", category: "Respiratory" },
  { id: "s6", name: "Skin Rash", category: "Dermatological" },
  { id: "s7", name: "Itching", category: "Dermatological" },
  { id: "s8", name: "Fatigue", category: "General" },
  { id: "s9", name: "Nausea", category: "Gastrointestinal" },
  { id: "s10", name: "Blurred Vision", category: "Ophthalmological" },
  { id: "s11", name: "Joint Pain", category: "Musculoskeletal" },
  { id: "s12", name: "Cough", category: "Respiratory" },
  { id: "s13", name: "Abdominal Pain", category: "Gastrointestinal" },
  { id: "s14", name: "Sore Throat", category: "ENT" },
  { id: "s15", name: "Runny Nose", category: "ENT" },
  { id: "s16", name: "High Blood Pressure", category: "Cardiovascular" },
  { id: "s17", name: "Palpitations", category: "Cardiovascular" },
  { id: "s18", name: "Back Pain", category: "Musculoskeletal" },
  { id: "s19", name: "Vomiting", category: "Gastrointestinal" },
  { id: "s20", name: "Swollen Lymph Nodes", category: "General" },
  { id: "s21", name: "Night Sweats", category: "General" },
  { id: "s22", name: "Weight Loss", category: "General" },
  { id: "s23", name: "Difficulty Swallowing", category: "ENT" },
  { id: "s24", name: "Frequent Urination", category: "Urological" },
  { id: "s25", name: "Excessive Thirst", category: "Endocrine" },
  { id: "s26", name: "Numbness or Tingling", category: "Neurological" },
  { id: "s27", name: "Memory Problems", category: "Neurological" },
  { id: "s28", name: "Mood Swings", category: "Mental Health" },
  { id: "s29", name: "Anxiety", category: "Mental Health" },
  { id: "s30", name: "Muscle Weakness", category: "Musculoskeletal" },
];

/**
 * DISEASES / RULES TABLE
 * This is the core knowledge base of the rule-based expert system.
 * Each disease entry defines:
 *  - Which symptoms are associated with it (by symptom IDs)
 *  - Which specialist should be seen
 *  - The urgency level for the condition
 *
 * System Architecture Note:
 * This simulates the "Rules Table" in the expert system. The matching algorithm
 * (in lib/matcher.ts) traverses this table to infer possible conditions from
 * a patient's reported symptoms, similar to an IF-THEN rule engine.
 *
 * Example Rule:
 *   IF patient has [chest pain, shortness of breath, palpitations]
 *   THEN suggest "Coronary Artery Disease" → Cardiologist (HIGH urgency)
 */

export type UrgencyLevel = "low" | "moderate" | "high";

export type Disease = {
  id: string;
  name: string;
  symptoms: string[]; // Symptom IDs from symptoms.ts
  specialistId: string; // Specialist ID from specialists.ts
  urgency: UrgencyLevel;
  description: string;
};

export const DEFAULT_DISEASES: Disease[] = [
  {
    id: "d1",
    name: "Migraine",
    symptoms: ["s1", "s4", "s9", "s10"],
    specialistId: "sp3",
    urgency: "moderate",
    description: "A neurological condition causing intense, debilitating headaches often accompanied by nausea and sensitivity to light.",
  },
  {
    id: "d2",
    name: "Hypertension (High Blood Pressure)",
    symptoms: ["s1", "s3", "s4", "s16", "s17"],
    specialistId: "sp1",
    urgency: "high",
    description: "A chronic condition where the force of blood against artery walls is consistently too high.",
  },
  {
    id: "d3",
    name: "Coronary Artery Disease",
    symptoms: ["s3", "s5", "s8", "s17"],
    specialistId: "sp1",
    urgency: "high",
    description: "Narrowing or blockage of coronary arteries causing reduced blood flow to the heart.",
  },
  {
    id: "d4",
    name: "Eczema / Atopic Dermatitis",
    symptoms: ["s6", "s7", "s8"],
    specialistId: "sp2",
    urgency: "low",
    description: "A chronic skin condition causing inflamed, itchy, and cracked skin.",
  },
  {
    id: "d5",
    name: "Common Cold",
    symptoms: ["s12", "s14", "s15", "s2", "s8"],
    specialistId: "sp4",
    urgency: "low",
    description: "A viral infection of the upper respiratory tract characterized by nasal congestion and sore throat.",
  },
  {
    id: "d6",
    name: "Influenza (Flu)",
    symptoms: ["s2", "s8", "s11", "s12", "s1", "s9"],
    specialistId: "sp6",
    urgency: "moderate",
    description: "A contagious respiratory illness caused by influenza viruses with sudden onset of symptoms.",
  },
  {
    id: "d7",
    name: "Gastritis",
    symptoms: ["s9", "s13", "s19", "s8"],
    specialistId: "sp5",
    urgency: "moderate",
    description: "Inflammation of the stomach lining, often causing pain, nausea, and indigestion.",
  },
  {
    id: "d8",
    name: "Diabetes Mellitus",
    symptoms: ["s24", "s25", "s8", "s10", "s26"],
    specialistId: "sp11",
    urgency: "high",
    description: "A metabolic disease characterized by high blood sugar due to insufficient insulin production or action.",
  },
  {
    id: "d9",
    name: "Asthma",
    symptoms: ["s5", "s12", "s8"],
    specialistId: "sp10",
    urgency: "moderate",
    description: "A chronic respiratory condition with narrowed airways causing breathing difficulty.",
  },
  {
    id: "d10",
    name: "Anxiety Disorder",
    symptoms: ["s29", "s28", "s17", "s4", "s8"],
    specialistId: "sp9",
    urgency: "moderate",
    description: "A group of mental health disorders characterized by excessive fear, worry, and related behavioral disturbances.",
  },
  {
    id: "d11",
    name: "Arthritis",
    symptoms: ["s11", "s18", "s30", "s8"],
    specialistId: "sp7",
    urgency: "low",
    description: "Inflammation of one or more joints causing pain, swelling, and reduced range of motion.",
  },
  {
    id: "d12",
    name: "Typhoid Fever",
    symptoms: ["s2", "s13", "s9", "s8", "s20"],
    specialistId: "sp6",
    urgency: "high",
    description: "A bacterial infection transmitted through contaminated food and water causing high fever and gastrointestinal symptoms.",
  },
  {
    id: "d13",
    name: "Malaria",
    symptoms: ["s2", "s1", "s8", "s9", "s21"],
    specialistId: "sp6",
    urgency: "high",
    description: "A mosquito-borne infectious disease causing fever, chills, and flu-like illness common in tropical regions.",
  },
  {
    id: "d14",
    name: "Tonsillitis",
    symptoms: ["s14", "s2", "s23", "s20"],
    specialistId: "sp4",
    urgency: "moderate",
    description: "Inflammation of the tonsils, usually caused by viral or bacterial infection.",
  },
  {
    id: "d15",
    name: "Glaucoma",
    symptoms: ["s10", "s1", "s4"],
    specialistId: "sp12",
    urgency: "high",
    description: "A group of eye diseases damaging the optic nerve, often associated with high intraocular pressure.",
  },
  {
    id: "d16",
    name: "Pneumonia",
    symptoms: ["s2", "s5", "s12", "s8", "s3"],
    specialistId: "sp10",
    urgency: "high",
    description: "An infection inflaming the air sacs in one or both lungs, which may fill with fluid.",
  },
  {
    id: "d17",
    name: "Peptic Ulcer",
    symptoms: ["s13", "s9", "s19"],
    specialistId: "sp5",
    urgency: "moderate",
    description: "Open sores that develop on the inner lining of the stomach and upper small intestine.",
  },
  {
    id: "d18",
    name: "Depression",
    symptoms: ["s28", "s8", "s22", "s27", "s29"],
    specialistId: "sp9",
    urgency: "moderate",
    description: "A mood disorder causing persistent feelings of sadness and loss of interest.",
  },
  {
    id: "d19",
    name: "Sickle Cell Crisis",
    symptoms: ["s11", "s3", "s8", "s30", "s18"],
    specialistId: "sp1",
    urgency: "high",
    description: "A complication of sickle cell disease causing episodes of severe pain due to blocked blood flow.",
  },
  {
    id: "d20",
    name: "Skin Fungal Infection",
    symptoms: ["s6", "s7"],
    specialistId: "sp2",
    urgency: "low",
    description: "Infections caused by fungi affecting the skin, nails, or hair, common in tropical climates.",
  },
];

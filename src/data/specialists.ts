/**
 * SPECIALISTS TABLE
 * Maps specialist types to their areas of expertise.
 * Linked from the Disease/Rules table via specialistId.
 *
 * System Architecture Note:
 * Simulates the "Specialists" reference table. In production this would be
 * a lookup table queried to populate dropdowns and filter hospital listings.
 */

export type Specialist = {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  shortDescription: string;
  treats: string[];
  color: string; // Tailwind color class for card accent
};

export const DEFAULT_SPECIALISTS: Specialist[] = [
  {
    id: "sp1",
    name: "Cardiologist",
    icon: "HeartPulse",
    shortDescription: "Specialist in heart and blood vessel diseases.",
    treats: ["Hypertension", "Coronary Artery Disease", "Heart Failure", "Arrhythmia", "Angina"],
    color: "bg-red-50 border-red-200 text-red-700",
  },
  {
    id: "sp2",
    name: "Dermatologist",
    icon: "Scan",
    shortDescription: "Expert in skin, hair, and nail conditions.",
    treats: ["Eczema", "Psoriasis", "Acne", "Skin Rash", "Fungal Infections", "Dermatitis"],
    color: "bg-orange-50 border-orange-200 text-orange-700",
  },
  {
    id: "sp3",
    name: "Neurologist",
    icon: "Brain",
    shortDescription: "Specialist in brain, spine, and nervous system disorders.",
    treats: ["Migraine", "Epilepsy", "Stroke", "Parkinson's Disease", "Multiple Sclerosis"],
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    id: "sp4",
    name: "ENT Specialist",
    icon: "Ear",
    shortDescription: "Treats disorders of the ear, nose, and throat.",
    treats: ["Sinusitis", "Tonsillitis", "Hearing Loss", "Common Cold", "Sore Throat"],
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    id: "sp5",
    name: "Gastroenterologist",
    icon: "Activity",
    shortDescription: "Expert in digestive system and related organ diseases.",
    treats: ["Gastritis", "Irritable Bowel Syndrome", "Peptic Ulcer", "GERD", "Liver Disease"],
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
  },
  {
    id: "sp6",
    name: "General Practitioner",
    icon: "Stethoscope",
    shortDescription: "Primary care doctor for general health concerns and referrals.",
    treats: ["Common Cold", "Flu", "Fever", "Fatigue", "General Health Assessment"],
    color: "bg-teal-50 border-teal-200 text-teal-700",
  },
  {
    id: "sp7",
    name: "Orthopedic Surgeon",
    icon: "Bone",
    shortDescription: "Specialist in bones, joints, and musculoskeletal system.",
    treats: ["Fractures", "Arthritis", "Back Pain", "Sports Injuries", "Osteoporosis"],
    color: "bg-slate-50 border-slate-200 text-slate-700",
  },
  {
    id: "sp8",
    name: "Pediatrician",
    icon: "Baby",
    shortDescription: "Medical care for infants, children, and adolescents.",
    treats: ["Childhood Infections", "Developmental Disorders", "Vaccinations", "Asthma in Children"],
    color: "bg-green-50 border-green-200 text-green-700",
  },
  {
    id: "sp9",
    name: "Psychiatrist",
    icon: "Brain",
    shortDescription: "Diagnoses and treats mental, emotional, and behavioral disorders.",
    treats: ["Depression", "Anxiety Disorders", "Bipolar Disorder", "Schizophrenia", "PTSD"],
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
  },
  {
    id: "sp10",
    name: "Pulmonologist",
    icon: "Wind",
    shortDescription: "Expert in lungs and respiratory tract diseases.",
    treats: ["Asthma", "COPD", "Pneumonia", "Tuberculosis", "Sleep Apnea"],
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
  },
  {
    id: "sp11",
    name: "Endocrinologist",
    icon: "FlaskConical",
    shortDescription: "Specialist in hormonal and metabolic disorders.",
    treats: ["Diabetes", "Thyroid Disorders", "Obesity", "PCOS", "Adrenal Disorders"],
    color: "bg-pink-50 border-pink-200 text-pink-700",
  },
  {
    id: "sp12",
    name: "Ophthalmologist",
    icon: "Eye",
    shortDescription: "Specialist in eye and vision disorders.",
    treats: ["Glaucoma", "Cataracts", "Diabetic Retinopathy", "Macular Degeneration", "Blurred Vision"],
    color: "bg-sky-50 border-sky-200 text-sky-700",
  },
];

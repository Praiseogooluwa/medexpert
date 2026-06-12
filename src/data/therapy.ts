/**
 * THERAPY / SELF-CARE GUIDE TABLE
 * Provides basic self-care advice and urgent care warning signs
 * for common conditions identified by the expert system.
 *
 * System Architecture Note:
 * Simulates the "Therapy Advice" table. Linked to the Diseases table
 * via conditionId, providing patient-facing guidance alongside diagnosis results.
 */

export type TherapyEntry = {
  id: string;
  conditionId: string; // Disease ID from diseases.ts
  conditionName: string;
  selfCareAdvice: string[];
  seekUrgentCareIf: string[];
  generalNote: string;
};

export const DEFAULT_THERAPY: TherapyEntry[] = [
  {
    id: "t1",
    conditionId: "d1",
    conditionName: "Migraine",
    selfCareAdvice: [
      "Rest in a quiet, dark room away from bright lights and noise",
      "Apply a cold or warm compress to the forehead or neck",
      "Stay well hydrated — dehydration can trigger and worsen migraines",
      "Take over-the-counter pain relievers (e.g. ibuprofen or paracetamol) at first sign of attack",
      "Avoid known personal triggers such as stress, certain foods, or lack of sleep",
      "Maintain a regular sleep schedule and meal times",
    ],
    seekUrgentCareIf: [
      "The headache is the worst of your life (sudden, thunderclap onset)",
      "Headache is accompanied by fever, stiff neck, or confusion",
      "You experience vision loss, weakness, or difficulty speaking",
      "Headache follows a head injury",
      "Over-the-counter medications provide no relief after 2 days",
    ],
    generalNote: "Migraines are manageable but a neurologist can prescribe preventive and acute medications.",
  },
  {
    id: "t2",
    conditionId: "d2",
    conditionName: "Hypertension",
    selfCareAdvice: [
      "Reduce salt (sodium) intake — aim for less than 5g per day",
      "Eat a heart-healthy diet rich in fruits, vegetables, and whole grains (DASH diet)",
      "Exercise regularly — at least 30 minutes of moderate activity most days",
      "Limit alcohol consumption and quit smoking",
      "Manage stress through relaxation techniques, meditation, or yoga",
      "Monitor your blood pressure at home and keep a log",
      "Take prescribed medications consistently — never stop without consulting your doctor",
    ],
    seekUrgentCareIf: [
      "Blood pressure reading is 180/120 mmHg or higher",
      "You experience chest pain, shortness of breath, or back pain",
      "You have sudden severe headache, vision changes, or difficulty speaking",
      "There is numbness or weakness in the face, arm, or leg",
      "You feel confused or have trouble understanding speech",
    ],
    generalNote: "Hypertension is often called the 'silent killer'. Regular check-ups with a cardiologist are essential.",
  },
  {
    id: "t3",
    conditionId: "d3",
    conditionName: "Coronary Artery Disease",
    selfCareAdvice: [
      "Follow a heart-healthy diet low in saturated fats, cholesterol, and sodium",
      "Engage in regular, doctor-approved physical activity",
      "Maintain a healthy weight to reduce strain on the heart",
      "Quit smoking — it is one of the most impactful changes you can make",
      "Control diabetes and high blood pressure through medication and lifestyle changes",
      "Take all prescribed medications including statins and blood thinners as directed",
    ],
    seekUrgentCareIf: [
      "You experience sudden, severe chest pain lasting more than a few minutes",
      "Pain spreads to the arm, neck, jaw, or back",
      "You are sweating, nauseous, and feel lightheaded with chest discomfort",
      "Shortness of breath occurs at rest or with minimal activity",
      "You have an irregular heartbeat or feel your heart pounding",
    ],
    generalNote: "Seek emergency care immediately if you suspect a heart attack. Call 112 or go to the nearest emergency room.",
  },
  {
    id: "t4",
    conditionId: "d4",
    conditionName: "Eczema / Atopic Dermatitis",
    selfCareAdvice: [
      "Moisturize skin daily, especially after bathing, using fragrance-free creams",
      "Use mild, unscented soaps and detergents",
      "Avoid scratching — keep nails short and wear cotton gloves at night if needed",
      "Wear loose, breathable cotton clothing",
      "Identify and avoid triggers such as certain fabrics, dust mites, or foods",
      "Use lukewarm (not hot) water when bathing",
    ],
    seekUrgentCareIf: [
      "The skin becomes infected (yellow crusting, oozing, increasing redness, or warmth)",
      "Eczema covers a large area of the body",
      "Itching is so severe it disrupts sleep and daily activities",
      "Over-the-counter hydrocortisone cream provides no improvement after 1 week",
    ],
    generalNote: "A dermatologist can prescribe stronger topical steroids or immunomodulators for severe cases.",
  },
  {
    id: "t5",
    conditionId: "d5",
    conditionName: "Common Cold",
    selfCareAdvice: [
      "Rest as much as possible to allow your immune system to fight the virus",
      "Stay hydrated by drinking plenty of water, herbal teas, and clear broths",
      "Use saline nasal drops or spray to relieve nasal congestion",
      "Gargle with warm salt water to soothe a sore throat",
      "Use steam inhalation to help clear nasal passages",
      "Take over-the-counter decongestants or antihistamines as needed",
    ],
    seekUrgentCareIf: [
      "Symptoms persist for more than 10 days without improvement",
      "Fever rises above 39°C (102.2°F)",
      "You develop difficulty breathing or chest pain",
      "Symptoms suddenly worsen after initial improvement",
      "You have a severe headache or stiff neck",
    ],
    generalNote: "The common cold is caused by viruses — antibiotics will not help and should not be taken.",
  },
  {
    id: "t6",
    conditionId: "d7",
    conditionName: "Gastritis",
    selfCareAdvice: [
      "Eat smaller, more frequent meals instead of large ones",
      "Avoid spicy, acidic, or fried foods that irritate the stomach lining",
      "Limit or eliminate alcohol and coffee intake",
      "Quit smoking — nicotine damages the stomach lining",
      "Do not take NSAIDs (like ibuprofen or aspirin) without food or doctor's advice",
      "Take antacids as directed for short-term relief of symptoms",
    ],
    seekUrgentCareIf: [
      "You vomit blood or notice blood in your stool (black, tarry stool)",
      "Pain is severe, constant, and not relieved by antacids",
      "You experience unexplained significant weight loss",
      "Symptoms persist for more than 2 weeks despite treatment",
    ],
    generalNote: "H. pylori bacterial infection is a common cause of gastritis — a gastroenterologist can test and treat it.",
  },
  {
    id: "t7",
    conditionId: "d8",
    conditionName: "Diabetes Mellitus",
    selfCareAdvice: [
      "Monitor blood sugar levels regularly as directed by your doctor",
      "Follow a balanced diet low in refined sugars and carbohydrates",
      "Exercise regularly to help control blood sugar levels",
      "Take insulin or oral medications exactly as prescribed",
      "Inspect feet daily for cuts, blisters, or sores that are slow to heal",
      "Attend all scheduled check-ups including eye, kidney, and foot exams",
    ],
    seekUrgentCareIf: [
      "Blood sugar is dangerously high (above 16.7 mmol/L or 300 mg/dL) or very low",
      "You feel confused, extremely drowsy, or difficult to wake",
      "You experience fruity-smelling breath, nausea, or deep rapid breathing",
      "You have a foot wound or sore that is not healing",
      "You develop sudden vision changes or chest pain",
    ],
    generalNote: "Diabetes is a lifelong condition. An endocrinologist can help you develop an optimal management plan.",
  },
  {
    id: "t8",
    conditionId: "d9",
    conditionName: "Asthma",
    selfCareAdvice: [
      "Always carry your reliever inhaler (usually blue/salbutamol) with you",
      "Identify and avoid personal triggers (dust, pollen, cold air, smoke, pet dander)",
      "Take your preventer inhaler daily as prescribed, even when feeling well",
      "Keep your living space dust-free and well-ventilated",
      "Use an air purifier if possible and avoid areas with heavy pollution",
      "Follow your Asthma Action Plan as directed by your doctor",
    ],
    seekUrgentCareIf: [
      "Your reliever inhaler is not helping or you need it more than every 4 hours",
      "You cannot speak a full sentence without catching your breath",
      "Lips or fingertips are turning bluish (cyanosis)",
      "Your breathing is rapid and laboured",
      "You feel extremely anxious or exhausted from trying to breathe",
    ],
    generalNote: "An asthma attack can be life-threatening. Know your action plan and seek emergency care immediately when needed.",
  },
  {
    id: "t9",
    conditionId: "d12",
    conditionName: "Typhoid Fever",
    selfCareAdvice: [
      "Rest adequately and stay well hydrated with clean, boiled water",
      "Eat small, easily digestible meals such as soft rice, soups, and porridge",
      "Take all prescribed antibiotics for the full duration — do not stop early",
      "Maintain strict personal hygiene — wash hands thoroughly before eating",
      "Isolate used utensils and laundry to prevent spreading to others",
    ],
    seekUrgentCareIf: [
      "Temperature remains above 39°C (102.2°F) for more than 3 days on medication",
      "You develop severe abdominal pain, distension, or rigidity",
      "There is rectal bleeding or black, tarry stools",
      "You become confused, extremely drowsy, or difficult to rouse",
      "Diarrhea is severe and uncontrolled, leading to dehydration",
    ],
    generalNote: "Typhoid is serious but treatable with antibiotics. Always ensure clean water and good hygiene to prevent re-infection.",
  },
  {
    id: "t10",
    conditionId: "d13",
    conditionName: "Malaria",
    selfCareAdvice: [
      "Take all prescribed antimalarial medications as directed (full course)",
      "Rest and drink plenty of fluids to stay hydrated",
      "Use paracetamol (not aspirin) to manage fever and pain",
      "Sleep under insecticide-treated mosquito nets every night",
      "Use mosquito repellent sprays or coils in your living area",
      "Wear long-sleeved clothing at dusk and dawn when mosquitoes are most active",
    ],
    seekUrgentCareIf: [
      "Fever is very high (above 40°C) and not responding to paracetamol",
      "You experience seizures, extreme confusion, or loss of consciousness",
      "There is difficulty breathing or rapid breathing",
      "You develop yellow eyes or skin (jaundice)",
      "You cannot keep oral medications down due to persistent vomiting",
    ],
    generalNote: "Malaria is a medical emergency in some cases. Seek care promptly — do not attempt to self-treat with unconfirmed medications.",
  },
  {
    id: "t11",
    conditionId: "d10",
    conditionName: "Anxiety Disorder",
    selfCareAdvice: [
      "Practice deep breathing exercises or progressive muscle relaxation",
      "Engage in regular physical activity — even a 30-minute walk can reduce anxiety",
      "Limit caffeine and alcohol which can worsen anxiety symptoms",
      "Maintain a consistent daily routine including regular sleep hours",
      "Talk to a trusted friend, family member, or counsellor about your worries",
      "Practice mindfulness meditation to help stay grounded in the present",
    ],
    seekUrgentCareIf: [
      "You experience thoughts of harming yourself or others",
      "Anxiety is so severe you cannot carry out daily activities or work",
      "You are having panic attacks lasting more than 10 minutes",
      "You develop physical symptoms like chest pain or difficulty breathing",
      "Anxiety has persisted for more than 6 months without improvement",
    ],
    generalNote: "Mental health conditions are treatable. A psychiatrist or psychologist can provide therapy and, if needed, medication.",
  },
];

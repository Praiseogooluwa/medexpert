/**
 * HOSPITALS TABLE
 * Contains information about hospitals and clinics across Nigeria.
 * Each hospital lists the specialist types available there.
 * Filtered at runtime by the matching engine to show relevant hospitals.
 *
 * System Architecture Note:
 * Simulates the "Hospitals" table with a many-to-many relationship
 * to the Specialists table via the specialists array (storing specialist IDs).
 */

export type Hospital = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email?: string;
  specialists: string[]; // Specialist IDs from specialists.ts
  type: "Government" | "Private" | "Teaching";
};

export const DEFAULT_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Lagos University Teaching Hospital (LUTH)",
    address: "Idi-Araba, Surulere",
    city: "Lagos",
    state: "Lagos",
    phone: "0802-345-6789",
    email: "info@luth.gov.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp7", "sp8", "sp9", "sp10", "sp11", "sp12"],
    type: "Teaching",
  },
  {
    id: "h2",
    name: "Reddington Hospital",
    address: "12 Isaac John Street, Ikeja GRA",
    city: "Lagos",
    state: "Lagos",
    phone: "0700-733-3464",
    email: "info@reddington.com.ng",
    specialists: ["sp1", "sp2", "sp3", "sp5", "sp6", "sp7", "sp10", "sp12"],
    type: "Private",
  },
  {
    id: "h3",
    name: "St. Nicholas Hospital",
    address: "57 Campbell Street, Lagos Island",
    city: "Lagos",
    state: "Lagos",
    phone: "0816-000-2600",
    email: "admin@stnicholas.com.ng",
    specialists: ["sp1", "sp3", "sp4", "sp5", "sp6", "sp8", "sp9", "sp11"],
    type: "Private",
  },
  {
    id: "h4",
    name: "National Hospital Abuja",
    address: "Central Business District",
    city: "Abuja",
    state: "FCT",
    phone: "09-523-7561",
    email: "info@nationalhospital.gov.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp7", "sp8", "sp9", "sp10", "sp11", "sp12"],
    type: "Government",
  },
  {
    id: "h5",
    name: "Garki Hospital",
    address: "Area 8, Garki",
    city: "Abuja",
    state: "FCT",
    phone: "08033-147-982",
    email: "contact@garki-hospital.gov.ng",
    specialists: ["sp1", "sp3", "sp5", "sp6", "sp8", "sp10"],
    type: "Government",
  },
  {
    id: "h6",
    name: "Cedarcrest Hospitals",
    address: "1 Dalaba Street, Wuse Zone 4",
    city: "Abuja",
    state: "FCT",
    phone: "0800-2323-2732",
    email: "info@cedarcrest.com.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp7", "sp11", "sp12"],
    type: "Private",
  },
  {
    id: "h7",
    name: "University of Port Harcourt Teaching Hospital (UPTH)",
    address: "East-West Road, Choba",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "08037-056-624",
    email: "info@upth.gov.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp7", "sp8", "sp9", "sp10", "sp11"],
    type: "Teaching",
  },
  {
    id: "h8",
    name: "Braithwaite Memorial Specialist Hospital",
    address: "1 Dobinson Street",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "08023-452-891",
    email: "bmsh@rivers.gov.ng",
    specialists: ["sp1", "sp3", "sp4", "sp5", "sp6", "sp7", "sp10"],
    type: "Government",
  },
  {
    id: "h9",
    name: "University College Hospital (UCH)",
    address: "Queen Elizabeth Road",
    city: "Ibadan",
    state: "Oyo",
    phone: "02-241-1620",
    email: "info@uch-ibadan.gov.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp7", "sp8", "sp9", "sp10", "sp11", "sp12"],
    type: "Teaching",
  },
  {
    id: "h10",
    name: "Adeoyo State Hospital",
    address: "Ring Road",
    city: "Ibadan",
    state: "Oyo",
    phone: "0811-456-7890",
    email: "adeoyo@oyo.gov.ng",
    specialists: ["sp1", "sp4", "sp5", "sp6", "sp8", "sp10"],
    type: "Government",
  },
  {
    id: "h11",
    name: "Aminu Kano Teaching Hospital",
    address: "Zaria Road",
    city: "Kano",
    state: "Kano",
    phone: "064-660-100",
    email: "info@akth.gov.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp7", "sp8", "sp9", "sp10", "sp11"],
    type: "Teaching",
  },
  {
    id: "h12",
    name: "Murtala Mohammed Specialist Hospital",
    address: "Hospital Road, Nassarawa",
    city: "Kano",
    state: "Kano",
    phone: "0805-678-1234",
    email: "mmsh@kano.gov.ng",
    specialists: ["sp1", "sp3", "sp5", "sp6", "sp7", "sp10", "sp12"],
    type: "Government",
  },
  {
    id: "h13",
    name: "Evercare Hospital Lagos",
    address: "1 Admiralty Way, Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    phone: "0700-933-7227",
    email: "info@evercare.ng",
    specialists: ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6", "sp8", "sp9", "sp11", "sp12"],
    type: "Private",
  },
  {
    id: "h14",
    name: "Eko Hospital",
    address: "31 Mobolaji Bank Anthony Way, Ikeja",
    city: "Lagos",
    state: "Lagos",
    phone: "0701-234-5678",
    email: "info@ekohospitals.com",
    specialists: ["sp1", "sp3", "sp4", "sp5", "sp6", "sp7", "sp10"],
    type: "Private",
  },
  {
    id: "h15",
    name: "Nisa Premier Hospital",
    address: "Plot 722, Ralph Sodeinde Street",
    city: "Abuja",
    state: "FCT",
    phone: "0803-789-4561",
    email: "info@nisa.com.ng",
    specialists: ["sp1", "sp2", "sp4", "sp5", "sp6", "sp8", "sp9", "sp11"],
    type: "Private",
  },
];

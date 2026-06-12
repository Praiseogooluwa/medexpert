import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  User,
  Hospital as HospitalIcon,
  CheckCircle,
  ArrowLeft,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getHospitals, getSpecialists } from "@/data/store";
import { sendEmail } from "@/lib/emailjs";
import { useNavigate, useLocation } from "@/lib/router-shim";

export const Route = createFileRoute("/book-appointment")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — MedExpert" },
      { name: "description", content: "Request an appointment at Nigerian hospitals through MedExpert." },
    ],
  }),
  component: BookAppointmentPage,
});

const APPOINTMENT_STORAGE_KEY = "appointmentRequests";

export type AppointmentRequest = {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  hospitalId: string;
  hospitalName: string;
  specialistId: string;
  specialistName: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  createdAt: string;
};

export function getAppointments(): AppointmentRequest[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENT_STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveAppointment(req: AppointmentRequest) {
  if (typeof window === "undefined") return;
  const existing = getAppointments();
  existing.push(req);
  localStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(existing));
}

export function deleteAppointment(id: string) {
  if (typeof window === "undefined") return;
  const existing = getAppointments().filter((a) => a.id !== id);
  localStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(existing));
}

const TIME_SLOTS = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
];

function BookAppointmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hospitals = useMemo(() => getHospitals(), []);
  const specialists = useMemo(() => getSpecialists(), []);

  const prefilled = (location.state as { hospitalId?: string; specialistId?: string } | null) ?? null;

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hospitalId, setHospitalId] = useState(prefilled?.hospitalId ?? "");
  const [specialistId, setSpecialistId] = useState(prefilled?.specialistId ?? "");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const availableSpecialists = useMemo(() => {
    if (!hospitalId) return specialists;
    const h = hospitals.find((x) => x.id === hospitalId);
    if (!h) return specialists;
    return specialists.filter((sp) => h.specialists.includes(sp.id));
  }, [hospitalId, hospitals, specialists]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim() || !hospitalId || !specialistId || !preferredDate || !preferredTime) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const hospital = hospitals.find((h) => h.id === hospitalId);
    const specialist = specialists.find((sp) => sp.id === specialistId);

    const req: AppointmentRequest = {
      id: `appt_${Date.now()}`,
      patientName: patientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      hospitalId,
      hospitalName: hospital?.name ?? hospitalId,
      specialistId,
      specialistName: specialist?.name ?? specialistId,
      preferredDate,
      preferredTime,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    saveAppointment(req);

    try {
      await sendEmail({
        form_type: "New Appointment Request",
        name: req.patientName,
        email: req.email || "-",
        phone: req.phone,
        hospital: req.hospitalName,
        specialist: req.specialistName,
        date: req.preferredDate,
        time: req.preferredTime,
        message: req.notes || "-",
      });
    } catch (err) {
      // Appointment is still saved locally; the hospital will be notified once email delivery is restored.
      console.warn("EmailJS failed", err);
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background py-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Appointment Requested</h2>
          <p className="text-muted-foreground mb-6">
            Your request has been sent. The hospital will contact you shortly to confirm your booking.
          </p>
          <div className="bg-secondary rounded-xl p-4 text-sm text-left space-y-1 mb-6">
            <div><span className="font-medium">Hospital:</span> {hospitals.find((h) => h.id === hospitalId)?.name}</div>
            <div><span className="font-medium">Specialist:</span> {specialists.find((sp) => sp.id === specialistId)?.name}</div>
            <div><span className="font-medium">Date:</span> {preferredDate}</div>
            <div><span className="font-medium">Time:</span> {preferredTime}</div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 cursor-pointer" onClick={() => navigate("/hospitals")}>
              <HospitalIcon className="w-4 h-4 mr-1" /> Hospitals
            </Button>
            <Button
              className="flex-1 cursor-pointer bg-purple-600 hover:bg-purple-500 text-white"
              onClick={() => {
                setSubmitted(false);
                setPatientName(""); setPhone(""); setEmail("");
                setHospitalId(""); setSpecialistId("");
                setPreferredDate(""); setPreferredTime(""); setNotes("");
              }}
            >
              New Booking
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Book an Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Fill in your details and we will send your request to the hospital. They will contact you to confirm.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <section>
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-primary" /> Your Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Full Name <span className="text-destructive">*</span></label>
                <Input placeholder="e.g. Chioma Okonkwo" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Phone Number <span className="text-destructive">*</span></label>
                  <Input placeholder="+234 801 234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Email <span className="text-muted-foreground text-xs">(optional)</span></label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-border pt-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <HospitalIcon className="w-4 h-4 text-primary" /> Hospital &amp; Specialist
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Hospital <span className="text-destructive">*</span></label>
                <Select value={hospitalId} onValueChange={(v) => { setHospitalId(v); setSpecialistId(""); }}>
                  <SelectTrigger><SelectValue placeholder="Choose a hospital" /></SelectTrigger>
                  <SelectContent>
                    {hospitals.map((h) => (
                      <SelectItem key={h.id} value={h.id}>{h.name} — {h.city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Specialist <span className="text-destructive">*</span></label>
                <Select value={specialistId} onValueChange={setSpecialistId}>
                  <SelectTrigger><SelectValue placeholder="Choose a specialist" /></SelectTrigger>
                  <SelectContent>
                    {availableSpecialists.map((sp) => (
                      <SelectItem key={sp.id} value={sp.id}>{sp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="border-t border-border pt-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-primary" /> Preferred Date &amp; Time
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Date <span className="text-destructive">*</span></label>
                <Input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Time <span className="text-destructive">*</span></label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger><SelectValue placeholder="Choose a time slot" /></SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="border-t border-border pt-5">
            <label className="text-sm font-medium text-foreground block mb-1.5">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Anything the doctor should know in advance?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </section>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 text-white"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Send Booking Request</>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}

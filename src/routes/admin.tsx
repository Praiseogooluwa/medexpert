import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Lock, LogOut, RotateCcw, Plus, Trash2, Edit2, Save, X, Info, Eye, EyeOff,
  Database, CalendarCheck, Phone, Mail, Hospital as HospitalIcon, Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getSymptoms, saveSymptoms, getSpecialists, getDiseases, saveDiseases,
  getHospitals, saveHospitals, resetAllData,
} from "@/data/store";
import { getAppointments, deleteAppointment } from "./book-appointment";
import type { Symptom } from "@/data/symptoms";
import type { Hospital as HospitalType } from "@/data/hospitals";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — MedExpert" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const ADMIN_PASSWORD = "myrie123";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) onLogin();
    else setError("Incorrect password");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
            <Lock className="w-7 h-7 text-purple-700" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-foreground text-center mb-1">Admin Panel</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Enter the admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPwd ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 text-white">
            Sign In
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function SymptomsTab() {
  const [symptoms, setSymptoms] = useState<Symptom[]>(() => getSymptoms());
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");

  function save(u: Symptom[]) { setSymptoms(u); saveSymptoms(u); toast.success("Symptoms updated"); }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Input placeholder="Symptom name" value={newName} onChange={(e) => setNewName(e.target.value)} className="flex-1 min-w-40" />
        <Input placeholder="Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-1 min-w-32" />
        <Button
          onClick={() => {
            if (!newName.trim()) return;
            save([...symptoms, { id: `s${Date.now()}`, name: newName.trim(), category: newCategory.trim() || "General" }]);
            setNewName(""); setNewCategory("");
          }}
          className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
        {symptoms.map((s) => (
          <div key={s.id} className="flex items-center gap-3 px-4 py-3 bg-card">
            {editId === s.id ? (
              <>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 h-8 text-sm" />
                <Input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-32 h-8 text-sm" />
                <button onClick={() => { if (!editName.trim()) return; save(symptoms.map((x) => x.id === editId ? { ...x, name: editName.trim(), category: editCategory.trim() } : x)); setEditId(null); }} className="text-green-600 cursor-pointer"><Save className="w-4 h-4" /></button>
                <button onClick={() => setEditId(null)} className="text-muted-foreground cursor-pointer"><X className="w-4 h-4" /></button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm font-medium text-foreground">{s.name}</span>
                <Badge variant="secondary" className="text-xs">{s.category}</Badge>
                <button onClick={() => { setEditId(s.id); setEditName(s.name); setEditCategory(s.category); }} className="text-muted-foreground hover:text-foreground cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => save(symptoms.filter((x) => x.id !== s.id))} className="text-muted-foreground hover:text-destructive cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiseasesTab() {
  const [diseases, setDiseases] = useState(() => getDiseases());
  const specialists = useMemo(() => getSpecialists(), []);
  function remove(id: string) {
    const u = diseases.filter((d) => d.id !== id);
    setDiseases(u); saveDiseases(u); toast.success("Disease removed");
  }
  return (
    <div className="space-y-3">
      {diseases.map((d) => {
        const sp = specialists.find((s) => s.id === d.specialistId);
        return (
          <div key={d.id} className="border border-border rounded-xl p-4 bg-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="font-semibold text-sm text-foreground">{d.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Specialist: <span className="text-primary">{sp?.name ?? d.specialistId}</span>
                  {" · "}Urgency:{" "}
                  <span className={d.urgency === "high" ? "text-red-600" : d.urgency === "moderate" ? "text-amber-600" : "text-green-600"}>
                    {d.urgency}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{d.description}</div>
              </div>
              <button onClick={() => remove(d.id)} className="text-muted-foreground hover:text-destructive cursor-pointer flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HospitalsAdminTab() {
  const [hospitals, setHospitals] = useState<HospitalType[]>(() => getHospitals());
  const [n, setN] = useState({ name: "", address: "", city: "", state: "", phone: "" });

  function add() {
    if (!n.name.trim()) return;
    const entry: HospitalType = {
      id: `h${Date.now()}`,
      name: n.name.trim(), address: n.address.trim(), city: n.city.trim(),
      state: n.state.trim(), phone: n.phone.trim(),
      specialists: [], type: "Private",
    };
    const u = [...hospitals, entry];
    setHospitals(u); saveHospitals(u); toast.success("Hospital added");
    setN({ name: "", address: "", city: "", state: "", phone: "" });
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <Input placeholder="Hospital name *" value={n.name} onChange={(e) => setN({ ...n, name: e.target.value })} />
        <Input placeholder="Address" value={n.address} onChange={(e) => setN({ ...n, address: e.target.value })} />
        <Input placeholder="City" value={n.city} onChange={(e) => setN({ ...n, city: e.target.value })} />
        <Input placeholder="State" value={n.state} onChange={(e) => setN({ ...n, state: e.target.value })} />
        <Input placeholder="Phone" value={n.phone} onChange={(e) => setN({ ...n, phone: e.target.value })} />
        <Button onClick={add} className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white">
          <Plus className="w-4 h-4 mr-1" /> Add Hospital
        </Button>
      </div>
      <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
        {hospitals.map((h) => (
          <div key={h.id} className="flex items-center gap-3 px-4 py-3 bg-card">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">{h.name}</div>
              <div className="text-xs text-muted-foreground">{h.city}, {h.state}</div>
            </div>
            <Badge variant="secondary" className="text-[10px] flex-shrink-0">{h.type}</Badge>
            <button
              onClick={() => {
                const u = hospitals.filter((x) => x.id !== h.id);
                setHospitals(u); saveHospitals(u); toast.success("Hospital removed");
              }}
              className="text-muted-foreground hover:text-destructive cursor-pointer flex-shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentsTab() {
  const [items, setItems] = useState(() => getAppointments());
  function remove(id: string) { deleteAppointment(id); setItems(getAppointments()); toast.success("Removed"); }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <CalendarCheck className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p>No appointment requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div key={a.id} className="border border-border rounded-xl p-4 bg-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1.5">
              <div className="font-semibold text-foreground">{a.patientName}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{a.phone}</span>
                {a.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{a.email}</span>}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><HospitalIcon className="w-3 h-3" />{a.hospitalName}</span>
                <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" />{a.specialistName}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <Badge variant="secondary">{a.preferredDate}</Badge>
                <Badge variant="secondary">{a.preferredTime}</Badge>
              </div>
              {a.notes && <div className="text-xs text-muted-foreground italic">Notes: {a.notes}</div>}
              <div className="text-[10px] text-muted-foreground/60">Submitted: {new Date(a.createdAt).toLocaleString()}</div>
            </div>
            <button onClick={() => remove(a.id)} className="text-muted-foreground hover:text-destructive cursor-pointer flex-shrink-0 mt-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const TABS = ["Symptoms", "Diseases", "Hospitals", "Appointments"] as const;
type Tab = typeof TABS[number];

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Symptoms");

  function handleReset() {
    if (window.confirm("Reset ALL data to defaults? This cannot be undone.")) {
      resetAllData();
      toast.success("All data has been reset to defaults.");
      setTimeout(() => window.location.reload(), 500);
    }
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage system data. Changes persist in your browser.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleReset} className="cursor-pointer text-sm">
              <RotateCcw className="w-4 h-4 mr-1" /> Reset to Defaults
            </Button>
            <Button variant="secondary" onClick={() => setAuthed(false)} className="cursor-pointer text-sm">
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-purple-50 border border-purple-100 rounded-xl p-3 mb-6">
          <Info className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <strong>Demo admin panel</strong>, changes are saved locally in your browser only.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-border mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab === "Appointments" ? <CalendarCheck className="w-3.5 h-3.5" /> : <Database className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === "Symptoms" && <SymptomsTab />}
          {activeTab === "Diseases" && <DiseasesTab />}
          {activeTab === "Hospitals" && <HospitalsAdminTab />}
          {activeTab === "Appointments" && <AppointmentsTab />}
        </motion.div>
      </div>
    </div>
  );
}

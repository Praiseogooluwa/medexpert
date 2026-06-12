import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Phone, Mail, CalendarPlus, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getHospitals, getSpecialists } from "@/data/store";
import { useNavigate } from "@/lib/router-shim";

export const Route = createFileRoute("/hospitals")({
  head: () => ({
    meta: [
      { title: "Hospitals — MedExpert" },
      { name: "description", content: "Find hospitals across Lagos, Abuja, Port Harcourt, Ibadan, and Kano with the medical specialist you need." },
    ],
  }),
  component: HospitalsPage,
});

function HospitalsPage() {
  const hospitals = useMemo(() => getHospitals(), []);
  const specialists = useMemo(() => getSpecialists(), []);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [specialistFilter, setSpecialistFilter] = useState("all");

  const states = useMemo(
    () => Array.from(new Set(hospitals.map((h) => h.state))).sort(),
    [hospitals],
  );

  const filtered = useMemo(() => {
    return hospitals.filter((h) => {
      if (state !== "all" && h.state !== state) return false;
      if (specialistFilter !== "all" && !h.specialists.includes(specialistFilter)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !h.name.toLowerCase().includes(q) &&
          !h.address.toLowerCase().includes(q) &&
          !h.city.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [hospitals, query, state, specialistFilter]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-2">
            Find a hospital
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Hospitals across Nigeria</h1>
          <p className="text-muted-foreground mt-2">
            Search and filter Nigerian hospitals by city, state, or available specialist.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, address, city..."
              className="pl-9 h-11"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="h-11"><SelectValue placeholder="All states" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All states</SelectItem>
              {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={specialistFilter} onValueChange={setSpecialistFilter}>
            <SelectTrigger className="h-11"><SelectValue placeholder="All specialists" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All specialists</SelectItem>
              {specialists.map((sp) => <SelectItem key={sp.id} value={sp.id}>{sp.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing <strong className="text-foreground">{filtered.length}</strong> hospital{filtered.length !== 1 ? "s" : ""}.
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground leading-snug">{h.name}</h3>
                  <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                    {h.type}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <span>{h.address}, {h.city}, {h.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <a href={`tel:${h.phone}`} className="hover:text-foreground">{h.phone}</a>
                </div>
                {h.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <a href={`mailto:${h.email}`} className="hover:text-foreground break-all">{h.email}</a>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                  Specialists ({h.specialists.length})
                </div>
                <div className="flex flex-wrap gap-1">
                  {h.specialists.slice(0, 5).map((id) => {
                    const sp = specialists.find((x) => x.id === id);
                    return sp ? (
                      <span key={id} className="text-[11px] bg-secondary px-2 py-0.5 rounded-md text-foreground/75">
                        {sp.name}
                      </span>
                    ) : null;
                  })}
                  {h.specialists.length > 5 && (
                    <span className="text-[11px] text-muted-foreground px-1.5">+{h.specialists.length - 5}</span>
                  )}
                </div>
              </div>

              <Button
                onClick={() => navigate("/book-appointment", { state: { hospitalId: h.id } })}
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 text-white"
              >
                <CalendarPlus className="w-4 h-4 mr-1.5" /> Book Appointment
              </Button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-2xl">
            No hospitals match your filters. Try widening your search.
          </div>
        )}
      </div>
    </div>
  );
}

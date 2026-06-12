import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  HeartPulse, Brain, Ear, Activity, Bone, Baby, Wind, FlaskConical, Eye, Scan, Stethoscope, Search,
  ArrowRight, type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { getSpecialists, getHospitals } from "@/data/store";
import { Link } from "@/lib/router-shim";

export const Route = createFileRoute("/specialists")({
  head: () => ({
    meta: [
      { title: "Medical Specialists — MedExpert" },
      { name: "description", content: "Browse 12+ medical specialists, the conditions they treat, and Nigerian hospitals offering each specialty." },
    ],
  }),
  component: SpecialistsPage,
});

const ICONS: Record<string, LucideIcon> = {
  HeartPulse, Brain, Ear, Activity, Bone, Baby, Wind, FlaskConical, Eye, Scan, Stethoscope,
};

function SpecialistsPage() {
  const specialists = useMemo(() => getSpecialists(), []);
  const hospitals = useMemo(() => getHospitals(), []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return specialists;
    const q = query.toLowerCase();
    return specialists.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.treats.some((t) => t.toLowerCase().includes(q)),
    );
  }, [specialists, query]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-2">
            Browse by specialty
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Medical Specialists</h1>
          <p className="text-muted-foreground mt-2">
            Each specialist treats a focused set of conditions. Pick one to see Nigerian hospitals that have them.
          </p>
        </div>

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search specialists or conditions..."
            className="pl-9 h-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((sp, i) => {
            const Icon = ICONS[sp.icon] ?? Stethoscope;
            const hospitalCount = hospitals.filter((h) => h.specialists.includes(sp.id)).length;
            return (
              <motion.div
                key={sp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${sp.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">{sp.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{sp.shortDescription}</p>

                <div className="mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Treats
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sp.treats.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs bg-secondary text-foreground/80 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                    {sp.treats.length > 4 && (
                      <span className="text-xs text-muted-foreground px-2 py-0.5">
                        +{sp.treats.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">
                    {hospitalCount} hospital{hospitalCount !== 1 ? "s" : ""}
                  </span>
                  <Link
                    to="/hospitals"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:text-purple-900"
                  >
                    View hospitals
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No specialists match your search.
          </div>
        )}
      </div>
    </div>
  );
}

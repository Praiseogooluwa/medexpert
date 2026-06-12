import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, CheckCircle, AlertTriangle, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getTherapy } from "@/data/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/therapy-guide")({
  head: () => ({
    meta: [
      { title: "Therapy Guide — MedExpert" },
      { name: "description", content: "Self-care steps and urgent care warning signs for common medical conditions." },
    ],
  }),
  component: TherapyGuidePage,
});

function TherapyGuidePage() {
  const entries = useMemo(() => getTherapy(), []);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(entries[0]?.id ?? null);

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter((e) => e.conditionName.toLowerCase().includes(q));
  }, [entries, query]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-2">
            Self-care advice
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Therapy Guide</h1>
          <p className="text-muted-foreground mt-2">
            Practical self-care tips for common conditions, with clear signs of when to seek urgent care.
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by condition..."
            className="pl-9 h-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filtered.map((e, i) => {
            const open = openId === e.id;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className={cn(
                  "bg-card border rounded-2xl overflow-hidden transition-all",
                  open ? "border-purple-200 shadow-md" : "border-border",
                )}
              >
                <button
                  onClick={() => setOpenId(open ? null : e.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-secondary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-foreground">{e.conditionName}</span>
                  </div>
                  {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 grid md:grid-cols-2 gap-6 border-t border-border pt-5">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Self-Care Steps
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {e.selfCareAdvice.map((tip, k) => (
                            <li key={k} className="flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          Seek Urgent Care If
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {e.seekUrgentCareIf.map((tip, k) => (
                            <li key={k} className="flex items-start gap-2">
                              <span className="text-red-600 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {e.generalNote && (
                      <div className="px-5 pb-5 text-xs text-muted-foreground italic">
                        {e.generalNote}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No conditions match your search.</div>
        )}
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  CheckSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ArrowRight,
  CalendarPlus,
  HeartPulse,
  Stethoscope,
  Phone,
  MapPin,
  Activity,
  Info,
  CheckCircle,
  XCircle,
  Shield,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getSymptoms,
  getDiseases,
  getSpecialists,
  getHospitals,
  getTherapy,
} from "@/data/store";
import { analyzeSymptoms, type MatchResult } from "@/lib/matcher";
import type { UrgencyLevel } from "@/data/diseases";
import { useNavigate } from "@/lib/router-shim";

export const Route = createFileRoute("/symptom-checker")({
  head: () => ({
    meta: [
      { title: "Symptom Checker — MedExpert" },
      { name: "description", content: "Select your symptoms and get possible conditions, specialist suggestions, and Nigerian hospitals." },
    ],
  }),
  component: SymptomCheckerPage,
});

function urgencyConfig(level: UrgencyLevel) {
  const configs = {
    low: { label: "Low Urgency", class: "bg-green-100 text-green-800 border-green-300", dot: "bg-green-500", icon: CheckCircle },
    moderate: { label: "Moderate Urgency", class: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500", icon: Info },
    high: { label: "High Urgency", class: "bg-red-100 text-red-800 border-red-300", dot: "bg-red-500", icon: AlertTriangle },
  } as const;
  return configs[level];
}

function ResultsView({ results, onReset }: { results: MatchResult[]; onReset: () => void }) {
  const navigate = useNavigate();
  const [expandedTherapy, setExpandedTherapy] = useState<string | null>(null);
  const [showAllHospitals, setShowAllHospitals] = useState<string | null>(null);
  const symptoms = useMemo(() => getSymptoms(), []);

  if (results.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border rounded-2xl">
        <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Matching Conditions Found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          The selected symptoms do not match any conditions in our knowledge base. Try selecting different
          or additional symptoms, or consult a General Practitioner.
        </p>
        <Button onClick={onReset} variant="secondary" className="cursor-pointer">
          <RotateCcw className="w-4 h-4 mr-2" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Found {results.length} possible condition{results.length !== 1 ? "s" : ""}, sorted by match confidence.
          </p>
        </div>
        <Button variant="secondary" onClick={onReset} className="cursor-pointer self-start sm:self-auto">
          <RotateCcw className="w-4 h-4 mr-2" /> New Analysis
        </Button>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900">
          <strong>Important:</strong> These results are for informational guidance only and do not constitute
          a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation and treatment.
          This is a final year project for educational purposes.
        </p>
      </div>

      {results.map((result, idx) => {
        const urg = urgencyConfig(result.disease.urgency);
        const UrgIcon = urg.icon;
        const isTop = idx === 0;
        const therapyOpen = expandedTherapy === result.disease.id;
        const hospitalLimit = showAllHospitals === result.disease.id ? result.hospitals.length : 3;

        return (
          <motion.div
            key={result.disease.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Card className={cn("overflow-hidden", isTop && "border-primary shadow-lg shadow-purple-900/5 ring-1 ring-primary/20")}>
              {isTop && (
                <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5" /> Best Match
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl">{result.disease.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{result.disease.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                    <div className="bg-primary/10 text-primary rounded-lg px-3 py-1 text-sm font-bold">
                      {result.confidence}% match
                    </div>
                    <div className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold border", urg.class)}>
                      <span className={cn("w-2 h-2 rounded-full", urg.dot)} />
                      <UrgIcon className="w-3 h-3" />
                      {urg.label}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {result.matchedSymptoms.map((sid) => {
                    const sym = symptoms.find((s) => s.id === sid);
                    return (
                      <span key={sid} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                        {sym?.name ?? sid}
                      </span>
                    );
                  })}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.specialist && (
                  <div className="flex items-start gap-3 bg-secondary rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Recommended Specialist
                      </div>
                      <div className="font-semibold text-foreground">{result.specialist.name}</div>
                      <div className="text-sm text-muted-foreground">{result.specialist.shortDescription}</div>
                    </div>
                  </div>
                )}

                {result.therapy && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedTherapy(therapyOpen ? null : result.disease.id)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2 font-medium text-sm">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Self-Care &amp; Therapy Advice
                      </div>
                      {therapyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {therapyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 py-4 grid sm:grid-cols-2 gap-6">
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Self-Care Steps
                              </div>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {result.therapy.selfCareAdvice.map((tip, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                Seek Urgent Care If
                              </div>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {result.therapy.seekUrgentCareIf.map((tip, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-red-600 mt-1">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {result.therapy.generalNote && (
                            <div className="px-4 pb-4 text-xs text-muted-foreground italic border-t border-border pt-3">
                              {result.therapy.generalNote}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {result.hospitals.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
                      Hospitals with this specialist
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {result.hospitals.slice(0, hospitalLimit).map((h) => (
                        <div key={h.id} className="border border-border rounded-xl p-3 bg-card hover:border-primary/30 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-sm text-foreground">{h.name}</div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-purple-700">
                              {h.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {h.address}, {h.city}, {h.state}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <Phone className="w-3 h-3 flex-shrink-0" />
                            {h.phone}
                          </div>
                          <button
                            onClick={() =>
                              navigate("/book-appointment", {
                                state: { hospitalId: h.id, specialistId: result.disease.specialistId },
                              })
                            }
                            className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:underline cursor-pointer"
                          >
                            <CalendarPlus className="w-3 h-3" /> Book Appointment
                          </button>
                        </div>
                      ))}
                    </div>
                    {result.hospitals.length > 3 && (
                      <button
                        onClick={() =>
                          setShowAllHospitals(showAllHospitals === result.disease.id ? null : result.disease.id)
                        }
                        className="mt-3 text-sm text-primary hover:underline cursor-pointer flex items-center gap-1"
                      >
                        {showAllHospitals === result.disease.id ? (
                          <>Show less <ChevronUp className="w-3 h-3" /></>
                        ) : (
                          <>Show all {result.hospitals.length} hospitals <ChevronDown className="w-3 h-3" /></>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      <div className="flex items-start gap-3 bg-secondary rounded-xl p-4 border border-border">
        <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">This system provides guidance only</strong> and does not replace
          professional medical diagnosis. Always consult a licensed healthcare provider before making any health decisions.
          Final year project, for educational purposes.
        </p>
      </div>
    </div>
  );
}

type PageState = "checker" | "loading" | "results";

function SymptomCheckerPage() {
  const [page, setPage] = useState<PageState>("checker");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [freeText, setFreeText] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [results, setResults] = useState<MatchResult[]>([]);
  const [error, setError] = useState("");

  const symptoms = useMemo(() => getSymptoms(), []);
  const filteredSymptoms = useMemo(() => {
    if (!filterQuery.trim()) return symptoms;
    const q = filterQuery.toLowerCase();
    return symptoms.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }, [symptoms, filterQuery]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filteredSymptoms>();
    filteredSymptoms.forEach((s) => {
      const arr = map.get(s.category) ?? [];
      arr.push(s);
      map.set(s.category, arr);
    });
    return map;
  }, [filteredSymptoms]);

  function toggleSymptom(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setError("");
  }

  function handleAnalyze() {
    if (selectedIds.size === 0 && !freeText.trim()) {
      setError("Please select at least one symptom before analyzing.");
      return;
    }
    setPage("loading");
    setTimeout(() => {
      const ids = Array.from(selectedIds);
      const all = analyzeSymptoms(ids, getDiseases(), getSpecialists(), getHospitals(), getTherapy());
      setResults(all);
      setPage("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  }

  function handleReset() {
    setSelectedIds(new Set());
    setFreeText("");
    setFilterQuery("");
    setResults([]);
    setError("");
    setPage("checker");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-2">
            Step 1 of 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            {page === "results" ? "Your Analysis Results" : "Symptom Checker"}
          </h1>
          <p className="text-muted-foreground mt-1.5">
            {page === "results"
              ? "Review your possible conditions, recommended specialists, and nearby hospitals."
              : "Select all symptoms you are currently experiencing, then click Analyze."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {page === "checker" && (
            <motion.div key="checker" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search symptoms (e.g. headache, fever...)"
                  className="pl-9 h-11"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                />
              </div>

              {selectedIds.size > 0 && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                    <CheckSquare className="w-4 h-4" />
                    {selectedIds.size} symptom{selectedIds.size !== 1 ? "s" : ""} selected
                  </div>
                  <button onClick={() => setSelectedIds(new Set())} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                    Clear all
                  </button>
                </div>
              )}

              <div className="space-y-6">
                {Array.from(grouped.entries()).map(([category, syms]) => (
                  <div key={category}>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {syms.map((s) => {
                        const selected = selectedIds.has(s.id);
                        return (
                          <button
                            key={s.id}
                            onClick={() => toggleSymptom(s.id)}
                            className={cn(
                              "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer",
                              selected
                                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-purple-600/20"
                                : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-purple-50/50",
                            )}
                          >
                            {selected && <CheckSquare className="w-3.5 h-3.5" />}
                            {s.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {filteredSymptoms.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No symptoms match your search. Try a different term.
                </div>
              )}

              <div className="mt-8">
                <label className="text-sm font-medium text-foreground block mb-2">
                  Additional symptoms not listed above (optional)
                </label>
                <Input
                  placeholder="e.g. tingling in left arm, difficulty sleeping..."
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Free-text symptoms are recorded but the matching engine uses checkbox selections.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 mt-4 text-sm text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  <Activity className="inline w-4 h-4 mr-1 text-primary" />
                  Our engine compares your symptoms against {getDiseases().length} medical conditions.
                </p>
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={selectedIds.size === 0}
                  className="cursor-pointer w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white"
                >
                  Analyze Symptoms
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {page === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Analyzing your symptoms…</p>
            </motion.div>
          )}

          {page === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <ResultsView results={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

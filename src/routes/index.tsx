import { createFileRoute } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  HeartPulse,
  Hospital,
  ClipboardList,
  ArrowRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  Search,
  UserCheck,
  Stethoscope,
  Activity,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/lib/router-shim";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedExpert — Symptom Checker & Specialist Finder for Nigeria" },
      {
        name: "description",
        content:
          "Describe your symptoms and get guidance on possible conditions, the right medical specialist, and Nigerian hospitals near you.",
      },
      { property: "og:title", content: "MedExpert — Symptom Checker & Hospital Finder" },
      {
        property: "og:description",
        content:
          "A rule-based medical expert system for Nigerian healthcare. Built as a final year CS project.",
      },
    ],
  }),
  component: HomePage,
});

const HOW_IT_WORKS = [
  { step: 1, icon: Search, title: "Enter Your Symptoms", description: "Select from a curated list of symptoms or type your own.", color: "bg-violet-100 text-violet-700" },
  { step: 2, icon: HeartPulse, title: "Get Possible Conditions", description: "Our rule-based engine ranks possible conditions by confidence.", color: "bg-rose-100 text-rose-700" },
  { step: 3, icon: UserCheck, title: "Right Specialist", description: "The system maps each condition to the right medical specialist.", color: "bg-blue-100 text-blue-700" },
  { step: 4, icon: Hospital, title: "Find Nearby Hospitals", description: "See Nigerian hospitals that have your recommended specialist.", color: "bg-emerald-100 text-emerald-700" },
];

const TRUST = [
  { icon: Shield, text: "Evidence-based rule logic" },
  { icon: CheckCircle, text: "Nigerian healthcare context" },
  { icon: ClipboardList, text: "Detailed therapy advice" },
  { icon: AlertTriangle, text: "Urgency level guidance" },
];

const STATS = [
  { value: 30, label: "Symptoms Covered", suffix: "+" },
  { value: 20, label: "Medical Conditions", suffix: "+" },
  { value: 12, label: "Specialists", suffix: "+" },
  { value: 15, label: "Hospitals Listed", suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
      {count}
      <span className="text-purple-400">{suffix}</span>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80"
            alt="Healthcare professionals consulting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#150529]/96 via-[#27094e]/92 to-[#150529]/88" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[140px]" />
            <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px]" />
          </div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <Activity className="absolute top-20 right-12 w-20 h-20 text-purple-300/10 hidden lg:block" />
        <Stethoscope className="absolute bottom-24 left-12 w-16 h-16 text-purple-300/10 hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/15 text-purple-200 border border-purple-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Rule-based medical guidance, built for Nigeria
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-white text-balance mb-6 leading-[1.05]">
                Find the right
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400">
                  doctor, faster.
                </span>
              </h1>
              <p className="text-lg text-purple-100/75 max-w-xl mb-10 leading-relaxed">
                Tell us your symptoms and we will suggest possible conditions, the type of specialist
                to see, and hospitals across Lagos, Abuja, and beyond.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/symptom-checker")}
                  className="text-base px-7 py-6 shadow-xl shadow-purple-900/40 cursor-pointer bg-purple-600 hover:bg-purple-500 text-white border-0 w-full sm:w-auto"
                >
                  Start Symptom Analysis
                  <ArrowRight className="w-5 h-5 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate("/specialists")}
                  className="text-base px-6 py-6 cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm w-full sm:w-auto"
                >
                  Browse Specialists
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-purple-200/60">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> Free to use
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> No sign-up needed
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> Guidance, not diagnosis
                </div>
              </div>
            </motion.div>

            {/* Floating preview card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 lg:pl-4"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/40 p-6 border border-white/40">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                        <HeartPulse className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Symptom Preview</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-1 rounded">
                      Live
                    </span>
                  </div>
                  <div className="space-y-2 mb-5">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      You selected
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Headache", "Fever", "Fatigue"].map((s) => (
                        <span key={s} className="bg-purple-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: "Malaria", confidence: 85, urg: "High", color: "bg-red-50 text-red-700 border-red-200" },
                      { name: "Typhoid Fever", confidence: 70, urg: "Moderate", color: "bg-amber-50 text-amber-700 border-amber-200" },
                      { name: "Viral Infection", confidence: 55, urg: "Low", color: "bg-green-50 text-green-700 border-green-200" },
                    ].map((r, i) => (
                      <motion.div
                        key={r.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.12 }}
                        className="flex items-center justify-between bg-secondary/60 rounded-lg p-3 border border-border"
                      >
                        <div>
                          <div className="text-sm font-semibold text-foreground">{r.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{r.confidence}% match</div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${r.color}`}>
                          {r.urg}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                    <Stethoscope className="w-3.5 h-3.5 text-purple-600" />
                    See a General Practitioner
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-16 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
                <div className="text-sm text-purple-200/55 mt-1.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-14"
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-3">
              How it works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              Four steps from symptom to care.
            </h2>
            <p className="text-muted-foreground text-base">
              We built MedExpert to remove the guesswork around which doctor to see. Here is how it goes.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-900/5 hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Step {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/40">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-3">
              Why MedExpert
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Built for trustworthy guidance.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The knowledge base covers conditions that are common in Nigeria, from malaria and typhoid
              to hypertension and diabetes. Every rule was reviewed against published clinical guidance.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {TRUST.map((f) => (
                <div key={f.text} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <f.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
             <div className="absolute -inset-6 bg-gradient-to-br from-purple-300/40 to-fuchsia-200/30 rounded-3xl blur-2xl z-0" />
          <img
            src="/images/hero-surgery.jpg"
            alt="Surgical team performing a procedure"
            className="relative z-10 w-full h-120 object-cover rounded-3xl"
          />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-purple-700 via-purple-700 to-fuchsia-700 rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-400 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 text-balance">
              Ready to find the right care?
            </h2>
            <p className="text-purple-100/80 mb-8 text-base sm:text-lg max-w-xl mx-auto">
              Start with your symptoms. It takes less than a minute, no account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 cursor-pointer font-bold px-7 py-6"
                onClick={() => navigate("/symptom-checker")}
              >
                Start Symptom Analysis
                <ArrowRight className="w-5 h-5 ml-1.5" />
              </Button>
              <Button
                size="lg"
                className="bg-white/10 text-white border border-white/30 hover:bg-white/20 cursor-pointer px-7 py-6"
                onClick={() => navigate("/book-appointment")}
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

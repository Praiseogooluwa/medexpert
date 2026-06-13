import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Send, Mail, User, MessageSquare, Shield, HeartPulse, BookOpen, Target, CheckCircle, Phone, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sendEmail } from "@/lib/emailjs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MedExpert" },
      { name: "description", content: "Meet Abdulmumin Maryam and the story behind MedExpert, a final year CS project." },
    ],
  }),
  component: AboutPage,
});

const ABOUT_POINTS = [
  {
    icon: Target,
    title: "Why I Built This",
    description:
      "A lot of people around me struggle with the same problem when they fall sick: they do not know which type of doctor to see. Should they visit a GP, a specialist, or just wait it out? I built MedExpert to answer that question in a clear, practical way.",
  },
  {
    icon: HeartPulse,
    title: "Who It Is For",
    description:
      "Anyone in Nigeria who is feeling unwell and wants a starting point. It is useful for adults trying to make sense of their own symptoms, and for caregivers helping family members figure out the next step.",
  },
  {
    icon: BookOpen,
    title: "How It Works",
    description:
      "You select your symptoms from a list. The system compares them against a knowledge base of medical conditions using rule based logic, ranks possible matches by confidence, and recommends the right type of specialist.",
  },
  {
    icon: Shield,
    title: "Important to Know",
    description:
      "MedExpert is guidance, not diagnosis. It does not replace a real doctor. Always consult a qualified healthcare professional before making any medical decisions.",
  },
];

function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      await sendEmail({
        form_type: "New Contact Message",
        name: name.trim(),
        email: email.trim(),
        phone: "-",
        hospital: "-",
        specialist: "-",
        date: "-",
        time: "-",
        message: message.trim(),
      });
      toast.success("Message sent. I will get back to you soon.");
      setName(""); setEmail(""); setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again or reach me directly by phone.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-2">
            About this project
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Meet the person behind MedExpert.
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A final year Computer Science project built to make healthcare navigation easier for everyday Nigerians.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16 items-start">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-fuchsia-50 aspect-[4/5]">
              <img
                src="/images/about-photo.jpg"
                alt="Abdulmumin Maryam"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#15052b]/90 to-transparent">
                <div className="text-white font-bold text-lg">Abdulmumin Maryam</div>
                <div className="text-purple-200 text-sm">Final Year Project, 2026</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-purple-50/60 border border-purple-100 rounded-2xl p-6 sm:p-8">
            <p className="text-foreground text-base leading-relaxed mb-4">
              I am <strong>Maryam</strong>, a Computer Scientist with a strong interest in design systems and full
              project development. MedExpert is my final year project, built around a real and pressing problem in
              healthcare accessibility in Nigeria.
            </p>
            <p className="text-foreground text-base leading-relaxed mb-4">
              In many cases, the challenge in Nigerian healthcare is not the absence of doctors, but knowing where to
              begin. Patients often struggle with identifying the right hospital, choosing the correct specialist, or
              seeking help early enough before conditions worsen. This delay or misdirection can lead to avoidable
              complications.
            </p>
            <p className="text-foreground text-base leading-relaxed mb-4">
              MedExpert is designed to bridge that gap by providing a clear and guided starting point. Users can
              describe their symptoms, and the system suggests possible conditions, recommends the appropriate type
              of specialist, and helps locate Nigerian hospitals where such specialists are available. It also
              provides basic self-care guidance while users wait to see a medical professional.
            </p>
            <p className="text-muted-foreground text-sm italic">
              The goal of MedExpert is not to replace medical professionals, but to make healthcare navigation
              simpler, faster, and more informed, helping users take the right first step toward getting the care
              they need.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {ABOUT_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <point.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-secondary/50 border border-border rounded-2xl p-6 mb-16">
          <h2 className="text-lg font-bold text-foreground mb-4">How the knowledge base is organised</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The system runs entirely in your browser, using static TypeScript data files as a knowledge base
            and localStorage so admin edits persist.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "Symptoms Table", desc: "30+ symptoms with categories" },
              { label: "Disease / Rules Table", desc: "20+ conditions with linked symptoms" },
              { label: "Specialists Table", desc: "12 medical specialist types" },
              { label: "Hospitals Table", desc: "15 Nigerian hospitals" },
              { label: "Therapy Advice", desc: "Self-care guides plus warnings" },
              { label: "Matching Engine", desc: "Rule based inference with scoring" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2.5 bg-card border border-border rounded-xl p-3">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Get in touch</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Have a question or feedback about this project? Send me a message or reach out directly.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> +234 902 967 5063
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> +234 703 360 6913
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:Workwithmyrie@gmail.com" className="hover:text-primary hover:underline">
                  Workwithmyrie@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                <User className="inline w-3.5 h-3.5 mr-1" /> Your Name
              </label>
              <Input placeholder="John Okafor" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                <Mail className="inline w-3.5 h-3.5 mr-1" /> Email Address
              </label>
              <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                <MessageSquare className="inline w-3.5 h-3.5 mr-1" /> Message
              </label>
              <textarea
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 text-white"
            >
              {sending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</> : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
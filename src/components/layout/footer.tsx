import { Link } from "@/lib/router-shim";
import { Phone, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const QUICK = [
  { to: "/", label: "Home" },
  { to: "/symptom-checker", label: "Symptom Checker" },
  { to: "/specialists", label: "Specialists" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/therapy-guide", label: "Therapy Guide" },
];

const RESOURCES = [
  { to: "/about", label: "About" },
  { to: "/book-appointment", label: "Book Appointment" },
  { to: "/admin", label: "Admin" },
];

export function Footer() {
  return (
    <footer className="bg-[#15052b] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <BrandLogo size={36} />
              <div className="leading-none">
                <div className="font-extrabold text-white text-base">MedExpert</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-purple-300/80 font-semibold mt-0.5">
                  Search System
                </div>
              </div>
            </div>
            <p className="text-purple-200/60 text-sm leading-relaxed">
              Helping you find the right care, faster. Built for the Nigerian healthcare context.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-purple-200 text-xs mb-4 uppercase tracking-[0.18em]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-purple-200/60 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-purple-200 text-xs mb-4 uppercase tracking-[0.18em]">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {RESOURCES.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-purple-200/60 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-purple-200 text-xs mb-4 uppercase tracking-[0.18em]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-purple-200/70 text-sm">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" />
                +234 902 967 5063
              </li>
              <li className="flex items-center gap-2.5 text-purple-200/70 text-sm">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" />
                +234 703 360 6913
              </li>
              <li className="flex items-center gap-2.5 text-purple-200/70 text-sm">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" />
                <a
                  href="mailto:Workwithmyrie@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  Workwithmyrie@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-purple-200/70 text-sm">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" />
                Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-purple-200/40 text-xs text-center">
            © 2026 MedExpert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

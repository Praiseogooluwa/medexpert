import { useEffect, useState } from "react";
import { Link, useLocation } from "@/lib/router-shim";
import { Menu, X, CalendarPlus } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/symptom-checker", label: "Symptom Checker" },
  { to: "/specialists", label: "Specialists" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/therapy-guide", label: "Therapy Guide" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-purple-100 shadow-sm"
          : "bg-white/40 backdrop-blur-sm border-b border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <BrandLogo size={36} />
          <div className="leading-none">
            <div className="text-[15px] font-extrabold tracking-tight text-foreground">MedExpert</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-purple-700/70 font-semibold mt-0.5">
              Search System
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "text-purple-700 bg-purple-50"
                    : "text-foreground/70 hover:text-purple-700 hover:bg-purple-50/60",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md shadow-purple-600/25 transition-all hover:shadow-lg hover:shadow-purple-600/30"
          >
            <CalendarPlus className="w-4 h-4" />
            Book Appointment
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-lg text-foreground hover:bg-purple-50"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile slide-in */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-white border-b border-purple-100 shadow-lg transition-all duration-300 origin-top",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium",
                  active ? "text-purple-700 bg-purple-50" : "text-foreground/80 hover:bg-purple-50",
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/book-appointment"
            className="mt-2 inline-flex w-full items-center justify-center gap-1.5 bg-purple-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg"
          >
            <CalendarPlus className="w-4 h-4" /> Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}

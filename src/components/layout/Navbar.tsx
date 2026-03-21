"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/content";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [desktopPlanOpen, setDesktopPlanOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setPlanOpen(false);
    setDesktopPlanOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "shadow-lg shadow-black/30" : "bg-[var(--color-brand-900)]"
      )}
      style={scrolled ? {
        background: "rgba(3, 12, 5, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(29,184,75,0.1)",
      } : undefined}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            aria-label="Newton Harris for G2K President, Home"
          >
            <span className="text-white font-black text-sm md:text-base tracking-wider uppercase">
              Newton Harris
            </span>
            <span className="text-[var(--color-gold-400)] font-bold text-xs tracking-widest uppercase">
              For G2K President
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded text-sm font-semibold transition-colors",
                      isActive(item.href)
                        ? "text-[var(--color-gold-400)]"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    aria-haspopup="true"
                    aria-expanded={desktopPlanOpen}
                    onClick={() => setDesktopPlanOpen((o) => !o)}
                    onKeyDown={(e) => { if (e.key === "Escape") setDesktopPlanOpen(false); }}
                  >
                    {item.label}
                    <ChevronDown size={14} className={cn("transition-transform", (desktopPlanOpen) && "rotate-180", "group-hover:rotate-180")} />
                  </button>
                  {/* Dropdown — visible on hover (mouse) or when desktopPlanOpen (keyboard) */}
                  <div className={cn("absolute top-full left-0 mt-1 min-w-72 bg-[var(--color-brand-900)] border border-white/10 rounded-lg shadow-xl transition-all duration-200 overflow-hidden", desktopPlanOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible")}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-3 text-sm font-medium border-b border-white/5 last:border-0 transition-colors",
                          isActive(child.href)
                            ? "text-[var(--color-gold-400)] bg-white/5"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.href === "/reach-out" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ml-1 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "var(--color-brand-vivid)",
                    boxShadow: isActive(item.href)
                      ? "0 0 0 2px #fff, 0 0 20px rgba(29,184,75,0.6)"
                      : "0 0 16px rgba(29,184,75,0.4)",
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded text-sm font-semibold transition-colors",
                    isActive(item.href)
                      ? "text-[var(--color-gold-400)]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/manifesto"
              className="ml-2 px-5 py-2.5 text-[var(--color-brand-900)] font-black text-sm rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "var(--color-gold-400)",
                boxShadow: "0 0 18px rgba(245,197,24,0.4), 0 2px 8px rgba(245,197,24,0.2)",
                letterSpacing: "0.01em",
              }}
            >
              Read Manifesto
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white rounded hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-brand-950)] border-t border-white/10">
          <nav className="container-site py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-3 rounded text-sm font-semibold transition-colors text-left",
                      isActive(item.href)
                        ? "text-[var(--color-gold-400)]"
                        : "text-white/80"
                    )}
                    onClick={() => setPlanOpen(!planOpen)}
                    aria-expanded={planOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform", planOpen && "rotate-180")}
                    />
                  </button>
                  {planOpen && (
                    <div className="ml-3 border-l-2 border-[var(--color-brand-600)] pl-3 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block py-2 text-sm font-medium transition-colors",
                            isActive(child.href)
                              ? "text-[var(--color-gold-400)]"
                              : "text-white/70 hover:text-white"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.href === "/reach-out" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mx-3 py-3.5 rounded-xl text-sm font-bold text-white text-center transition-colors"
                  style={{
                    background: "var(--color-brand-vivid)",
                    boxShadow: "0 0 20px rgba(29,184,75,0.35)",
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-3 rounded text-sm font-semibold transition-colors",
                    isActive(item.href)
                      ? "text-[var(--color-gold-400)]"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/manifesto"
              className="mt-2 mx-3 py-3.5 text-[var(--color-brand-900)] font-black text-sm rounded-xl text-center transition-all duration-200 active:scale-95"
              style={{
                background: "var(--color-gold-400)",
                boxShadow: "0 0 20px rgba(245,197,24,0.35), 0 2px 8px rgba(245,197,24,0.2)",
                letterSpacing: "0.01em",
              }}
            >
              Read Manifesto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

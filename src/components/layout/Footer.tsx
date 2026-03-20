import Link from "next/link";
import { navItems } from "@/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const planItem = navItems.find((n) => n.label === "The Plan");

  return (
    <footer className="bg-[var(--color-brand-950)] text-white/60 border-t border-white/10">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <p className="text-white font-black text-lg tracking-wider uppercase">Newton Harris</p>
              <p className="text-[var(--color-gold-400)] font-bold text-sm tracking-widest uppercase">
                For G2K President
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              Tested. Proven. Ready to Lead on Day One.
              <br />
              Ushering in a New Era of Opportunities, Stability, and Respect.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://x.com/NHarrisJM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) — @NHarrisJM"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-white/60"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/newtonharrisjm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — @newtonharrisjm"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-white/60"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {navItems.filter((n) => !n.children).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-[var(--color-gold-400)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Plan */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              The Plan
            </p>
            <ul className="space-y-2">
              {planItem?.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="text-sm hover:text-[var(--color-gold-400)] transition-colors"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/manifesto"
                  className="text-sm text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] font-semibold transition-colors"
                >
                  Read the Full Manifesto →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {year} Newton Harris for G2K President. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            G2K — Generation 2000 | Jamaica Labour Party Youth Arm
          </p>
        </div>
      </div>
    </footer>
  );
}

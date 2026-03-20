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

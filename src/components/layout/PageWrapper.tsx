"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import RouteProgress from "@/components/shared/RouteProgress";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <RouteProgress />
      <AnimatePresence mode="wait" initial={false}>
        <main className="flex-1" key={pathname}>
          {children}
        </main>
      </AnimatePresence>
    </>
  );
}

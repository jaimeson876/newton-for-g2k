import type { Metadata } from "next";
import PillarPageLayout from "@/components/pillar/PillarPageLayout";
import { pillar1, pillar2 } from "@/content";

export const metadata: Metadata = {
  title: "Pillar 1: Chapter and Member Development",
  description:
    "Make Your Membership Work For You. Elevate your network, accelerate your career, become a formidable political force, and innovate for Jamaica.",
};

export default function Pillar1Page() {
  return (
    <PillarPageLayout
      pillarNumber={1}
      heading={pillar1.heading}
      intro={pillar1.intro}
      modules={pillar1.modules}
      nextPillar={{
        label: `Pillar 2: ${pillar2.heading}`,
        href: `/plan/${pillar2.id}`,
      }}
    />
  );
}

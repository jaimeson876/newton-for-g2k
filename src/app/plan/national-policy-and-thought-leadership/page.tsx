import type { Metadata } from "next";
import PillarPageLayout from "@/components/pillar/PillarPageLayout";
import { pillar1, pillar2, pillar3 } from "@/content";

export const metadata: Metadata = {
  title: "Pillar 2: National Policy and Thought Leadership",
  description:
    "We do more than defend the Party; we elevate the conversation and edify our fellow citizens.",
};

export default function Pillar2Page() {
  return (
    <PillarPageLayout
      pillarNumber={2}
      heading={pillar2.heading}
      intro={pillar2.intro}
      boldStatement={pillar2.boldStatement}
      modules={pillar2.modules}
      prevPillar={{
        label: `Pillar 1: ${pillar1.heading}`,
        href: `/plan/${pillar1.id}`,
      }}
      nextPillar={{
        label: `Pillar 3: ${pillar3.heading}`,
        href: `/plan/${pillar3.id}`,
      }}
    />
  );
}

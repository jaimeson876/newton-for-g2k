import type { Metadata } from "next";
import PillarPageLayout from "@/components/pillar/PillarPageLayout";
import { pillar2, pillar3 } from "@/content";

export const metadata: Metadata = {
  title: "Pillar 3: Sustainable Financing",
  description:
    "FUNDING OUR FUTURE — building an organisation that is financially self-sufficient and professionally managed.",
};

export default function Pillar3Page() {
  return (
    <PillarPageLayout
      pillarNumber={3}
      heading={pillar3.heading}
      intro={`${pillar3.intro} ${pillar3.boldInline}${pillar3.introEnd}`}
      keyTargets={pillar3.keyTargets}
      modules={pillar3.modules}
      prevPillar={{
        label: `Pillar 2: ${pillar2.heading}`,
        href: `/plan/${pillar2.id}`,
      }}
    />
  );
}

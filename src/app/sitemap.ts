import { MetadataRoute } from "next";
import { getAllLetters } from "@/lib/letters";

const BASE = "https://newtonforg2k.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const letterPages: MetadataRoute.Sitemap = getAllLetters().map((l) => ({
    url: `${BASE}/letters/${l.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: l.date ? new Date(l.date + "T12:00:00") : undefined,
  }));

  return [
    { url: BASE,                                                           changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/the-candidate`,                                        changeFrequency: "monthly", priority: 0.9 },
    // { url: `${BASE}/the-ticket`,                                           changeFrequency: "monthly", priority: 0.8 }, // temporarily hidden
    { url: `${BASE}/mission`,                                              changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/message-to-g2k`,                                       changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/manifesto`,                                            changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/plan`,                                                 changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/plan/chapter-and-member-development`,                  changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/plan/national-policy-and-thought-leadership`,          changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/plan/sustainable-financing`,                           changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/gallery`,                                              changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/reach-out`,                                            changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/letters`,                                              changeFrequency: "weekly",  priority: 0.6 },
    ...letterPages,
  ];
}

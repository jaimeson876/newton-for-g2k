import { MetadataRoute } from "next";

const BASE = "https://newtonforg2k.info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                                           changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/the-candidate`,                                        changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/the-ticket`,                                           changeFrequency: "monthly", priority: 0.8 },
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
  ];
}

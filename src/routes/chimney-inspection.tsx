import { createFileRoute } from "@tanstack/react-router";
import { Landing, type Hero } from "./index";

const HERO: Hero = {
  "badge": "ChimCrew · Columbus, OH",
  "headline": "Chimney Inspection in Columbus, OH",
  "deal": "$69 Chimney Inspection",
  "copy": "Know exactly what’s going on with your chimney. ChimCrew will inspect the system, explain what we find clearly and let you know if anything needs attention.",
  "primaryCta": "Schedule $69 inspection",
  "trust": [
    "CSIA certified",
    "Fully insured",
    "18+ years experience",
    "5-star rated"
  ]
};

export const Route = createFileRoute("/chimney-inspection")({
  head: () => ({
    meta: [
      { title: "Chimney Inspection in Columbus, OH | ChimCrew \u2014 $69 Chimney Inspection" },
      { name: "description", content: "$69 chimney inspection in Columbus & Central Ohio from CSIA-certified pros. Schedule online or call (614) 683-5763." },
      { property: "og:title", content: "Chimney Inspection in Columbus, OH | ChimCrew" },
      { property: "og:description", content: "$69 chimney inspection in Columbus & Central Ohio from CSIA-certified pros. Schedule online or call (614) 683-5763." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Landing hero={HERO} />,
});

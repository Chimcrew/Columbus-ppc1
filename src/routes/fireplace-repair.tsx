import { createFileRoute } from "@tanstack/react-router";
import { Landing, type Hero } from "./index";

const HERO: Hero = {
  "badge": "ChimCrew · Columbus, OH",
  "headline": "Fireplace Repair in Columbus, OH",
  "deal": "$79 Fireplace Diagnostic",
  "copy": "Fireplace not working properly? ChimCrew diagnoses fireplace problems and provides professional repair service for homeowners throughout Columbus and Central Ohio.",
  "primaryCta": "Schedule $79 diagnostic",
  "trust": [
    "CSIA certified",
    "Fully insured",
    "18+ years experience",
    "5-star rated"
  ],
  "dealNote": "The $79 diagnostic fee is applied toward your repair if you move forward with ChimCrew."
};

export const Route = createFileRoute("/fireplace-repair")({
  head: () => ({
    meta: [
      { title: "Fireplace Repair in Columbus, OH | ChimCrew \u2014 $79 Fireplace Diagnostic" },
      { name: "description", content: "$79 fireplace diagnostic in Columbus & Central Ohio, applied toward your repair. Schedule online or call (614) 683-5763." },
      { property: "og:title", content: "Fireplace Repair in Columbus, OH | ChimCrew" },
      { property: "og:description", content: "$79 fireplace diagnostic in Columbus & Central Ohio, applied toward your repair. Schedule online or call (614) 683-5763." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Landing hero={HERO} />,
});

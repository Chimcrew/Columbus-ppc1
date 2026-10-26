import { createFileRoute } from "@tanstack/react-router";
import { Landing, type Hero } from "./index";

const HERO: Hero = {
  "badge": "ChimCrew · Columbus, OH",
  "headline": "Chimney Repair in Columbus, OH",
  "deal": "FREE Chimney Repair Inspection + $150 Off Your Repair",
  "copy": "Cracked masonry, damaged crowns, leaking chimneys or other chimney problems? ChimCrew provides professional chimney repair throughout Columbus and Central Ohio.",
  "primaryCta": "Schedule free inspection",
  "trust": [
    "CSIA certified",
    "Fully insured",
    "18+ years experience",
    "5-star rated"
  ]
};

export const Route = createFileRoute("/chimney-repair")({
  head: () => ({
    meta: [
      { title: "Chimney Repair in Columbus, OH | ChimCrew \u2014 FREE Chimney Repair Inspection + $150 Off Your Repair" },
      { name: "description", content: "Free repair inspection + $150 off chimney repair in Columbus & Central Ohio. CSIA certified, fully insured. Schedule online or call (614) 683-5763." },
      { property: "og:title", content: "Chimney Repair in Columbus, OH | ChimCrew" },
      { property: "og:description", content: "Free repair inspection + $150 off chimney repair in Columbus & Central Ohio. CSIA certified, fully insured. Schedule online or call (614) 683-5763." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Landing hero={HERO} />,
});

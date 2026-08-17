import type { Metadata } from "next";

import ContactCTA from "@/components/ContactCTA";
import OurTeam from "@/components/OurTeam";
import PageHero from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the people behind All Fire Services — serving  professional firefighters and qualified fire-safety technicians working across Greater Sydney.",
  path: "/our-team",
});

export default function OurTeamPage() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <PageHero
          eyebrow="Our Team"
          titleLines={["THE PEOPLE BEHIND", "ALL FIRE SERVICES"]}
          description="Serving professional firefighters and qualified fire-safety professionals bringing practical, real-world fire protection to Greater Sydney."
          imageSrc="/technician/groupteam.jpg"
          imageAlt="The All Fire Services team on site"
          imagePosition="center 25%"
        />

        <div className="bg-white relative z-10" style={{ marginTop: "-2px" }}>
          <OurTeam />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}


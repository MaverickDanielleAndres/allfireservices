import type { Metadata } from "next";

import ContactCTA from "@/components/ContactCTA";
import FreeSiteVisitOffer from "@/components/free-site-visit/FreeSiteVisitOffer";
import OurTeam from "@/components/OurTeam";
import PageHero from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the people behind All Fire Services — serving and retired professional firefighters and qualified fire-safety technicians working across Greater Sydney.",
  path: "/our-team",
});

export default function OurTeamPage() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <PageHero
          eyebrow="Our Team"
          titleLines={["THE PEOPLE BEHIND", "ALL FIRE SERVICES"]}
          description="Our team includes serving and retired professional firefighters who bring practical, real-world understanding to fire protection, supported by qualified fire-safety professionals across Greater Sydney."
          imageSrc="/technician/groupteam.jpg"
          imageAlt="The All Fire Services team on site"
        />

        <div className="bg-white relative z-10" style={{ marginTop: "-2px" }}>
          <OurTeam />
          <div className="padding-global">
            <div className="container-large" style={{ paddingTop: "clamp(2rem, 5vw, 4rem)", paddingBottom: "clamp(1rem, 3vw, 2rem)" }}>
              <FreeSiteVisitOffer source="our_team" />
            </div>
          </div>
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}


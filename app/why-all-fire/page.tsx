import type { Metadata } from "next";

import ContactCTA from "@/components/ContactCTA";
import PageHero from "@/components/PageHero";
import WhyAllFire from "@/components/WhyAllFire";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why All Fire",
  description:
    "Why property managers, strata managers and business owners across Greater Sydney choose All Fire Services — practical fire-protection experience, real firefighting knowledge and dependable compliance support.",
  path: "/why-all-fire",
});

export default function WhyAllFirePage() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <PageHero
          eyebrow="Why All Fire"
          titleLines={["WHY CLIENTS", "CHOOSE ALL FIRE"]}
          description="All Fire Services helps strata managers, building owners, and businesses stay on top of fire safety obligations with practical inspections, testing, certification, and clear next steps."
          imageSrc="/technician/group.jpg"
          imageAlt="All Fire Services technicians carrying out a site inspection"
        />

        <div className="bg-white relative z-10" style={{ marginTop: "-2px" }}>
          <WhyAllFire />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}

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
          description="Helping strata managers, building owners, and businesses manage fire protection obligations with practical inspections, testing, and certification."
          imageSrc="/technician/group.jpg"
          imageAlt="All Fire Services technicians carrying out a site inspection"
          imagePosition="center 25%"
        />

        <div className="bg-white relative z-10" style={{ marginTop: "-2px" }}>
          <WhyAllFire />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}

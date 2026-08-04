import "./services.css";
import React, { Suspense } from "react";
import ServicesPageContent from "./ServicesPageContent";
import ContactCTA from "@/components/ContactCTA";

/**
 * Wrapping ServicesPageContent in Suspense allows Next.js to
 * statically render this page shell at build time (instead of forcing
 * a full server render on every request because of useSearchParams).
 *
 * This is the key fix for poor TTFB on the /services route.
 */
export default function ServicesPage() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <Suspense
          fallback={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
                fontSize: "1rem",
              }}
              aria-label="Loading services..."
            />
          }
        >
          <ServicesPageContent />
        </Suspense>
        <ContactCTA />
      </div>
    </main>
  );
}

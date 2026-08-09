import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you were looking for could not be found on the ${SITE_NAME} website.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <section
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#ff5722",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "0.78rem",
              marginBottom: "0.75rem",
            }}
          >
            Error 404
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 780,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: "0 0 1rem",
            }}
          >
            Page Not Found
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.18rem)",
              maxWidth: "36rem",
              lineHeight: 1.55,
              marginBottom: "2rem",
            }}
          >
            We could not find the page you were looking for. It may have moved,
            or the link may be out of date.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              style={{
                padding: "0.85rem 1.5rem",
                background: "#111111",
                color: "#ffffff",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 0,
              }}
            >
              Back to home
            </Link>
            <Link
              href="/services"
              style={{
                padding: "0.85rem 1.5rem",
                border: "1px solid #111111",
                color: "#111111",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 0,
              }}
            >
              Browse services
            </Link>
            <Link
              href="/contact"
              style={{
                padding: "0.85rem 1.5rem",
                border: "1px solid #111111",
                color: "#111111",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 0,
              }}
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, serviceLinks } from "@/lib/navigation";
import { SITE_EMAIL } from "@/lib/seo";

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

// Social destinations. Each external link is rendered as a real URL — the
// platform homepages are valid external anchors (Google will follow them
// as outbound links) and the aria-label makes the destination explicit
// for assistive technology.
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61566630403365", icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com/@allfireservices", icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://au.linkedin.com/in/allfire-services-sydney-92690516", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/_allfireservices_/", icon: InstagramIcon },
  { label: "X (Twitter)", href: "https://x.com/Allfiresydney", icon: XIcon },
  { label: "Email", href: `mailto:${SITE_EMAIL}`, icon: EmailIcon },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#eaded6] bg-white text-[#121212]">
      {/* Top content section — constrained */}
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 sm:pt-8 md:pt-10 lg:px-8 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.55fr)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0 max-w-xl">
            <h2 style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
              fontWeight: 780,
              letterSpacing: "-0.06em",
              lineHeight: 0.92,
              margin: 0,
              textTransform: "uppercase",
            }}>
              <span style={{ color: "#111111" }}>Protecting people,</span>
              <br />
              <span style={{
                background: "linear-gradient(to right, #ff2a00, #ffb700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>protecting property.</span>
            </h2>
            <div className="mt-4 grid max-w-xl grid-cols-1 gap-2 text-sm font-[500] text-[#111111] sm:mt-5 sm:grid-cols-2 sm:gap-2">
              <Link
                href="/contact"
                className="min-h-11 min-w-0 items-center justify-center gap-2 bg-[#ff4d16] px-3 !text-white no-underline transition hover:bg-[#e63d0b] sm:px-4"
                style={{
                  backgroundColor: "#ff4d16",
                  borderRadius: 0,
                  color: "#ffffff",
                  display: "flex",
                  flexWrap: "nowrap",
                  textDecoration: "none",
                }}
              >
                <span className="whitespace-nowrap">Get in touch</span>
                <ArrowUpRight className="flex-none" size={16} strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <a
                href="tel:1300765594"
                className="min-h-11 min-w-0 items-center justify-center gap-2 border border-[#2b201b]/25 px-3 !text-[#121212] no-underline transition hover:border-[#ff4d16] hover:bg-white sm:px-4"
                style={{
                  borderRadius: 0,
                  display: "flex",
                  flexWrap: "nowrap",
                  textDecoration: "none",
                }}
              >
                <span className="whitespace-nowrap">Call 1300 765 594</span>
                <ArrowUpRight className="flex-none" size={16} strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>

            <address className="mt-5 flex max-w-xl flex-col gap-3 border-t border-[#2b201b]/12 pt-4 text-[0.85rem] font-[500] leading-relaxed text-[#111111] not-italic sm:text-[0.9rem]">
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="!text-[#111111] transition hover:!text-[#ff4d16]"
                style={{ textDecoration: "none" }}
              >
                {SITE_EMAIL}
              </a>
              <p>
                330 Wattle Street, Ultimo NSW 2007
              </p>
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4">
                <p>Mon-Fri: 7:00am to 6:30pm</p>
                <a
                  href="tel:0484648400"
                  className="!text-[#111111] transition hover:!text-[#ff4d16]"
                  style={{ textDecoration: "none" }}
                >
                  After hours: 0484 648 400
                </a>
              </div>
            </address>

            <div className="pt-5">
              <h3 className="mb-3 text-[#111111]" style={{
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                fontWeight: 780,
                letterSpacing: "-0.06em",
                lineHeight: 0.92,
                margin: 0,
              }}>Socials</h3>
              <ul className="footer-social-list flex flex-nowrap items-center gap-2 text-[#111111]">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label} className="footer-social-item flex-none">
                    <a
                      href={href}
                      aria-label={`${label} (opens in a new tab)`}
                      rel="noopener noreferrer"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      className="footer-social-link inline-grid flex-none place-items-center !text-[#111111] transition hover:!text-[#ff4d16]"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[2.4fr_1fr] lg:gap-x-12">
            <nav aria-label="Services">
              <h2 className="text-[#111111]" style={{
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                fontWeight: 780,
                letterSpacing: "-0.06em",
                lineHeight: 0.92,
                margin: 0,
              }}>Services</h2>
              <ul
                className="footer-link-list flex flex-col gap-2 text-[0.85rem] font-[500] leading-snug text-[#111111] sm:grid sm:grid-cols-3 sm:items-start sm:gap-x-6 sm:gap-y-3 md:text-[0.95rem]"
                style={{ marginTop: "1.5rem", paddingTop: "1.00rem" }}
              >
                {serviceLinks
                  .filter((link) => link.href !== "/services")
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="!text-[#111111] transition hover:!text-[#ff4d16]"
                        style={{ textDecoration: "none" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            <nav aria-label="Quick links">
              <h2 className="text-[#111111]" style={{
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                fontWeight: 780,
                letterSpacing: "-0.06em",
                lineHeight: 0.92,
                margin: 0,
              }}>Quicklinks</h2>
              <ul
                className="footer-link-list flex flex-col gap-2 text-[0.85rem] font-[500] leading-snug text-[#111111] md:gap-3 md:text-[0.95rem]"
                style={{ marginTop: "1.5rem", paddingTop: "1.00rem" }}
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="!text-[#111111] transition hover:!text-[#ff4d16]"
                      style={{ textDecoration: "none" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Wordmark — full bleed, no max-width constraint, no overflow clipping */}
      <div className="hidden w-full px-0 pt-10 sm:pt-12 lg:pt-14">
        <Link
          href="/"
          aria-label="All Fire Services Australia home"
          className="footer-wordmark block w-full whitespace-nowrap !text-[#ff4d16] font-black italic uppercase leading-[0.9] tracking-normal transition hover:!text-[#ff6a3d]"
          style={{
            display: "flex",
            fontSize: "clamp(2.35rem, 10vw, 9.9rem)",
            height: "auto",
            textDecoration: "none",
            width: "100%",
            borderRadius: 0,
          }}
        >
          <span aria-hidden="true" className="footer-wordmark-half footer-wordmark-left">
            ALLFIRE
          </span>
          <span aria-hidden="true" className="footer-wordmark-half footer-wordmark-right">
            SERVICES
          </span>
        </Link>
      </div>

      {/* Bottom bar — constrained */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex flex-col gap-4 border-t border-[#2b201b]/12 pb-5 pt-4 text-[11px] font-[500] text-[#111111] sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>&copy; {new Date().getFullYear()} All Fire Services Australia. All rights reserved.</p>
            <Link href="/contact" className="!text-[#111111] transition hover:!text-[#ff4d16]" style={{ textDecoration: "none" }}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .footer-wordmark {
              display: flex;
              align-items: baseline;
              justify-content: center;
              width: 100%;
              gap: 0;
              overflow: visible;
              border-radius: 0;
            }

            .footer-wordmark-half {
              display: inline-block;
              will-change: transform, opacity;
              animation-duration: 1100ms;
              animation-delay: 160ms;
              animation-fill-mode: both;
              animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
            }

            .footer-wordmark-left {
              transform-origin: right center;
              animation-name: footerWordmarkLeft;
            }

            .footer-wordmark-right {
              transform-origin: left center;
              animation-name: footerWordmarkRight;
            }

            @keyframes footerWordmarkLeft {
              from {
                opacity: 0;
                transform: translateX(-72%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes footerWordmarkRight {
              from {
                opacity: 0;
                transform: translateX(72%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @media (max-width: 767px) {
              .footer-wordmark {
                justify-content: center;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .footer-wordmark-half {
                animation: none;
              }
            }
          `,
        }}
      />
    </footer>
  );
}


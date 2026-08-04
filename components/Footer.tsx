import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Fire protection", href: "/fire-protection-services-sydney" },
      { label: "Annual fire safety", href: "/annual-fire-safety-statement" },
      { label: "Fire compliance", href: "/fire-safety-compliance" },
      { label: "Fire consultancy", href: "/fire-consultancy-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "FPA member", href: "/fpa-australia-member" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Talk to Peter", href: "/talk-to-peter" },
      { label: "Find a fitter", href: "/find-a-fitter" },
      { label: "Strata", href: "/strata" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "Email", href: "mailto:admin@allfireservices.com.au", icon: EmailIcon },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#eaded6] bg-[#f7f2ee] text-[#121212]">
      {/* Top content section — constrained */}
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:px-6 md:pt-10 lg:px-8 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="min-w-0 max-w-xl flex flex-col h-full">
            <div>
              <p className="text-[clamp(2rem,4.2vw,4rem)] font-[780] leading-[0.92] tracking-[-0.06em] text-[#111111]">
                Protecting people,
                <br />
                protecting property.
              </p>
              <div className="mt-5 grid max-w-xl grid-cols-2 gap-2 text-sm font-[500] text-[#111111] sm:mt-7 sm:gap-3">
                <Link
                  href="/contact"
                  className="min-h-11 min-w-0 items-center justify-center gap-2 bg-[#ff4d16] px-3 !text-white no-underline transition hover:bg-[#e63d0b] sm:px-5"
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
                  <ArrowUpRight className="flex-none" size={16} strokeWidth={2.4} />
                </Link>
                <a
                  href="tel:1300765594"
                  className="min-h-11 min-w-0 items-center justify-center gap-2 border border-[#2b201b]/25 px-3 !text-[#121212] no-underline transition hover:border-[#ff4d16] hover:bg-white sm:px-5"
                  style={{
                    borderRadius: 0,
                    display: "flex",
                    flexWrap: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  <span className="whitespace-nowrap">Call 1300 765 594</span>
                  <ArrowUpRight className="flex-none" size={16} strokeWidth={2.4} />
                </a>
              </div>
            </div>

            <div className="mt-auto pt-16 md:pt-24 lg:pt-32 pb-6">
              <p className="mb-4 text-[clamp(1.05rem,1.5vw,1.15rem)] font-bold text-[#111111]">Socials</p>
              <div className="flex flex-wrap items-center gap-2 text-[#645852]" aria-label="Social links">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-grid h-9 w-9 flex-none place-items-center !text-[#645852] transition hover:bg-white hover:!text-[#ff4d16]"
                    style={{ borderRadius: 0 }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-x-7 gap-y-7 md:grid-cols-3 md:gap-y-9 lg:gap-x-10">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="mb-4 text-[clamp(1.05rem,1.5vw,1.15rem)] font-bold text-[#111111]">{column.title}</p>
                <ul className="footer-link-list flex flex-col gap-2 whitespace-normal text-[clamp(1.05rem,1.5vw,1.15rem)] font-[500] leading-snug text-[#4b5563] md:gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="!text-[#4b5563] transition hover:!text-[#ff4d16]"
                        style={{
                          minHeight: "auto",
                          paddingBlock: 0,
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 min-w-0 border-t border-[#2b201b]/12 pt-6 md:col-span-3">
              <div className="min-w-0">
                <p className="mb-4 text-[clamp(1.05rem,1.5vw,1.15rem)] font-bold text-[#111111]">Contact</p>
                <div className="flex flex-col gap-3 text-[clamp(1.05rem,1.5vw,1.15rem)] font-[500] leading-snug text-[#4b5563]">
                  <a
                    className="min-w-0 !text-[#4b5563] transition hover:!text-[#ff4d16]"
                    href="mailto:admin@allfireservices.com.au"
                    style={{ overflowWrap: "anywhere", textDecoration: "none" }}
                  >
                    admin@allfireservices.com.au
                  </a>
                  <p>330 Wattle Street Ultimo NSW 2007</p>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 mt-1">
                    <p>Mon-Fri: 7:00am to 6:30pm</p>
                    <p>After hours: 0484 648 400</p>
                  </div>
                </div>
              </div>
            </div>
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
        <div className="mt-5 flex flex-col gap-5 border-t border-[#2b201b]/12 pt-5 pb-6 text-[12px] font-[500] text-[#4b5563] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>&copy; {new Date().getFullYear()} All Fire Services Australia. All rights reserved.</p>
            <span className="text-[#4b5563]">Privacy policy</span>
            <span className="text-[#4b5563]">Terms and conditions</span>
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

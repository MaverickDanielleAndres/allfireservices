// Shared navigation links used by both the Navbar and the Footer.
// Keep this list as the single source of truth for primary nav items.

import { services } from "./services";

/**
 * The Our Services dropdown: "All Services" + the 12 approved services.
 *
 * Labels and destinations are derived from lib/services.ts so the dropdown
 * always reads exactly the same as the homepage Services section, the Our
 * Services page and the footer. Do not hard-code service names here.
 */
export const serviceLinks = [
  { label: "All Services", href: "/services" },
  ...services.map((service) => ({ label: service.name, href: service.href })),
];

/**
 * Primary navigation.
 *
 * `/about` is the Our Story route and `/services` is the Our Services route —
 * the existing URLs are kept so nothing that already works breaks. Why All Fire
 * is a section of the Our Story page rather than a separate route, so it is
 * linked by anchor.
 */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Team", href: "/our-team" },
  { label: "Our Clients", href: "/our-clients" },
  { label: "Why All Fire", href: "/why-all-fire" },
  { label: "Strata", href: "/strata" },
  { label: "Contact", href: "/contact" },
];

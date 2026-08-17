/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL SERVICE DATA SOURCE — the single source of truth for the approved
 * public-facing name of every All Fire Services offering.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Every surface that shows a service name reads it from here:
 *   • components/HomeServices.tsx   (homepage Services section)
 *   • lib/navigation.ts             (Our Services dropdown + footer service list)
 *   • lib/products.ts               (`categories` labels + hub headings)
 *   • app/services/page.tsx         (Our Services hub — via `categories`)
 *   • app/services/[slug]/page.tsx  (detail pages, breadcrumbs, related links)
 *
 * RULES
 * -----
 * 1. `id` is the routing key. It is the `?category=` value read by
 *    app/services/page.tsx and it must stay identical to `Category.id` in
 *    lib/products.ts. NEVER change an id — it would break live URLs.
 * 2. `name` is the ONE approved public-facing name. No abbreviations, no
 *    standard codes, no alternate spellings. If a name needs to change, change
 *    it here and it updates everywhere.
 * 3. `shortName` is only for genuinely tight UI (hub sidebar, related-service
 *    kicker). It must be a truncation of `name`, never a different name.
 * 4. `headingLine1`/`headingLine2` split `name` across two lines for the hub
 *    heading. Keep them to two lines — never three or four.
 */

export interface ServiceDefinition {
  /** Routing key. Matches `Category.id` in lib/products.ts and the
   *  `?category=` param on /services. Never change. */
  id: string;
  /** The approved public-facing name. Used verbatim everywhere. */
  name: string;
  /** Optional shorter form for tight UI. A truncation of `name`, not a
   *  different name. Falls back to `name` when omitted. */
  shortName?: string;
  /** Canonical destination for this service. */
  href: string;
  /** First line of the two-line hub heading. */
  headingLine1: string;
  /** Second line of the two-line hub heading. */
  headingLine2: string;
  /** Homepage Services card artwork. Managed separately from this refactor —
   *  paths are carried over as-is, no images were generated or replaced. */
  image: string;
  /** Alt text for the homepage Services card artwork. */
  imageAlt: string;
}

/**
 * The 12 approved services, in the approved homepage display order.
 *
 * `id` values are load-bearing routing keys — see rule 1 above.
 */
export const services: ServiceDefinition[] = [
  {
    id: "annual-fire-safety-statement",
    name: "Annual Fire Safety Statement",
    shortName: "Annual Fire Safety Statement",
    // Redirect to the services hub view for AFSS
    href: "/services?category=annual-fire-safety-statement",
    headingLine1: "Annual Fire",
    headingLine2: "Safety Statement",
    image: "/services/AFSS-640.webp",
    imageAlt: "NSW annual fire safety statement documentation",
  },
  {
    id: "fire-panel",
    name: "Fire Panels & Alarms",
    shortName: "Fire Panels",
    href: "/services?category=fire-panel",
    headingLine1: "Fire Panels",
    headingLine2: "& Alarms",
    image: "/services/Fire%20Panel%20%26Detection%20(AS%201670.1)-640.webp",
    imageAlt: "All Fire Services fire indicator panel under inspection",
  },
  {
    id: "smoke-alarms",
    name: "Smoke Detectors",
    shortName: "Smoke Detectors",
    href: "/services?category=smoke-alarms",
    headingLine1: "Smoke",
    headingLine2: "Detectors",
    image: "/services/Smoke%20Alarms(AS%203786)-640.webp",
    imageAlt: "Technician testing a ceiling-mounted smoke detector",
  },
  {
    id: "fire-doors",
    name: "Fire Doors",
    shortName: "Fire Doors",
    href: "/services?category=fire-doors",
    headingLine1: "Fire",
    headingLine2: "Doors",
    image: "/services/firedoor-640.webp",
    imageAlt: "All Fire Services technicians on site",
  },
  {
    id: "fire-extinguishers",
    name: "Fire Extinguishers",
    shortName: "Fire Extinguishers",
    href: "/services?category=fire-extinguishers",
    headingLine1: "Fire",
    headingLine2: "Extinguishers",
    image: "/services/Fire%20extinguishers-640.webp",
    imageAlt: "Fire extinguisher maintenance tag being inspected",
  },
  {
    id: "emergency-lights",
    name: "Emergency Lights",
    shortName: "Emergency Lights",
    href: "/services?category=emergency-lights",
    headingLine1: "Emergency",
    headingLine2: "Lights",
    image: "/services/emergencylights-640.webp",
    imageAlt: "Emergency lighting fitting undergoing a 90-minute test",
  },
  {
    id: "fire-hose-reels",
    name: "Fire Hose Reels",
    shortName: "Fire Hose Reels",
    href: "/services?category=fire-hose-reels",
    headingLine1: "Fire Hose",
    headingLine2: "Reels",
    image: "/services/firehose-640.webp",
    imageAlt: "All Fire Services hydrant and hose system",
  },
  {
    id: "diesel-pump",
    name: "Diesel / Hydrant / Sprinkler",
    shortName: "Diesel / Hydrant",
    href: "/services?category=diesel-pump",
    headingLine1: "Diesel / Hydrant",
    headingLine2: "/ Sprinkler",
    image: "/services/diesel%20hydrant-640.webp",
    imageAlt: "Diesel fire pump and pipework in a building plant room",
  },
  {
    id: "air-mechanical",
    name: "Air & Mechanical Services",
    shortName: "Air & Mechanical",
    href: "/services?category=air-mechanical",
    headingLine1: "Air & Mechanical",
    headingLine2: "Services",
    image: "/services/mechanical-640.webp",
    imageAlt: "Fire services pipework, valves and pressure gauges",
  },
  {
    id: "flow-testing",
    name: "Flow Testing",
    shortName: "Flow Testing",
    href: "/services?category=flow-testing",
    headingLine1: "Flow",
    headingLine2: "Testing",
    image: "/services/flowtest-640.webp",
    imageAlt: "All Fire Services technician carrying out a hydrant flow test",
  },
  {
    id: "service-penetration",
    name: "Fire Penetration",
    shortName: "Fire Penetration",
    href: "/services?category=service-penetration",
    headingLine1: "Fire",
    headingLine2: "Penetration",
    image: "/services/passivefire-640.webp",
    imageAlt: "Fire safety inspection being carried out on site",
  },
  {
    id: "plans",
    name: "Zone Block / Evacuation / Hydrant Plans",
    shortName: "Zone Block & Plans",
    href: "/services?category=plans",
    headingLine1: "Zone Block / Evacuation /",
    headingLine2: "Hydrant Plans",
    image: "/services/zoneblockplan-640.webp",
    imageAlt: "Zone block plan and evacuation diagram for a building",
  },
];

/** Fast lookup by routing id. */
const serviceById = new Map(services.map((s) => [s.id, s]));

/** Look up a service definition by its routing id. */
export function getService(id: string): ServiceDefinition | undefined {
  return serviceById.get(id);
}

/**
 * The approved public-facing name for a service id.
 * Falls back to the id itself so a typo surfaces loudly rather than silently
 * rendering an empty label.
 */
export function getServiceName(id: string): string {
  return serviceById.get(id)?.name ?? id;
}

/** The short form of the approved name, for tight UI only. */
export function getServiceShortName(id: string): string {
  const service = serviceById.get(id);
  return service?.shortName ?? service?.name ?? id;
}

/** Canonical destination for a service id. */
export function getServiceHref(id: string): string {
  return serviceById.get(id)?.href ?? `/services?category=${id}`;
}

/**
 * Naming overlay applied to `categories` in lib/products.ts so the hub, the
 * detail pages, the breadcrumbs and the related-service links can never drift
 * from the names used by the homepage, the dropdown and the footer.
 */
export function serviceNaming(id: string): {
  label: string;
  shortLabel: string;
  headingLine1: string;
  headingLine2: string;
} {
  const service = serviceById.get(id);
  return {
    label: service?.name ?? id,
    shortLabel: service?.shortName ?? service?.name ?? id,
    headingLine1: service?.headingLine1 ?? service?.name ?? id,
    headingLine2: service?.headingLine2 ?? "",
  };
}

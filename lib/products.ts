import { serviceNaming } from "./services";

export interface ProductVariant {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  details: string[];
  price: string;
  priceNote?: string;
  model: string;
  styles: ProductVariant[];
  colors: ProductVariant[];
  imageUrl: string;
  categoryId: string;
  tag?: string;
  warranty?: string;
  standard?: string;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  shortLabel?: string;
  description: string;
  intro: string;
  heroImage: string;
  iconName?: string;
  icon?: string;
  headingLine1?: string;
  headingLine2?: string;
}

/**
 * Category data minus the public-facing naming fields. Those are supplied by
 * `serviceNaming()` in lib/services.ts — the single source of truth for
 * service names — so the hub, the detail pages and the breadcrumbs can never
 * drift from the homepage, the dropdown and the footer.
 */
type CategoryBase = Omit<
  Category,
  "label" | "shortLabel" | "headingLine1" | "headingLine2"
>;

// ─── Categories (the 12 approved services) ──────────────────────────────────
// `id` is the routing key used by /services?category=<id>. Never change one.
// Names come from lib/services.ts — edit them there, not here.

const categoryBase: CategoryBase[] = [
  {
    id: "annual-fire-safety-statement",
    slug: "afss",
    description:
      "Annual Fire Safety Statement — inspection, documentation and council submission.",
    intro:
      "A legal requirement for most NSW buildings. We handle inspections and council submission.",
    heroImage: "/services/AFSS.png",
    iconName: "ShieldCheck",
  },
  {
    id: "fire-panel",
    slug: "fire-panel-alarms",
    description:
      "Installation, testing, and maintenance of fire alarm control panels, MCP units, and automatic detection systems to AS 1670.1.",
    intro:
      "AS 1670.1 supply, installation and maintenance of panels, MCPs, sounders and strobes.",
    heroImage: "/services/Fire Panel &Detection (AS 1670.1).jpg",
    iconName: "Server",
  },
  {
    id: "smoke-alarms",
    slug: "smoke-alarms",
    description:
      "Photoelectric smoke alarms supplied, installed and tested to AS 3786.",
    intro:
      "Standalone and wireless smoke alarms supplied, installed and tested to AS 3786.",
    heroImage: "/services/Smoke Alarms(AS 3786).png",
    iconName: "Flame",
  },
  {
    id: "fire-doors",
    slug: "fire-doors",
    description:
      "Inspection, tagging, gap measurement, and non-compliance reporting for fire-rated doors and frames.",
    intro:
      "Inspections, compliance tagging and gap measurement to AS 1905.1 by qualified technicians.",
    heroImage: "/services/firedoor.jpg",
    iconName: "DoorOpen",
  },
  {
    id: "fire-extinguishers",
    slug: "fire-extinguishers-signage",
    description:
      "Portable fire extinguishers, blankets, brackets, cabinets, and all associated fire safety signage.",
    intro:
      "Portable extinguishers, blankets, brackets, cabinets and AS 2444 signage — serviced annually.",
    heroImage: "/services/Fire extinguishers.jpg",
    iconName: "FireExtinguisher",
  },
  {
    id: "emergency-lights",
    slug: "emergency-lights-exit-signs",
    description:
      "Self-testing LED emergency batten lights, exit signs, oyster lights, and weatherproof twin-head units — all app-enabled with 5-year warranty.",
    intro:
      "AS/NZS 2293.1 emergency battens, exit signs and oyster lights with automatic monthly self-tests.",
    heroImage: "/services/emergencylights.jpg",
    iconName: "Lightbulb",
  },
  {
    id: "fire-hose-reels",
    slug: "fire-hose-reels",
    description:
      "Supply, installation, inspection and testing of fire hose reels to AS 2441.",
    intro:
      "Fire hose reels supplied, installed and tested to AS 2441 with annual servicing.",
    heroImage: "/services/firehose.png",
    iconName: "Droplets",
  },
  {
    id: "diesel-pump",
    slug: "diesel-hydrant-sprinkler",
    description:
      "Inspection, servicing, and testing of diesel fire pump systems, hydrant and sprinkler infrastructure.",
    intro:
      "Monthly inspection and testing of diesel fire pumps and hydrant systems to AS 1851.",
    heroImage: "/services/diesel hydrant.jpg",
    iconName: "Fuel",
  },
  {
    id: "air-mechanical",
    slug: "air-mechanical-services",
    description:
      "Specialised air and mechanical fire safety services including damper inspection, duct systems and HVAC compliance.",
    intro:
      "Fire and smoke damper inspection and HVAC compliance to AS 1668 and the BCA.",
    heroImage: "/services/mechanical.jpg",
    iconName: "Wind",
  },
  {
    id: "flow-testing",
    slug: "flow-testing",
    description:
      "Annual and 5-yearly flow testing for hydrant systems and sprinkler infrastructure to confirm adequate water supply.",
    intro:
      "Annual and 5-yearly hydrant and sprinkler flow tests confirming AS 2419 compliance.",
    heroImage: "/services/flowtest.jpg",
    iconName: "Droplets",
  },
  {
    id: "service-penetration",
    slug: "fire-penetration",
    description:
      "Inspection, sealing, and certification of service penetrations and fire dampers to maintain fire-rated barriers.",
    intro:
      "Fire-rated sealing of service penetrations and damper testing certified to AS 1851.",
    heroImage: "/services/passivefire.jpg",
    iconName: "Construction",
  },
  {
    id: "plans",
    slug: "zone-block-evacuation-plans",
    description:
      "Preparation and supply of fire alarm zone block plans, evacuation diagrams, hydrant block plans, and sprinkler block plans.",
    intro:
      "Zone block plans, evacuation diagrams and hydrant plans — drafted and ready for your AFSS file.",
    heroImage: "/services/zoneblockplan.jpg",
    iconName: "Map",
  },
];

/**
 * The 12 service categories, with their public-facing names applied from the
 * central service data source. Consumers (the /services hub, the detail pages,
 * breadcrumbs, related links, metadata) read `label` / `shortLabel` /
 * `headingLine1` / `headingLine2` from here and therefore always agree with the
 * homepage, the Our Services dropdown and the footer.
 */
export const categories: Category[] = categoryBase.map((category) => ({
  ...category,
  ...serviceNaming(category.id),
}));

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = categories.map((c) => ({
  id: c.id + "-main",
  slug: c.slug,
  name: c.label,
  subtitle: c.intro,
  description: c.description,
  details: [],
  price: "POA",
  model: "",
  styles: [],
  colors: [],
  imageUrl: c.heroImage,
  categoryId: c.id,
  tag: "Service",
}));

// ─── Helper functions ──────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}

export function getCategoryIdFromHref(href: string): string | undefined {
  try {
    const url = new URL(href, "https://allfireservices.com.au");
    const id = url.searchParams.get("category");
    if (!id) return undefined;
    return categories.some((c) => c.id === id) ? id : undefined;
  } catch {
    return undefined;
  }
}

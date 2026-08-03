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
  label: string;
  description: string;
  iconName?: string;
  icon?: string;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: "core-services",
    label: "Core Fire Services",
    description:
      "Our foundational fire protection services: annual statements, monthly inspections, hydrant testing, and more.",
    iconName: "ShieldCheck",
  },
  {
    id: "smoke-alarms",
    label: "Smoke Alarms (AS 3786)",
    description:
      "Compliant standalone and wireless smoke alarms for residential and commercial use, backed by Australian Standard AS 3786.",
    icon: "🔥",
  },
  {
    id: "fire-extinguishers",
    label: "Fire Extinguishers & Signage",
    description:
      "Portable fire extinguishers, blankets, brackets, cabinets, and all associated fire safety signage.",
    icon: "🧯",
  },
  {
    id: "emergency-lights",
    label: "Emergency Lights & Exit Signs",
    description:
      "Self-testing LED emergency batten lights, exit signs, oyster lights, and weatherproof twin-head units — all app-enabled with 5-year warranty.",
    icon: "💡",
  },
  {
    id: "diesel-pump",
    label: "Diesel Pump & Hydrant",
    description:
      "Inspection, servicing, and testing of diesel fire pump systems and hydrant infrastructure.",
    icon: "⛽",
  },
  {
    id: "air-mechanical",
    label: "Air & Mechanical Services",
    description:
      "Specialised air and mechanical fire safety services including damper inspection, duct systems and HVAC compliance.",
    icon: "🌬️",
  },
  {
    id: "flow-testing",
    label: "Flow Testing",
    description:
      "Annual and 5-yearly flow testing for hydrant systems and sprinkler infrastructure to confirm adequate water supply.",
    icon: "💧",
  },
  {
    id: "service-penetration",
    label: "Service Penetration & Fire Dampers",
    description:
      "Inspection, sealing, and certification of service penetrations and fire dampers to maintain fire-rated barriers.",
    iconName: "Construction",
  },
  {
    id: "fire-panel",
    label: "Fire Panel & Detection (AS 1670.1)",
    description:
      "Installation, testing, and maintenance of fire alarm control panels, MCP units, and automatic detection systems.",
    iconName: "Monitor",
  },
  {
    id: "fire-doors",
    label: "Fire Doors",
    description:
      "Inspection, tagging, gap measurement, and non-compliance reporting for fire-rated doors and frames.",
    icon: "🚪",
  },
  {
    id: "plans",
    label: "Plans & Evacuation",
    description:
      "Preparation and supply of fire alarm zone block plans, evacuation diagrams, hydrant block plans, and sprinkler block plans.",
    iconName: "Map",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ── SMOKE ALARMS ──────────────────────────────────────────────────────────
  {
    id: "r10",
    slug: "r10-smoke-detector",
    name: "R10",
    subtitle: "10 Year Battery Stand-Alone Smoke Detector",
    description:
      "The R10 is a high-performance photoelectric smoke detector with a sealed 10-year lithium battery — no battery changes required for the life of the alarm. Ideal for residential and light commercial applications requiring AS 3786 compliance.",
    details: [
      "Photoelectric sensing technology for reliable detection",
      "Sealed 10-year lithium battery — maintenance-free",
      "Loud 85 dB alarm at 3 metres",
      "Built-in test/hush button",
      "Low battery warning indicator",
      "Compliant with AS 3786:2014",
      "Easy push-and-twist installation bracket",
    ],
    price: "$49.00",
    priceNote: "ex. GST per unit",
    model: "R10-SMA-L10",
    styles: [
      { label: "Standard", value: "standard" },
      { label: "Hush Button", value: "hush" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "smoke-alarms",
    warranty: "10 Year",
    standard: "AS 3786:2014",
  },
  {
    id: "r10rf",
    slug: "r10rf-wireless-smoke-detector",
    name: "R10RF",
    subtitle: "10 Year RF Wireless Linkable Smoke Detectors",
    description:
      "The R10RF brings wireless interlinking capability to the proven R10 platform. Up to 24 units can be interconnected — when one sounds, they all sound. Perfect for multi-storey homes, strata buildings, and any property where wiring is not practical.",
    details: [
      "RF wireless interlinking — up to 24 units",
      "When one alarm sounds, all linked alarms sound",
      "Sealed 10-year lithium battery",
      "No wiring required between units",
      "Photoelectric sensing for reliable smoke detection",
      "85 dB alarm output",
      "Compliant with AS 3786:2014",
    ],
    price: "$89.00",
    priceNote: "ex. GST per unit",
    model: "R10RF-SMA-L10",
    styles: [
      { label: "Single Pack", value: "single" },
      { label: "Twin Pack", value: "twin" },
      { label: "3-Pack", value: "triple" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    categoryId: "smoke-alarms",
    warranty: "10 Year",
    standard: "AS 3786:2014",
  },
  {
    id: "r240",
    slug: "r240-240v-smoke-detector",
    name: "R240",
    subtitle: "240v Smoke Detector with 9v Battery Back-Up",
    description:
      "The R240 is a mains-powered 240V smoke detector with a 9V alkaline battery backup to ensure continuous protection during power outages. Hardwired interconnect capability allows multiple units to trigger simultaneously across your property.",
    details: [
      "240V mains powered with 9V alkaline battery backup",
      "Hardwired interconnect — up to 24 units",
      "Photoelectric sensing technology",
      "85 dB alarm at 3 metres",
      "Tamper-resistant mounting base",
      "LED status indicator",
      "Compliant with AS 3786:2014",
    ],
    price: "$69.00",
    priceNote: "ex. GST per unit",
    model: "R240-SMA-AC-9V",
    styles: [
      { label: "Standard", value: "standard" },
      { label: "With Relay", value: "relay" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    categoryId: "smoke-alarms",
    warranty: "5 Year",
    standard: "AS 3786:2014",
  },
  {
    id: "saturn",
    slug: "saturn-smoke-detector",
    name: "Saturn",
    subtitle: "240V Photoelectric Smoke Alarm — 10-Year Lithium",
    description:
      "The Saturn is a premium 240V hard-wired smoke alarm with a 10-year lithium battery backup. A wireless interlinking module upgrade is available to connect up to 24 units without additional wiring. Backed by a 5-year manufacturer warranty.",
    details: [
      "240V mains powered with 10-year lithium battery backup",
      "Optional wireless interlinking module",
      "Photoelectric sensing for early smoke detection",
      "Up to 24 units interconnectable",
      "Tamper-resistant base for security",
      "Hush button for nuisance alarm silencing",
      "Compliant with AS 3786:2014",
    ],
    price: "$119.00",
    priceNote: "ex. GST per unit",
    model: "SATURN-SMA-AC-L10",
    styles: [
      { label: "Classic", value: "classic" },
      { label: "Wireless Interlinking", value: "wireless" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "smoke-alarms",
    warranty: "5 Year",
    standard: "AS 3786:2014",
  },

  // ── FIRE EXTINGUISHERS & SIGNAGE ──────────────────────────────────────────
  {
    id: "ext-1kg-abe",
    slug: "1kg-abe-fire-extinguisher",
    name: "1.0kg ABE Fire Extinguisher",
    subtitle: "Portable Dry Chemical Powder Extinguisher",
    description:
      "Compact and lightweight, the 1.0kg ABE dry chemical powder extinguisher is ideal for small offices, vehicles, boats, and caravans. Effective against Class A (wood/paper), B (flammable liquids), and E (electrical) fires.",
    details: [
      "1.0kg ABE dry chemical powder agent",
      "Effective on Class A, B and E fires",
      "Pressure gauge for quick visual check",
      "Galvanised steel cylinder — corrosion resistant",
      "Safety pin and tamper seal included",
      "Supplied with wall bracket",
      "AS/NZS 1841.5 compliant",
    ],
    price: "$39.00",
    priceNote: "ex. GST",
    model: "EXT-1KG-ABE",
    styles: [
      { label: "With Bracket", value: "bracket" },
      { label: "Without Bracket", value: "no-bracket" },
    ],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.5",
  },
  {
    id: "ext-2-5kg-abe",
    slug: "2-5kg-abe-fire-extinguisher",
    name: "2.5kg ABE Fire Extinguisher",
    subtitle: "Mid-Range Dry Chemical Powder Extinguisher",
    description:
      "A versatile mid-range ABE extinguisher suited to small commercial premises, storerooms, and workshops. The 2.5kg ABE is the most commonly specified extinguisher for general fire risk areas.",
    details: [
      "2.5kg ABE dry chemical powder agent",
      "Suits offices, retail, light industrial",
      "Discharge time: ~12 seconds",
      "Range: up to 4 metres",
      "Pressure gauge and safety pin included",
      "AS/NZS 1841.5 compliant",
    ],
    price: "$59.00",
    priceNote: "ex. GST",
    model: "EXT-2.5KG-ABE",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.5",
  },
  {
    id: "ext-3-5kg-co2",
    slug: "3-5kg-co2-fire-extinguisher",
    name: "3.5kg CO₂ Fire Extinguisher",
    subtitle: "Carbon Dioxide Extinguisher — No Residue",
    description:
      "CO₂ extinguishers leave zero residue, making them the preferred choice for server rooms, data centres, laboratories, and anywhere sensitive electronics are present. The 3.5kg unit provides a solid discharge duration with minimal mess.",
    details: [
      "3.5kg CO₂ agent — leaves no powder residue",
      "Ideal for electrical and electronic equipment",
      "Horn applicator for precise discharge",
      "High-pressure seamless cylinder",
      "No pressure gauge (CO₂ characteristic)",
      "AS/NZS 1841.2 compliant",
    ],
    price: "$89.00",
    priceNote: "ex. GST",
    model: "EXT-3.5KG-CO2",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red / Black band", value: "red-black" }],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.2",
  },
  {
    id: "ext-4-5kg-abe",
    slug: "4-5kg-abe-fire-extinguisher",
    name: "4.5kg ABE Fire Extinguisher",
    subtitle: "Heavy-Duty Dry Chemical Powder Extinguisher",
    description:
      "The 4.5kg ABE is a workhorse extinguisher found across commercial kitchens, warehouses, and manufacturing facilities. Its generous capacity provides up to 18 seconds of discharge time and a range of up to 6 metres.",
    details: [
      "4.5kg ABE dry chemical powder agent",
      "Discharge time: ~18 seconds",
      "Range: up to 6 metres",
      "Commercial-grade valve and pressure gauge",
      "Wall bracket included",
      "AS/NZS 1841.5 compliant",
    ],
    price: "$79.00",
    priceNote: "ex. GST",
    model: "EXT-4.5KG-ABE",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.5",
  },
  {
    id: "ext-5kg-co2",
    slug: "5kg-co2-fire-extinguisher",
    name: "5.0kg CO₂ Fire Extinguisher",
    subtitle: "Large Carbon Dioxide Extinguisher",
    description:
      "For larger server rooms, switchrooms, and commercial kitchens with significant electrical hazards, the 5.0kg CO₂ provides extended coverage with no chemical cleanup. Preferred by IT managers and facilities teams throughout Greater Sydney.",
    details: [
      "5.0kg CO₂ — extended discharge duration",
      "Zero residue — protects sensitive equipment",
      "Wide-bore horn for broad coverage",
      "Seamless high-pressure cylinder",
      "AS/NZS 1841.2 compliant",
    ],
    price: "$119.00",
    priceNote: "ex. GST",
    model: "EXT-5KG-CO2",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red / Black band", value: "red-black" }],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.2",
  },
  {
    id: "ext-7l-wet-chem",
    slug: "7l-wet-chem-fire-extinguisher",
    name: "7L Wet Chemical Fire Extinguisher",
    subtitle: "Kitchen-Specific Class F Wet Chemical Extinguisher",
    description:
      "Wet chemical extinguishers are specifically designed for commercial cooking areas and deep fryers (Class F fires). The 7L unit saponifies burning cooking oils — smothering the fire and preventing re-ignition. Required by AS 2441 for commercial kitchens.",
    details: [
      "7 litre wet chemical agent",
      "Class F (cooking oil/fat) fire suppression",
      "Saponification prevents re-ignition",
      "Long lance for safe stand-off distance",
      "Suitable for all commercial kitchen environments",
      "AS/NZS 1841.6 compliant",
    ],
    price: "$139.00",
    priceNote: "ex. GST",
    model: "EXT-7L-WETCHEM",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red / Canary yellow band", value: "red-yellow" }],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.6",
  },
  {
    id: "ext-9kg-abe",
    slug: "9kg-abe-fire-extinguisher",
    name: "9.0kg ABE Fire Extinguisher",
    subtitle: "Industrial-Grade Dry Chemical Powder Extinguisher",
    description:
      "The 9.0kg ABE is specified for large warehouses, plant rooms, carparks, and any high-risk industrial environment. It delivers maximum discharge capacity in a manageable form factor, with a broad 7-metre range.",
    details: [
      "9.0kg ABE dry chemical powder agent",
      "Discharge time: ~24 seconds",
      "Range: up to 7 metres",
      "Industrial-grade steel cylinder with anti-corrosion coating",
      "Easy-grip handle and pressure gauge",
      "AS/NZS 1841.5 compliant",
    ],
    price: "$109.00",
    priceNote: "ex. GST",
    model: "EXT-9KG-ABE",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.5",
  },
  {
    id: "ext-9l-foam",
    slug: "9l-foam-fire-extinguisher",
    name: "9.0L Foam (AFFF) Fire Extinguisher",
    subtitle: "Aqueous Film-Forming Foam Extinguisher",
    description:
      "AFFF foam extinguishers are highly effective on Class A and B fires. The foam blankets the burning material, cutting off oxygen and preventing re-ignition. Ideal for fuel storage areas, plant rooms, and vehicle workshops.",
    details: [
      "9.0 litre AFFF foam agent",
      "Effective on Class A and Class B fires",
      "Forms an aqueous film to prevent re-ignition",
      "Range: up to 5 metres",
      "Pressure gauge for quick status check",
      "AS/NZS 1841.4 compliant",
    ],
    price: "$99.00",
    priceNote: "ex. GST",
    model: "EXT-9L-AFFF",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red / Blue band", value: "red-blue" }],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "fire-extinguishers",
    warranty: "1 Year",
    standard: "AS/NZS 1841.4",
  },
  {
    id: "ext-cover-4-5kg",
    slug: "fire-extinguisher-cover-4-5kg",
    name: "Fire Extinguisher Cover — 4.5KG",
    subtitle: "Heavy-Duty Weatherproof Extinguisher Cover",
    description:
      "Protect your 4.5kg extinguisher from UV, rain, and dust with this heavy-duty weatherproof cover. Ideal for outdoor and semi-exposed locations including carparks, loading docks, and external plant areas.",
    details: [
      "Fits standard 4.5kg dry powder extinguishers",
      "UV-stabilised polyester construction",
      "Velcro closure for quick access",
      "Drain hole at base prevents water pooling",
      "High-visibility red with safety markings",
    ],
    price: "$24.00",
    priceNote: "ex. GST",
    model: "COVER-4.5KG",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fire-extinguishers",
  },
  {
    id: "ext-signs",
    slug: "fire-extinguisher-signs",
    name: "Fire Extinguisher Signs",
    subtitle: "Compliant AS 2444 Fire Extinguisher Identification Signs",
    description:
      "Photoluminescent and standard fire extinguisher identification signs, compliant with AS 2444. Available in a range of sizes and materials including rigid PVC, self-adhesive vinyl, and aluminium for permanent installations.",
    details: [
      "Compliant with AS 2444 sign requirements",
      "Available: rigid PVC, self-adhesive, and aluminium",
      "Photoluminescent option glows in power failure",
      "Multiple sizes: A4, A3, and custom",
      "UV-resistant inks — suitable for outdoor use",
    ],
    price: "$12.00",
    priceNote: "ex. GST per sign",
    model: "SIGN-EXT-STD",
    styles: [
      { label: "Self-Adhesive", value: "adhesive" },
      { label: "Rigid PVC", value: "pvc" },
      { label: "Aluminium", value: "aluminium" },
    ],
    colors: [
      { label: "Red / White", value: "red-white" },
      { label: "Photoluminescent", value: "glow" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "fire-extinguishers",
  },
  {
    id: "ext-bracket",
    slug: "fire-extinguisher-bracket",
    name: "Fire Extinguisher Bracket",
    subtitle: "Heavy-Duty Wall-Mount Extinguisher Bracket",
    description:
      "Universal wall-mounting bracket compatible with 1kg to 9kg dry powder and CO₂ extinguishers. The adjustable design accommodates varying cylinder diameters and ensures quick-release access in an emergency.",
    details: [
      "Fits 1kg to 9kg extinguisher cylinders",
      "Adjustable jaw for multiple cylinder diameters",
      "Quick-release lever for fast access",
      "Powder-coated steel for corrosion resistance",
      "Stainless steel fixings included",
    ],
    price: "$18.00",
    priceNote: "ex. GST",
    model: "BRACKET-UNIV",
    styles: [
      { label: "Standard", value: "standard" },
      { label: "Heavy Duty", value: "heavy-duty" },
    ],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "fire-extinguishers",
  },
  {
    id: "ext-cabinet",
    slug: "fire-extinguisher-cabinet",
    name: "Fire Extinguisher Cabinet",
    subtitle: "Surface-Mount Extinguisher Storage Cabinet",
    description:
      "A surface-mount glass-front cabinet that stores and protects your fire extinguisher while keeping it highly visible. Ideal for hospitality, retail, and commercial corridors where aesthetics matter. Break-glass panel allows immediate access.",
    details: [
      "Powder-coated steel construction",
      "Break-glass front panel — instant access",
      "Fits up to 4.5kg or 5.0kg extinguisher",
      "Supplied with mounting hardware",
      "Optional recessed mounting kit available",
      "Red with clear door for maximum visibility",
    ],
    price: "$95.00",
    priceNote: "ex. GST",
    model: "CAB-EXT-SM",
    styles: [
      { label: "Surface Mount", value: "surface" },
      { label: "Recessed", value: "recessed" },
    ],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fire-extinguishers",
  },

  // ── EMERGENCY LIGHTS & EXIT SIGNS ─────────────────────────────────────────
  {
    id: "bondi-4ft-diffuser",
    slug: "bondi-4ft-diffuser-emergency-batten",
    name: "Bondi 4ft Diffuser",
    subtitle: "LED Emergency Batten Light — Self-Test with App",
    description:
      "The Bondi 4ft Diffuser emergency batten light delivers powerful, even-spread illumination across corridors, stairwells, and open-plan workspaces. The built-in self-test module conducts automatic monthly and 6-monthly tests, logging results accessible via the companion app.",
    details: [
      "4ft (1200mm) LED batten with diffuser",
      "Maintained and non-maintained operating modes",
      "Self-testing with automatic monthly and 6-monthly cycles",
      "Bluetooth app for pass/fail log access",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$189.00",
    priceNote: "ex. GST",
    model: "BONDI-4FT-DIFF-ST",
    styles: [
      { label: "Maintained", value: "maintained" },
      { label: "Non-Maintained", value: "non-maintained" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "bondi-4ft-wireguard",
    slug: "bondi-4ft-wireguard-emergency-batten",
    name: "Bondi 4ft Wireguard",
    subtitle: "LED Emergency Batten Light with Wireguard — Self-Test with App",
    description:
      "The Bondi 4ft Wireguard is the industrial-rated version of our Bondi batten, featuring a robust powder-coated steel wireguard cage to protect the fitting against impact damage in warehouses, plant rooms, and car parks.",
    details: [
      "4ft (1200mm) LED batten with heavy-duty wireguard",
      "Impact-resistant for industrial environments",
      "Self-testing — automatic monthly & 6-monthly cycles",
      "Bluetooth app logging",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$219.00",
    priceNote: "ex. GST",
    model: "BONDI-4FT-WG-ST",
    styles: [
      { label: "Maintained", value: "maintained" },
      { label: "Non-Maintained", value: "non-maintained" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "bondi-2ft-diffuser",
    slug: "bondi-2ft-diffuser-emergency-batten",
    name: "Bondi 2ft Diffuser",
    subtitle: "Compact LED Emergency Batten Light — Self-Test with App",
    description:
      "Where ceiling height or space is limited, the Bondi 2ft Diffuser provides compliant emergency illumination in a compact 600mm form factor. Ideal for small offices, amenities rooms, and retail spaces.",
    details: [
      "2ft (600mm) LED batten with diffuser",
      "Self-testing — automatic monthly & 6-monthly cycles",
      "Bluetooth app for test log access",
      "Emergency duration: 90+ minutes",
      "Easy surface mount installation",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$149.00",
    priceNote: "ex. GST",
    model: "BONDI-2FT-DIFF-ST",
    styles: [
      { label: "Maintained", value: "maintained" },
      { label: "Non-Maintained", value: "non-maintained" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "bondi-2ft-wireguard",
    slug: "bondi-2ft-wireguard-emergency-batten",
    name: "Bondi 2ft Wireguard",
    subtitle: "Compact LED Emergency Batten with Wireguard — Self-Test with App",
    description:
      "The Bondi 2ft Wireguard combines the compact 600mm form factor with a robust protective wireguard for demanding industrial environments where compact size and impact resistance are both required.",
    details: [
      "2ft (600mm) LED batten with heavy-duty wireguard",
      "Self-testing — automatic monthly & 6-monthly cycles",
      "Bluetooth app logging",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$179.00",
    priceNote: "ex. GST",
    model: "BONDI-2FT-WG-ST",
    styles: [
      { label: "Maintained", value: "maintained" },
      { label: "Non-Maintained", value: "non-maintained" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "manly-exit-sign",
    slug: "manly-led-emergency-exit-sign",
    name: "Manly",
    subtitle: "LED Emergency Exit Sign — Self-Test with App",
    description:
      "The Manly is a slim, modern LED emergency exit sign that integrates seamlessly into contemporary interiors. Its self-testing module automatically conducts the required monthly and 6-monthly compliance tests, with results accessible via the mobile app.",
    details: [
      "Single or double-sided face options",
      "Ultra-slim profile — 28mm deep",
      "Self-testing: monthly & 6-monthly auto cycles",
      "Bluetooth app for pass/fail log",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$159.00",
    priceNote: "ex. GST",
    model: "MANLY-EXIT-ST",
    styles: [
      { label: "Single Face", value: "single" },
      { label: "Double Face", value: "double" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "maslin-blade-exit",
    slug: "maslin-led-emergency-blade-exit-sign",
    name: "Maslin",
    subtitle: "LED Emergency Blade Exit Sign with Spitfire — Self-Test with App",
    description:
      "The Maslin blade exit sign mounts directly to a junction box and features an integrated Spitfire emergency spitfire module for combined exit signage and emergency illumination. An all-in-one solution for corridors and stairwells.",
    details: [
      "Blade mount — direct junction box installation",
      "Integrated Spitfire emergency light head",
      "Self-testing: automatic monthly & 6-monthly",
      "Bluetooth app logging",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$199.00",
    priceNote: "ex. GST",
    model: "MASLIN-BLADE-SP-ST",
    styles: [
      { label: "Single Face", value: "single" },
      { label: "Double Face", value: "double" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "sunrise-recessed",
    slug: "sunrise-led-recessed-emergency-spitfire",
    name: "Sunrise",
    subtitle: "LED Recessed Emergency Spitfire — Self-Test with App",
    description:
      "The Sunrise installs flush into the ceiling, providing a completely unobtrusive emergency spitfire light head. Perfect for premium commercial fitouts, hotels, and hospitality venues where aesthetics are paramount.",
    details: [
      "Fully recessed ceiling installation",
      "Directional Spitfire head — adjustable aim",
      "Self-testing with monthly & 6-monthly cycles",
      "Bluetooth app for compliance log",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$229.00",
    priceNote: "ex. GST",
    model: "SUNRISE-REC-SP-ST",
    styles: [
      { label: "Standard", value: "standard" },
      { label: "With Exit Sign", value: "with-sign" },
    ],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "ocean-oyster",
    slug: "ocean-led-emergency-oyster-light",
    name: "Ocean",
    subtitle: "LED Emergency Oyster Light — Self-Test with App",
    description:
      "The Ocean is an oyster-style emergency light that blends discreetly into domestic and commercial ceilings. Its circular form and slim profile suit apartments, hotel rooms, aged care facilities, and strata common areas.",
    details: [
      "Round oyster profile — 300mm diameter",
      "Surface ceiling mount — no recess required",
      "Self-testing with monthly & 6-monthly auto cycles",
      "Bluetooth app logging",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$169.00",
    priceNote: "ex. GST",
    model: "OCEAN-OYS-ST",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "White", value: "white" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },
  {
    id: "floreat-weatherproof",
    slug: "floreat-weatherproof-led-twin-head-emergency",
    name: "Floreat",
    subtitle: "Weatherproof LED Twin Head Emergency Light — Self-Test with App",
    description:
      "The Floreat is purpose-built for outdoor and wet-area emergency lighting. Its IP65-rated weatherproof enclosure houses twin high-output LED heads, delivering broad emergency illumination for external stairwells, covered car parks, and loading docks.",
    details: [
      "IP65 weatherproof rating",
      "Twin adjustable LED emergency heads",
      "Self-testing: automatic monthly & 6-monthly cycles",
      "Bluetooth app for compliance log",
      "Emergency duration: 90+ minutes",
      "5-year manufacturer warranty",
      "Compliant with AS/NZS 2293.1",
    ],
    price: "$259.00",
    priceNote: "ex. GST",
    model: "FLOREAT-WP-TH-ST",
    styles: [{ label: "Standard", value: "standard" }],
    colors: [{ label: "Grey", value: "grey" }],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "emergency-lights",
    warranty: "5 Year",
    standard: "AS/NZS 2293.1",
  },

  // ── DIESEL PUMP & HYDRANT ──────────────────────────────────────────────────
  {
    id: "diesel-electric-inspection",
    slug: "diesel-sprinkler-electric-inspection",
    name: "Diesel/Sprinkler Electric Inspection",
    subtitle: "Monthly Compliance Inspection Service",
    description:
      "Our certified technicians carry out a full monthly inspection of your diesel fire pump and electric sprinkler pump systems in accordance with AS 1851. Inspection reports are provided digitally and retained for AFSS submission.",
    details: [
      "Monthly inspection per AS 1851",
      "Full pump start-up and run test",
      "Check of fuel levels, battery condition, and controls",
      "Pressure gauge and flow rate verification",
      "Digital inspection report issued same day",
      "AFSS-ready documentation",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-DIESEL-ELEC",
    styles: [
      { label: "Monthly", value: "monthly" },
      { label: "Quarterly", value: "quarterly" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    categoryId: "diesel-pump",
    tag: 'Service',
  },
  {
    id: "hydrant-valve",
    slug: "hydrant-valve-inspection",
    name: "Hydrant Valve",
    subtitle: "Hydrant Valve Inspection & Replacement",
    description:
      "Hydrant valves are critical points in your fire water supply system. Our technicians inspect each valve for leaks, correct operation, and compliance with AS 2419. Faulty or non-compliant valves are replaced using AS-approved components.",
    details: [
      "Full valve operation check",
      "Leak and corrosion inspection",
      "Pressure test after service",
      "AS 2419 compliant replacements supplied",
      "Photo-documented inspection report",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-HYD-VALVE",
    styles: [
      { label: "Inspection Only", value: "inspection" },
      { label: "Inspection + Replacement", value: "replacement" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "diesel-pump",
    tag: 'Service',
  },
  {
    id: "diesel-servicing",
    slug: "diesel-fire-pump-servicing",
    name: "Diesel Servicing",
    subtitle: "Full Diesel Fire Pump Service & Maintenance",
    description:
      "Our comprehensive diesel fire pump service covers oil changes, fuel filter replacement, air filter cleaning, belt inspection, battery load testing, and a full operational run test. All work is carried out by licenced technicians to AS 1851 requirements.",
    details: [
      "Engine oil and filter change",
      "Fuel filter replacement",
      "Air filter inspection and clean",
      "Drive belt and coupling inspection",
      "Battery load test and terminal clean",
      "Full operational run test (30 minutes minimum)",
      "Detailed service report provided",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-DIESEL-FULL",
    styles: [
      { label: "Standard Service", value: "standard" },
      { label: "Major Service", value: "major" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    categoryId: "diesel-pump",
    tag: 'Service',
  },
  {
    id: "jacking-pump",
    slug: "jacking-pump-inspection",
    name: "Jacking Pump",
    subtitle: "Jockey/Jacking Pump Inspection & Testing",
    description:
      "The jockey pump (jacking pump) maintains pressure in your fire protection system between main pump cycles. Our inspection checks for correct cut-in and cut-out pressures, seal integrity, and motor condition — ensuring the main pump is only triggered when genuinely needed.",
    details: [
      "Cut-in and cut-out pressure verification",
      "Motor and impeller condition check",
      "Seal and packing inspection for leaks",
      "Pressure switch calibration check",
      "Run test and pressure log",
      "Written report for AFSS records",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-JACK-PUMP",
    styles: [{ label: "Standard Inspection", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "diesel-pump",
    tag: 'Service',
  },

  // ── AIR & MECHANICAL SERVICES ──────────────────────────────────────────────
  {
    id: "air-mechanical-services",
    slug: "air-mechanical-fire-services",
    name: "Air & Mechanical Services",
    subtitle: "HVAC, Dampers & Duct Fire Safety Compliance",
    description:
      "Our air and mechanical fire services team specialises in the inspection, testing, and certification of fire and smoke dampers, HVAC systems, and ductwork penetrations. We ensure your mechanical systems comply with the BCA and AS 1668.",
    details: [
      "Fire and smoke damper inspection & testing",
      "HVAC fire compliance assessment",
      "Ductwork penetration sealing and certification",
      "Fan shutdown system testing",
      "Pressurisation system verification",
      "AS 1668 and BCA compliant reporting",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-AIR-MECH",
    styles: [
      { label: "Annual Inspection", value: "annual" },
      { label: "5-Yearly Full Test", value: "5-yearly" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    categoryId: "air-mechanical",
    tag: 'Service',
  },

  // ── FLOW TESTING ──────────────────────────────────────────────────────────
  {
    id: "flow-test",
    slug: "flow-test-hydrant",
    name: "Flow Test",
    subtitle: "Annual Hydrant Flow Test",
    description:
      "Our annual flow test assesses the static and residual pressure and flow rate of your building's fire hydrant system at the most hydraulically disadvantaged outlet. Results determine whether adequate water supply exists for fire brigade operations.",
    details: [
      "Static and residual pressure measurement",
      "Flow rate at hydraulically disadvantaged outlet",
      "Comparison against AS 2419 design requirements",
      "Written test report with pressure/flow charts",
      "Suitable for AFSS supporting documentation",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-FLOW-TEST",
    styles: [{ label: "Standard Flow Test", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "flow-testing",
    tag: 'Service',
  },
  {
    id: "hydrostatic-test",
    slug: "5-yearly-hydrostatic-test-hydrant",
    name: "5-Yearly Hydrostatic Test — Hydrant",
    subtitle: "AS 1851 5-Yearly Pressure Test for Hydrant Pipework",
    description:
      "Every five years, your hydrant system's underground and internal pipework must undergo a hydrostatic pressure test to identify any leaks or structural weaknesses. Our team pressure-fills and holds the system to the required test pressure, documenting results for regulatory compliance.",
    details: [
      "Full system hydrostatic pressure test",
      "Test pressure to AS 1851 requirements",
      "Hold period: 2 hours minimum",
      "Leak detection and identification",
      "Comprehensive test certificate issued",
      "Required for 5-yearly AFSS submission",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-HYDRO-5YR",
    styles: [{ label: "Standard Test", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "flow-testing",
    tag: 'Service',
  },
  {
    id: "hydrant-flow-appliance",
    slug: "5-yearly-hydrant-flow-test-fire-appliance",
    name: "5-Yearly Hydrant Flow Test — Fire Truck Appliance Simulation",
    subtitle: "AS 1851 Fire Appliance Simulation Flow Test",
    description:
      "This advanced flow test simulates fire brigade appliance demand, confirming that your hydrant system can deliver sufficient flow simultaneously to multiple attack points. Conducted in conjunction with the relevant fire authority where required.",
    details: [
      "Simultaneous multi-outlet flow simulation",
      "Fire truck appliance demand simulation",
      "Pressure and flow measurements at all test points",
      "Comparison against AS 2419 design specification",
      "Full test report with fire authority acceptance documentation",
      "5-yearly compliance certificate",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-FLOW-5YR-APP",
    styles: [{ label: "Standard Simulation", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "flow-testing",
    tag: 'Service',
  },

  // ── SERVICE PENETRATION & FIRE DAMPERS ────────────────────────────────────
  {
    id: "service-penetration",
    slug: "service-penetration-fire-sealing",
    name: "Service Penetration Sealing",
    subtitle: "Fire-Rated Sealing of Service Penetrations",
    description:
      "Unsealed service penetrations through fire-rated walls and floors compromise the entire passive fire protection system of your building. Our team installs certified fire-rated sealants, collars, pillows, and intumescent products to restore the fire rating of every affected surface.",
    details: [
      "Inspection and mapping of all service penetrations",
      "Supply and installation of approved fire-stop products",
      "Intumescent collars for plastic pipes",
      "Fire-rated caulk and sealant for cable penetrations",
      "Firestop pillows for large service openings",
      "Detailed certification report for each penetration",
      "BCA Section C compliant outcomes",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-PEN-SEAL",
    styles: [
      { label: "Inspection & Certification", value: "inspect" },
      { label: "Inspect & Remediate", value: "remediate" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "service-penetration",
    tag: 'Service',
  },
  {
    id: "fire-damper-inspection",
    slug: "fire-damper-inspection-testing",
    name: "Fire Damper Inspection & Testing",
    subtitle: "Annual Fire Damper Testing per AS 1851",
    description:
      "Fire dampers prevent fire and smoke from travelling through your HVAC ductwork. Our annual inspection confirms that every damper operates correctly under fusible link release or electric signal — and resets properly for continued building operation.",
    details: [
      "Fusible link inspection and replacement where due",
      "Electric actuator function test",
      "Blade position confirmation — open and closed states",
      "Access panel adequacy check",
      "Cleaning of damper blade and housing",
      "Test certificate for each damper",
      "AS 1851 compliant documentation",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-DAMPER-TEST",
    styles: [
      { label: "Annual Inspection", value: "annual" },
      { label: "5-Yearly Full Test", value: "5-yearly" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "service-penetration",
    tag: 'Service',
  },

  // ── FIRE PANEL & DETECTION (AS 1670.1) ────────────────────────────────────
  {
    id: "mcp",
    slug: "manual-call-point-inspection",
    name: "MCP — Manual Call Point",
    subtitle: "Manual Call Point Inspection & Testing",
    description:
      "Manual Call Points (MCPs) are the most visible component of your fire detection system. Our inspection confirms correct operation, glass element integrity, weatherproof sealing (where applicable), and correct zone assignment within your fire panel.",
    details: [
      "Visual inspection of housing and glass element",
      "Functional test — electrical continuity confirmation",
      "Zone assignment and panel response verification",
      "Glass element replacement where required",
      "Weatherproof sealing check for outdoor units",
      "Test record entered into panel log",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-MCP-TEST",
    styles: [{ label: "Inspection & Test", value: "inspect" }],
    colors: [{ label: "Red", value: "red" }],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "fire-panel",
    tag: 'Service',
  },
  {
    id: "auto-fire-detection",
    slug: "automatic-fire-detection-system",
    name: "Automatic Fire Detection System",
    subtitle: "AS 1670.1 Automatic Fire Detection & Alarm System",
    description:
      "Our team designs, supplies, installs, commissions, and maintains automatic fire detection and alarm systems (AFDS) in accordance with AS 1670.1. Whether you need a new system for a new fitout or a full upgrade of an ageing panel, we deliver end-to-end solutions.",
    details: [
      "Design to AS 1670.1 requirements",
      "Supply and installation of detectors, MCPs, sounders and strobes",
      "Addressable and conventional panel options",
      "Full commissioning and handover testing",
      "Annual inspection and maintenance contracts available",
      "Integration with BMS and access control systems",
      "24/7 monitoring connection available",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-AFDS-AS1670",
    styles: [
      { label: "New Installation", value: "new" },
      { label: "Upgrade / Expansion", value: "upgrade" },
      { label: "Maintenance Contract", value: "maintenance" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    categoryId: "fire-panel",
    tag: 'Service',
  },

  // ── FIRE DOORS ─────────────────────────────────────────────────────────────
  {
    id: "door-tag",
    slug: "fire-door-tag-inspection",
    name: "Door Tag",
    subtitle: "Fire Door Inspection Tag & Compliance Label",
    description:
      "Every fire door requires a current inspection tag confirming it has been inspected and complies with AS 1905.1. Our technicians inspect the door, apply the compliance tag, and issue a supporting inspection record for your AFSS submission.",
    details: [
      "Physical inspection against AS 1905.1 requirements",
      "Durable weather-resistant compliance tag applied",
      "Inspection date, technician ID, and next due date recorded",
      "Digital inspection record provided",
      "Non-compliance items flagged for remediation",
    ],
    price: "$35.00",
    priceNote: "ex. GST per door",
    model: "INSP-DOOR-TAG",
    styles: [{ label: "Standard Tag", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fire-doors",
    tag: 'Service',
  },
  {
    id: "frame-tag",
    slug: "fire-door-frame-tag",
    name: "Frame Tag",
    subtitle: "Fire Door Frame Compliance Inspection",
    description:
      "The door frame must be certified and in sound condition for the fire door assembly to achieve its rated performance. Our frame tag service inspects the frame, hardware, and seal, applying a separate compliance tag in accordance with the relevant standard.",
    details: [
      "Frame integrity and anchor bolt inspection",
      "Intumescent strip condition check",
      "Compliance tag applied to frame",
      "Defect and non-compliance report provided",
    ],
    price: "$25.00",
    priceNote: "ex. GST per frame",
    model: "INSP-FRAME-TAG",
    styles: [{ label: "Standard Tag", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fire-doors",
    tag: 'Service',
  },
  {
    id: "door-gap",
    slug: "fire-door-gap-measurement",
    name: "Door Gap Measurement",
    subtitle: "Fire Door Perimeter Gap Compliance Check",
    description:
      "Excessive door gaps allow heat, smoke, and flame to pass through a fire door assembly, significantly reducing its effective fire resistance. We use calibrated feeler gauges to measure all perimeter gaps and document compliance against the 3mm maximum specified in AS 1905.1.",
    details: [
      "Measurement of top, side, and bottom gaps",
      "Calibrated feeler gauge used for accuracy",
      "AS 1905.1 maximum 3mm gap standard applied",
      "Digital report with gap measurements recorded",
      "Remediation options quoted where gaps exceed limits",
    ],
    price: "$25.00",
    priceNote: "ex. GST per door",
    model: "INSP-DOOR-GAP",
    styles: [{ label: "Standard Measurement", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fire-doors",
    tag: 'Service',
  },
  {
    id: "non-compliance-door",
    slug: "non-compliance-fire-door-report",
    name: "Non-Compliance Door Report",
    subtitle: "Detailed Non-Compliance Report & Remediation Guidance",
    description:
      "When a fire door fails inspection, a formal non-compliance report must be raised to satisfy the Annual Fire Safety Statement process and protect the building owner. Our report details each defect, its relevant standard, the risk level, and a clear remediation pathway.",
    details: [
      "Comprehensive defect-by-defect report",
      "Reference to relevant clauses of AS 1905.1",
      "Risk level rating for each defect (critical / major / minor)",
      "Photographic evidence for each non-conformance",
      "Remediation cost estimate and timeline",
      "Report suitable for submission to council or certifier",
    ],
    price: "$75.00",
    priceNote: "ex. GST per door",
    model: "INSP-DOOR-NCR",
    styles: [{ label: "Standard Report", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fire-doors",
    tag: 'Service',
  },

  // ── PLANS & EVACUATION ────────────────────────────────────────────────────
  {
    id: "fire-alarm-zone-plan",
    slug: "fire-alarm-zone-block-plan",
    name: "Fire Alarm Zone Block Plan",
    subtitle: "AS 1670.1 Compliant Fire Alarm Zone Plan",
    description:
      "A fire alarm zone block plan is a schematic diagram showing the physical layout of your fire detection system zones relative to the building floor plan. Required by AS 1670.1, it enables first responders to quickly locate the area of activation.",
    details: [
      "CAD-drafted to AS 1670.1 requirements",
      "Zone boundaries clearly delineated",
      "Detector and MCP locations shown",
      "Panel and sounder locations indicated",
      "Suitable for display adjacent to fire panel",
      "PDF and editable CAD file supplied",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "PLAN-ZONE-BLOCK",
    styles: [
      { label: "New Plan", value: "new" },
      { label: "Update Existing", value: "update" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "plans",
    tag: 'Service',
  },
  {
    id: "evacuation-plan",
    slug: "evacuation-plan",
    name: "Evacuation Plan",
    subtitle: "AS 3745 Emergency Evacuation Diagram",
    description:
      "Evacuation diagrams are mandatory under AS 3745 for most commercial and multi-residential buildings. Our plans are professionally drafted, showing emergency exits, assembly points, extinguisher locations, fire hose reel positions, and the 'You Are Here' marker.",
    details: [
      "Drafted to AS 3745:2010 requirements",
      "Clear emergency exit routes highlighted",
      "Assembly point location shown",
      "Extinguisher and fire hose reel locations",
      "AED location where applicable",
      "You Are Here indicator on each plan",
      "Printed on durable weatherproof material",
    ],
    price: "$195.00",
    priceNote: "ex. GST per floor",
    model: "PLAN-EVAC",
    styles: [
      { label: "A3 Printed", value: "a3" },
      { label: "A2 Printed", value: "a2" },
      { label: "Digital Only", value: "digital" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "plans",
    tag: 'Service',
  },
  {
    id: "hydrant-block-plan",
    slug: "hydrant-block-plan",
    name: "Hydrant Block Plan",
    subtitle: "Building Hydrant System Schematic Plan",
    description:
      "A hydrant block plan provides a schematic overview of your building's hydrant infrastructure, including booster assemblies, valve locations, pipe routes, and storeys served. Required as part of the Annual Fire Safety Statement documentation package.",
    details: [
      "Schematic layout of full hydrant system",
      "Booster assembly and landing valve locations",
      "Main shutoff valve positions indicated",
      "Pipe sizes and flow directions shown",
      "PDF and editable CAD file supplied",
      "Suitable for AFSS submission",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "PLAN-HYD-BLOCK",
    styles: [
      { label: "New Plan", value: "new" },
      { label: "Update Existing", value: "update" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "plans",
    tag: 'Service',
  },
  {
    id: "sprinkler-block-plan",
    slug: "sprinkler-block-plan",
    name: "Sprinkler Block Plan",
    subtitle: "Building Sprinkler System Schematic Plan",
    description:
      "A sprinkler block plan is a high-level schematic showing the layout of your sprinkler system zones, control valves, booster assemblies, and pipe distribution. Required for AS 1851 compliance documentation and AFSS submissions.",
    details: [
      "Zone valve locations and zone boundaries",
      "Alarm check valve and test drain positions",
      "Booster connection and main shutoff",
      "Pipe distribution schematic",
      "PDF and editable CAD file supplied",
      "Suitable for AS 1851 compliance records",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "PLAN-SPR-BLOCK",
    styles: [
      { label: "New Plan", value: "new" },
      { label: "Update Existing", value: "update" },
    ],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80",
    categoryId: "plans",
    tag: 'Service',
  },

  // ── CORE SERVICES ──────────────────────────────────────────────────────────
  {
    id: "annual-fire-safety-statement",
    slug: "annual-fire-safety-statement",
    name: "Annual Fire Safety Statement",
    subtitle: "AFSS Inspection, Documentation & Submission",
    description:
      "The Annual Fire Safety Statement (AFSS) is a legal requirement for most commercial buildings in NSW. All Fire Services manages the full process — from coordinating all essential fire safety measure inspections through to preparing and submitting the statement to your local council.",
    details: [
      "Coordination of all essential fire safety measure inspections",
      "Qualified Essential Fire Safety Measure (EFSM) assessors",
      "Full documentation and record keeping",
      "Statement preparation and council submission",
      "Year-round compliance support",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-AFSS",
    styles: [{ label: "Full Service", value: "full" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    categoryId: "core-services",
    tag: 'Service',
  },
  {
    id: "monthly-fire-inspection",
    slug: "monthly-fire-inspection",
    name: "Monthly Fire Inspection",
    subtitle: "Monthly Fire Safety Equipment Inspection",
    description:
      "Regular monthly inspections keep your fire safety equipment in peak condition and your building continuously compliant between AFSS submissions. Our technicians inspect all specified essential fire safety measures and issue a digital inspection report.",
    details: [
      "Monthly inspection of all essential fire safety measures",
      "Extinguisher, hose reel, and detector checks",
      "Emergency and exit light function test",
      "Digital inspection report same day",
      "Defect notification and quoting service",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-MONTHLY",
    styles: [{ label: "Full Inspection", value: "full" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    categoryId: "core-services",
    tag: 'Service',
  },
  {
    id: "smoke-alarm-test",
    slug: "smoke-alarm-test",
    name: "Smoke Alarm Test",
    subtitle: "Smoke Alarm Inspection & Testing Service",
    description:
      "Smoke alarm testing confirms that every alarm in your building activates correctly and communicates with the fire panel where applicable. We test using approved smoke simulation methods and document all results.",
    details: [
      "Smoke simulation test of every detector",
      "Sensitivity check and cleaning",
      "Panel response verification (where applicable)",
      "Battery condition check (battery-powered units)",
      "Written test record for compliance files",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-SMOKE-TEST",
    styles: [{ label: "Standard Test", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "core-services",
    tag: 'Service',
  },
  {
    id: "emergency-lighting-90",
    slug: "emergency-lighting-90-minute-test",
    name: "Emergency Lighting 90-Minute Test",
    subtitle: "AS/NZS 2293.2 Annual 90-Minute Discharge Test",
    description:
      "The annual 90-minute emergency lighting test discharges every emergency light and exit sign for a continuous 90-minute period to verify that battery capacity meets the minimum AS/NZS 2293.2 requirement. Failed units are identified and quoted for replacement.",
    details: [
      "Full 90-minute battery discharge on all units",
      "Pass/fail result recorded for each fitting",
      "Failed units identified and repair quote provided",
      "Test certificate issued for AFSS records",
      "AS/NZS 2293.2 compliant testing method",
    ],
    price: "POA",
    priceNote: "Contact us for a quote",
    model: "SVC-EL-90MIN",
    styles: [{ label: "Standard Test", value: "standard" }],
    colors: [],
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    categoryId: "core-services",
    tag: 'Service',
  },
];

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

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}

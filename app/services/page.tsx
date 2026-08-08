"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown, Flame, FireExtinguisher, Lightbulb, Fuel, Wind, Droplets, Construction, Server, DoorOpen, Map, Menu, ShieldCheck, X } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import HeroScrollCue from "@/components/HeroScrollCue";
import {
  categories,
  getProductsByCategory,
  getCategoryById,
} from "@/lib/products";
import styles from "./ServicesHub.module.css";
import heroStyles from "@/components/sections/HeroOverlay.module.css";

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  FireExtinguisher,
  Lightbulb,
  Fuel,
  Wind,
  Droplets,
  BrickWall: Construction,
  Construction,
  Server,
  DoorOpen,
  Map,
  ClipboardCheck: ShieldCheck,
  ShieldCheck,
};

const gradientStyle = {
  background: "linear-gradient(to right, #ff2a00, #ffb700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const heroH1Style = {
  color: "#ffffff",
  fontSize: "clamp(2rem, 5vw, 5.5rem)",
  fontWeight: 900,
  lineHeight: 1.1,
  margin: 0,
  textTransform: "uppercase" as const,
};

const heroEyebrowStyle = {
  color: "#FEAF04",
  fontWeight: 600,
} as const;

const sectionH2Line1Style = {
  color: "#111111",
  fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
  fontWeight: 800,
  letterSpacing: "-0.04em",
  lineHeight: 0.95,
  display: "block",
};

const sectionH2Line2Style = {
  ...gradientStyle,
  fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
  fontWeight: 800,
  letterSpacing: "-0.04em",
  lineHeight: 0.95,
  display: "block",
};

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lenis = useLenis();
  const hubRef = useRef<HTMLElement | null>(null);
  const initialCategory = searchParams.get("category") || "annual-fire-safety-statement";
  const validInitial = categories.some((c) => c.id === initialCategory)
    ? initialCategory
    : "annual-fire-safety-statement";
  const [activeCategory, setActiveCategory] = useState<string>(validInitial);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Hide the hero when arriving with an explicit category in the URL (e.g. from
  // the Services dropdown on another page). On the bare /services page the
  // hero is the default landing.
  const requestedCategory = searchParams.get("category");
  const showHero = !requestedCategory;

  // Sync state when the user navigates back/forward.
  useEffect(() => {
    setActiveCategory(validInitial);
  }, [validInitial]);

  // When arriving on /services with a valid ?category= in the URL (e.g. from
  // the Services dropdown on another page like /strata), scroll past the hero
  // to the hub layout. The Navbar fires its own lenis.scrollTo(0) on every
  // pathname change, so we wait for that to complete and then drive Lenis
  // directly — scrollIntoView is ignored by Lenis and would fight it. The ref
  // tracks the last PATHNAME we scrolled for, so clicking a different sub-item
  // from the navbar (same pathname, new search params) still re-scrolls to
  // the hub, while same-page sidebar switches are a no-op since the user is
  // already at the hub.
  const lastScrolledPathname = useRef<string | null>(null);
  useEffect(() => {
    const requested = searchParams.get("category");
    if (!requested) return;
    if (requested !== validInitial) return;
    const pathname = window.location.pathname;
    if (lastScrolledPathname.current === pathname + requested) return;
    lastScrolledPathname.current = pathname + requested;
    const timer = window.setTimeout(() => {
      const target = hubRef.current;
      if (!target) return;
      // -80 clears the fixed navbar so the category heading isn't tucked
      // underneath it.
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [searchParams, validInitial, lenis]);

  // Lock body scroll while the mobile category sheet is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const currentCategory = useMemo(
    () => getCategoryById(activeCategory) ?? categories[0],
    [activeCategory]
  );
  const allProducts = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );
  const products = useMemo(() => allProducts.slice(0, 6), [allProducts]);
  const moreCount = Math.max(0, allProducts.length - products.length);

  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        {/* HERO */}
        {showHero && (
        <header className={heroStyles.hero_root}>
          <div className={heroStyles.hero_image_layer}>
            <Image
              src="/serviceherosectionimage.jpg"
              alt="All Fire Services — practical fire protection across Greater Sydney"
              fill
              priority
              fetchPriority="high"
              quality={70}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className={heroStyles.about_dark_overlay} />
          <div className={heroStyles.about_directional_overlay} />
          <div className={heroStyles.about_fade_overlay} />

          <div className={`${heroStyles.hero_content_layer} padding-global`}>
            <div className="container-large">
              <div className={`padding-section-large is-about ${heroStyles.services_hero_inner}`}>
                <div
                  className="about-hero_component"
                  style={{ height: "auto", minHeight: "unset" }}
                >
                  <div className="hero_content-wrapper flex flex-col md:flex-row text-center md:text-left">
                    <div className="hero_content-left flex flex-col items-center md:items-start w-full md:w-auto">
                      <div
                        className="header-eyebrow-text hide-desktop mx-auto md:mx-0"
                        style={heroEyebrowStyle}
                      >
                        Across Greater Sydney
                      </div>
                      <h1
                        className="mx-auto md:mx-0 text-center md:text-left w-full"
                        style={heroH1Style}
                      >
                        <span style={{ display: "block", whiteSpace: "nowrap" }}>
                          ALLFIRE&apos;S FIRE
                        </span>
                        <span
                          style={{
                            display: "block",
                            whiteSpace: "nowrap",
                            paddingRight: "0px",
                            background: "none",
                            color: "#ffffff",
                            WebkitTextFillColor: "#ffffff",
                          }}
                        >
                          PROTECTION
                        </span>
                        <span
                          style={{
                            display: "block",
                            whiteSpace: "nowrap",
                            paddingRight: "0px",
                            background:
                              "linear-gradient(to right, #ff2a00, #ffb700)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          SERVICES
                        </span>
                      </h1>
                    </div>
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[8rem] md:pb-0">
                      <div
                        className="header-eyebrow-text hide-tablet mx-auto md:mx-0"
                        style={heroEyebrowStyle}
                      >
                        Across Greater Sydney
                      </div>
                      <p
                        className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        From inspections and testing to maintenance, repairs, and compliance, our fire protection services are designed to keep residential, commercial, and industrial properties safe, compliant, and ready when it matters most.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HeroScrollCue />
        </header>
        )}

        {/* HUB LAYOUT */}
        <section
          ref={hubRef}
          id="services-hub"
          className={styles.hubSection}
          data-animate-to="light"
          data-theme="light"
        >
          <div className="padding-global">
            <div className="container-large">
              <div className={styles.hubLayout}>
                {/* SIDEBAR (desktop) + MOBILE DROPDOWN TRIGGER */}
                <aside className={styles.sidebar} aria-label="Service categories">
                  {/* Mobile dropdown trigger (visible only on small screens) */}
                  <button
                    type="button"
                    className={styles.mobileTrigger}
                    onClick={() => setMobileOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={mobileOpen}
                  >
                    <span className={styles.mobileTriggerIconWrap} aria-hidden="true">
                      <Menu size={22} strokeWidth={2.4} />
                    </span>
                    <span className={styles.mobileTriggerLabel}>
                      <span className={styles.mobileTriggerKicker}>Browse the</span>
                      <span className={styles.mobileTriggerTitle}>Services</span>
                      <span className={styles.mobileTriggerCurrent}>Categories</span>
                    </span>
                    <span className={styles.mobileTriggerRight} aria-hidden="true">
                      <span className={styles.mobileTriggerCount}>{categories.length}</span>
                      <span className={styles.mobileTriggerChevron}>
                        <ChevronDown size={22} strokeWidth={2.4} />
                      </span>
                    </span>
                  </button>

                  {/* Desktop category list (visible only on wide screens) */}
                  <div className={styles.desktopSidebar}>
                    <p className={styles.sidebarTitle}>Categories / Services (12)</p>
                    <ul className={styles.sidebarList}>
                      {categories.map((cat) => {
                        const Icon = cat.iconName && ICON_MAP[cat.iconName] ? ICON_MAP[cat.iconName] : ShieldCheck;
                        const isActive = activeCategory === cat.id;
                        const count = getProductsByCategory(cat.id).length;
                        return (
                          <li key={cat.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveCategory(cat.id);
                                router.replace(`/services?category=${cat.id}`, { scroll: false });
                              }}
                              aria-current={isActive ? "true" : undefined}
                              className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                            >
                              <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                              <span className={styles.categoryBtnLabel}>{cat.label}</span>
                              <span className={styles.categoryBtnCount} aria-hidden="true">
                                ({count})
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </aside>

                {/* DIVIDER */}
                <div className={styles.divider} aria-hidden="true" />

                {/* CONTENT */}
                <section className={styles.content} aria-live="polite">
                  {currentCategory && (
                    <header className={styles.contentHeader}>
                      <h2 className={styles.contentHeading}>
                        <span style={sectionH2Line1Style}>
                          {currentCategory.headingLine1 ?? currentCategory.label}
                        </span>
                        <span style={sectionH2Line2Style}>
                          {currentCategory.headingLine2 ?? ""}
                        </span>
                      </h2>
                      <p className={styles.contentDescription}>
                        {currentCategory.intro}
                      </p>
                    </header>
                  )}

                  <div className={styles.grid}>
                    {products.length === 0 ? (
                      <p className={styles.gridEmpty}>
                        Items in this category are being added. Call our team to discuss your building.
                      </p>
                    ) : (
                      products.map((product) => {
                        const isService = product.tag === "Service";
                        return (
                          <Link
                            key={product.id}
                            href={`/services/${product.slug}`}
                            className={styles.card}
                            aria-label={`View ${product.name} details`}
                          >
                            <div className={styles.cardImageWrap}>
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                sizes="(max-width: 540px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className={styles.cardImage}
                              />
                              {isService ? (
                                <span className={styles.cardBadgeService}>Service</span>
                              ) : (
                                <span className={styles.cardBadge}>Equipment</span>
                              )}
                            </div>
                            <div className={styles.cardBody}>
                              <h3 className={styles.cardName}>{product.name}</h3>
                              <p className={styles.cardSubtitle}>{product.subtitle}</p>
                              <p className={styles.cardDesc}>{product.description}</p>
                              <div className={styles.cardFooter}>
                                {!isService && (
                                  <span className={styles.cardPrice}>{product.price}</span>
                                )}
                                <span className={styles.cardArrow} aria-hidden="true">
                                  <ArrowUpRight size={14} />
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {moreCount > 0 && (
                    <div className={styles.moreRow}>
                      <p className={styles.moreText}>
                        Showing the first 6 of {allProducts.length} listings in{" "}
                        <strong>{currentCategory?.label}</strong>.
                      </p>
                      <Link
                        href={`/services?category=${currentCategory?.id ?? ""}`}
                        className={styles.moreLink}
                      >
                        View more services
                        <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE CATEGORY SHEET */}
        <div
          className={`${styles.sheetBackdrop} ${mobileOpen ? styles.sheetBackdropOpen : ""}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
        />
        <div
          className={`${styles.sheet} ${mobileOpen ? styles.sheetOpen : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Choose a service category"
          aria-hidden={!mobileOpen}
        >
          <div className={styles.sheetHeader}>
            <div>
              <p className={styles.sheetKicker}>Categories / Services</p>
              <p className={styles.sheetTitle}>Choose a service</p>
            </div>
            <button
              type="button"
              className={styles.sheetClose}
              onClick={() => setMobileOpen(false)}
              aria-label="Close category menu"
            >
              <X size={20} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.sheetBody}>
            <ul className={styles.sheetList}>
              {categories.map((cat) => {
                const Icon = cat.iconName && ICON_MAP[cat.iconName] ? ICON_MAP[cat.iconName] : ShieldCheck;
                const isActive = activeCategory === cat.id;
                const count = getProductsByCategory(cat.id).length;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setMobileOpen(false);
                        router.replace(`/services?category=${cat.id}`, { scroll: false });
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`${styles.sheetOption} ${isActive ? styles.sheetOptionActive : ""}`}
                    >
                      <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                      <span className={styles.sheetOptionLabel}>{cat.label}</span>
                      <span className={styles.sheetOptionCount} aria-hidden="true">
                        ({count})
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <ContactCTA />
      </div>
    </main>
  );
}

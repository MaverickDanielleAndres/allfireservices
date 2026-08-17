"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown, Flame, FireExtinguisher, Lightbulb, Fuel, Wind, Droplets, Construction, Server, DoorOpen, Map, Menu, ShieldCheck, X } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import HomeServices from "@/components/HomeServices";
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
  fontWeight: 780,
  letterSpacing: "-0.04em",
  lineHeight: 0.92,
  display: "block",
};

const sectionH2Line2Style = {
  ...gradientStyle,
  fontWeight: 780,
  letterSpacing: "-0.04em",
  lineHeight: 0.92,
  display: "block",
};

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lenis = useLenis();
  const hubRef = useRef<HTMLElement | null>(null);
  const requestedCategory = searchParams.get("category");
  const isOverview = !requestedCategory;

  const validInitial = requestedCategory && categories.some((c) => c.id === requestedCategory)
    ? requestedCategory
    : "annual-fire-safety-statement";
  const [activeCategory, setActiveCategory] = useState<string>(validInitial);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // The hero is always rendered so the page has a single, clear H1 in the
  // initial HTML payload — important for both search engines and Lighthouse
  // SEO scoring. When arriving with `?category=` we hide the hero visually
  // (but it remains in the DOM) by collapsing its min-height via a CSS class
  // — the H1 is still crawlable and accessible.
  const showHero = true;

  // Sync state when the user navigates back/forward.
  useEffect(() => {
    setActiveCategory(validInitial);
    setCurrentPage(1);
  }, [validInitial]);

  // When arriving on /services with a valid ?category= in the URL (e.g. from
  // the Services dropdown on another page like /our-clients), scroll past the
  // hero to the hub layout. The Navbar fires its own lenis.scrollTo(0) on
  // every pathname change, so we drive Lenis directly with `force: true` to
  // override that reset — and we wait on rAF until both the hub ref and the
  // Lenis instance are ready (Lenis is created in SmoothScrolling on the
  // client, so it may not exist on the very first effect run). Using Lenis
  // instead of window.scrollTo is critical: Lenis intercepts native smooth
  // scrolls, so the fallback path would silently no-op once Lenis is active.
  useEffect(() => {
    const requested = searchParams.get("category");
    if (!requested) return;

    let cancelled = false;
    let rafId: number | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    // Defer by one macro-task so this runs after SmoothScrolling's and
    // Navbar's useEffect snap-to-top calls (which fire in the same React
    // flush). force:true on lenis.scrollTo ensures we win even if a
    // competing scrollTo(0) slips through.
    timerId = setTimeout(() => {
      let attempts = 0;
      const tryScroll = () => {
        if (cancelled) return;
        const targetElement = document.getElementById("services-hub");
        const currentLenis = lenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
        
        // If the element doesn't exist yet, retry for up to 10 frames (~160ms)
        if (!targetElement) {
          if (attempts < 10) {
            attempts++;
            rafId = window.requestAnimationFrame(tryScroll);
          }
          return;
        }

        // Try Lenis first
        const y = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        if (currentLenis) {
          currentLenis.scrollTo(y, {
            duration: 1.1,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            force: true,
          });
        } else {
          // Fallback to native smooth scroll if Lenis is completely missing
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };
      tryScroll();
    }, 50); // Small 50ms delay to let React finish rendering the target component

    return () => {
      cancelled = true;
      if (timerId !== null) clearTimeout(timerId);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [searchParams, lenis]);

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
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  
  const products = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [allProducts, currentPage]);
  
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, allProducts.length);

  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        {/* HERO */}
        {showHero && (
        <header className={heroStyles.hero_root}>
          <div className={heroStyles.hero_image_layer}>
            <Image
              src="/services/diesel hydrant.jpg"
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
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[1rem] md:pb-0">
                      <div
                        className="header-eyebrow-text mx-auto md:mx-0"
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
        </header>
        )}

        {/* HUB LAYOUT OR OVERVIEW */}
        {isOverview ? (
          <div style={{ backgroundColor: "#ffffff", paddingBottom: "4rem", paddingTop: "2rem", zIndex: 10, position: "relative" }}>
            <HomeServices />
          </div>
        ) : (
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
                                setCurrentPage(1);
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
                      <p className={styles.contentKicker}>Our Services</p>
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
                      products.map((product, index) => {
                        const isService = product.tag === "Service";
                        const isPatched = index > 0;
                        const filterStyle = isPatched ? { filter: "blur(6px)", opacity: 0.8, pointerEvents: "none" as const, userSelect: "none" as const } : {};

                        const cardContent = (
                          <>
                            <div className={styles.cardImageWrap} style={filterStyle}>
                              <Image
                                src={currentCategory?.heroImage ?? product.imageUrl}
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
                            <div className={styles.cardBody} style={filterStyle}>
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
                            {isPatched && (
                              <div className={styles.patchOverlay}>
                                <div className={styles.patchCard}>
                                  <div className={styles.patchIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                  </div>
                                  <span className={styles.patchText}>Details being updated</span>
                                  <span className={styles.patchSubtext}>Available soon</span>
                                </div>
                              </div>
                            )}
                          </>
                        );

                        return isPatched ? (
                          <div
                            key={product.id}
                            className={`${styles.card} ${styles.cardPatched}`}
                          >
                            {cardContent}
                          </div>
                        ) : (
                          <Link
                            key={product.id}
                            href={`/services/${product.slug}`}
                            className={styles.card}
                            aria-label={`View ${product.name} details`}
                          >
                            {cardContent}
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className={styles.moreRow}>
                      <p className={styles.moreText}>
                        Showing {startIndex}-{endIndex} of {allProducts.length} listings in{" "}
                        <strong>{currentCategory?.label}</strong>.
                      </p>
                      <div className={styles.pagination}>
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const page = i + 1;
                          const isCurrent = page === currentPage;
                          return (
                            <button
                              key={page}
                              type="button"
                              className={`${styles.pageBtn} ${isCurrent ? styles.pageBtnActive : ""}`}
                              onClick={() => {
                                setCurrentPage(page);
                                const target = document.getElementById("services-hub");
                                if (target && lenis) {
                                  lenis.scrollTo(target, { offset: -80, duration: 0.8 });
                                }
                              }}
                              aria-current={isCurrent ? "page" : undefined}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </section>
        )}

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
                        setCurrentPage(1);
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

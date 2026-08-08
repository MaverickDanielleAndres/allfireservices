import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Phone, ShieldCheck, Award, MapPin, FileCheck, Clock, BadgeCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import {
  getProductBySlug,
  getCategoryById,
  getRelatedProducts,
  products,
} from "@/lib/products";
import ContactCTA from "@/components/ContactCTA";
import detailStyles from "./ProductDetail.module.css";

const gradientStyle = {
  background: "linear-gradient(to right, #ff2a00, #ffb700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const eyebrowStyle = {
  color: "#FEAF04",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontSize: "0.8rem",
  marginBottom: "0.9rem",
};

const legacyHeaderKicker = {
  margin: "0 0 1rem",
  color: "#e94716",
  fontSize: "0.78rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
  lineHeight: 1.3,
  textTransform: "uppercase" as const,
};

const legacyHeaderHeading = {
  margin: "0 0 1.5rem",
  color: "#111111",
  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
  fontWeight: 780,
  letterSpacing: "-0.06em",
  lineHeight: 0.95,
  textWrap: "balance" as const,
};

const legacyHeaderGradientLine = {
  ...gradientStyle,
  fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
  fontWeight: 700,
  letterSpacing: "-0.04em",
  lineHeight: 1.1,
  display: "inline-block",
  marginTop: "0.75rem",
};

const legacyHeaderIntro = {
  margin: 0,
  color: "#4a4a46",
  fontSize: "clamp(1rem, 1.45vw, 1.18rem)",
  lineHeight: 1.55,
  maxWidth: "34rem",
};

const sectionH2Style = {
  color: "#111111",
  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 1.0,
};

const lineOneStyle = {
  fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 1.05,
};

const lineTwoStyle = {
  ...gradientStyle,
  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 1.0,
};

const lineTwoPlainStyle = {
  color: "#111111",
  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 1.0,
};

const bodyStyle = {
  color: "#111111",
  fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
  lineHeight: 1.55,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return createPageMetadata({
    title: `${product.name} — ${product.subtitle}`,
    description: product.description.slice(0, 160),
    path: `/services/${slug}`,
  });
}

function PrimaryBrandButton({ href, label }: { href: string; label: string }) {
  return (
    <div className="button-group">
      <Link href={href} className="button-wrap">
        <div className="button-content">
          <div className="button-layout">
            <div className="button-text">{label}</div>
            <div className="button-icon">
              <div className="icon-slot">
                <div className="icon-slot">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 16 17"
                    fill="none"
                    aria-hidden="true"
                  >
                    <g clipPath="url(#clip0_button)">
                      <path
                        d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_button">
                        <rect width="16" height="16" fill="currentColor" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function OutlinePhoneButton({ phone, label }: { phone: string; label: string }) {
  return (
    <div className="button-group">
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="button-wrap">
        <div
          className="button-content"
          style={{
            background: "transparent",
            border: "1.5px solid rgba(17,17,17,0.25)",
            color: "#111111",
          }}
        >
          <div className="button-layout">
            <div className="button-text">{label}</div>
            <div className="button-icon">
              <div className="icon-slot">
                <div className="icon-slot">
                  <Phone size={14} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const related = getRelatedProducts(product, 3);
  const isService = product.tag === "Service";
  const heroSubtitle = product.subtitle;

  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        {/* PAGE HEADER — mirrors home legacyHeader style (no dark hero bg) */}
        <section
          data-theme="light"
          style={{ background: "#ffffff", color: "#111111", paddingTop: "clamp(5.5rem, 9vw, 7.5rem)", paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          <div className="padding-global">
            <div className="container-large">
              {/* Breadcrumb */}
              <nav className={detailStyles.breadcrumbLight} aria-label="Breadcrumb">
                <Link href="/" className={detailStyles.breadcrumbLinkLight}>
                  Home
                </Link>
                <span className={detailStyles.breadcrumbSepLight} aria-hidden="true">
                  ›
                </span>
                <Link href="/services" className={detailStyles.breadcrumbLinkLight}>
                  Services
                </Link>
                {category && (
                  <>
                    <span className={detailStyles.breadcrumbSepLight} aria-hidden="true">
                      ›
                    </span>
                    <Link
                      href={`/services?category=${category.id}`}
                      className={detailStyles.breadcrumbLinkLight}
                    >
                      {category.label}
                    </Link>
                  </>
                )}
                <span className={detailStyles.breadcrumbSepLight} aria-hidden="true">
                  ›
                </span>
                <span className={detailStyles.breadcrumbCurrentLight}>{product.name}</span>
              </nav>

              <header className={detailStyles.pageHeader}>
                <div>
                  <h1 style={legacyHeaderHeading}>
                    {product.name}
                    <br />
                    <span style={legacyHeaderGradientLine}>
                      {heroSubtitle}
                    </span>
                  </h1>
                </div>
              </header>
            </div>
          </div>
        </section>

        {/* MAIN DETAIL */}
        <section
          className={detailStyles.detailSection}
          data-animate-to="light"
          data-theme="light"
        >
          <div className="padding-global">
            <div className="container-large">
              <div className={detailStyles.detailGrid}>
                {/* Left: image */}
                <div className={detailStyles.imagePanel}>
                  <div className={detailStyles.imageWrap}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 991px) 100vw, 50vw"
                      className={detailStyles.image}
                    />
                    {isService && (
                      <span className={detailStyles.serviceBadge}>Service</span>
                    )}
                    {!isService && product.tag && (
                      <span className={detailStyles.productBadge}>Equipment</span>
                    )}
                  </div>
                </div>

                {/* Right: details */}
                <div className={detailStyles.detailBody}>
                  {category && (
                    <Link
                      href={`/services?category=${category.id}`}
                      className={detailStyles.categoryTag}
                    >
                      {category.label}
                    </Link>
                  )}

                  <h2 style={sectionH2Style}>
                    <span style={lineOneStyle}>
                      What you get with
                    </span>
                    <br />
                    <span style={lineTwoPlainStyle}>
                      {product.name}
                    </span>
                  </h2>

                  <p style={bodyStyle} className={detailStyles.intro}>
                    {product.description}
                  </p>

                  {/* Meta row */}
                  <div className={detailStyles.metaRow}>
                    <div className={detailStyles.metaItem}>
                      <span className={detailStyles.metaLabel}>Model</span>
                      <span className={detailStyles.metaValue}>{product.model}</span>
                    </div>
                    {product.warranty && (
                      <div className={detailStyles.metaItem}>
                        <span className={detailStyles.metaLabel}>Warranty</span>
                        <span className={detailStyles.metaValue}>{product.warranty}</span>
                      </div>
                    )}
                    {product.standard && (
                      <div className={detailStyles.metaItem}>
                        <span className={detailStyles.metaLabel}>Standard</span>
                        <span className={detailStyles.metaValue}>{product.standard}</span>
                      </div>
                    )}
                  </div>

                  {/* Style selector (only if available) */}
                  {product.styles.length > 1 && (
                    <div className={detailStyles.selectorGroup}>
                      <p className={detailStyles.selectorLabel}>Style</p>
                      <div className={detailStyles.selectorRow}>
                        {product.styles.map((s) => (
                          <button key={s.value} className={detailStyles.selectorBtn}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colour selector (only if available) */}
                  {product.colors.length > 1 && (
                    <div className={detailStyles.selectorGroup}>
                      <p className={detailStyles.selectorLabel}>Colour</p>
                      <div className={detailStyles.selectorRow}>
                        {product.colors.map((c) => (
                          <button key={c.value} className={detailStyles.selectorChip}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className={detailStyles.priceRow}>
                    <span className={detailStyles.priceValue}>{product.price}</span>
                    {product.priceNote && (
                      <span className={detailStyles.priceNote}>{product.priceNote}</span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className={detailStyles.actions}>
                    <PrimaryBrandButton href="/contact" label="Get a Quote" />
                    <OutlinePhoneButton phone="1300 765 594" label="Call 1300 765 594" />
                  </div>

                  {/* Features list (mobile order: after buttons, before trust badges) */}
                  <ul className={detailStyles.featureList} aria-label="What's included">
                    {product.details.map((detail, i) => (
                      <li key={i} className={detailStyles.featureItem}>
                        <span className={detailStyles.featureCheck} aria-hidden="true">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Trust badges */}
                  <ul className={detailStyles.trustBadges}>
                    <li>
                      <MapPin size={16} aria-hidden="true" />
                      <span>Greater Sydney Coverage</span>
                    </li>
                    <li>
                      <ShieldCheck size={16} aria-hidden="true" />
                      <span>Licensed & Insured Technicians</span>
                    </li>
                    <li>
                      <Award size={16} aria-hidden="true" />
                      <span>AFSS-Ready Reporting</span>
                    </li>
                    <li>
                      <FileCheck size={16} aria-hidden="true" />
                      <span>Australian Standards Compliant</span>
                    </li>
                    <li>
                      <BadgeCheck size={16} aria-hidden="true" />
                      <span>FPA Australia Member</span>
                    </li>
                    <li>
                      <Clock size={16} aria-hidden="true" />
                      <span>Fast Turnaround & Reporting</span>
                    </li>
                    {product.warranty && (
                      <li>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>{product.warranty} Warranty</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED — mirrors the home "family behind" legacyHeader style */}
        {related.length > 0 && category && (
          <section
            className={detailStyles.relatedSection}
            data-animate-to="light"
            data-theme="light"
            aria-label={`More in ${category.label}`}
          >
            <div className="padding-global">
              <div className="container-large">
                <header className={detailStyles.relatedHeader}>
                  <p style={legacyHeaderKicker}>
                    More in {category.shortLabel ?? category.label}
                  </p>
                  <h2 style={legacyHeaderHeading}>
                    Other listings<br />
                    <span style={gradientStyle}>
                      in this category
                    </span>
                  </h2>
                  <p style={{ ...legacyHeaderIntro, marginTop: "1rem" }}>
                    Explore more services available within the same category, or browse all fire protection services across Greater Sydney.
                  </p>
                </header>

                <div className={detailStyles.relatedGrid}>
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/services/${rel.slug}`}
                      className={detailStyles.relatedCard}
                      aria-label={`View ${rel.name} details`}
                    >
                      <div className={detailStyles.relatedImageWrap}>
                        <Image
                          src={rel.imageUrl}
                          alt={rel.name}
                          fill
                          sizes="(max-width: 600px) 100vw, (max-width: 991px) 50vw, 33vw"
                          className={detailStyles.relatedImage}
                        />
                        {rel.tag === "Service" && (
                          <span className={detailStyles.relatedBadge}>Service</span>
                        )}
                      </div>
                      <div className={detailStyles.relatedBody}>
                        <p className={detailStyles.relatedName}>{rel.name}</p>
                        <p className={detailStyles.relatedSubtitle}>{rel.subtitle}</p>
                        <p className={detailStyles.relatedPrice}>{rel.price}</p>
                        <span
                          className={detailStyles.relatedArrow}
                          aria-hidden="true"
                        >
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className={detailStyles.relatedActions}>
                  <Link href="/services" className={detailStyles.viewMoreLink}>
                    View more services
                    <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CLOSING CTA */}
        <ContactCTA />
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import {
  getProductBySlug,
  getCategoryById,
  getRelatedProducts,
  products,
} from "@/lib/products";
import {
  Flame,
  FireExtinguisher,
  Lightbulb,
  Fuel,
  Wind,
  Droplets,
  BrickWall,
  Server,
  DoorOpen,
  Map,
  ClipboardCheck,
  ShieldCheck,
  Construction,
  Monitor,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Flame,
  FireExtinguisher,
  Lightbulb,
  Fuel,
  Wind,
  Droplets,
  BrickWall,
  Server,
  DoorOpen,
  Map,
  ClipboardCheck,
  ShieldCheck,
  Construction,
  Monitor,
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

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <style>{`
        /* ── Product Detail Layout ── */
        .pd-wrapper {
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem);
        }

        /* Breadcrumb */
        .pd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .pd-breadcrumb a {
          color: #555;
          text-decoration: none;
          transition: color 150ms ease;
        }

        .pd-breadcrumb a:hover {
          color: #fc0403;
        }

        .pd-breadcrumb-sep {
          color: #bbb;
        }

        .pd-breadcrumb-current {
          color: #111;
          font-weight: 750;
        }

        /* Main two-column layout */
        .pd-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }

        @media (max-width: 860px) {
          .pd-main {
            grid-template-columns: 1fr;
          }
        }

        /* Image panel */
        .pd-image-panel {
          position: sticky;
          top: 7rem;
        }

        .pd-image-wrap {
          background: #f4f4f0;
          border-radius: 1.25rem;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          position: relative;
        }

        .pd-image {
          object-fit: cover;
        }

        .pd-service-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #333;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
        }

        .pd-service-badge.is-service {
          background: #fc0403;
        }

        /* Details panel */
        .pd-details {
          padding: 0.5rem 0;
        }

        .pd-category-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #fee2e2;
          color: #c00;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 1rem;
          text-decoration: none;
        }

        .pd-name {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #111;
          margin: 0 0 0.35rem;
          line-height: 1.05;
        }

        .pd-subtitle {
          font-size: 1rem;
          color: #666;
          font-weight: 600;
          margin: 0 0 1.25rem;
        }

        .pd-desc {
          font-size: 0.97rem;
          color: #444;
          line-height: 1.7;
          margin: 0 0 1.75rem;
          max-width: 54ch;
        }

        /* Details list */
        .pd-features {
          list-style: none;
          margin: 0 0 1.75rem;
          padding: 0;
          display: grid;
          gap: 0.5rem;
        }

        .pd-feature {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #333;
          line-height: 1.45;
        }

        .pd-feature-check {
          width: 1.15rem;
          height: 1.15rem;
          background: #fee2e2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.05rem;
        }

        .pd-feature-check svg {
          width: 0.6rem;
          height: 0.6rem;
          stroke: #fc0403;
          stroke-width: 3;
          fill: none;
        }

        /* Meta row */
        .pd-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
          padding: 1rem 1.25rem;
          background: #f9f9f7;
          border-radius: 0.75rem;
          border: 1px solid #e8e8e3;
        }

        .pd-meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .pd-meta-label {
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #aaa;
        }

        .pd-meta-value {
          font-size: 0.9rem;
          font-weight: 750;
          color: #111;
        }

        /* Style selector */
        .pd-selector-label {
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .pd-styles {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .pd-style-btn {
          border: 1.5px solid #ddd;
          border-radius: 0.5rem;
          background: #fff;
          color: #333;
          font-size: 0.87rem;
          font-weight: 700;
          padding: 0.45rem 1rem;
          cursor: pointer;
          transition: border-color 150ms ease, color 150ms ease, background 150ms ease;
        }

        .pd-style-btn:first-child,
        .pd-style-btn:hover {
          border-color: #111;
          color: #111;
          background: #f4f4f0;
        }

        /* Color selector */
        .pd-colors {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .pd-color-chip {
          border: 1.5px solid #ddd;
          border-radius: 0.5rem;
          background: #fff;
          color: #444;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.4rem 0.9rem;
          cursor: pointer;
          transition: border-color 150ms ease;
        }

        .pd-color-chip:first-child {
          border-color: #111;
        }

        /* Price */
        .pd-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .pd-price {
          font-size: 1.75rem;
          font-weight: 900;
          color: #fc0403;
        }

        .pd-price-note {
          font-size: 0.85rem;
          color: #888;
          font-weight: 600;
        }

        /* Action buttons */
        .pd-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .pd-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #fc0403;
          color: #fff;
          font-size: 0.96rem;
          font-weight: 850;
          border: none;
          border-radius: 0.6rem;
          min-height: 3.15rem;
          padding: 0 1.75rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 160ms ease;
        }

        .pd-btn-primary:hover {
          background: #c00;
        }

        .pd-btn-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          color: #111;
          font-size: 0.96rem;
          font-weight: 850;
          border: 1.5px solid #111;
          border-radius: 0.6rem;
          min-height: 3.15rem;
          padding: 0 1.75rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease;
        }

        .pd-btn-outline:hover {
          background: #111;
          color: #fff;
        }

        /* Warranty / standard badges */
        .pd-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pd-badge {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          border: 1px solid #e5e5e0;
          color: #555;
          background: #f9f9f7;
        }

        /* ── Related Products ── */
        .pd-related {
          margin-top: 5rem;
          padding: 0 clamp(1rem, 4vw, 3rem);
          max-width: 1320px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 2rem;
        }

        .pd-related-heading {
          font-size: 1.5rem;
          font-weight: 900;
          color: #111;
          margin: 0 0 1.5rem;
        }

        .pd-related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.1rem;
        }

        @media (max-width: 1100px) {
          .pd-related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 540px) {
          .pd-related-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .pd-related-card {
          background: #fff;
          border: 1px solid #e8e8e3;
          border-radius: 0.875rem;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 160ms ease, transform 160ms ease;
        }

        .pd-related-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }

        .pd-related-img-wrap {
          background: #f4f4f0;
          aspect-ratio: 4 / 3;
          position: relative;
          overflow: hidden;
        }

        .pd-related-img {
          object-fit: cover;
        }

        .pd-related-body {
          padding: 0.8rem 0.9rem;
        }

        .pd-related-name {
          font-size: 0.9rem;
          font-weight: 800;
          color: #111;
          margin: 0 0 0.2rem;
        }

        .pd-related-subtitle {
          font-size: 0.75rem;
          color: #888;
          margin: 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pd-related-price {
          font-size: 0.8rem;
          font-weight: 800;
          color: #fc0403;
          margin-top: 0.4rem;
        }
      `}</style>

      <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <header 
          className="section_about-hero is-dark" 
          style={{ 
            backgroundImage: 'url("/service-images/fire-panel-inspection.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            marginBottom: '3rem',
            marginTop: '-12rem',
            paddingTop: '12rem',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          <div className="pd-wrapper" style={{ minHeight: 'auto', paddingTop: '13rem', paddingBottom: '4rem', position: 'relative', zIndex: 1 }}>
            
            {/* Breadcrumb Navigation inside Header */}
            <nav className="pd-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', padding: 0 }}>
              <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
              <span className="pd-breadcrumb-sep" style={{ color: '#666', margin: '0 0.5rem' }}>›</span>
              <Link href="/services" style={{ color: '#aaa', textDecoration: 'none' }}>Services & Products Hub</Link>
              {category && (
                <>
                  <span className="pd-breadcrumb-sep" style={{ color: '#666', margin: '0 0.5rem' }}>›</span>
                  <Link href={`/services?category=${category.id}`} style={{ color: '#aaa', textDecoration: 'none' }}>
                    {category.label}
                  </Link>
                </>
              )}
              <span className="pd-breadcrumb-sep" style={{ color: '#666', margin: '0 0.5rem' }}>›</span>
              <span className="pd-breadcrumb-current" style={{ color: '#feaf04' }}>{product.name}</span>
            </nav>

            <h1 className="heading-style-h1" style={{ fontSize: '3rem', margin: 0, lineHeight: 1.1, fontWeight: 900, color: '#ffffff' }}>
              {product.name.toUpperCase()}
            </h1>
          </div>
        </header>
        <div className="pd-wrapper">

          {/* Main layout */}
          <div className="pd-main">
            {/* ── Left: Image ── */}
            <div className="pd-image-panel">
              <div className="pd-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {product.tag && (
                  <span className={`pd-service-badge${product.tag === 'Service' ? ' is-service' : ''}`}>
                    {product.tag === 'Product' ? 'Product & Equipment' : product.tag}
                  </span>
                )}
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="pd-details">
              {category && (() => {
                const IconComponent = iconMap[category.iconName] || Flame;
                return (
                  <a
                    href={`/services?category=${category.id}`}
                    className="pd-category-tag"
                  >
                    <IconComponent size={14} strokeWidth={3} style={{ marginRight: '0.2rem' }} /> {category.label}
                  </a>
                );
              })()}

              <h1 className="pd-name">{product.name}</h1>
              <p className="pd-subtitle">{product.subtitle}</p>
              <p className="pd-desc">{product.description}</p>

              {/* Features */}
              <ul className="pd-features">
                {product.details.map((detail, i) => (
                  <li key={i} className="pd-feature">
                    <span className="pd-feature-check" aria-hidden="true">
                      <svg viewBox="0 0 12 12">
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Meta row */}
              <div className="pd-meta">
                <div className="pd-meta-item">
                  <span className="pd-meta-label">Model</span>
                  <span className="pd-meta-value">{product.model}</span>
                </div>
                {product.warranty && (
                  <div className="pd-meta-item">
                    <span className="pd-meta-label">Warranty</span>
                    <span className="pd-meta-value">{product.warranty}</span>
                  </div>
                )}
                {product.standard && (
                  <div className="pd-meta-item">
                    <span className="pd-meta-label">Standard</span>
                    <span className="pd-meta-value">{product.standard}</span>
                  </div>
                )}
              </div>

              {/* Style selector */}
              {product.styles.length > 0 && (
                <div>
                  <p className="pd-selector-label">Style</p>
                  <div className="pd-styles">
                    {product.styles.map((s) => (
                      <button key={s.value} className="pd-style-btn">
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div>
                  <p className="pd-selector-label">Colour</p>
                  <div className="pd-colors">
                    {product.colors.map((c) => (
                      <button key={c.value} className="pd-color-chip">
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="pd-price-row">
                <span className="pd-price">{product.price}</span>
                {product.priceNote && (
                  <span className="pd-price-note">{product.priceNote}</span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="pd-actions">
                <a
                  href="/contact"
                  className="pd-btn-primary"
                  id={`get-quote-${product.id}`}
                >
                  Get a Quote
                </a>
                <a
                  href="tel:1300765594"
                  className="pd-btn-outline"
                  id={`call-${product.id}`}
                >
                  Call 1300 765 594
                </a>
              </div>

              {/* Badges */}
              <div className="pd-badges">
                <span className="pd-badge">🇦🇺 Australian Owned</span>
                <span className="pd-badge">✓ Licensed Technicians</span>
                {product.warranty && (
                  <span className="pd-badge">🛡 {product.warranty} Warranty</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pd-related" aria-label="Related products">
            <h2 className="pd-related-heading">
              More in {category?.label ?? "this category"}
            </h2>
            <div className="pd-related-grid">
              {related.map((rel) => (
                <a
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="pd-related-card"
                  aria-label={`View ${rel.name}`}
                >
                  <div className="pd-related-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.imageUrl}
                      alt={rel.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="pd-related-body">
                    <p className="pd-related-name">{rel.name}</p>
                    <p className="pd-related-subtitle">{rel.subtitle}</p>
                    <p className="pd-related-price">{rel.price}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

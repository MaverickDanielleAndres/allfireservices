import "./product-detail.css";
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
                const IconComponent = category.iconName ? iconMap[category.iconName] || Flame : Flame;
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

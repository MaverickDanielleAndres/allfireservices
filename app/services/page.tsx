"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowUpRight,
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
import ContactCTA from "@/components/ContactCTA";
import { categories, products, getProductsByCategory } from "@/lib/products";

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

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "core-services";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("category") || "core-services";
    setActiveCategory(cat);
  }, [searchParams]);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    router.push(`/services?category=${id}`, { scroll: false });
  };

  const currentCategory = categories.find((c) => c.id === activeCategory);
  const currentProducts = getProductsByCategory(activeCategory);

  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header 
          className="section_about-hero is-dark" 
          style={{ 
            backgroundImage: 'url("/service-images/fire-extinguisher-equipment.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            marginBottom: '4rem',
            marginTop: '-12rem',
            paddingTop: '12rem',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          <div className="padding-global" style={{ position: 'relative', zIndex: 1 }}>
            <div className="container-large">
              <div
                className="padding-section-large is-about"
                style={{ paddingTop: '13rem', paddingBottom: '3rem' }}
              >
                <div
                  className="about-hero_component services-hero_component"
                  style={{ height: "auto" }}
                >
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left" style={{ paddingLeft: '0.9rem' }}>
                      <h1 className="heading-style-h1" style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.1, fontWeight: 900, color: '#ffffff' }}>
                        {activeCategory === 'core-services' ? 'SERVICES' : 'PRODUCTS & EQUIPMENT'} <br/>
                        <span style={{ fontSize: '1.8rem', color: '#feaf04', fontWeight: 'normal', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                          / {activeCategory === 'core-services' ? 'ALL SERVICES HUB' : currentCategory?.label.toUpperCase()}
                        </span>
                      </h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet" style={{ color: '#feaf04', margin: '0 0 1rem 0' }}>
                        Fire Protection Services
                      </div>
                      <p className="body-text" style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                        From smoke alarms and fire extinguishers to emergency
                        lighting, diesel pumps, fire doors, and evacuation plans
                        — everything your building needs to stay compliant and
                        protected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Hub Layout ── */}
        <div
          data-animate-to="light"
          data-theme="light"
          style={{ backgroundColor: "#ffffff", color: "#111111" }}
        >
          <style>{`
            /* ── Services Hub Layout ── */
            .svchub-wrapper {
              display: flex;
              gap: 0;
              max-width: 1320px;
              margin: 0 auto;
              padding: 0 clamp(1rem, 4vw, 3rem);
              min-height: 80vh;
            }

            /* ── Sidebar ── */
            .svchub-sidebar {
              width: 280px;
              flex-shrink: 0;
              padding: 2.5rem 0 2.5rem;
              position: sticky;
              top: 6rem;
              align-self: flex-start;
            }

            .svchub-sidebar-title {
              font-size: 0.7rem;
              font-weight: 900;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: #888;
              margin: 0 0 0.85rem 0.9rem;
            }

            .svchub-cat-btn {
              display: block;
              width: 100%;
              text-align: left;
              background: transparent;
              border: none;
              border-left: 3px solid transparent;
              padding: 0.75rem 0.9rem;
              font-size: 0.925rem;
              font-weight: 650;
              color: #444;
              cursor: pointer;
              transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
              border-radius: 0 0.4rem 0.4rem 0;
              line-height: 1.3;
            }

            .svchub-cat-btn:hover {
              background: #f0efea;
              color: #111;
            }

            .svchub-cat-btn.is-active {
              background: #fee2e2;
              border-left-color: #fc0403;
              color: #c00;
              font-weight: 800;
            }

            /* ── Divider ── */
            .svchub-divider {
              width: 1px;
              background: #e5e5e0;
              margin: 0 2rem;
              flex-shrink: 0;
            }

            /* ── Content Area ── */
            .svchub-content {
              flex: 1;
              padding: 2.5rem 0 4rem;
              min-width: 0;
            }

            .svchub-content-header {
              margin-bottom: 2rem;
            }

            .svchub-content-title {
              font-size: clamp(1.6rem, 3vw, 2.2rem);
              font-weight: 900;
              color: #111;
              margin: 0 0 0.5rem;
              line-height: 1.15;
            }

            .svchub-content-subtitle {
              font-size: 1rem;
              color: #555;
              margin: 0;
              max-width: 60ch;
              line-height: 1.6;
            }

            .svchub-accent {
              color: #fc0403;
            }

            /* ── Card Grid ── */
            .svchub-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.25rem;
            }

            @media (max-width: 1100px) {
              .svchub-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            @media (max-width: 820px) {
              .svchub-wrapper {
                flex-direction: column;
              }
              .svchub-sidebar {
                width: 100%;
                position: static;
                max-height: none;
                padding: 1.5rem 0 0;
                display: flex;
                flex-wrap: wrap;
                gap: 0.4rem;
                overflow: visible;
              }
              .svchub-sidebar-title {
                width: 100%;
                margin-left: 0;
              }
              .svchub-cat-btn {
                border-left: none;
                border-bottom: 2px solid transparent;
                border-radius: 0.4rem;
                padding: 0.5rem 0.8rem;
                font-size: 0.825rem;
                background: #f0efea;
                width: auto;
              }
              .svchub-cat-btn.is-active {
                background: #fee2e2;
                border-bottom-color: #fc0403;
              }
              .svchub-divider {
                display: none;
              }
              .svchub-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            @media (max-width: 540px) {
              .svchub-grid {
                grid-template-columns: 1fr;
              }
            }

            /* ── Product Card ── */
            .svchub-card {
              background: #ffffff;
              border: 1px solid #e8e8e3;
              border-radius: 1rem;
              overflow: hidden;
              text-decoration: none;
              color: inherit;
              display: flex;
              flex-direction: column;
              transition: box-shadow 180ms ease, transform 180ms ease;
              cursor: pointer;
            }

            .svchub-card:hover {
              box-shadow: 0 8px 32px rgba(0,0,0,0.10);
              transform: translateY(-3px);
            }

            .svchub-card-img-wrap {
              background: #f4f4f0;
              aspect-ratio: 4 / 3;
              position: relative;
              overflow: hidden;
            }

            .svchub-card-img {
              object-fit: cover;
              transition: transform 300ms ease;
            }

            .svchub-card:hover .svchub-card-img {
              transform: scale(1.04);
            }

            .svchub-card-service-badge {
              position: absolute;
              top: 0.6rem;
              right: 0.6rem;
              background: #333;
              color: #fff;
              font-size: 0.65rem;
              font-weight: 900;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              padding: 0.22rem 0.55rem;
              border-radius: 999px;
            }

            .svchub-card-service-badge.is-service {
              background: #fc0403;
            }

            .svchub-card-body {
              padding: 1rem 1.1rem 1.15rem;
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 0.35rem;
            }

            .svchub-card-name {
              font-size: 1rem;
              font-weight: 800;
              color: #111;
              line-height: 1.2;
              margin: 0;
            }

            .svchub-card-subtitle {
              font-size: 0.78rem;
              color: #888;
              font-weight: 600;
              margin: 0;
              line-height: 1.3;
            }

            .svchub-card-desc {
              font-size: 0.84rem;
              color: #555;
              line-height: 1.55;
              margin: 0;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .svchub-card-footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: auto;
              padding-top: 0.6rem;
            }

            .svchub-card-price {
              font-size: 0.85rem;
              font-weight: 800;
              color: #fc0403;
            }

            .svchub-card-arrow {
              width: 1.8rem;
              height: 1.8rem;
              background: #111;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              transition: background 160ms ease;
              flex-shrink: 0;
            }

            .svchub-card:hover .svchub-card-arrow {
              background: #fc0403;
            }

            /* ── Service icon card (for AI/Mechanical when only 1 item) ── */
            .svchub-empty {
              grid-column: 1 / -1;
              text-align: center;
              padding: 3rem;
              color: #999;
            }
          `}</style>

          <div className="svchub-wrapper">
            {/* Sidebar */}
            <aside className="svchub-sidebar" aria-label="Service categories">
              <p className="svchub-sidebar-title">Categories</p>
              {categories.map((cat) => {
                const IconComponent = iconMap[cat.iconName] || Flame;
                return (
                  <button
                    key={cat.id}
                    className={`svchub-cat-btn${activeCategory === cat.id ? " is-active" : ""}`}
                    onClick={() => handleCategorySelect(cat.id)}
                    aria-current={activeCategory === cat.id ? "page" : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <IconComponent size={18} strokeWidth={2.5} /> {cat.label}
                  </button>
                );
              })}
            </aside>

            {/* Divider */}
            <div className="svchub-divider" aria-hidden="true" />

            {/* Content */}
            <section className="svchub-content">
              {currentCategory && (
                <div className="svchub-content-header">
                  <h2 className="svchub-content-title">
                    {currentCategory.label}
                  </h2>
                  <p className="svchub-content-subtitle">
                    {currentCategory.description}
                  </p>
                </div>
              )}

              <div className="svchub-grid">
                {currentProducts.length === 0 ? (
                  <p className="svchub-empty">
                    No items found for this category.
                  </p>
                ) : (
                  currentProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/services/${product.slug}`}
                      className="svchub-card"
                      aria-label={`View ${product.name} details`}
                    >
                      <div className="svchub-card-img-wrap">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="svchub-card-img"
                          sizes="(max-width: 540px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                        {product.tag && (
                          <span className={`svchub-card-service-badge${product.tag === 'Service' ? ' is-service' : ''}`}>
                            {product.tag === 'Product' ? 'Product & Equipment' : product.tag}
                          </span>
                        )}
                      </div>
                      <div className="svchub-card-body">
                        <h3 className="svchub-card-name">{product.name}</h3>
                        <p className="svchub-card-subtitle">
                          {product.subtitle}
                        </p>
                        <p className="svchub-card-desc">
                          {product.description}
                        </p>
                        <div className="svchub-card-footer">
                          <span className="svchub-card-price">
                            {product.price}
                          </span>
                          <span className="svchub-card-arrow" aria-hidden="true">
                            <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

        <ContactCTA />
      </div>
    </main>
  );
}

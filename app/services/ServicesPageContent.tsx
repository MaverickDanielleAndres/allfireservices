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

export default function ServicesPageContent() {
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
    <>
      <header
        className="section_about-hero is-dark"
        style={{
          backgroundImage: 'url("/service-images/fire-extinguisher-equipment.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          marginBottom: "4rem",
          marginTop: "-12rem",
          paddingTop: "12rem",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.8)" }} />
        <div className="padding-global" style={{ position: "relative", zIndex: 1 }}>
          <div className="container-large">
            <div
              className="padding-section-large is-about"
              style={{ paddingTop: "13rem", paddingBottom: "3rem" }}
            >
              <div
                className="about-hero_component services-hero_component"
                style={{ height: "auto" }}
              >
                <div className="hero_content-wrapper">
                  <div className="hero_content-left" style={{ paddingLeft: "0.9rem" }}>
                    <h1
                      className="heading-style-h1"
                      style={{
                        fontSize: "2.5rem",
                        margin: 0,
                        lineHeight: 1.1,
                        fontWeight: 900,
                        color: "#ffffff",
                      }}
                    >
                      {activeCategory === "core-services" ? "SERVICES" : "PRODUCTS & EQUIPMENT"}{" "}
                      <br />
                      <span
                        style={{
                          fontSize: "1.8rem",
                          color: "#feaf04",
                          fontWeight: "normal",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        / {activeCategory === "core-services" ? "ALL SERVICES HUB" : currentCategory?.label.toUpperCase()}
                      </span>
                    </h1>
                  </div>
                  <div className="hero_content-right">
                    <div
                      className="header-eyebrow-text hide-tablet"
                      style={{ color: "#feaf04", margin: "0 0 1rem 0" }}
                    >
                      Fire Protection Services
                    </div>
                    <p className="body-text" style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}>
                      From smoke alarms and fire extinguishers to emergency lighting, diesel pumps,
                      fire doors, and evacuation plans — everything your building needs to stay
                      compliant and protected.
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
        <div className="svchub-wrapper">
          {/* Sidebar */}
          <aside className="svchub-sidebar" aria-label="Service categories">
            <p className="svchub-sidebar-title">Categories</p>
            {categories.map((cat) => {
              const IconComponent = cat.iconName ? iconMap[cat.iconName] || Flame : Flame;
              return (
                <button
                  key={cat.id}
                  className={`svchub-cat-btn${activeCategory === cat.id ? " is-active" : ""}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  aria-current={activeCategory === cat.id ? "page" : undefined}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
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
                <h2 className="svchub-content-title">{currentCategory.label}</h2>
                <p className="svchub-content-subtitle">{currentCategory.description}</p>
              </div>
            )}

            <div className="svchub-grid">
              {currentProducts.length === 0 ? (
                <p className="svchub-empty">No items found for this category.</p>
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
                        loading="lazy"
                      />
                      {product.tag && (
                        <span
                          className={`svchub-card-service-badge${product.tag === "Service" ? " is-service" : ""}`}
                        >
                          {product.tag === "Product" ? "Product & Equipment" : product.tag}
                        </span>
                      )}
                    </div>
                    <div className="svchub-card-body">
                      <h3 className="svchub-card-name">{product.name}</h3>
                      <p className="svchub-card-subtitle">{product.subtitle}</p>
                      <p className="svchub-card-desc">{product.description}</p>
                      <div className="svchub-card-footer">
                        <span className="svchub-card-price">{product.price}</span>
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
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { assets } from "@/lib/assets";

const serviceLinks = [
  { label: "All Services Hub", href: "/services", highlight: true },
  { label: "Annual Fire Safety Statement", href: "/annual-fire-safety-statement" },
  { label: "FPA Australia Member", href: "/fpa-australia-member" },
  { label: "NSW Fire Safety Regulations", href: "/13-feb-2026-nsw-fire-safety-regulations" },
  { label: "Fire Protection Services Sydney", href: "/fire-protection-services-sydney", disabled: true },
  { label: "Fire Safety Compliance", href: "/fire-safety-compliance", disabled: true },
  { label: "Fire Consultancy Services", href: "/fire-consultancy-services", disabled: true },
  { label: "Fire Safety Training", href: "/fire-safety-training", disabled: true },
];

const productLinks = [
  { label: "Smoke Alarms (AS 3786)", href: "/services?category=smoke-alarms" },
  { label: "Fire Extinguishers & Signage", href: "/services?category=fire-extinguishers" },
  { label: "Emergency Lights & Exit Signs", href: "/services?category=emergency-lights" },
  { label: "Diesel Pump & Hydrant", href: "/services?category=diesel-pump" },
  { label: "Air & Mechanical Services", href: "/services?category=air-mechanical" },
  { label: "Flow Testing", href: "/services?category=flow-testing" },
  { label: "Service Penetration & Dampers", href: "/services?category=service-penetration" },
  { label: "Fire Panel & Detection", href: "/services?category=fire-panel" },
  { label: "Fire Doors", href: "/services?category=fire-doors" },
  { label: "Plans & Evacuation", href: "/services?category=plans" },
];

const navLinks = [
  { label: "Strata", href: "/strata" },
  { label: "Our Story/Team", href: "/about" },
  { label: "Our Clients", href: "/our-clients" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    // Scroll to top automatically when navigating to a new page
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, lenis]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealContent = document.querySelector<HTMLElement>(".footer-reveal-content");
    const footer = document.querySelector<HTMLElement>(".footer-reveal-panel");

    if (!revealContent || !footer) return;

    let animationFrame = 0;
    const updateFooterVisibility = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const footerIsFixed = window.getComputedStyle(footer).position === "fixed";
        const isVisible = footerIsFixed
          ? revealContent.getBoundingClientRect().bottom <= window.innerHeight
          : footer.getBoundingClientRect().top < window.innerHeight;

        setFooterVisible(isVisible);
      });
    };

    const resizeObserver = new ResizeObserver(updateFooterVisibility);
    resizeObserver.observe(revealContent);
    resizeObserver.observe(footer);
    updateFooterVisibility();

    window.addEventListener("scroll", updateFooterVisibility, { passive: true });
    window.addEventListener("resize", updateFooterVisibility);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  return (
    <>
      <style>{`
        .afs-header-shell {
          color: #ffffff;
          font-family: var(--font-sans), Inter, Arial, sans-serif;
          left: 0;
          opacity: 1;
          pointer-events: none;
          position: fixed;
          right: 0;
          top: 0;
          transform: translateY(0);
          transition: opacity 220ms ease, transform 220ms ease, visibility 220ms ease;
          visibility: visible;
          z-index: 1001;
        }

        .afs-header-shell.is-footer-visible {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-1rem);
          visibility: hidden;
        }

        .afs-header {
          align-items: center;
          background: transparent;
          border: 0 solid transparent;
          border-radius: 0;
          display: grid;
          grid-template-columns: minmax(12rem, 1fr) auto minmax(12rem, 1fr);
          column-gap: clamp(1rem, 2vw, 1.55rem);
          margin: 0 auto;
          margin-top: 0;
          max-width: min(100%, 92rem);
          min-height: 5.25rem;
          padding: 0 clamp(2rem, 4.5vw, 4rem);
          pointer-events: auto;
          transform: translateY(0);
          transition:
            max-width 620ms cubic-bezier(0.19, 1, 0.22, 1),
            width 620ms cubic-bezier(0.19, 1, 0.22, 1),
            min-height 420ms cubic-bezier(0.22, 1, 0.36, 1),
            margin-top 620ms cubic-bezier(0.19, 1, 0.22, 1),
            padding 620ms cubic-bezier(0.19, 1, 0.22, 1),
            background-color 320ms ease,
            border-color 320ms ease,
            border-radius 620ms cubic-bezier(0.19, 1, 0.22, 1),
            box-shadow 320ms ease,
            color 260ms ease;
          width: 100%;
          will-change: max-width, width, min-height, margin-top, padding, border-radius;
        }

        .afs-header-shell.is-solid,
        .afs-header-shell.is-page {
          color: #101010;
        }

        .afs-header-shell.is-solid .afs-header,
        .afs-header-shell.is-page .afs-header {
          background: #ffffff;
          border-color: #ffffff;
          border-radius: 1rem;
          border-width: 0.5rem;
          box-shadow: 0 0.9rem 2.5rem rgba(16, 16, 16, 0.12);
          column-gap: clamp(1rem, 2vw, 1.6rem);
          margin-top: 1.7rem;
          max-width: min(66rem, calc(100vw - 2rem));
          min-height: 3.95rem;
          padding: 0 0.45rem;
          width: calc(100% - 2rem);
        }

        .afs-brand {
          align-items: center;
          display: inline-flex;
          gap: 0.55rem;
          justify-self: start;
          min-height: 2.75rem;
          text-decoration: none;
        }

        .afs-brand-logo {
          display: block;
          height: 3rem;
          object-fit: contain;
          transition: height 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease;
          width: auto;
        }

        .afs-brand-secondary {
          display: block;
          height: 2.35rem;
          object-fit: contain;
          transition: height 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease;
          width: auto;
        }

        .afs-header-shell:not(.is-solid):not(.is-page) .afs-brand-primary {
          filter: brightness(0) invert(1) drop-shadow(0 0.22rem 0.6rem rgba(0, 0, 0, 0.35));
        }

        .afs-header-shell:not(.is-solid):not(.is-page) .afs-brand-secondary {
          filter: brightness(0) invert(1) drop-shadow(0 0.22rem 0.6rem rgba(0, 0, 0, 0.35));
        }

        .afs-header-shell.is-solid .afs-brand,
        .afs-header-shell.is-page .afs-brand {
          margin-right: 0;
        }

        .afs-header-shell.is-solid .afs-brand-logo,
        .afs-header-shell.is-page .afs-brand-logo {
          height: 2.75rem;
        }

        .afs-header-shell.is-solid .afs-brand-secondary,
        .afs-header-shell.is-page .afs-brand-secondary {
          height: 2.1rem;
        }

        .afs-nav {
          align-items: center;
          display: flex;
          gap: clamp(0.6rem, 1.4vw, 1.2rem);
          justify-self: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .afs-nav-item {
          position: static;
        }

        .afs-nav-link,
        .afs-nav-trigger {
          align-items: center;
          background: transparent;
          border: 0;
          border-radius: 999px;
          color: currentColor;
          cursor: pointer;
          display: inline-flex;
          font: inherit;
          font-size: 0.95rem;
          font-weight: 800;
          gap: 0.28rem;
          line-height: 1;
          min-height: 2.35rem;
          padding: 0 0.15rem;
          text-decoration: none;
          transition: color 160ms ease, opacity 160ms ease;
          white-space: nowrap;
        }

        .afs-header-shell.is-solid .afs-nav,
        .afs-header-shell.is-page .afs-nav {
          gap: clamp(0.6rem, 1.4vw, 1.2rem);
        }

        .afs-header-shell.is-solid .afs-nav-link,
        .afs-header-shell.is-solid .afs-nav-trigger,
        .afs-header-shell.is-page .afs-nav-link,
        .afs-header-shell.is-page .afs-nav-trigger {
          font-size: 0.93rem;
          font-weight: 750;
          min-height: 2.7rem;
        }

        .afs-nav-label {
          display: inline-block;
          line-height: 1;
          position: relative;
        }

        .afs-nav-label::after {
          background: #feaf04;
          border-radius: 999px;
          bottom: -0.48rem;
          content: "";
          height: 0.15rem;
          left: 0;
          opacity: 0;
          position: absolute;
          right: 0;
          transform: scaleX(0.35);
          transform-origin: center;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .afs-nav-link:hover .afs-nav-label::after,
        .afs-nav-trigger:hover .afs-nav-label::after,
        .afs-nav-link.is-active .afs-nav-label::after,
        .afs-nav-trigger.is-active .afs-nav-label::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .afs-nav-link:focus-visible,
        .afs-nav-trigger:focus-visible,
        .afs-action:focus-visible,
        .afs-mobile-toggle:focus-visible,
        .afs-mobile-panel a:focus-visible {
          outline: 2px solid #feaf04;
          outline-offset: 4px;
        }

        .afs-nav-trigger svg {
          height: 0.9rem;
          transition: transform 180ms ease;
          width: 0.9rem;
        }

        .afs-nav-trigger[aria-expanded="true"] svg {
          transform: rotate(180deg);
        }

        /* MEGA MENU STYLES */
        .afs-mega-menu {
          background: #ffffff;
          border: 1px solid rgba(16, 16, 16, 0.08);
          border-radius: 1rem;
          box-shadow: 0 2rem 5rem rgba(16, 16, 16, 0.15);
          color: #101010;
          left: 50%;
          width: calc(100% - 2rem);
          max-width: 62rem;
          opacity: 0;
          padding: 0.75rem;
          pointer-events: none;
          position: absolute;
          top: calc(100% + 0.55rem);
          transform: translate(-50%, -0.35rem);
          transition: opacity 200ms ease, transform 200ms ease;
          display: flex;
          gap: 1rem;
          cursor: default;
        }

        .afs-mega-menu.is-open {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }

        .afs-mega-cta {
          flex: 0 0 250px;
          background: linear-gradient(135deg, #111111 0%, #2a2a2a 100%);
          border-radius: 0.75rem;
          padding: 1.5rem;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .afs-mega-badge {
          background: rgba(255, 255, 255, 0.15);
          color: #feaf04;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
          align-self: flex-start;
          margin-bottom: 1rem;
        }

        .afs-mega-title {
          font-size: 1.35rem;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 0.5rem;
        }

        .afs-mega-desc {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          margin: 0 0 1rem;
        }

        .afs-mega-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #ffffff;
          font-weight: 750;
          font-size: 0.95rem;
          text-decoration: none;
          margin-top: auto;
          transition: color 150ms ease;
        }
        
        .afs-mega-cta-link:hover {
          color: #feaf04;
        }

        .afs-mega-content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 0.5rem 0.5rem 0.5rem 0;
        }

        .afs-mega-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .afs-mega-heading {
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #888;
          margin: 0 0 0.4rem;
          padding-left: 0.5rem;
        }

        .afs-mega-link {
          align-items: center;
          border-radius: 0.4rem;
          color: #333;
          display: flex;
          font-size: 0.85rem;
          font-weight: 650;
          padding: 0.35rem 0.5rem;
          text-decoration: none;
          transition: background-color 150ms ease, color 150ms ease;
        }

        .afs-mega-link:hover,
        .afs-mega-link.is-active {
          background: #f4f4f0;
          color: #fc0403;
        }

        .afs-actions {
          align-items: center;
          display: flex;
          gap: 0.3rem;
          justify-self: end;
          margin-left: 0;
        }

        .afs-header-shell.is-solid .afs-actions,
        .afs-header-shell.is-page .afs-actions {
          margin-left: 0;
        }

        @media (min-width: 1201px) {
          .afs-header-shell.is-solid .afs-header,
          .afs-header-shell.is-page .afs-header {
            column-gap: 0.75rem;
            grid-template-columns: auto auto auto;
            max-width: calc(100vw - 2rem);
            width: max-content;
          }

          .afs-header-shell.is-solid .afs-brand,
          .afs-header-shell.is-page .afs-brand {
            justify-self: end;
          }

          .afs-header-shell.is-solid .afs-actions,
          .afs-header-shell.is-page .afs-actions {
            justify-self: start;
          }
        }

        .afs-action {
          align-items: center;
          border: 1px solid currentColor;
          border-radius: 0.5rem;
          color: currentColor;
          display: inline-flex;
          font-size: 0.94rem;
          font-weight: 850;
          justify-content: center;
          line-height: 1;
          min-height: 2.65rem;
          padding: 0 0.85rem;
          text-decoration: none;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
          white-space: nowrap;
        }

        .afs-action.is-primary {
          background: linear-gradient(135deg, #fc0403 0%, #fb5614 55%, #feaf04 100%);
          border-color: #fb5614;
          color: #ffffff;
        }

        .afs-header-shell.is-solid .afs-action,
        .afs-header-shell.is-page .afs-action {
          border-color: #101010;
          border-radius: 0.45rem;
          font-size: 0.9rem;
          min-height: 2.65rem;
          padding: 0 0.85rem;
        }

        .afs-header-shell.is-solid .afs-action.is-primary,
        .afs-header-shell.is-page .afs-action.is-primary {
          background: #fc0403;
          border-color: #fc0403;
          color: #ffffff;
        }

        .afs-action:hover {
          background: currentColor;
        }

        .afs-action:hover span {
          color: #101010;
        }

        .afs-header-shell.is-solid .afs-action:hover span,
        .afs-header-shell.is-page .afs-action:hover span {
          color: #ffffff;
        }

        .afs-action.is-primary:hover {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
        }

        .afs-mobile-toggle {
          align-items: center;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 999px;
          color: currentColor;
          cursor: pointer;
          display: none;
          height: 2.75rem;
          justify-content: center;
          width: 2.75rem;
        }

        .afs-header-shell.is-solid .afs-mobile-toggle,
        .afs-header-shell.is-page .afs-mobile-toggle {
          background: #f5f5f0;
          border-color: rgba(16, 16, 16, 0.1);
        }

        .afs-mobile-panel {
          background: #101010;
          color: #ffffff;
          display: none;
          inset: 0;
          min-height: 100dvh;
          overflow-y: auto;
          padding: 5.25rem 1.15rem 1.4rem;
          position: fixed;
          transform: translateY(-100%);
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1000;
        }

        .afs-mobile-panel.is-open {
          transform: translateY(0);
        }

        .afs-mobile-links {
          display: grid;
          gap: 0.15rem;
        }

        .afs-mobile-link {
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          display: flex;
          font-size: clamp(2.15rem, 12vw, 4.5rem);
          font-weight: 900;
          justify-content: space-between;
          letter-spacing: 0;
          line-height: 0.95;
          min-height: 4.9rem;
          padding: 1rem 0;
          text-decoration: none;
          text-transform: uppercase;
        }

        .afs-mobile-services {
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          display: grid;
          gap: 0.25rem;
          padding: 1rem 0 1.25rem;
        }

        .afs-mobile-services-title {
          color: #feaf04;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1;
          margin: 0 0 0.55rem;
          text-transform: uppercase;
        }

        .afs-mobile-service-link {
          align-items: center;
          color: rgba(255, 255, 255, 0.84);
          display: flex;
          font-size: 1rem;
          font-weight: 750;
          justify-content: space-between;
          min-height: 2.85rem;
          text-decoration: none;
        }

        .afs-mobile-actions {
          display: grid;
          gap: 0.75rem;
          margin-top: 1.4rem;
        }

        .afs-mobile-action {
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 0.4rem;
          color: #ffffff;
          display: flex;
          font-size: 0.95rem;
          font-weight: 850;
          justify-content: center;
          min-height: 3rem;
          text-decoration: none;
        }

        .afs-mobile-action.is-primary {
          background: linear-gradient(135deg, #fc0403 0%, #fb5614 60%, #feaf04 100%);
          border-color: #fb5614;
          color: #101010;
        }

        .afs-header-spacer {
          display: block;
          height: 6.6rem;
        }

        .afs-header-spacer.is-home {
          display: none;
        }

        @media (max-width: 1200px) {
          .afs-header {
            grid-template-columns: 1fr auto;
          }

          .afs-nav,
          .afs-actions {
            display: none;
          }

          .afs-mobile-toggle,
          .afs-mobile-panel {
            display: flex;
          }

          .afs-mobile-panel {
            flex-direction: column;
          }
        }

        @media (max-width: 640px) {
          .afs-header {
            min-height: 4.25rem;
            padding-inline: 0.85rem;
          }

          .afs-brand-logo {
            height: 2rem;
            max-width: 8rem;
          }

          .afs-brand-secondary {
            height: 1.6rem;
            max-width: 4rem;
          }

          .afs-header-shell.is-solid .afs-brand-secondary,
          .afs-header-shell.is-page .afs-brand-secondary {
            height: 1.6rem;
          }

          .afs-header-spacer {
            height: 4.25rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .afs-header-shell,
          .afs-header-shell::before,
          .afs-nav-label::after,
          .afs-nav-trigger svg,
          .afs-mega-menu,
          .afs-action,
          .afs-mobile-panel {
            transition: none;
          }
        }
      `}</style>

      <header
        className={`afs-header-shell${scrolled ? " is-solid" : ""}${footerVisible && !mobileOpen ? " is-footer-visible" : ""}`}
      >
        <nav className="afs-header" aria-label="Primary navigation">
          <Link href="/" className="afs-brand" aria-label="All Fire Services home" onClick={closeMenus}>
            <Image
              className="afs-brand-logo afs-brand-primary"
              src={assets.global.logo}
              alt="All Fire Services"
              width={527}
              height={257}
              sizes="(max-width: 640px) 148px, 168px"
              priority
            />
            <Image
              className="afs-brand-secondary"
              src={assets.global.logoSecondary}
              alt="FPA Australia Bronze Member"
              width={309}
              height={133}
              sizes="(max-width: 640px) 64px, 88px"
              priority
            />
          </Link>

          <ul className="afs-nav">
            {navLinks.map((item) => (
              <li
                className="afs-nav-item"
                key={item.label}
                ref={item.hasDropdown ? dropdownRef : undefined}
              >
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`afs-nav-trigger${[...serviceLinks, ...productLinks].some((link) => isActive(link.href))
                        ? " is-active"
                        : ""
                        }`}
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="afs-services-menu"
                      onClick={() => setServicesOpen((o) => !o)}
                      onMouseEnter={() => setServicesOpen(true)}
                    >
                      <span className="afs-nav-label">{item.label}</span>
                      <ChevronDown aria-hidden="true" />
                    </button>

                    <div
                      className={`afs-mega-menu${servicesOpen ? " is-open" : ""}`}
                      id="afs-services-menu"
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {/* Left CTA Card */}
                      <div className="afs-mega-cta">
                        <span className="afs-mega-badge">All Services</span>
                        <h3 className="afs-mega-title">Everything you need for fire safety</h3>
                        <p className="afs-mega-desc">
                          Discover how All Fire Services can transform your building&apos;s compliance and protection.
                        </p>
                        <Link href="/contact" className="afs-mega-cta-link" onClick={closeMenus}>
                          Speak with our team <ArrowRight size={18} />
                        </Link>
                      </div>

                      {/* Right Columns */}
                      <div className="afs-mega-content">
                        {/* Column 1: Services */}
                        <div className="afs-mega-col">
                          <p className="afs-mega-heading">Services & Compliance</p>
                          {serviceLinks.map((service) => (
                            <Link
                              className={`afs-mega-link${isActive(service.href) || service.highlight ? " is-active" : ""}`}
                              href={service.href}
                              key={service.href}
                              onClick={service.disabled ? (e) => e.preventDefault() : closeMenus}
                              style={service.disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>

                        {/* Column 2: Products */}
                        <div className="afs-mega-col">
                          <p className="afs-mega-heading">Products & Equipment</p>
                          {productLinks.map((product) => (
                            <Link
                              className={`afs-mega-link`}
                              href={product.href}
                              key={product.href}
                              onClick={closeMenus}
                            >
                              {product.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    className={`afs-nav-link${isActive(item.href) ? " is-active" : ""}`}
                    href={item.href}
                    onClick={closeMenus}
                  >
                    <span className="afs-nav-label">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="afs-actions">
            <a className="afs-action" href="tel:1300765594" onClick={closeMenus}>
              <span>Call 1300 765 594</span>
            </a>
            <a
              className="afs-action is-primary"
              href="https://allfireservices-au.vercel.app/contact"
              onClick={closeMenus}
            >
              Get a Quote
            </a>
          </div>

          <button
            className="afs-mobile-toggle"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="afs-mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </nav>
      </header>

      <div className={`afs-mobile-panel${mobileOpen ? " is-open" : ""}`} id="afs-mobile-menu">
        <div className="afs-mobile-links">
          {navLinks
            .filter((item) => !item.hasDropdown)
            .map((item) => (
              <Link className="afs-mobile-link" href={item.href} key={item.href} onClick={closeMenus}>
                {item.label}
                <ArrowUpRight aria-hidden="true" size={24} />
              </Link>
            ))}
        </div>

        <div className="afs-mobile-services" aria-label="Services & Compliance">
          <p className="afs-mobile-services-title">Services & Compliance</p>
          {serviceLinks.map((service) => (
            <Link
              className={`afs-mobile-service-link${service.highlight ? " is-active" : ""}`}
              href={service.href}
              key={service.href}
              onClick={service.disabled ? (e) => e.preventDefault() : closeMenus}
              style={service.disabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
              {service.label}
              {!service.disabled && <ArrowUpRight aria-hidden="true" size={16} />}
            </Link>
          ))}
        </div>

        <div className="afs-mobile-services" aria-label="Products & Equipment">
          <p className="afs-mobile-services-title">Products & Equipment</p>
          {productLinks.map((product) => (
            <Link className="afs-mobile-service-link" href={product.href} key={product.href} onClick={closeMenus}>
              {product.label}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          ))}
        </div>

        <div className="afs-mobile-actions">
          <a className="afs-mobile-action" href="tel:1300765594" onClick={closeMenus}>
            Call 1300 765 594
          </a>
          <a
            className="afs-mobile-action is-primary"
            href="https://allfireservices-au.vercel.app/contact"
            onClick={closeMenus}
          >
            Get a Quote
          </a>
        </div>
      </div>

      <div id="main-content" className="afs-header-spacer is-home" />
    </>
  );
}

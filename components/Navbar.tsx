"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 17" fill="none">
    <g clipPath="url(#clip0_nav_arrow)">
      <path d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_nav_arrow">
        <rect width="16" height="16" fill="currentColor" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z" fill="currentColor" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/products", label: "Products", hasDropdown: true },
    { href: "/process", label: "Our Process" },
    { href: "/about", label: "About Us" },
    { href: "/find-a-fitter", label: "Find a Fitter" },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "?");

  return (
    <>
      <style>{`
        .dl-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #ffffff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          transition: box-shadow 0.2s ease;
        }
        .dl-navbar.scrolled {
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
        }
        .dl-navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
        }
        .dl-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #111;
          flex-shrink: 0;
        }
        .dl-logo svg {
          height: 22px;
          width: auto;
        }
        .dl-nav-links {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .dl-nav-item {
          position: relative;
        }
        .dl-nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #444;
          text-decoration: none;
          border-radius: 6px;
          transition: color 0.15s ease, background 0.15s ease;
          white-space: nowrap;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
        }
        .dl-nav-link:hover,
        .dl-nav-link.active {
          color: #111;
          background: rgba(0,0,0,0.04);
        }
        .dl-nav-link.active {
          font-weight: 600;
        }
        .dl-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 8px;
          min-width: 280px;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .dl-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .dl-dropdown-header {
          padding: 8px 12px 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #999;
        }
        .dl-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #111;
          transition: background 0.12s ease;
        }
        .dl-dropdown-item:hover {
          background: rgba(0,0,0,0.04);
        }
        .dl-dropdown-img {
          width: 48px;
          height: 36px;
          border-radius: 6px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .dl-dropdown-label {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .dl-dropdown-desc {
          font-size: 0.75rem;
          color: #777;
          margin-top: 1px;
        }
        .dl-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          background: #111;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.15s ease, transform 0.1s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .dl-cta-btn:hover {
          background: #333;
          transform: translateY(-1px);
        }
        .dl-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .dl-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #111;
          border-radius: 2px;
          transition: all 0.2s ease;
        }
        .dl-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .dl-hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .dl-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .dl-mobile-menu {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          z-index: 999;
        }
        .dl-mobile-menu.open {
          display: block;
        }
        .dl-mobile-link {
          display: block;
          padding: 12px 8px;
          font-size: 1rem;
          font-weight: 500;
          color: #111;
          text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .dl-mobile-link:last-child {
          border-bottom: none;
        }
        .dl-mobile-cta {
          margin-top: 16px;
          display: block;
          text-align: center;
          padding: 12px;
          background: #111;
          color: #fff;
          font-weight: 500;
          border-radius: 100px;
          text-decoration: none;
        }
        /* Offset page content for fixed navbar */
        .dl-navbar-spacer {
          height: 64px;
        }
        @media (max-width: 768px) {
          .dl-nav-links { display: none; }
          .dl-desktop-cta { display: none; }
          .dl-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`dl-navbar${scrolled ? " scrolled" : ""}`}>
        <div className="dl-navbar-inner">
          {/* Logo */}
          <Link href="/" className="dl-logo" aria-label="Drivelodge Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="136" viewBox="0 0 136 41" fill="none">
              <g clipPath="url(#clip_nav_logo)">
                <path d="M0 26.8793H5.45037C6.55583 26.8793 7.56005 27.0531 8.46305 27.4047C9.37009 27.7563 10.1516 28.2453 10.8116 28.8677C11.4676 29.4941 11.9778 30.2256 12.3382 31.0703C12.6946 31.9109 12.8768 32.8242 12.8768 33.8063V33.8467C12.8768 34.8288 12.6946 35.7462 12.3382 36.5989C11.9778 37.4436 11.4676 38.1872 10.8116 38.8096C10.1516 39.4319 9.37009 39.925 8.46305 40.2847C7.56005 40.6403 6.55583 40.8222 5.45037 40.8222H0V26.8793ZM5.45037 38.0538C6.07801 38.0538 6.64896 37.9568 7.16727 37.7588C7.68558 37.5567 8.13101 37.2698 8.50354 36.898C8.87608 36.5262 9.16358 36.0897 9.362 35.5764C9.56041 35.0632 9.66164 34.5014 9.66164 33.8952V33.8548C9.66164 33.2284 9.56041 32.6626 9.362 32.1534C9.16358 31.6401 8.87608 31.1996 8.50354 30.8278C8.13101 30.456 7.68558 30.165 7.16727 29.9629C6.64896 29.7568 6.07801 29.6558 5.45037 29.6558H3.07747V38.0619H5.45037V38.0538Z" fill="currentColor"/>
                <path d="M19.6918 30.751H24.3039C25.5835 30.751 26.5634 31.0905 27.2478 31.7735C27.8268 32.3474 28.1103 33.1152 28.1103 34.0771V34.1054C28.1103 34.9217 27.9119 35.5805 27.511 36.0937C27.1142 36.607 26.5918 36.9869 25.948 37.2253L28.414 40.8222L23.656 37.5971H21.9108V40.8222H19.6918V30.747V30.751ZM24.1622 35.6573C24.7129 35.6573 25.13 35.5279 25.4256 35.2652C25.7171 35.0066 25.8629 34.659 25.8629 34.2226V34.1943C25.8629 33.7134 25.709 33.3537 25.4013 33.1112C25.0935 32.8727 24.6643 32.7515 24.1177 32.7515H21.9108V35.6573H24.1582H24.1622Z" fill="currentColor"/>
                <path d="M33.5081 30.751H35.7271V40.8262H33.5081V30.751Z" fill="currentColor"/>
                <path d="M40.6713 30.751H43.1251L45.7653 37.8437L48.4054 30.751H50.7986L46.7209 40.8949H44.7611L40.6794 30.751H40.6713Z" fill="currentColor"/>
                <path d="M55.6375 30.751H63.234V32.7232H57.8281V34.7682H62.5861V36.7404H57.8281V38.854H63.3068V40.8262H55.6375V30.751Z" fill="currentColor"/>
                <path d="M68.5831 30.751H70.8022V38.8096H75.8354V40.8262H68.5831V30.751Z" fill="currentColor"/>
                <path d="M85.1245 41C84.343 41 83.6263 40.8626 82.9744 40.5837C82.3184 40.313 81.7555 39.9411 81.2818 39.4764C80.808 39.0116 80.4354 38.466 80.1682 37.8356C79.905 37.2092 79.7714 36.5342 79.7714 35.8108V35.7825C79.7714 35.0632 79.905 34.3923 80.1722 33.7618C80.4395 33.1354 80.812 32.5818 81.2858 32.1089C81.7636 31.6361 82.3305 31.2602 82.9865 30.9854C83.6465 30.7106 84.3673 30.5772 85.1448 30.5772C85.9223 30.5772 86.639 30.7106 87.2909 30.9854C87.9429 31.2602 88.5098 31.628 88.9876 32.0927C89.4614 32.5575 89.8339 33.1071 90.093 33.7336C90.3603 34.3559 90.4939 35.0308 90.4939 35.7543V35.7825C90.4939 36.506 90.3603 37.1768 90.089 37.8073C89.8217 38.4337 89.4492 38.9874 88.9714 39.4602C88.4976 39.9371 87.9307 40.3089 87.2747 40.5837C86.6147 40.8585 85.898 41 85.1205 41H85.1245ZM85.1529 38.951C85.6024 38.951 86.0154 38.8702 86.3839 38.7085C86.7524 38.5469 87.0723 38.3205 87.3314 38.0336C87.5987 37.7467 87.8011 37.4112 87.951 37.0313C88.1008 36.6555 88.1737 36.2513 88.1737 35.8149V35.7866C88.1737 35.3542 88.1008 34.95 87.951 34.5661C87.8011 34.1822 87.5906 33.8467 87.3193 33.5557C87.0439 33.2688 86.72 33.0384 86.3515 32.8727C85.983 32.703 85.57 32.6181 85.1205 32.6181C84.671 32.6181 84.2701 32.703 83.8936 32.8647C83.521 33.0304 83.2011 33.2526 82.9298 33.5436C82.6666 33.8306 82.4601 34.166 82.3103 34.5459C82.1645 34.9217 82.0876 35.3259 82.0876 35.7583V35.7866C82.0876 36.219 82.1645 36.6272 82.3103 37.0111C82.4601 37.3951 82.6707 37.7305 82.946 38.0174C83.2214 38.3044 83.5453 38.5347 83.9179 38.7045C84.2944 38.8702 84.6994 38.955 85.1448 38.955L85.1529 38.951Z" fill="currentColor"/>
                <path d="M95.7581 30.751H99.694C100.492 30.751 101.221 30.8763 101.873 31.1309C102.524 31.3855 103.091 31.7371 103.565 32.1897C104.043 32.6424 104.407 33.1678 104.667 33.778C104.93 34.3883 105.059 35.047 105.059 35.7583V35.7866C105.059 36.4979 104.93 37.1607 104.667 37.775C104.411 38.3852 104.043 38.9227 103.565 39.3713C103.087 39.828 102.524 40.1796 101.873 40.4423C101.221 40.6969 100.492 40.8262 99.694 40.8262H95.7581V30.751ZM99.698 38.8257C100.152 38.8257 100.565 38.753 100.937 38.6115C101.314 38.466 101.634 38.2599 101.901 37.9932C102.172 37.7224 102.375 37.4032 102.52 37.0313C102.662 36.6636 102.739 36.2594 102.739 35.8149V35.7866C102.739 35.338 102.666 34.9217 102.52 34.554C102.375 34.1862 102.172 33.8669 101.901 33.6002C101.63 33.3335 101.31 33.1233 100.937 32.9738C100.561 32.8283 100.148 32.7515 99.698 32.7515H97.9811V38.8257H99.698Z" fill="currentColor"/>
                <path d="M115.183 41C114.397 41 113.676 40.8666 113.028 40.612C112.38 40.3493 111.822 39.9896 111.356 39.533C110.89 39.0722 110.526 38.5226 110.267 37.8881C110.008 37.2536 109.878 36.5625 109.878 35.8149V35.7866C109.878 35.0672 110.012 34.3964 110.275 33.7659C110.538 33.1395 110.902 32.5858 111.376 32.113C111.846 31.6401 112.405 31.2643 113.057 30.9895C113.705 30.7146 114.409 30.5813 115.166 30.5813C115.624 30.5813 116.033 30.6096 116.401 30.6742C116.77 30.7348 117.118 30.8238 117.434 30.9369C117.75 31.0541 118.049 31.1996 118.325 31.3693C118.604 31.5431 118.871 31.7371 119.135 31.9594L117.734 33.6446C117.539 33.483 117.349 33.3375 117.155 33.2122C116.964 33.0869 116.762 32.9819 116.555 32.897C116.349 32.8121 116.126 32.7434 115.883 32.6949C115.644 32.6464 115.381 32.6222 115.093 32.6222C114.689 32.6222 114.308 32.707 113.96 32.8768C113.607 33.0425 113.3 33.2688 113.036 33.5517C112.769 33.8346 112.567 34.166 112.417 34.5459C112.267 34.9217 112.194 35.3259 112.194 35.7583V35.7866C112.194 36.2473 112.267 36.6717 112.417 37.0596C112.567 37.4476 112.773 37.7871 113.049 38.074C113.324 38.365 113.648 38.5832 114.024 38.7449C114.401 38.8985 114.806 38.9833 115.251 38.9833C115.656 38.9833 116.037 38.9348 116.389 38.8338C116.746 38.7328 117.065 38.5792 117.341 38.3812V36.9384H115.106L119.491 35.0228V39.3996C118.973 39.8401 118.349 40.216 117.636 40.5312C116.92 40.8424 116.102 41 115.178 41H115.183Z" fill="currentColor"/>
                <path d="M125.379 26.8793H135.899V29.6073H128.412V32.4363H135V35.1642H128.412V38.0983H135.996V40.8262H125.375V26.8834L125.379 26.8793Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip_nav_logo">
                  <rect width="136" height="41" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="dl-nav-links">
            {/* Products with dropdown */}
            <li className="dl-nav-item" ref={dropdownRef}>
              <button
                className={`dl-nav-link${isActive("/products") ? " active" : ""}`}
                onClick={() => setProductsOpen((v) => !v)}
                aria-expanded={productsOpen}
              >
                Products <ChevronIcon />
              </button>
              <div className={`dl-dropdown${productsOpen ? " open" : ""}`}>
                <div className="dl-dropdown-header">Drivelodge Products</div>
                <Link href="/products?roof=Elevated+Roof" className="dl-dropdown-item" onClick={() => setProductsOpen(false)}>
                  <img
                    className="dl-dropdown-img"
                    src="https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof-p-500.webp"
                    alt="Elevated Roof"
                  />
                  <div>
                    <div className="dl-dropdown-label">Elevated Roofs</div>
                    <div className="dl-dropdown-desc">Browse elevating roofs by make and model</div>
                  </div>
                </Link>
                <Link href="/products?roof=High+Top+Roof" className="dl-dropdown-item" onClick={() => setProductsOpen(false)}>
                  <img
                    className="dl-dropdown-img"
                    src="https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof-p-500.webp"
                    alt="High-Top Roof"
                  />
                  <div>
                    <div className="dl-dropdown-label">High-Top Roofs</div>
                    <div className="dl-dropdown-desc">Browse high-top conversions by make and model</div>
                  </div>
                </Link>
                <Link href="/products" className="dl-dropdown-item" style={{borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "4px", paddingTop: "12px"}} onClick={() => setProductsOpen(false)}>
                  <div style={{display:"flex", alignItems:"center", gap:"6px", fontSize:"0.8rem", fontWeight:500, color:"#555"}}>
                    View all products <ArrowIcon />
                  </div>
                </Link>
              </div>
            </li>

            <li className="dl-nav-item">
              <Link href="/process" className={`dl-nav-link${isActive("/process") ? " active" : ""}`}>
                Our Process
              </Link>
            </li>
            <li className="dl-nav-item">
              <Link href="/about" className={`dl-nav-link${isActive("/about") ? " active" : ""}`}>
                About Us
              </Link>
            </li>
            <li className="dl-nav-item">
              <Link href="/find-a-fitter" className={`dl-nav-link${isActive("/find-a-fitter") ? " active" : ""}`}>
                Find a Fitter
              </Link>
            </li>
          </ul>

          {/* CTA Button */}
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <Link href="/contact" className="dl-cta-btn dl-desktop-cta">
              Get in Touch
            </Link>
            {/* Hamburger */}
            <button
              className={`dl-hamburger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`dl-mobile-menu${mobileOpen ? " open" : ""}`}>
        <Link href="/products" className="dl-mobile-link">Products</Link>
        <Link href="/process" className="dl-mobile-link">Our Process</Link>
        <Link href="/about" className="dl-mobile-link">About Us</Link>
        <Link href="/find-a-fitter" className="dl-mobile-link">Find a Fitter</Link>
        <Link href="/contact" className="dl-mobile-cta">Get in Touch</Link>
      </div>

      {/* Spacer to push content below fixed navbar */}
      <div className="dl-navbar-spacer" />
    </>
  );
}

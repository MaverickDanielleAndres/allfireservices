import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/lib/assets";

// Social Media SVGs - Sleek and consistent
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const ArrowSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 16 17"
    fill="none"
  >
    <g clipPath="url(#clip0_6401_1558_footer)">
      <path
        d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_6401_1558_footer">
        <rect width="16" height="16" fill="currentColor" transform="translate(0 0.5)"></rect>
      </clipPath>
    </defs>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-8 pb-6 w-full mt-auto border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-6">
        
        {/* Top Call to Action Section - Matching Hero Button Styles */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-gray-200 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Ready to ensure your building&apos;s fire safety?
          </h2>
          <div className="button-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center' }}>
            <Link
              data-wf--button--size="small"
              href="/contact"
              className="button-wrap w-inline-block"
            >
              <div
                data-wf--button-style--
                className="button-content w-variant-2322bba7-d743-d5ae-17b2-3a616235fc2a"
              >
                <div data-wf--button-layout--layout="normal" className="button-layout">
                  <div className="button-text">Get in touch</div>
                  <div className="button-icon">
                    <div className="icon-slot">
                      <ArrowSVG />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <a
              data-wf--button--size="small"
              href="tel:1300765594"
              className="button-wrap w-inline-block"
            >
              <div data-wf--button-style-- className="button-content">
                <div data-wf--button-layout--layout="normal" className="button-layout">
                  <div className="button-text">Call 1300 765 594</div>
                  <div className="button-icon">
                    <div className="icon-slot">
                      <ArrowSVG />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Main Footer Content - Centered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center items-start">
          
          {/* Column 1: Logos and Info */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/" className="inline-block mb-2">
              <Image 
                src={assets.global.logo} 
                alt="All Fire Services Logo" 
                width={160} 
                height={50} 
                className="object-contain"
              />
            </Link>
            <p className="font-semibold text-gray-800 text-sm">
              Protecting People - Protecting Property
            </p>
            <div className="text-gray-600 text-sm flex flex-col gap-1 mt-1">
              <p>330 Wattle Street Ultimo NSW 2007</p>
              <a href="mailto:admin@allfireservices.com.au" className="hover:text-[#FF1A1A] transition-colors">
                admin@allfireservices.com.au
              </a>
            </div>
            {assets.global.logoSecondary && (
              <div className="mt-4">
                <Image 
                  src={assets.global.logoSecondary} 
                  alt="FPA Bronze Member Logo" 
                  width={140} 
                  height={50} 
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Column 2: Business Hours */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-xl md:text-2xl font-bold text-gray-900">BUSINESS HOURS</div>
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <p>Monday – Friday: 7:00am to 6:30pm</p>
              <p>Saturday: 7:00am to 12:30pm</p>
              <p className="mt-1 font-medium text-gray-800">24/7 After Hours: 0484 648 400</p>
            </div>
          </div>

          {/* Column 3: Navigation and Socials */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-xl md:text-2xl font-bold text-gray-900">NAVIGATE</div>
            <ul className="footer-link-list flex flex-col gap-2 text-sm text-gray-600">
              <li><Link href="/fpa-australia-member" className="hover:text-[#FF1A1A] transition-colors" style={{ textDecoration: 'none' }}>FPA Australia Member</Link></li>
            </ul>

            {/* Social Icons - Professional solid colors */}
            <div className="flex justify-center items-center gap-4 mt-3">
              <a href="#" className="text-[#1877F2] hover:opacity-80 transition-opacity"><FacebookIcon /></a>
              <a href="#" className="text-[#FF0000] hover:opacity-80 transition-opacity"><YoutubeIcon /></a>
              <a href="#" className="text-black hover:opacity-80 transition-opacity"><XIcon /></a>
              <a href="#" className="text-[#0A66C2] hover:opacity-80 transition-opacity"><LinkedinIcon /></a>
              <a href="#" className="text-black hover:opacity-80 transition-opacity"><TikTokIcon /></a>
              <a href="#" className="text-[#E1306C] hover:opacity-80 transition-opacity"><InstagramIcon /></a>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-xl md:text-2xl font-bold text-gray-900">QUICK LINKS</div>
            <ul className="footer-link-list flex flex-col gap-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-[#FF1A1A] transition-colors" style={{ textDecoration: 'none' }}>Home</Link></li>
              <li><Link href="/strata" className="hover:text-[#FF1A1A] transition-colors" style={{ textDecoration: 'none' }}>Strata</Link></li>
              <li><Link href="/about" className="hover:text-[#FF1A1A] transition-colors" style={{ textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#FF1A1A] transition-colors" style={{ textDecoration: 'none' }}>Services</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF1A1A] transition-colors" style={{ textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-gray-200 text-[13px] text-gray-500">
          <p>© {new Date().getFullYear()} All Fire Services Australia. All Rights Reserved.</p>
          <div className="flex items-center gap-5 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-800 transition-colors no-underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-800 transition-colors no-underline">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

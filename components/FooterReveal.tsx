"use client";
import React from "react";

export default function FooterReveal({
  footerContent,
  children,
}: {
  footerContent: React.ReactNode;
  children: React.ReactNode;
}) {
  const footerRef = React.useRef<HTMLElement>(null);
  // Seed with a generous default so the main column never starts at 0
  // margin-bottom and then jumps when the ResizeObserver fires. Prevents
  // the layout shift that Lighthouse flags as a CLS contributor.
  const [footerHeight, setFooterHeight] = React.useState(640);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!footerRef.current || isMobile) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        // Only push state if the value actually changed — avoids a paint
        // on every internal observer tick.
        setFooterHeight((prev) => (Math.abs(prev - h) < 1 ? prev : h));
      }
    });
    resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, [isMobile]);

  return (
    <>
      <div
        className={`footer-reveal-content relative bg-white transition-all duration-300 ${isMobile ? '' : 'z-10'}`}
        style={{ marginBottom: isMobile ? 0 : footerHeight }}
      >
        {children}
      </div>
      <footer
        ref={footerRef}
        className={`footer-reveal-panel ${isMobile ? 'relative w-full' : 'fixed bottom-0 left-0 w-full z-0'}`}
      >
        {footerContent}
      </footer>
    </>
  );
}



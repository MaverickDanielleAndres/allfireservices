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
  const [footerHeight, setFooterHeight] = React.useState(0);
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
        setFooterHeight(entry.contentRect.height);
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


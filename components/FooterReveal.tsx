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

  React.useEffect(() => {
    if (!footerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <div
        className="footer-reveal-content relative z-10 bg-white transition-all duration-300"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </div>
      <footer
        ref={footerRef}
        className="footer-reveal-panel fixed bottom-0 left-0 w-full z-0"
      >
        {footerContent}
      </footer>
    </>
  );
}


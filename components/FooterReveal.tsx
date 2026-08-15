import React from "react";

export default function FooterReveal({
  footerContent,
  children,
}: {
  footerContent: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="footer-reveal-content relative bg-white">
        {children}
      </div>
      <footer className="footer-reveal-panel relative w-full">
        {footerContent}
      </footer>
    </>
  );
}

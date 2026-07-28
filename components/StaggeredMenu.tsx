"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./staggered-menu.css";

export interface StaggeredMenuItem {
  label: string;
  link: string;
  ariaLabel?: string;
}

interface StaggeredMenuProps {
  position?: "left" | "right";
  items: StaggeredMenuItem[];
  className?: string;
  bottomContent?: ReactNode;
  menuButtonColor?: string;
  accentColor?: string;
}

export default function StaggeredMenu({
  position = "right",
  items,
  className,
  bottomContent,
  menuButtonColor = "#1A1A1A",
  accentColor = "#FB5614",
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const accentStyle = {
    "--sm-accent": accentColor,
  } as CSSProperties;

  const closeMenu = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => toggleBtnRef.current?.focus(), 280);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    window.requestAnimationFrame(() => closeBtnRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const handleResize = () => {
      if (window.innerWidth > 1024) closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, closeMenu]);

  return (
    <div
      className={cn("staggered-menu-wrapper", className)}
      style={accentStyle}
      data-position={position}
    >
      <button
        ref={toggleBtnRef}
        className="sm-toggle"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={openMenu}
        type="button"
        style={{ color: menuButtonColor }}
      >
        <span className="sm-hamburger" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            className="sm-panel-container"
            data-open={open || undefined}
            data-position={position}
            style={accentStyle}
          >
            <button
              type="button"
              className="sm-click-away"
              aria-label="Close menu"
              onClick={closeMenu}
              tabIndex={open ? 0 : -1}
            />

            <aside
              id="staggered-menu-panel"
              className="staggered-menu-panel"
              aria-hidden={!open}
              aria-label="Mobile navigation"
            >
              <button
                ref={closeBtnRef}
                type="button"
                className="sm-panel-close"
                aria-label="Close menu"
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
              >
                <span className="sm-panel-close-icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>

              <div className="sm-panel-inner">
                <ul className="sm-panel-list" role="list" data-numbering>
                  {items.map((item) => (
                    <li className="sm-panel-itemWrap" key={item.label}>
                      <Link
                        className="sm-panel-item"
                        href={item.link}
                        aria-label={item.ariaLabel}
                        onClick={closeMenu}
                      >
                        <span className="sm-panel-itemLabel">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {bottomContent && (
                  <div
                    className="sm-panel-bottom"
                    onClick={(event) => {
                      if ((event.target as Element).closest("a")) closeMenu();
                    }}
                  >
                    {bottomContent}
                  </div>
                )}
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </div>
  );
}

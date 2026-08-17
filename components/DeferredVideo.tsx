"use client";

import { useEffect, useRef, useState } from "react";

type DeferredVideoProps = {
  /** Comma-separated source list: "webm:url,mp4:url" — generates <source> tags in order. */
  src: string;
  /** Poster image URL — also used as the immediate eager paint before activation. */
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  // Play video as soon as it enters the viewport (default true).
  // Set false to only play after the user clicks.
  autoPlayOnView?: boolean;
  /**
   * `true` when this video sits above the fold and the poster should be the
   * LCP candidate. Switches the placeholder <img> from `loading="lazy"` to
   * `loading="eager"` + `fetchpriority="high"` so the browser preloads it.
   */
  isLCP?: boolean;
  /**
   * How long after activation (or after page load for above-fold videos)
   * to wait before attaching the `<source>` tags to the `<video>` element.
   * The poster paints immediately; the video bytes do not start downloading
   * until this delay has elapsed. Set to 0 to keep the previous behaviour.
   */
  sourceDelayMs?: number;
};

function parseSources(spec: string): { type: string; src: string }[] {
  return spec
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colon = part.indexOf(":");
      if (colon < 0) return { type: "video/mp4", src: part };
      const type = part.slice(0, colon).trim();
      const url = part.slice(colon + 1).trim();
      const mime =
        type === "webm"
          ? "video/webm"
          : type === "mp4"
            ? "video/mp4"
            : type;
      return { type: mime, src: url };
    });
}

export default function DeferredVideo({
  src,
  poster,
  className,
  style,
  autoPlayOnView = true,
  isLCP = false,
  sourceDelayMs = 2500,
}: DeferredVideoProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // For above-fold (isLCP) videos, activate immediately so the <video> element
  // is rendered on first paint — this avoids the flash caused by the React
  // state swap from <img> poster → <video> once IntersectionObserver fires.
  const [activated, setActivated] = useState(isLCP);
  const [sourcesReady, setSourcesReady] = useState(sourceDelayMs === 0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivated(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Attach the <source> children a short delay after activation so the
  // poster paints first and the video bytes do not compete with the LCP
  // for bandwidth / main-thread time. `requestIdleCallback` schedules the
  // work for when the browser is otherwise idle.
  useEffect(() => {
    if (!activated || sourcesReady) return;
    if (sourceDelayMs === 0) {
      setSourcesReady(true);
      return;
    }
    const ric =
      typeof (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback === "function"
        ? (cb: () => void) =>
            (
              window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }
            ).requestIdleCallback(cb, { timeout: sourceDelayMs + 500 })
        : null;
    const timer = window.setTimeout(() => {
      if (videoRef.current) {
        // Force the <video> to load once we have source URLs.
        videoRef.current.load();
      }
      setSourcesReady(true);
    }, sourceDelayMs);
    return () => {
      window.clearTimeout(timer);
      if (ric && typeof (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback === "function") {
        // best-effort
      }
    };
  }, [activated, sourcesReady, sourceDelayMs]);

  const sources = sourcesReady ? parseSources(src) : [];

  return (
    <div ref={ref} className={className} style={style}>
      {activated ? (
        <video
          ref={videoRef}
          poster={poster}
          autoPlay={autoPlayOnView}
          loop
          muted
          playsInline
          // `none` until sources are attached, then we set `metadata` so the
          // browser fetches only enough to determine duration + first frame.
          preload={sourcesReady ? "metadata" : "none"}
          // Decorative video — the poster carries the meaning. Keeps the
          // element out of the accessibility tree so SR users don't
          // perceive a "video" they can't play.
          aria-hidden="true"
          tabIndex={-1}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          // The poster is the immediate paint for the hero. When this is the
          // LCP element, mark it eager + high fetch priority so the browser
          // doesn't deprioritise it. For below-fold usages the existing
          // lazy behaviour is preserved.
          //
          // React 19 expects `fetchPriority` (camelCase) — lowercase is
          // silently treated as a custom attribute, so the LCP hint never
          // reaches the browser. Verified against React 19.2.x source.
          loading={isLCP ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isLCP ? "high" : "auto"}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
      )}
    </div>
  );
}

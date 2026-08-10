"use client";

import { useEffect, useRef, useState } from "react";

type YouTubeLiteProps = {
  videoId: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  // When true, render the iframe on mount (e.g. autoplaying background video).
  // When false, render a thumbnail facade and only mount the iframe on user
  // interaction or when the user has reduced motion disabled and the element
  // is in the viewport.
  autoplay?: boolean;
};

const thumbCache = new Map<string, string>();

function getThumbnailUrl(videoId: string): string {
  if (thumbCache.has(videoId)) return thumbCache.get(videoId)!;
  // maxresdefault is 1280x720; hqdefault is 480x360 fallback.
  const url = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  thumbCache.set(videoId, url);
  return url;
}

export default function YouTubeLite({
  videoId,
  title = "YouTube video",
  className,
  style,
  autoplay = false,
}: YouTubeLiteProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activated, setActivated] = useState(autoplay);

  useEffect(() => {
    if (autoplay) {
      setActivated(true);
      return;
    }
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
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoplay]);

  if (activated) {
    const src = autoplay
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`
      : `https://www.youtube.com/embed/${videoId}?rel=0&controls=0&modestbranding=1&disablekb=1&fs=0`;

    return (
      <div ref={ref} className={className} style={style}>
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    );
  }

  const thumb = getThumbnailUrl(videoId);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        cursor: "pointer",
        backgroundColor: "#000",
        ...style,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Play ${title}`}
      onClick={() => setActivated(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActivated(true);
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: 68,
            height: 48,
            backgroundColor: "rgba(255, 0, 0, 0.9)",
            borderRadius: "14px",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 6px 22px rgba(0,0,0,0.35)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

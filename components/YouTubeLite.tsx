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
  // Self-hosted webp poster (generated from the YouTube maxresdefault frame).
  // Serving it from our own origin removes the i.ytimg.com round trip and its
  // 2h cache TTL, and lets it inherit our 1-year immutable cache header.
  const url = `/youtube-thumbnails/${videoId}.webp`;
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
  // Distinguishes "mounted because the user clicked" from "mounted because the
  // caller asked for an autoplaying background video".
  const [userInitiated, setUserInitiated] = useState(false);

  useEffect(() => {
    if (autoplay) setActivated(true);
  }, [autoplay]);

  if (activated) {
    // youtube-nocookie.com avoids setting the YSC / VISITOR_INFO1_LIVE
    // third-party cookies that fail the Best Practices audit.
    const src = autoplay
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`
      : `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&controls=0&modestbranding=1&disablekb=1&fs=0${
          userInitiated ? "&autoplay=1" : ""
        }`;

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
      onClick={() => {
        setUserInitiated(true);
        setActivated(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setUserInitiated(true);
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

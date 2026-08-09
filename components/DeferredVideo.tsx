"use client";

import { useEffect, useRef, useState } from "react";

type DeferredVideoProps = {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  // Play video as soon as it enters the viewport (default true).
  // Set false to only play after the user clicks.
  autoPlayOnView?: boolean;
};

export default function DeferredVideo({
  src,
  poster,
  className,
  style,
  autoPlayOnView = true,
}: DeferredVideoProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activated, setActivated] = useState(false);

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

  return (
    <div ref={ref} className={className} style={style}>
      {activated ? (
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlayOnView}
          loop
          muted
          playsInline
          preload="metadata"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
      )}
    </div>
  );
}

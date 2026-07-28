"use client";

import { useRef, useState } from "react";

const videos = [
  { id: "ZY_5Dgy3EY4", title: "Diesel Pump Inspection" },
  { id: "gaGkQXD0P2w", title: "Hydrant Test" },
  { id: "Z2DrEHJAziY", title: "Hydrant Test Check" },
  { id: "__TPtyG4tO4", title: "Fire Extinguisher Test" },
];

export default function PortraitVideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const sendPlayerCommand = (videoId: string, command: "playVideo" | "pauseVideo") => {
    iframeRefs.current[videoId]?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "https://www.youtube-nocookie.com",
    );
  };

  const openVideo = (videoId: string) => {
    setActiveVideo(videoId);
    window.requestAnimationFrame(() => sendPlayerCommand(videoId, "playVideo"));
    window.setTimeout(() => sendPlayerCommand(videoId, "playVideo"), 180);
  };

  const closeVideo = (videoId: string) => {
    sendPlayerCommand(videoId, "pauseVideo");
    setActiveVideo(null);
  };

  return (
    <>
      <div className="afs-video-gallery" aria-label="All Fire Services videos">
        {videos.map((video) => {
          const isActive = activeVideo === video.id;

          return (
            <article
              key={video.id}
              className={`afs-video-card${isActive ? " is-active" : ""}`}
            >
              <iframe
                ref={(element) => {
                  iframeRefs.current[video.id] = element;
                }}
                src={`https://www.youtube-nocookie.com/embed/${video.id}?enablejsapi=1&rel=0&playsinline=1`}
                title={`ALL FIRE Services - ${video.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />

              {!isActive && (
                <button
                  type="button"
                  className="afs-video-open"
                  onClick={() => openVideo(video.id)}
                  aria-label={`Expand and play ${video.title}`}
                >
                  <span className="afs-video-title">{video.title}</span>
                </button>
              )}

              {isActive && (
                <button
                  type="button"
                  className="afs-video-close"
                  onClick={() => closeVideo(video.id)}
                  aria-label={`Close ${video.title}`}
                >
                  ×
                </button>
              )}
            </article>
          );
        })}
      </div>

      <style>{`
        .afs-video-gallery {
          display: flex;
          gap: 1.25rem;
          width: 100%;
          min-height: clamp(31rem, 49vw, 39rem);
          align-items: stretch;
        }

        .afs-video-card {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          overflow: hidden;
          isolation: isolate;
          background: #090909;
          border-radius: 0.9rem;
          box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.12);
          transform: translate3d(0, 0, 0) scale(1);
          transform-origin: center;
          backface-visibility: hidden;
          will-change: transform;
          transition:
            transform 480ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 480ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 320ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .afs-video-card:hover,
          .afs-video-card:focus-within {
            z-index: 3;
            transform: translate3d(0, -0.25rem, 0) scale(1.015);
            box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.16);
          }
        }

        .afs-video-card.is-active {
          z-index: 4;
          transform: translate3d(0, -0.25rem, 0) scale(1.025);
          box-shadow: 0 1.25rem 3.25rem rgba(0, 0, 0, 0.2);
        }

        .afs-video-gallery:has(.afs-video-card.is-active)
          .afs-video-card:not(.is-active) {
          opacity: 0.76;
          transform: translate3d(0, 0, 0) scale(0.985);
        }

        .afs-video-card iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          background: #090909;
        }

        .afs-video-card:not(.is-active) iframe {
          pointer-events: none;
        }

        .afs-video-open {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          padding: 2rem 1rem;
          color: #fff;
          background:
            linear-gradient(to top, rgba(0, 0, 0, 0.82), transparent 36%),
            transparent;
          border: 0;
          cursor: pointer;
          transition: background-color 300ms ease;
        }

        .afs-video-title {
          max-width: 12rem;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.25;
          text-align: center;
          text-wrap: balance;
          text-shadow: 0 0.15rem 0.7rem rgba(0, 0, 0, 0.9);
        }

        .afs-video-card:hover .afs-video-open {
          background-color: rgba(255, 81, 23, 0.04);
        }

        .afs-video-open:focus-visible,
        .afs-video-close:focus-visible {
          outline: 0.2rem solid #ff5117;
          outline-offset: -0.25rem;
        }

        .afs-video-close {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          color: #111;
          background: rgba(255, 255, 255, 0.94);
          border: 0;
          border-radius: 50%;
          box-shadow: 0 0.35rem 1rem rgba(0, 0, 0, 0.25);
          cursor: pointer;
          font-size: 1.6rem;
          line-height: 1;
        }

        @media (max-width: 767px) {
          .afs-video-gallery {
            gap: 0.9rem;
            min-height: 31rem;
            padding-bottom: 0.75rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }

          .afs-video-card,
          .afs-video-card.is-active {
            flex: 0 0 min(78vw, 20rem);
            scroll-snap-align: center;
          }

          .afs-video-card.is-active {
            transform: translate3d(0, 0, 0) scale(1.015);
          }

          .afs-video-gallery:has(.afs-video-card.is-active)
            .afs-video-card:not(.is-active) {
            opacity: 0.88;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .afs-video-card,
          .afs-video-open {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

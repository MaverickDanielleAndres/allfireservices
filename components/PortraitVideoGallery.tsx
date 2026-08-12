"use client";

import { Flame, Gauge, ShieldCheck, Siren } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";

type ServiceVideo = {
  id: string;
  title: string;
  description: string;
  service: string;
  icon: typeof Flame;
};

const serviceVideos: ServiceVideo[] = [
  {
    id: "ZY_5Dgy3EY4",
    title: "Diesel Pump Inspection",
    description: "Routine pump checks for dependable fire system pressure.",
    service: "Pumps",
    icon: Gauge,
  },
  {
    id: "gaGkQXD0P2w",
    title: "Hydrant Flow Testing",
    description: "Hydrant testing that confirms water supply and readiness.",
    service: "Hydrants",
    icon: Flame,
  },
  {
    id: "Z2DrEHJAziY",
    title: "System Compliance Checks",
    description: "Practical fire safety checks for compliant building records.",
    service: "Compliance",
    icon: ShieldCheck,
  },
  {
    id: "__TPtyG4tO4",
    title: "Extinguisher Servicing",
    description: "Inspection and tagging for portable fire equipment.",
    service: "Equipment",
    icon: Siren,
  },
];

const embedBase = "https://www.youtube-nocookie.com";

export default function PortraitVideoGallery() {
  const [activeVideoId, setActiveVideoId] = useState(serviceVideos[0].id);
  const [loadedVideoIds, setLoadedVideoIds] = useState<ReadonlySet<string>>(
    () => new Set([serviceVideos[0].id]),
  );
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const sendPlayerCommand = useCallback(
    (videoId: string, command: "playVideo" | "pauseVideo") => {
      iframeRefs.current[videoId]?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: [],
        }),
        embedBase,
      );
    },
    [],
  );

  const selectVideo = useCallback(
    (videoId: string) => {
      if (videoId === activeVideoId) {
        return;
      }

      sendPlayerCommand(activeVideoId, "pauseVideo");
      setLoadedVideoIds((current) => {
        if (current.has(videoId)) {
          return current;
        }

        const next = new Set(current);
        next.add(videoId);
        return next;
      });
      setActiveVideoId(videoId);
      window.setTimeout(() => sendPlayerCommand(videoId, "playVideo"), 220);
    },
    [activeVideoId, sendPlayerCommand],
  );

  return (
    <>
      <div className="afs-video-selector" aria-label="All Fire Services video services">
        {serviceVideos.map((video, index) => {
          const Icon = video.icon;
          const isActive = activeVideoId === video.id;
          const isLoaded = loadedVideoIds.has(video.id);

          return (
            <article
              key={video.id}
              className={`afs-service-video-card${isActive ? " is-active" : ""}`}
              style={{ "--stagger": `${index * 90}ms` } as CSSProperties}
            >
              <div className="afs-service-video-media">
                {isLoaded ? (
                  <iframe
                    ref={(element) => {
                      iframeRefs.current[video.id] = element;
                    }}
                    src={`${embedBase}/embed/${video.id}?enablejsapi=1&rel=0&playsinline=1&modestbranding=1&controls=0&disablekb=1&fs=0&iv_load_policy=3`}
                    title={`All Fire Services - ${video.title}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="afs-service-video-poster"
                    style={{
                      backgroundImage: `url("/youtube-thumbnails/${video.id}.webp")`,
                    }}
                  />
                )}
              </div>

              <button
                type="button"
                className="afs-service-video-trigger"
                onClick={() => selectVideo(video.id)}
                aria-pressed={isActive}
                aria-label={`Show ${video.title} video`}
              >
                <span className="afs-service-video-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2.3} />
                </span>
                <span className="afs-service-video-copy">
                  <span className="afs-service-video-service">{video.service}</span>
                  <span className="afs-service-video-title">{video.title}</span>
                  <span className="afs-service-video-description">{video.description}</span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <style>{`
        .afs-video-selector {
          align-items: stretch;
          display: flex;
          gap: 0.75rem;
          min-height: clamp(28rem, 43vw, 34rem);
          width: 100%;
        }

        .afs-service-video-card {
          animation: afsVideoSlideIn 520ms cubic-bezier(0.16, 1, 0.3, 1) var(--stagger) both;
          background: #111111;
          border: 2px solid #1f1f1f;
          border-radius: 0;
          box-shadow: 0 1.1rem 2.3rem rgba(17, 17, 17, 0.18);
          flex: 1 1 0;
          isolation: isolate;
          min-width: 4.75rem;
          overflow: hidden;
          position: relative;
          transition:
            border-color 360ms ease,
            box-shadow 360ms ease,
            flex-grow 560ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 360ms ease;
        }

        .afs-service-video-card.is-active {
          border-color: #ffffff;
          box-shadow: 0 1.5rem 3.5rem rgba(17, 17, 17, 0.28);
          flex-grow: 6.8;
          z-index: 2;
        }

        .afs-service-video-media,
        .afs-service-video-media iframe,
        .afs-service-video-poster {
          height: 100%;
          inset: 0;
          position: absolute;
          width: 100%;
        }

        .afs-service-video-media iframe {
          border: 0;
          background: #111111;
        }

        .afs-service-video-card:not(.is-active) iframe {
          pointer-events: none;
        }

        .afs-service-video-poster {
          background-color: #151515;
          background-position: center;
          background-size: cover;
          filter: saturate(0.95);
          transform: scale(1.04);
        }

        .afs-service-video-card::after {
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.12), transparent 34%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.86), transparent 44%);
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
          z-index: 1;
        }

        .afs-service-video-trigger {
          align-items: flex-end;
          background: transparent;
          border: 0;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          gap: 0.85rem;
          inset: 0;
          padding: 1.25rem;
          position: absolute;
          text-align: left;
          width: 100%;
          z-index: 2;
        }

        .afs-service-video-card.is-active .afs-service-video-trigger {
          pointer-events: none;
        }

        .afs-service-video-icon {
          align-items: center;
          backdrop-filter: blur(12px);
          background: rgba(17, 17, 17, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          display: inline-flex;
          flex: 0 0 auto;
          height: 2.75rem;
          justify-content: center;
          width: 2.75rem;
        }

        .afs-service-video-icon {
          color: #feaf04;
        }

        .afs-service-video-copy {
          display: flex;
          flex-direction: column;
          min-width: 0;
          opacity: 0;
          transform: translateX(1rem);
          transition:
            opacity 360ms ease,
            transform 360ms ease;
        }

        .afs-service-video-card.is-active .afs-service-video-copy {
          opacity: 1;
          transform: translateX(0);
        }

        .afs-service-video-service {
          color: #feaf04;
          font-size: 0.72rem;
          font-weight: 850;
          letter-spacing: 0.08em;
          line-height: 1;
          margin-bottom: 0.45rem;
          text-transform: uppercase;
        }

        .afs-service-video-title {
          color: #ffffff;
          font-size: clamp(1.2rem, 2.2vw, 1.9rem);
          font-weight: 900;
          line-height: 1;
          max-width: 17ch;
          text-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.65);
        }

        .afs-service-video-description {
          color: rgba(255, 255, 255, 0.84);
          font-size: 0.95rem;
          font-weight: 650;
          line-height: 1.35;
          margin-top: 0.65rem;
          max-width: 24rem;
        }

        .afs-service-video-trigger:focus-visible {
          outline: 0.18rem solid #feaf04;
          outline-offset: -0.25rem;
        }

        @media (hover: hover) and (pointer: fine) {
          .afs-service-video-card:not(.is-active):hover {
            border-color: #feaf04;
            transform: translateY(-0.2rem);
          }
        }

        @media (max-width: 767px) {
          .afs-video-selector {
            display: grid;
            gap: 0.85rem;
            min-height: 0;
          }

          .afs-service-video-card,
          .afs-service-video-card.is-active {
            aspect-ratio: 16 / 10;
            flex: none;
            min-height: 14rem;
          }

          .afs-service-video-copy,
          .afs-service-video-card.is-active .afs-service-video-copy,
          .afs-service-video-card.is-active .afs-service-video-copy {
            opacity: 1;
            transform: none;
          }

          .afs-service-video-trigger {
            padding: 1rem;
          }

          .afs-service-video-description {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .afs-service-video-card,
          .afs-service-video-copy {
            animation: none;
            transition: none;
          }
        }

        @keyframes afsVideoSlideIn {
          from {
            opacity: 0;
            transform: translateX(-2.5rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

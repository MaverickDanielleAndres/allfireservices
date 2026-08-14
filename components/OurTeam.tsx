"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import RevealOnView from "@/components/RevealOnView";
import FreeSiteVisitButton from "@/components/free-site-visit/FreeSiteVisitButton";

import styles from "./SiteSection.module.css";

/**
 * The current people behind All Fire Services.
 *
 * This is the existing approved team content, moved here from the Our Story
 * page so Our Team and Our Story are cleanly separated: this section is about
 * the people working on buildings today, not about family history. No team
 * members, roles or biographies were invented or altered.
 */
const teamMembers = [
  {
    img: "/technician/Peter - Managing Director.jpg",
    name: "Peter",
    position: "Managing Director",
  },
  {
    img: "/technician/Ken - Administration Manager.jpg",
    name: "Ken",
    position: "Administration Manager",
  },
  {
    img: "/technician/Roda - Office Manager.jpg",
    name: "Roda",
    position: "Office Manager",
  },
  {
    img: "/technician/Caroline - Accounts manager.png",
    name: "Caroline",
    position: "Accounts Manager",
  },
  {
    img: "/technician/Cornelius - Diesel Pump and Sprinkler system technician.jpg",
    name: "Cornelius",
    position: "Diesel Pump and Sprinkler System Technician",
  },
  {
    img: "/technician/Paul - Senior Fire Technician.PNG",
    name: "Paul",
    position: "Senior Firefighter",
  },
  {
    img: "/technician/George - Fire Panel manger.jpg",
    name: "George",
    position: "Fire Panel Manager",
  },
  {
    img: "/technician/HAMID - SENIOR FIRE ELECTRICIAN.png",
    name: "Hamid",
    position: "Senior Fire Electrician",
  },
  {
    img: "/technician/Mem - Fire Technician.jpg",
    name: "Mem",
    position: "Fire Technician",
  },
  {
    img: "/technician/Ryan - Fire Technician.jpg",
    name: "Ryan",
    position: "Fire Technician",
  },
];

export default function OurTeam() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <RevealOnView threshold={0.08} className={styles.section}>
        <section id="our-team" aria-labelledby="our-team-title">
          <div className={styles.container}>
            <header className={styles.header}>
              <p className={styles.kicker}>The professionals behind All Fire Services</p>
              <h2 id="our-team-title">
                <span>Meet the All Fire</span>
                <br />
                <span className={styles.gradient}>Services Team</span>
              </h2>
              <p>
                Serving professional firefighters alongside qualified
                fire-safety technicians, working across Greater Sydney.
              </p>
            </header>

            <div className={styles.teamGrid}>
              {teamMembers.map((member) => (
                <article className={styles.card} key={member.name}>
                  <div
                    className={styles.cardMedia}
                    onClick={() => setSelectedImage(member.img)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      fill
                      src={member.img}
                      sizes="(max-width: 767px) 50vw, (max-width: 991px) 50vw, 33vw"
                      alt={`${member.name} — All Fire Services`}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{member.name}</h3>
                    <p
                      className={styles.cardPosition}
                      style={member.name === "Cornelius" ? { fontSize: "0.75rem", lineHeight: "1.3" } : {}}
                    >
                      {member.position.split(" ").slice(0, -1).join(" ")}
                      <br />
                      <span className={styles.gradient}>
                        {member.position.split(" ").pop()}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.footer}>
              <FreeSiteVisitButton
                source="our_team"
                pulse
                className={styles.action}
              />
            </div>
          </div>
        </section>
      </RevealOnView>

      {mounted && selectedImage && createPortal(
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxHeight: "85vh",
              maxWidth: "85vw",
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                zIndex: 10,
                background: "black",
                color: "white",
                border: "2px solid white",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Team member preview"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

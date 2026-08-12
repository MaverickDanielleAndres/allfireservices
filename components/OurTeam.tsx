import Image from "next/image";
import Link from "next/link";

import RevealOnView from "@/components/RevealOnView";

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
    img: "/technician/pete.jpg",
    name: "Peter",
    bio: "Peter is the current owner of All Fire Services. Backed by a family firefighting legacy dating to 1911, he leads the business and its team of fire-safety professionals across Greater Sydney.",
  },
  {
    img: "/technician/paulimage.PNG",
    name: "Paul",
    bio: "Paul is a dedicated Customer Service Technician and professional firefighter, bringing real-life knowledge and extensive experience to every inspection.",
  },
  {
    img: "/technician/team2.jpg",
    name: "Sam",
    bio: "Sam brings the practical experience of a serving professional firefighter to his work, helping clients maintain safe and compliant buildings.",
  },
  {
    img: "/technician/team3.jpg",
    name: "George",
    bio: "George is committed to providing a high standard of service and helping clients protect their people and property.",
  },
  {
    img: "/technician/team4.jpg",
    name: "Ken",
    bio: "Ken brings technical expertise in matters relating to the Building Code of Australia, Australian Standards, and fire-safety requirements.",
  },
  // Six team slots, five supplied portraits — Kyriakos shares team1.jpg.
  // Carried over from the previous Our Story team grid; imagery is handled
  // separately and no images were added or replaced here.
  {
    img: "/technician/team1.jpg",
    name: "Kyriakos",
    bio: "Kyriakos provides approachable, practical, and dependable fire-safety services to clients across Greater Sydney.",
  },
];

export default function OurTeam() {
  return (
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
              Serving and retired professional firefighters alongside qualified
              fire-safety technicians, working across Greater Sydney.
            </p>
          </header>

          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <article className={styles.card} key={member.name}>
                <div className={styles.cardMedia}>
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
                  <p className={styles.cardBody}>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.footer}>
            <Link href="/contact" className={styles.action}>
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </RevealOnView>
  );
}

/* eslint-disable react/no-unescaped-entities */
import { TimelineContent } from "@/components/ui/timeline-animation";
import Image from "next/image";
import styles from "./testimonial.module.css";

function ClientFeedback() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <article className={styles.header}>
          <div className={styles.eyebrow}>
            TESTIMONIALS
          </div>
          <TimelineContent as="h2" className={`heading-style-h3 ${styles.title}`} animationNum={0}>
            Trusted by Greater Sydney's property managers and owners
          </TimelineContent>
        </article>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TimelineContent animationNum={0} className={`${styles.card} ${styles.cardLarge}`}>
              <div className={styles.pattern}></div>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "AllFire Services has been a game-changer for our strata properties. Their service is top-notch and their team is incredibly responsive. We completely rely on them."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>
                      Sarah Jenkins
                    </div>
                    <p className={styles.role}>Strata Manager, Sydney</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                    alt="Sarah Jenkins"
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={1} className={`${styles.card} ${styles.cardSmall} ${styles.cardRed}`}>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "We've seen incredible results. Their expertise and dedication to compliance is unmatched."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>Mark T.</div>
                    <p className={styles.role}>Facility Manager</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                    alt="Mark T."
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          
          <div className={styles.column}>
            <TimelineContent animationNum={2} className={styles.card}>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "Their team is highly professional, and their innovative solutions have truly transformed the way we handle our annual fire safety statements."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>
                      David Chen
                    </div>
                    <p className={styles.role}>Commercial Landlord</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop"
                    alt="David Chen"
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
            
            <TimelineContent animationNum={3} className={styles.card}>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "We're extremely satisfied with AllFire. Their firefighter-led expertise and practical approach have exceeded our expectations every time."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>John Roberts</div>
                    <p className={styles.role}>Operations Director</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop"
                    alt="John Roberts"
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
            
            <TimelineContent animationNum={4} className={`${styles.card} ${styles.cardGold}`}>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "Their emergency support is absolutely exceptional. They are always available and incredibly helpful when you need them most."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>
                      Lisa Wong
                    </div>
                    <p className={styles.role}>Building Manager</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop"
                    alt="Lisa Wong"
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          
          <div className={styles.column}>
            <TimelineContent animationNum={5} className={`${styles.card} ${styles.cardSmall}`}>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "AllFire Services has been a key partner in maintaining our extensive portfolio."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>Michael K.</div>
                    <p className={styles.role}>Asset Manager</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                    alt="Michael K."
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
            
            <TimelineContent animationNum={6} className={`${styles.card} ${styles.cardLarge}`}>
              <div className={styles.pattern}></div>
              <article className={styles.content}>
                <p className={styles.quote}>
                  "AllFire has been a true game-changer for us. Their exceptional service, combined with their deep expertise from the fire brigade, has made a significant impact on how we handle compliance."
                </p>
                <div className={styles.person}>
                  <div>
                    <div className={styles.name}>Paul Davis</div>
                    <p className={styles.role}>Director, Sydney Properties</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                    alt="Paul Davis"
                    width={200}
                    height={200}
                    sizes="40px"
                    className={styles.avatar}
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientFeedback;

"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const revealUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

export default function ContactCTA() {
  return (
        <section data-theme="light" className="section_contact-cta">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <motion.div
                  className="contact-location-section"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.22 }}
                  style={{ marginBottom: '4rem' }}
                >
                  <motion.div
                    variants={revealUp}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: '1.5rem' }}
                  >
                    <p className="body-text" style={{ margin: '0 0 0.35rem', color: '#D94833', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase' }}>Our Location</p>
                    <h2 className="heading-style-h3" style={{ margin: 0, color: '#1A1A1A', fontSize: '2.5rem', fontWeight: 800 }}>Visit All Fire Services</h2>
                  </motion.div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '1rem' }}>
                    <motion.div
                      initial={false}
                      whileHover={{ y: -5, scale: 1.005 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{ position: 'relative', minHeight: '300px', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(26, 26, 26, 0.08)', background: '#EEF0F2', boxShadow: '0 18px 45px rgba(18, 24, 31, 0.08)' }}
                    >
                      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #eef0f2 0%, #f8fafc 48%, #e3e7eb 100%)' }} />
                      <iframe
                        title="All Fire Services location map"
                        src="https://maps.google.com/maps?width=100%25&height=360&hl=en&q=330%20Wattle%20St,%20Ultimo%20NSW%202007,%20Australia&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ position: 'relative', zIndex: 2, display: 'block', width: '100%', height: '300px', border: 0 }}
                      />
                    </motion.div>
                    <motion.div
                      initial={false}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      style={{ position: 'relative', minHeight: '300px', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(26, 26, 26, 0.08)', background: '#1A1A1A', boxShadow: '0 18px 45px rgba(18, 24, 31, 0.08)' }}
                    >
                      <Image
                        src="/stratapage/5-all-fire-services-welcome-chippendale.webp"
                        alt="Building near the All Fire Services location"
                        fill
                        sizes="(max-width: 767px) 100vw, 35vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(14, 23, 31, 0.72), rgba(14, 23, 31, 0.26))' }} />
                      <div style={{ position: 'absolute', inset: 'auto 1.25rem 1.25rem 1.25rem', color: '#fff' }}>
                        <h3 className="heading-style-h5" style={{ margin: '0 0 0.35rem', color: '#fff', fontSize: '1.55rem' }}>Our Location</h3>
                        <p className="body-text" style={{ margin: 0, color: '#fff', fontSize: '0.8125rem', lineHeight: 1.35 }}>330 Wattle St, Ultimo NSW 2007</p>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=330%20Wattle%20St%2C%20Ultimo%20NSW%202007%2C%20Australia"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', marginTop: '0.8rem', padding: '0.5rem 0.8rem', borderRadius: '999px', background: '#FEAF04', color: '#1A1A1A', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}
                        >
                          Walking map
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                <div className="contact-cta_component">
                  <div className="contact-cta_content">
                    <div className="contact-cta_header" style={{ textAlign: 'left', marginBottom: '1rem', width: '100%' }}>
                      <h2 className="heading-style-h3" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'left', color: '#1A1A1A', fontWeight: 800 }}>Get in touch</h2>
                      <p className="body-text" style={{ fontSize: '0.875rem', textAlign: 'left', margin: 0, lineHeight: '1.4' }}>
                        We’re always happy to hear from property managers and
                        owners, whether it’s to enquire about a new fire safety audit,
                        or just to chat about all things fire safety-related.
                      </p>
                    </div>
                    <div className="contact-cta_info-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', textAlign: 'left', padding: 0, margin: 0, width: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginTop: '0.25rem' }}>
                        <h3 className="heading-style-h5" style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1A1A1A', textTransform: 'uppercase', textAlign: 'left' }}>SOCIALS</h3>
                        <div className="contact-social-links" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-start', width: '100%' }}>
                          <a className="contact-social-link" href="#" aria-label="Facebook" style={{ color: '#1A1A1A', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FEAF04'} onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                          <a className="contact-social-link" href="#" aria-label="YouTube" style={{ color: '#1A1A1A', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FEAF04'} onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
                          <a className="contact-social-link" href="#" aria-label="X" style={{ color: '#1A1A1A', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FEAF04'} onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg></a>
                          <a className="contact-social-link" href="#" aria-label="LinkedIn" style={{ color: '#1A1A1A', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FEAF04'} onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                          <a className="contact-social-link" href="#" aria-label="TikTok" style={{ color: '#1A1A1A', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FEAF04'} onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a>
                          <a className="contact-social-link" href="#" aria-label="Instagram" style={{ color: '#1A1A1A', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#FEAF04'} onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-cta_form-wrapper">
                    <div className="contact-cta_form-block w-form">
                      <form method="get" data-blocks-slot-children="ST265"
                        name="wf-form-Contact-CTA-Form"
                        data-name="Contact CTA Form"
                        data-blocks-name="contact1_form"
                        id="wf-form-Contact-CTA-Form"
                        className="contact-cta_form"
                        data-wf-page-id="675171b75e69f278439371a6"
                        data-wf-element-id="c3aba24e-4207-b56f-df44-6c4f9d2cdbfd"
                        data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"
                      >
                        <div className="form_field-wrapper _2col" style={{ gap: '1rem', marginBottom: '0' }}>
                          <div
                            data-blocks-name="form_field-wrapper"
                            className="form_field-wrapper"
                          >
                            <label
                              htmlFor="Name"
                              className="form_field-label"
                              style={{ fontSize: '0.8125rem', marginBottom: '4px' }}
                            >
                              Name*
                            </label>
                            <input
                              className="form_input w-input"
                              maxLength={256}
                              name="Name"
                              data-name="Name"
                              placeholder="John Smith"
                              type="text"
                              id="Name"
                              required
                              style={{ padding: '8px 12px', minHeight: '38px', fontSize: '0.875rem', marginBottom: '0.5rem' }}
                            />
                          </div>
                          <div
                            data-blocks-name="form_field-wrapper"
                            className="form_field-wrapper"
                          >
                            <label
                              htmlFor="Phone"
                              className="form_field-label"
                              style={{ fontSize: '0.8125rem', marginBottom: '4px' }}
                            >
                              Phone*
                            </label>
                            <input
                              className="form_input w-input"
                              maxLength={256}
                              name="Phone"
                              data-name="Phone"
                              placeholder="0400 000 000"
                              type="tel"
                              id="Phone"
                              required
                              style={{ padding: '8px 12px', minHeight: '38px', fontSize: '0.875rem', marginBottom: '0.5rem' }}
                            />
                          </div>
                        </div>
                        <div className="form_field-wrapper _2col" style={{ gap: '1rem' }}>
                          <div
                            data-blocks-name="form_field-wrapper-2"
                            className="form_field-wrapper"
                          >
                            <label
                              htmlFor="Email"
                              className="form_field-label"
                              style={{ fontSize: '0.8125rem', marginBottom: '4px' }}
                            >
                              Email address*
                            </label>
                            <input
                              className="form_input w-input"
                              maxLength={256}
                              name="Email"
                              data-name="Email"
                              placeholder="name@example.com"
                              type="email"
                              id="Email"
                              required
                              style={{ padding: '8px 12px', minHeight: '38px', fontSize: '0.875rem', marginBottom: '0.5rem' }}
                            />
                          </div>
                          <div
                            data-blocks-name="form_field-wrapper-2"
                            className="form_field-wrapper"
                          >
                            <label
                              htmlFor="Suburb"
                              className="form_field-label"
                              style={{ fontSize: '0.8125rem', marginBottom: '4px' }}
                            >
                              Suburb*
                            </label>
                            <input
                              className="form_input w-input"
                              maxLength={256}
                              name="Suburb"
                              data-name="Suburb"
                              placeholder="Sydney"
                              type="text"
                              id="Suburb"
                              required
                              style={{ padding: '8px 12px', minHeight: '38px', fontSize: '0.875rem', marginBottom: '0.5rem' }}
                            />
                          </div>
                        </div>
                        <div
                          data-blocks-name="form_field-wrapper-3"
                          className="form_field-wrapper"
                        >
                          <label
                            htmlFor="Message-2"
                            className="form_field-label"
                            style={{ fontSize: '0.8125rem', marginBottom: '4px' }}
                          >
                            Message
                          </label>
                          <textarea
                            id="Message-2"
                            name="Message-2"
                            maxLength={5000}
                            data-name="Message 2"
                            placeholder="Type something..."
                            required
                            className="form_input is-text-area w-input"
                            style={{ padding: '8px 12px', minHeight: '80px', fontSize: '0.875rem' }}
                          ></textarea>
                        </div>
                        <label
                          id="Contact-1-Checkbox"
                          data-blocks-name="form_checkbox"
                          className="w-checkbox form_checkbox hide"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }}
                        >
                          <input
                            type="checkbox"
                            name="Contact-1-Checkbox-2"
                            id="Contact-1-Checkbox-2"
                            data-name="Contact 1 Checkbox 2"
                            required
                            style={{ width: '16px', height: '16px', margin: 0, cursor: 'pointer' }}
                          />
                          <span
                            className="form_checkbox-label text-size-small w-form-label"
                          >
                            I accept the{" "}
                            <a href="#" className="text-style-link">
                              Terms
                            </a>
                          </span>
                        </label>
                        <input
                          type="submit"
                          data-wait="Please wait..."
                          data-blocks-non-deletable="true"
                          data-blocks-name="button"
                          data-blocks-slot-item-canonical="EL13"
                          id="w-node-c3aba24e-4207-b56f-df44-6c4f9d2cdc1a-9d2cdbe8"
                          className="button max-width-full w-button"
                          value="Send enquiry"
                        />
                      </form>
                      <div className="form_message-success-wrapper w-form-done">
                        <div className="form_message-success">
                          <div className="success-text">
                            Thank you! Your submission has been received!
                          </div>
                        </div>
                      </div>
                      <div className="form_message-error-wrapper w-form-fail">
                        <div className="form_message-error">
                          <div className="error-text">
                            Oops! Something went wrong while submitting the
                            form.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}

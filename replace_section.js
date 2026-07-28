const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'app/page.tsx');
let content = fs.readFileSync(file, 'utf8');

const replacement = `                <div className="featured_component" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="heading-style-h3" style={{ marginBottom: '1.5rem', color: '#111' }}>
                      FIRE PROTECTION SERVICES
                    </h2>
                    <p className="body-text" style={{ fontSize: '0.95rem', color: '#111', lineHeight: '1.6' }}>
                      All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements and when necessary provide technical expertise on issues affecting the relevant Building Code of Australia, Environmental Planning and Assessment Regulations and relevant Australian Standards.
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.5rem',
                    width: '100%'
                  }}>
                    {[
                      {
                        title: "Annual Fire Safety Statement",
                        desc: "All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements.",
                        img: "/Fireprotectionservicesimage/annualfiresafety.webp"
                      },
                      {
                        title: "Monthly Fire Inspection",
                        desc: "Routine checks to ensure all fire panels and systems are fully operational and compliant.",
                        img: "/Fireprotectionservicesimage/monthlyfireprotection.webp"
                      },
                      {
                        title: "Yearly Hydrant Flow Test",
                        desc: "Comprehensive flow testing of hydrant systems to guarantee adequate water supply during emergencies.",
                        img: "/Fireprotectionservicesimage/yearlyhydrantflowstate.webp"
                      },
                      {
                        title: "Monthly Diesel Pump Inspection",
                        desc: "Regular inspection of diesel pumps to maintain reliability and performance under critical conditions.",
                        img: "/Fireprotectionservicesimage/monthlydieselpumpprotection.webp"
                      },
                      {
                        title: "Monthly Sprinkler System Inspection",
                        desc: "Ensuring your sprinkler systems are primed and ready to respond instantly to any fire threat.",
                        img: "/Fireprotectionservicesimage/monthlysprinkler.webp"
                      },
                      {
                        title: "Fire Extinguisher Tagging",
                        desc: "Inspection and tagging of all fire extinguishers to verify they meet strict Australian safety standards.",
                        img: "/Fireprotectionservicesimage/fireestinguishertagging.webp"
                      },
                      {
                        title: "Emergency Lighting 90-Minute Test",
                        desc: "Thorough testing of emergency lighting systems to ensure safe evacuation routes during power failures.",
                        img: "/Fireprotectionservicesimage/emergencylighting90.webp"
                      },
                      {
                        title: "Smoke Alarm Test",
                        desc: "Testing and maintenance of smoke alarms for early detection and maximum protection.",
                        img: "/Fireprotectionservicesimage/smokealarmtest.webp"
                      }
                    ].map((service, index) => (
                      <div key={index} className="products_card" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
                        <a tabIndex={-1} aria-hidden="true" href="/services" className="products_link w-inline-block" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}></a>
                        <div className="products_image-wrap" style={{ minHeight: '160px', height: '160px', position: 'relative' }}>
                          <div className="products_badge-wrap" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                            <div className="badge is-white is-shadow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.6rem', borderRadius: '6px', background: '#fff', fontSize: '0.75rem', color: '#111', fontWeight: 'bold' }}>
                              <div className="icon-embed-xxsmall w-richtext" style={{ width: '14px', height: '14px', display: 'flex' }}>
                                <div className="w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 8 6 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 6 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                              </div>
                              <div>All Fire Services</div>
                            </div>
                          </div>
                          <img src={service.img} loading="lazy" alt={service.title} className="products_image" style={{ objectFit: 'cover', height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} />
                        </div>
                        <div className="products_info-wrap" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem' }}>
                          <div className="products_content-link-wrap">
                            <div className="text-size-small" style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Fire Protection Services</div>
                            <div className="products_header-wrap">
                              <h2 className="heading-style-h6" style={{ fontSize: '1rem', margin: '0.25rem 0', fontWeight: 'bold', color: '#111' }}>{service.title}</h2>
                            </div>
                          </div>
                          <div className="text-size-small text-weight-light text-style-3lines w-richtext" style={{ fontSize: '0.85rem', color: '#333', lineHeight: '1.4' }}>
                            <p>{service.desc}</p>
                          </div>
                        </div>
                        <div data-theme="dark" className="products_button-wrap" style={{ padding: '0 1.25rem 1.25rem', position: 'relative', zIndex: 11 }}>
                          <a data-wf--button--size="small" href="/services" className="button-wrap w-inline-block" style={{ display: 'inline-flex', padding: '0.6rem 1rem', background: '#FEAF04', color: '#111', borderRadius: '8px', textDecoration: 'none', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s', width: 'fit-content' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>View Service</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 17" fill="none"><path d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z" fill="currentColor"></path></svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'center', maxWidth: '850px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8f9fa', padding: '2rem', borderRadius: '16px', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111', margin: 0 }}>and so much more</h3>
                    <p className="body-text" style={{ fontSize: '0.95rem', color: '#111', lineHeight: '1.6', margin: 0 }}>
                      In addition to our comprehensive range of fire protection services, we also offer a selection of top-quality fire protection products, including fire extinguishers, smoke alarms, and emergency lighting. We are a member of FPAA and have the license to do the following:
                    </p>
                    <p className="body-text" style={{ fontSize: '0.85rem', color: '#333', fontStyle: 'italic', lineHeight: '1.6', margin: 0, padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                      Fire Detection and Alarm Systems (C), Fire Hydrant Systems (C), Fire Pumpsets (C), Fire Seals and Collars (C), Fire Sprinkler Systems (C), Pre-engineered Fire Suppression System(Non Gaseous) (C) Exit and Emergency Lighting (C), Fire and Smoke Doors (C), Portable Fire Equipment and Fire Hose Reels (C)
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                      <a
                        data-wf--button--size="small"
                        href="/products"
                        className="button-wrap w-variant-0fa6310e-3b03-4614-cc31-5599b3d7993a w-inline-block"
                      >
                        <div data-wf--button-style-- className="button-content">
                          <div
                            data-wf--button-layout--layout="normal"
                            className="button-layout"
                          >
                            <div className="button-text">View all services</div>
                            <div className="button-icon">
                              <div className="icon-slot">
                                <div className="icon-slot">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                  >
                                    <g clipPath="url(#clip0_6401_1558)">
                                      <path
                                        d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
                                        fill="currentColor"
                                      ></path>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_6401_1558">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          transform="translate(0 0.5)"
                                        ></rect>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>`;

const regex = /<div className="featured_component" style=\{\{\s*display:\s*'flex'[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully replaced content.');
} else {
    console.log('Could not find the section to replace.');
}

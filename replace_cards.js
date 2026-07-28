const fs = require('fs');

const filePath = 'app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const startStr = '{/* Card 1 */}';
const endStr = '</div>\n\n                                                      <div style={{ textAlign: \'center\'';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end index");
  process.exit(1);
}

const replacement = `                    {/* Cards */}
                    {[
                      {
                        title: "Annual Fire Safety Statement",
                        desc: "All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements.",
                        img: "annualfiresafety.webp"
                      },
                      {
                        title: "Monthly Fire Inspection",
                        desc: "Routine checks to ensure all fire panels and systems are fully operational and compliant.",
                        img: "monthlyfireprotection.webp"
                      },
                      {
                        title: "Yearly Hydrant Flow Test",
                        desc: "Comprehensive flow testing of hydrant systems to guarantee adequate water supply during emergencies.",
                        img: "yearlyhydrantflowstate.webp"
                      },
                      {
                        title: "Monthly Diesel Pump Inspection",
                        desc: "Regular inspection of diesel pumps to maintain reliability and performance under critical conditions.",
                        img: "monthlydieselpumpprotection.webp"
                      },
                      {
                        title: "Monthly Sprinkler System Inspection",
                        desc: "Ensuring your sprinkler systems are primed and ready to respond instantly to any fire threat.",
                        img: "monthlysprinkler.webp"
                      },
                      {
                        title: "Fire Extinguisher Tagging",
                        desc: "Inspection and tagging of all fire extinguishers to verify they meet strict Australian safety standards.",
                        img: "fireestinguishertagging.webp"
                      },
                      {
                        title: "Emergency Lighting 90-Minute Test",
                        desc: "Thorough testing of emergency lighting systems to ensure safe evacuation routes during power failures.",
                        img: "emergencylighting90.webp"
                      },
                      {
                        title: "Smoke Alarm Test",
                        desc: "Testing and maintenance of smoke alarms for early detection and maximum protection.",
                        img: "smokealarmtest.webp"
                      }
                    ].map((card, index) => (
                      <div key={index} className="products_card" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <a tabIndex={-1} aria-hidden="true" href="/services" className="products_link w-inline-block"></a>
                        <div className="products_image-wrap" style={{ minHeight: '130px', height: '130px', position: 'relative' }}>
                          <div className="products_badge-wrap" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2 }}>
                            <div className="badge is-white is-shadow" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.4rem', borderRadius: '4px', background: '#fff', fontSize: '0.65rem' }}>
                              <div className="icon-embed-xxsmall w-richtext" style={{ width: '14px', height: '14px' }}>
                                <div className="w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 8 6 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 6 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                              </div>
                              <div>All Fire Services</div>
                            </div>
                          </div>
                          <img src={\`/Fireprotectionservicesimage/\${card.img}\`} loading="lazy" alt={card.title} className="products_image" style={{ objectFit: 'cover', height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} />
                        </div>
                        <div className="products_info-wrap" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
                          <div className="products_content-link-wrap">
                            <div className="text-size-small" style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fire Protection Services</div>
                            <div className="products_header-wrap">
                              <h2 className="heading-style-h6" style={{ fontSize: '1rem', margin: '0.3rem 0', fontWeight: 'bold', color: '#111' }}>{card.title}</h2>
                            </div>
                          </div>
                          <div className="text-size-small text-weight-light text-style-3lines w-richtext" style={{ fontSize: '0.8rem', color: '#444', lineHeight: '1.4' }}>
                            <p>{card.desc}</p>
                          </div>
                          <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                            <a href="/services" style={{ display: 'inline-block', padding: '0.4rem 1rem', background: '#111', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', textDecoration: 'none', borderRadius: '4px', textTransform: 'uppercase', textAlign: 'center' }}>
                              View More
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>\n\n                                                      <div style={{ textAlign: 'center'`;

content = content.substring(0, startIndex) + replacement + content.substring(endIndex + endStr.length);
fs.writeFileSync(filePath, content);
console.log("Successfully replaced cards");

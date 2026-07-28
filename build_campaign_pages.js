const fs = require('fs');
const path = require('path');

const strataPath = path.join(__dirname, 'app', 'strata', 'page.tsx');
let strataContent = fs.readFileSync(strataPath, 'utf-8');

const contactPath = path.join(__dirname, 'app', 'contact', 'page.tsx');
let contactContent = fs.readFileSync(contactPath, 'utf-8');

// 1. Campaign Page (Clone Strata)
let campContent = strataContent;
campContent = campContent.replace(
  '<h1 className="heading-style-h1">STRATA</h1>',
  '<h1 className="heading-style-h1">“Who knows better than a fireman”</h1>'
);
campContent = campContent.replace(
  '<div className="header-eyebrow-text hide-desktop">Strata Fire Safety</div>',
  '<div className="header-eyebrow-text hide-desktop">All Fire Services Campaign</div>'
);
campContent = campContent.replace(
  '<div className="header-eyebrow-text hide-tablet">Strata Fire Safety</div>',
  '<div className="header-eyebrow-text hide-tablet">All Fire Services Campaign</div>'
);
campContent = campContent.replace(
  '<p className="body-text">Strata managers, owners corporations, and building managers rely on All Fire Services to ensure shared residential properties remain compliant and safe.</p>',
  '<p className="body-text">We employ NSW firemen to do our monthly, 6-monthly, and yearly inspections for the Annual Fire Safety Statement.</p>'
);

campContent = campContent.replace(
  '<h1 className="heading-style-h1">Strata Fire Safety Services</h1>',
  '<h1 className="heading-style-h1">Inspection Services</h1>'
);
const pMatchCamp = campContent.match(/<h1 className="heading-style-h1">[^<]+<\/h1>\s*<\/div>\s*<p className="body-text">([^<]+)<\/p>/);
if (pMatchCamp) {
  campContent = campContent.replace(
    `<p className="body-text">${pMatchCamp[1]}</p>`,
    `<p className="body-text">We also provide building defect report to identify which fire safety equipment that needs to be fixed, and also provide the best solution to get your building to the standard compliance.</p>`
  );
}

const lStartCamp = campContent.indexOf('<div className="process_list">');
const sEndCamp = campContent.indexOf('</section>', lStartCamp);

if (lStartCamp !== -1 && sEndCamp !== -1) {
  const items = [
    { title: 'Inspections', desc: 'Monthly, 6-monthly, and yearly inspections by NSW firemen.', img: '/assets/placeholders/all-fire-services-campaign/inspection-collage.webp' },
    { title: 'Defect Reports', desc: 'Building defect reports and fire-safety equipment checks.', img: '/assets/placeholders/all-fire-services-campaign/building-defect-report.webp' },
    { title: 'Testimonial', desc: '"The service I received from All Fire Services was amazing." - Happy Client', img: '/assets/placeholders/all-fire-services-campaign/testimonial.webp' }
  ];
  let newList = '<div className="process_list">\n';
  items.forEach((item, index) => {
    newList += `
                    <div className="process_item">
                      <div className="process_image-wrap">
                        <img src="${item.img}" loading="lazy" alt="" className="process_image" />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">0${index + 1}</div>
                        <div className="process_text-wrap">
                          <h2 className="heading-style-h6">${item.title}</h2>
                          <p className="body-text">${item.desc}</p>
                        </div>
                      </div>
                    </div>
    `;
  });
  newList += '                  </div>\n                ';
  campContent = campContent.substring(0, lStartCamp) + newList + campContent.substring(sEndCamp);
}

campContent = campContent.replace(
  '<h2 className="heading-style-h3">Does your strata building need fire protection or compliance support?</h2>',
  '<h2 className="heading-style-h3">Does your building need fire protection service?</h2>'
);
campContent = campContent.replace(
  '<p className="body-text">Call All Fire Services Australia at 1300 765 594 or for 24/7 After Hours, Phone 0484 648 400</p>',
  '<p className="body-text">CALL PETER TODAY: 1300 765 594</p>'
);

const campDir = path.join(__dirname, 'app', 'campaign');
fs.mkdirSync(campDir, { recursive: true });
fs.writeFileSync(path.join(campDir, 'page.tsx'), campContent, 'utf-8');

// 2. Talk to Peter Page (Clone Contact)
let peterContent = contactContent;
peterContent = peterContent.replace(
  'If you have questions about our services or anything, please don’t hesitate to contact us using the form below. For all your fire safety compliance needs!',
  'FREE Annual Fire Safety Statement: Routine Maintenance Requirements. All fire safety measures in applicable buildings must now be inspected and maintained according to AS 1851:2012 standards.'
);

peterContent = peterContent.replace(
  '<label htmlFor="Company-Building" className="form_field-label">Company or Building</label><input className="form_input w-input" maxLength="256" name="Company-Building" data-name="Company or Building" placeholder="Enter your company or building name" type="text" id="Company-Building" />',
  '<label htmlFor="Property-Address" className="form_field-label">Property Address</label><input className="form_input w-input" maxLength="256" name="Property-Address" data-name="Property Address" placeholder="Enter the property address" type="text" id="Property-Address" required />'
);

peterContent = peterContent.replace(
  'Suburb',
  'Property Type'
);
peterContent = peterContent.replace(
  'name="Suburb"',
  'name="Property-Type"'
);
peterContent = peterContent.replace(
  'data-name="Suburb"',
  'data-name="Property Type"'
);
peterContent = peterContent.replace(
  'placeholder="Enter your suburb"',
  'placeholder="Select property type"'
);

peterContent = peterContent.replace(
  'Service Required',
  'Existing AFSS Due Date'
);
peterContent = peterContent.replace(
  'name="Service-Required"',
  'name="AFSS-Due-Date"'
);
peterContent = peterContent.replace(
  'data-name="Service Required"',
  'data-name="AFSS Due Date"'
);
peterContent = peterContent.replace(
  'placeholder="Select a fire-safety service"',
  'placeholder="Select or enter the due date"'
);

peterContent = peterContent.replace(
  'value="Send enquiry"',
  'value="Talk to Peter"'
);

const peterDir = path.join(__dirname, 'app', 'talk-to-peter');
fs.mkdirSync(peterDir, { recursive: true });
fs.writeFileSync(path.join(peterDir, 'page.tsx'), peterContent, 'utf-8');

// 3. Confirmation Page (Clone Contact, remove form)
let confContent = contactContent;
confContent = confContent.replace(
  'If you have questions about our services or anything, please don’t hesitate to contact us using the form below. For all your fire safety compliance needs!',
  'Thank you for booking in. If you are unavailable for the inspection, we ask to please organise alternative access arrangements, leaving keys with a friend, neighbour or managing agent to provide access on your behalf.'
);

// Remove the form block
const formStart = confContent.indexOf('<form');
const formEnd = confContent.indexOf('</form>') + 7;
if (formStart !== -1 && formEnd !== -1) {
  confContent = confContent.substring(0, formStart) + '<p className="text-xl text-green-600 font-bold mb-8">✔ Booking Confirmed!</p>' + confContent.substring(formEnd);
}

const confDir = path.join(__dirname, 'app', 'confirmation');
fs.mkdirSync(confDir, { recursive: true });
fs.writeFileSync(path.join(confDir, 'page.tsx'), confContent, 'utf-8');

console.log('Built campaign, talk-to-peter, and confirmation pages');

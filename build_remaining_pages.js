const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // Using cheerio to modify JSX structure safely isn't possible directly on .tsx, but we can do simple regex

// Actually, replacing by block is better.
const strataPath = path.join(__dirname, 'app', 'strata', 'page.tsx');
let content = fs.readFileSync(strataPath, 'utf-8');

// I will just use regex to replace the contents of `<div className="process_text-wrap">` in strata.
const strataItems = [
  {
    title: 'Routine Fire-Safety Inspection',
    desc: 'Routine fire-safety inspection and maintenance to ensure all strata common areas are fully compliant and safe for residents.'
  },
  {
    title: 'Scheduled Inspections',
    desc: 'Comprehensive monthly, six-monthly, and yearly inspections tailored for shared residential properties.'
  },
  {
    title: 'Annual Fire Safety Statement',
    desc: 'Annual Fire Safety Statement coordination and management for strata managers and owners corporations.'
  },
  {
    title: 'Building Defect Reports',
    desc: 'Thorough building defect reports covering all fire safety aspects within the strata complex.'
  },
  {
    title: 'Repairs and Rectification',
    desc: 'Prompt repairs and rectification of any identified issues to maintain continuous safety compliance.'
  },
  {
    title: 'Emergency Support',
    desc: '24/7 emergency support ensuring that building managers always have access to immediate assistance when needed.'
  },
  {
    title: 'Compliance Documentation',
    desc: 'Managing all compliance documentation to keep owners corporations informed and protected.'
  }
];

// Re-write the process_list entirely!
// Find the start and end of <div className="process_list">
const listStart = content.indexOf('<div className="process_list">');
const sectionEnd = content.indexOf('</section>', listStart);

if (listStart !== -1 && sectionEnd !== -1) {
  let newList = '<div className="process_list">\n';
  strataItems.forEach((item, index) => {
    newList += `
                    <div className="process_item">
                      <div className="process_image-wrap">
                        <img
                          src="/Fireprotectionservicesimage/monthlyfireprotection.webp"
                          loading="lazy"
                          alt=""
                          className="process_image"
                        />
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
  
  content = content.substring(0, listStart) + newList + content.substring(sectionEnd);
}

fs.writeFileSync(strataPath, content, 'utf-8');

// --- BUILD SERVICES PAGE ---
// We will clone the modified strataPath to Services, Fire Safety Compliance, and AFSS.
const pagesToBuild = [
  {
    path: path.join(__dirname, 'app', 'services', 'page.tsx'),
    heroText: 'SERVICES',
    heroSubText: 'Professional Fire Safety Services',
    heroDesc: 'All Fire Services provides professional, experienced and highly motivated technicians to offer a level of service to the community unequalled by our competition.',
    processHeading: 'Our Services',
    processDesc: 'We offer a wide range of fire safety services to keep your building compliant and safe.',
    items: [
      {
        title: 'Fire Consultancy Services',
        desc: 'Professional Fire-Fighters both serving and retired as our service technicians, providing a level of service unequalled by our competition.',
        img: '/assets/placeholders/services/fire-consultancy-services.webp'
      },
      {
        title: 'Fire Safety Compliance',
        desc: 'Testing, inspections, maintenance servicing and repairs to equipment for all classes of buildings on a Monthly, Bi-Annual and Annual basis.',
        img: '/assets/placeholders/services/fire-safety-compliance.webp'
      },
      {
        title: 'FPA Australia Member',
        desc: 'All Fire Services is proud to be a Member of FPA Australia.',
        img: '/assets/placeholders/services/fpa-australia-member.webp'
      },
      {
        title: 'Fire Safety Training',
        desc: 'Professional Fire-Fighters providing highly motivated workplace training backed up by real life experience.',
        img: '/assets/placeholders/services/fire-safety-training.webp'
      },
      {
        title: 'Annual Fire Safety Statement',
        desc: 'Annual Fire Safety Statement inspections, documentation, compliance support, and submission guidance.',
        img: '/assets/placeholders/services/annual-fire-safety-statement.webp'
      }
    ],
    ctaTitle: 'Does your building need fire protection service?',
    ctaDesc: 'CALL PETER TODAY 1300 765 594'
  },
  {
    path: path.join(__dirname, 'app', 'fire-safety-compliance', 'page.tsx'),
    heroText: 'FIRE SAFETY COMPLIANCE',
    heroSubText: 'Total Fire Safety Solution',
    heroDesc: 'We provide testing, inspections, maintenance servicing and repairs to equipment for all classes of buildings.',
    processHeading: 'Compliance Services',
    processDesc: 'We provide inspection reports after these inspections are completed including relevant Fire Safety Statements for submission to Council.',
    items: [
      {
        title: 'Annual Fire Safety Inspections',
        desc: 'Testing, inspections, and maintenance servicing on a Monthly, Bi-Annual and Annual basis.',
        img: '/assets/placeholders/compliance/compliance-testing.webp'
      },
      {
        title: 'Annual Fire Safety Statements',
        desc: 'Providing inspection reports including relevant Fire Safety Statements for submission to Council.',
        img: '/assets/placeholders/compliance/compliance-inspection-report.webp'
      },
      {
        title: 'Qualified and Professional Service',
        desc: 'Fire-safety equipment repair, maintenance, and competitive pricing from a fully insured team.',
        img: '/assets/placeholders/compliance/compliance-repairs.webp'
      }
    ],
    ctaTitle: 'Need help keeping your building compliant?',
    ctaDesc: 'Call All Fire Services today at 1300 765 594.'
  },
  {
    path: path.join(__dirname, 'app', 'annual-fire-safety-statement', 'page.tsx'),
    heroText: 'ANNUAL FIRE SAFETY STATEMENT',
    heroSubText: 'Compliance, Safety, Prevention',
    heroDesc: 'The annual fire safety statement is fundamental for property owners. All Fire Services Sydney can conduct a comprehensive inspection of your property.',
    processHeading: 'AFSS Services',
    processDesc: 'An annual fire safety statement is a mandatory document that property owners must submit to their local council each year.',
    items: [
      {
        title: 'Comprehensive Inspection',
        desc: 'Verifies that all fire safety measures on the property comply with relevant Australian Standards.',
        img: '/assets/placeholders/annual-fire-safety-statement/property-inspection.webp'
      },
      {
        title: 'Essential Fire Safety Measures',
        desc: 'Encompasses fire extinguishers, smoke alarms, and fire exits to ensure proper working order.',
        img: '/assets/placeholders/annual-fire-safety-statement/essential-fire-safety-measures.webp'
      },
      {
        title: 'Professional Firefighter Experience',
        desc: '19 years of experience with the NSW Fire Brigades ensuring properties meet the Building Code of Australia.',
        img: '/assets/placeholders/annual-fire-safety-statement/professional-firefighter-experience.webp'
      },
      {
        title: 'Fire Safety Audit and Maintenance',
        desc: 'Tailored approach ensuring each property receives optimal protection and timely educational resources.',
        img: '/assets/placeholders/annual-fire-safety-statement/fire-safety-audit-maintenance.webp'
      }
    ],
    ctaTitle: 'Partnering with us offers a seamless path to compliance.',
    ctaDesc: 'Call us today at 1300 765 594'
  }
];

pagesToBuild.forEach(page => {
  let pContent = content; // Start with fixed strata content

  // 1. Hero Text Replace
  pContent = pContent.replace(
    '<h1 className="heading-style-h1">STRATA</h1>',
    `<h1 className="heading-style-h1">${page.heroText}</h1>`
  );
  pContent = pContent.replace(
    '<div className="header-eyebrow-text hide-desktop">Strata Fire Safety</div>',
    `<div className="header-eyebrow-text hide-desktop">${page.heroSubText}</div>`
  );
  pContent = pContent.replace(
    '<div className="header-eyebrow-text hide-tablet">Strata Fire Safety</div>',
    `<div className="header-eyebrow-text hide-tablet">${page.heroSubText}</div>`
  );
  pContent = pContent.replace(
    '<p className="body-text">Strata managers, owners corporations, and building managers rely on All Fire Services to ensure shared residential properties remain compliant and safe.</p>',
    `<p className="body-text">${page.heroDesc}</p>`
  );

  // 2. Process Section Heading Replace
  pContent = pContent.replace(
    '<h1 className="heading-style-h1">Strata Fire Safety Services</h1>',
    `<h1 className="heading-style-h1">${page.processHeading}</h1>`
  );
  // Note: the second <p className="body-text"> after the heading:
  const pMatch = pContent.match(/<h1 className="heading-style-h1">[^<]+<\/h1>\s*<\/div>\s*<p className="body-text">([^<]+)<\/p>/);
  if (pMatch) {
    pContent = pContent.replace(
      `<p className="body-text">${pMatch[1]}</p>`,
      `<p className="body-text">${page.processDesc}</p>`
    );
  }

  // 3. Process List Replace
  const lStart = pContent.indexOf('<div className="process_list">');
  const sEnd = pContent.indexOf('</section>', lStart);

  if (lStart !== -1 && sEnd !== -1) {
    let newList = '<div className="process_list">\n';
    page.items.forEach((item, index) => {
      newList += `
                      <div className="process_item">
                        <div className="process_image-wrap">
                          <img
                            src="${item.img}"
                            loading="lazy"
                            alt=""
                            className="process_image"
                          />
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
    
    pContent = pContent.substring(0, lStart) + newList + pContent.substring(sEnd);
  }

  // 4. CTA Replace
  pContent = pContent.replace(
    '<h2 className="heading-style-h3">Does your strata building need fire protection or compliance support?</h2>',
    `<h2 className="heading-style-h3">${page.ctaTitle}</h2>`
  );
  pContent = pContent.replace(
    '<p className="body-text">Call All Fire Services Australia at 1300 765 594 or for 24/7 After Hours, Phone 0484 648 400</p>',
    `<p className="body-text">${page.ctaDesc}</p>`
  );

  // Ensure dir exists
  fs.mkdirSync(path.dirname(page.path), { recursive: true });
  fs.writeFileSync(page.path, pContent, 'utf-8');
});

console.log('Built Strata (fixed) and cloned to Services, AFSS, and Compliance');

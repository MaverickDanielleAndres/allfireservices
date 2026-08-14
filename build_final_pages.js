const fs = require('fs');
const path = require('path');

const strataPath = path.join(__dirname, 'app', 'strata', 'page.tsx');
let content = fs.readFileSync(strataPath, 'utf-8');

const pagesToBuild = [
  {
    path: path.join(__dirname, 'app', 'fire-consultancy-services', 'page.tsx'),
    heroText: 'FIRE CONSULTANCY SERVICES',
    heroSubText: 'Professional Expertise',
    heroDesc: 'All Fire Services provides Professional Fire-Fighters serving to be our service technicians.',
    processHeading: 'Our Consultancy Services',
    processDesc: 'Excellent Service Delivery reflecting the current Fire Safety Regulation requirements.',
    items: [
      {
        title: 'Technical Expertise',
        desc: 'We provide technical expertise on issues affecting the relevant Building Code of Australia, Environmental Planning and Assessment Regulations and relevant Australian Standards.',
        img: '/assets/placeholders/fire-consultancy/consultancy-plans-review.webp'
      },
      {
        title: 'Building Assessment',
        desc: 'Comprehensive building fire-safety inspection and risk assessment.',
        img: '/assets/placeholders/fire-consultancy/consultancy-building-assessment.webp'
      },
      {
        title: 'Defect Identification',
        desc: 'Thorough defect reporting and rectification recommendations.',
        img: '/assets/placeholders/fire-consultancy/consultancy-defect-report.webp'
      }
    ],
    ctaTitle: 'Need professional fire-safety advice?',
    ctaDesc: 'Call All Fire Services at 1300 765 594.'
  },
  {
    path: path.join(__dirname, 'app', 'fire-safety-training', 'page.tsx'),
    heroText: 'FIRE SAFETY TRAINING',
    heroSubText: 'Professional Workplace Training',
    heroDesc: 'We offer Fire Safety Training delivered by Professional Fire-Fighters backed up by real life experience.',
    processHeading: 'Training Areas',
    processDesc: 'Equip your staff with the knowledge to respond safely and effectively.',
    items: [
      {
        title: 'Fire Extinguisher Training',
        desc: 'Practical fire extinguisher training for your team.',
        img: '/assets/placeholders/fire-safety-training/fire-extinguisher-training.webp'
      },
      {
        title: 'Fire Response Training',
        desc: 'Hands-on fire response training exercises.',
        img: '/assets/placeholders/fire-safety-training/fire-response-training.webp'
      },
      {
        title: 'Emergency and Evacuation Plans',
        desc: 'Emergency and evacuation plan briefing for all occupants.',
        img: '/assets/placeholders/fire-safety-training/emergency-and-evacuation-plans.webp'
      },
      {
        title: 'Evacuation Training',
        desc: 'Comprehensive workplace evacuation drills.',
        img: '/assets/placeholders/fire-safety-training/evacuation-training.webp'
      }
    ],
    ctaTitle: 'Ready to train your team?',
    ctaDesc: 'Call All Fire Services at 1300 765 594.'
  },
  {
    path: path.join(__dirname, 'app', 'fpa-australia-member', 'page.tsx'),
    heroText: 'FPA AUSTRALIA MEMBER',
    heroSubText: 'Proud Member',
    heroDesc: 'All Fire Services is proud to be a Member of FPA Australia.',
    processHeading: 'About FPA Australia',
    processDesc: 'The National peak body for Fire Safety.',
    items: [
      {
        title: 'Industry Leadership',
        desc: 'Fire Protection Association Australia provides information, services and education to the Fire Protection Industry and community. It reaches up to 30,000 individuals across the industry.',
        img: '/assets/placeholders/fpa-australia/fpa-industry-membership.webp'
      }
    ],
    ctaTitle: 'Work with an FPA Australia member.',
    ctaDesc: 'Call All Fire Services at 1300 765 594.'
  },
  {
    path: path.join(__dirname, 'app', '13-feb-2026-nsw-fire-safety-regulations', 'page.tsx'),
    heroText: '13 FEB 2026 REGULATIONS',
    heroSubText: 'NSW Fire Safety Regulations',
    heroDesc: 'Important updates regarding the certification of installed fire safety measures and routine maintenance.',
    processHeading: 'Regulation Changes',
    processDesc: 'What you need to know about the upcoming 2026 changes.',
    items: [
      {
        title: 'Certification Changes',
        desc: 'A new accreditation scheme where an accredited person must provide sign-off for all installed fire safety measures before a Fire Safety Schedule is issued.',
        img: '/assets/placeholders/regulations/accredited-practitioner-certification.webp'
      },
      {
        title: 'AS 1851 Routine Maintenance',
        desc: 'Routine maintenance on fire safety measures must be conducted in accordance with AS 1851:2012 for all Class 1b-9 buildings.',
        img: '/assets/placeholders/regulations/as-1851-routine-maintenance.webp'
      },
      {
        title: 'Compliance Standards',
        desc: 'The amended regulations aim to enhance fire safety standards and streamline the processes involved in ensuring compliance.',
        img: '/assets/placeholders/regulations/nsw-fire-safety-regulations-hero.webp'
      }
    ],
    ctaTitle: 'Need help understanding the fire-safety regulation changes?',
    ctaDesc: 'Call All Fire Services at 1300 765 594.'
  },
  {
    path: path.join(__dirname, 'app', 'fire-protection-services-sydney', 'page.tsx'),
    heroText: 'FIRE PROTECTION SYDNEY',
    heroSubText: 'Services in Sydney',
    heroDesc: 'All Fire Services is a premier provider of fire protection services in Sydney, built on a foundation of expertise.',
    processHeading: 'Sydney Fire Protection',
    processDesc: 'Extensive fire protection services designed to address every possible need.',
    items: [
      {
        title: 'Complete Fire Protection',
        desc: 'Our solutions include fire alarm installations, fire extinguisher servicing, emergency lighting systems, and detailed risk assessments.',
        img: '/assets/placeholders/fire-protection-services-sydney/all-fire-services-hydrant-test-banner.webp'
      },
      {
        title: 'Expert Team',
        desc: 'Staffed by professional, experienced firefighters who bring invaluable knowledge and skill to every service we provide.',
        img: '/assets/placeholders/fire-protection-services-sydney/all-fire-services-team-6.webp'
      }
    ],
    ctaTitle: 'Need fire protection services in Sydney?',
    ctaDesc: 'Call All Fire Services at 1300 765 594.'
  }
];

pagesToBuild.forEach(page => {
  let pContent = content;

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

  pContent = pContent.replace(
    '<h1 className="heading-style-h1">Strata Fire Safety Services</h1>',
    `<h1 className="heading-style-h1">${page.processHeading}</h1>`
  );

  const pMatch = pContent.match(/<h1 className="heading-style-h1">[^<]+<\/h1>\s*<\/div>\s*<p className="body-text">([^<]+)<\/p>/);
  if (pMatch) {
    pContent = pContent.replace(
      `<p className="body-text">${pMatch[1]}</p>`,
      `<p className="body-text">${page.processDesc}</p>`
    );
  }

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

  pContent = pContent.replace(
    '<h2 className="heading-style-h3">Does your strata building need fire protection or compliance support?</h2>',
    `<h2 className="heading-style-h3">${page.ctaTitle}</h2>`
  );
  pContent = pContent.replace(
    '<p className="body-text">Call All Fire Services Australia at 1300 765 594 or for 24/7 After Hours, Phone 0484 648 400</p>',
    `<p className="body-text">${page.ctaDesc}</p>`
  );

  fs.mkdirSync(path.dirname(page.path), { recursive: true });
  fs.writeFileSync(page.path, pContent, 'utf-8');
});

console.log('Built final 5 pages successfully.');

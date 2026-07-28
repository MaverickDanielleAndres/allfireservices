const fs = require('fs');
const path = require('path');

const strataPath = path.join(__dirname, 'app', 'strata', 'page.tsx');
let strataContent = fs.readFileSync(strataPath, 'utf-8');

let archiveContent = strataContent;
archiveContent = archiveContent.replace(
  '<h1 className="heading-style-h1">STRATA</h1>',
  '<h1 className="heading-style-h1">Uncategorized</h1>'
);
archiveContent = archiveContent.replace(
  '<div className="header-eyebrow-text hide-desktop">Strata Fire Safety</div>',
  '<div className="header-eyebrow-text hide-desktop">Archive</div>'
);
archiveContent = archiveContent.replace(
  '<div className="header-eyebrow-text hide-tablet">Strata Fire Safety</div>',
  '<div className="header-eyebrow-text hide-tablet">Archive</div>'
);
archiveContent = archiveContent.replace(
  '<p className="body-text">Strata managers, owners corporations, and building managers rely on All Fire Services to ensure shared residential properties remain compliant and safe.</p>',
  '<p className="body-text">Browse our uncategorized articles below.</p>'
);

archiveContent = archiveContent.replace(
  '<h1 className="heading-style-h1">Strata Fire Safety Services</h1>',
  '<h1 className="heading-style-h1">Article List</h1>'
);

const lStart = archiveContent.indexOf('<div className="process_list">');
const sEnd = archiveContent.indexOf('</section>', lStart);

if (lStart !== -1 && sEnd !== -1) {
  const items = [
    { title: '[ARCHIVE-POST-001]', desc: 'Article title, date, excerpt, thumbnail, and link required from production.', img: '/assets/placeholders/archive/default-article-thumbnail.webp' },
    { title: '[ARCHIVE-POST-002]', desc: 'Article title, date, excerpt, thumbnail, and link required from production.', img: '/assets/placeholders/archive/default-article-thumbnail.webp' },
    { title: '[ARCHIVE-POST-003]', desc: 'Article title, date, excerpt, thumbnail, and link required from production.', img: '/assets/placeholders/archive/default-article-thumbnail.webp' }
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
  newList += `
                    <div className="process_item" style={{justifyContent: 'space-between', padding: '20px 0'}}>
                       <a href="#" className="button w-button">Previous</a>
                       <a href="#" className="button w-button">Next</a>
                    </div>
                  </div>
                `;
  archiveContent = archiveContent.substring(0, lStart) + newList + archiveContent.substring(sEnd);
}

const archiveDir = path.join(__dirname, 'app', 'uncategorized-archive');
fs.mkdirSync(archiveDir, { recursive: true });
fs.writeFileSync(path.join(archiveDir, 'page.tsx'), archiveContent, 'utf-8');

console.log('Built uncategorized archive');

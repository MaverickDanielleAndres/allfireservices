const fs = require('fs');

const filePath = 'app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const startStr = '<section\n          id="why-allfire"';
const endStr = '</div>\n          </div>\n        </section>\n        <section className="section_featured">';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end index");
  process.exit(1);
}

const replacement = `<section
          id="why-allfire"
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%', minHeight: 'auto' }}
        >
          {/* Left Side: Image */}
          <div style={{ flex: '1 1 50%', minWidth: '300px', minHeight: '350px', position: 'relative' }}>
            <img
              src="/herosectionimage.webp"
              loading="lazy"
              alt="The All Fire Services team with local firefighters"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Right Side: Content */}
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 4%', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <h2
                style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111', lineHeight: '1.2' }}
              >
                Fire safety handled properly, from first check to final sign-off.
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#444', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Protecting people and property takes more than ticking boxes. Our Sydney team brings inspection, testing, maintenance and compliance support together, so you always know what is safe, what needs attention and what happens next.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 12 2 12 2C12 2 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#ff0000" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.95rem', marginBottom: '0.1rem' }}>Compliance made clear</strong>
                    <span style={{ color: '#444', fontSize: '0.85rem', lineHeight: '1.4' }}>Practical advice and straightforward reporting.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 12 2 12 2C12 2 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#ff0000" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.95rem', marginBottom: '0.1rem' }}>One dependable team</strong>
                    <span style={{ color: '#444', fontSize: '0.85rem', lineHeight: '1.4' }}>From routine testing to repairs and ongoing care.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 12 2 12 2C12 2 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#ff0000" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.95rem', marginBottom: '0.1rem' }}>Local, responsive support</strong>
                    <span style={{ color: '#444', fontSize: '0.85rem', lineHeight: '1.4' }}>People who listen, explain and follow through.</span>
                  </div>
                </li>
              </ul>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <img src="/logo.png" alt="FPA Australia" style={{ height: '50px', objectFit: 'contain' }} />
                <img src="/secondlogo.png" alt="FPAS" style={{ height: '50px', objectFit: 'contain' }} />
              </div>`;

content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync(filePath, content);
console.log("Successfully replaced why-allfire section");

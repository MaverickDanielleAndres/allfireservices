const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const services = [
  {
    title: 'Annual Fire Safety Statement',
    desc: 'All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements.',
    img: '/Fireprotectionservicesimage/annualfiresafety.webp',
    link: '/services'
  },
  {
    title: 'Monthly Fire Inspection',
    desc: 'Routine checks to ensure all fire panels and systems are fully operational and compliant.',
    img: '/Fireprotectionservicesimage/monthlyfireprotection.webp',
    link: '/services'
  },
  {
    title: 'Yearly Hydrant Flow Test',
    desc: 'Comprehensive flow testing of hydrant systems to guarantee adequate water supply during emergencies.',
    img: '/Fireprotectionservicesimage/yearlyhydrantflowstate.webp',
    link: '/services'
  },
  {
    title: 'Monthly Diesel Pump Inspection',
    desc: 'Regular inspection of diesel pumps to maintain reliability and performance under critical conditions.',
    img: '/Fireprotectionservicesimage/monthlydieselpumpprotection.webp',
    link: '/services'
  },
  {
    title: 'Monthly Sprinkler System Inspection',
    desc: 'Ensuring your sprinkler systems are primed and ready to respond instantly to any fire threat.',
    img: '/Fireprotectionservicesimage/monthlysprinkler.webp',
    link: '/services'
  },
  {
    title: 'Fire Extinguisher Tagging',
    desc: 'Inspection and tagging of all fire extinguishers to verify they meet strict Australian safety standards.',
    img: '/Fireprotectionservicesimage/fireestinguishertagging.webp',
    link: '/services'
  },
  {
    title: 'Emergency Lighting 90-Minute Test',
    desc: 'Thorough testing of emergency lighting systems to ensure safe evacuation routes during power failures.',
    img: '/Fireprotectionservicesimage/emergencylighting90.webp',
    link: '/services'
  },
  {
    title: 'Smoke Alarm Test',
    desc: 'Testing and maintenance of smoke alarms for early detection and maximum protection.',
    img: '/Fireprotectionservicesimage/smokealarmtest.webp',
    link: '/services'
  }
];

const ArrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 17" fill="none"><g clipPath="url(#clip0_6401_1558)"><path d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z" fill="currentColor"></path></g><defs><clipPath id="clip0_6401_1558"><rect width="16" height="16" fill="currentColor" transform="translate(0 0.5)"></rect></clipPath></defs></svg>`;

const FireSvg = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 8 6 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 6 12 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const swiperSlides = services.map(service => {
  return `
<div role="listitem" className="product-benefits_cms_item swiper-slide w-dyn-item">
  <div data-w-id="d78fcd4d-9e32-d46a-c58c-1fd11d11f6f8" className="products_card">
    <a tabIndex={-1} aria-hidden="true" href="${service.link}" className="products_link w-inline-block"></a>
    <div className="products_image-wrap">
      <div className="products_badge-wrap">
        <div className="badge is-white is-shadow">
          <div className="icon-embed-xxsmall w-richtext">
            <div className="w-embed">${FireSvg}</div>
          </div>
          <div>All Fire Services</div>
        </div>
      </div>
      <img src="${service.img}" loading="lazy" alt="${service.title}" className="products_image" style={{ objectFit: 'cover' }} />
    </div>
    <div className="products_info-wrap">
      <div className="products_content-link-wrap">
        <div className="text-size-small">Fire Protection Services</div>
        <div className="products_header-wrap">
          <h2 className="heading-style-h6">${service.title}</h2>
          <div className="badge is-white w-condition-invisible"><div className="w-dyn-bind-empty"></div></div>
        </div>
      </div>
      <div className="text-size-small text-weight-light text-style-3lines w-richtext">
        <p>${service.desc}</p>
      </div>
    </div>
    <div data-theme="dark" className="products_button-wrap">
      <a data-wf--button--size="small" href="${service.link}" className="button-wrap w-variant-0fa6310e-3b03-4614-cc31-5599b3d7993a w-inline-block">
        <div data-wf--button-style-- className="button-content w-variant-2322bba7-d743-d5ae-17b2-3a616235fc2a">
          <div data-wf--button-layout--layout="normal" className="button-layout">
            <div className="button-text">View Service</div>
            <div className="button-icon">
              <div className="icon-slot">
                <div className="icon-slot">${ArrowSvg}</div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>`;
}).join('\n');

const startToken = 'className="product-benefits_cms_list swiper-wrapper w-dyn-items"';
const startIndex = content.indexOf(startToken);
if (startIndex !== -1) {
  const openTagEnd = content.indexOf('>', startIndex) + 1;
  let depth = 1;
  let i = openTagEnd;
  while (depth > 0 && i < content.length) {
    if (content.substring(i, i+4) === '<div') {
      depth++;
    } else if (content.substring(i, i+5) === '</div') {
      depth--;
    }
    i++;
  }
  
  const realContentBefore = content.substring(0, openTagEnd);
  const realContentAfter = content.substring(i - 1); // keep the closing </div>
  
  content = realContentBefore + '\n' + swiperSlides + '\n' + realContentAfter;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Swiper slides replaced successfully.');

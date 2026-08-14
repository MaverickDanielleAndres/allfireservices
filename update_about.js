const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'about', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Hero Section
content = content.replace(
  'From Campers to Conversion Experts',
  'About ALLFIRE Services Sydney'
);
content = content.replace(
  /About All Fire Services/g, // This was originally "About Drivelodge" but already changed to All Fire Services by a previous step maybe?
  'About All Fire Services'
);
content = content.replace(
  'Our process, refined in our dedicated UK factory, ensures each roof is built to exacting standards. From initial design to final quality checks, we control every step.',
  'We are ready to help you out! Find out why we are the preferred choice for fire safety across Greater Sydney Area.'
);
content = content.replace(
  'The allfireservices family',
  'Who Knows Better Than A Fireman'
);
// Hero video poster to hero image
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/678e2eb1b1150c1b664d283c_About-head-v3-poster-00001.jpg',
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-scaled-e1759978160459-1536x2048.webp'
);
// Make video empty or remove it
content = content.replace(
  'src="https://cdn.prod.website-files.com/675171b75e69f27843937162%2F678e2eb1b1150c1b664d283c_About-head-v3-transcode.mp4"',
  'src=""'
);
content = content.replace(
  'src="https://cdn.prod.website-files.com/675171b75e69f27843937162%2F678e2eb1b1150c1b664d283c_About-head-v3-transcode.webm"',
  'src=""'
);

// Timeline (Company Origin)
content = content.replace(
  'All Fire Services Motorhomes <span className="text-span-white">began in the heart of Yorkshire,</span> in David Waring\\\'s father\\\'s textile mill in Skipton. <span className="text-span-white">What started as a hobby,</span> building motorhomes for family adventures, <span className="text-span-white">soon became something much more.</span>',
  'All Fire Services is an Australian owned and operated business <span className="text-span-white">created by a former NSW Fire Brigades Senior Officer in December 2009.</span> What started as a unique concept <span className="text-span-white">soon became the standard for fire safety.</span>'
);
content = content.replace(
  'In the early days, the clatter of looms filled one side of the mill, while on the other, David crafted his unique motorhomes. By the mid-nineties, the looms had fallen quiet, and All Fire Services had expanded to fill the whole space.<br /><br />Family has always been at the heart of All Fire Services. David and Joanne’s children grew up surrounded by motorhomes, enjoying family holidays in their own custom-built vehicles. <br /><br />Sons James and Joseph later joined the family business, each bringing their own strengths — James handling the commercial side of the business, while Joseph shares his father\'s passion for hands-on craftsmanship.',
  'To ensure our Clients receive extensive and real-life knowledge of the fire safety industry, All Fire Services was founded with the unique concept to provide Professional Firefighters serving to be our Customer Service Technicians.<br /><br />These people are Professional, Experienced and Highly Motivated to provide a level of Service and Safety to the Community unequalled by our competition.'
);
content = content.replace(
  'Under their stewardship, All Fire Services evolved, focusing on crafting high-quality high-top and elevating roofs. In 2020, increased demand led them to move to a purpose-built facility in Crosshills, streamlining production and allowing for further growth. Today, All Fire Services employs 25-30 staff across various departments, still designing and manufacturing all of our roofs and accessories in-house.<br /><br />David and Joanne continue to be a regular presence, offering guidance and support, with no plans to retire anytime soon — although if you visit, don’t be surprised if they’re away for the week in their latest custom-built creation.',
  'All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements and when necessary provide technical expertise on issues affecting the relevant Building Code of Australia, Environmental Planning and Assessment Regulations and relevant Australian Standards.'
);

// Values section -> Mission & Expertise
content = content.replace(
  '<h2 className="heading-style-h2">Our Values</h2>',
  '<h2 className="heading-style-h2">Our Mission & Expertise</h2>'
);
content = content.replace(
  '<h3 className="heading-style-h5">Quality</h3>',
  '<h3 className="heading-style-h5">Our Mission</h3>'
);
content = content.replace(
  'We’d never supply one of our customers with a roof that we wouldn’t be happy sleeping under ourselves — whatever the weather.',
  'Our Mission is to provide High-Level Professional Fire Safety Services whilst being Approachable, Practical and Reasonable.'
);
content = content.replace(
  '<h3 className="heading-style-h5">Ingenuity</h3>',
  '<h3 className="heading-style-h5">Professional Technicians</h3>'
);
content = content.replace(
  'We know van life is all about making the most of limited space, so we design every feature and accessory to make life on the road easier.',
  'To ensure our Clients receive extensive and real-life knowledge, we provide Professional Firefighters to be our Customer Service Technicians.'
);
content = content.replace(
  '<h3 className="heading-style-h5">Passion</h3>',
  '<h3 className="heading-style-h5">Technical Expertise</h3>'
);
content = content.replace(
  'As camper van enthusiasts ourselves, we thrive on the challenge of creating a roof for a new base model or improving on an existing design.',
  'We provide technical expertise on issues affecting the relevant Building Code of Australia, Environmental Planning and Assessment Regulations and Australian Standards.'
);

// Team Section
content = content.replace(
  'Meet the team behind All Fire Services',
  'Meet the All Fire Services Team'
);

const teamMap = [
  { old: 'James', newName: 'Peter', desc: 'Peter, our founder and former NSW Fire Brigades Senior Officer, brings decades of frontline experience to lead our highly motivated team of professionals.' },
  { old: 'David', newName: 'Paul', desc: 'Paul is a dedicated Customer Service Technician and professional firefighter, bringing real-life knowledge and extensive experience to every inspection.' },
  { old: 'Joanne', newName: 'Sam', desc: 'Sam ensures excellent service delivery on site, drawing on his background as a serving professional firefighter to keep your building compliant.' },
  { old: 'Joseph', newName: 'George', desc: 'George is highly motivated to provide a level of service and safety to the community unequalled by our competition.' },
  { old: 'Glyn', newName: 'Ken', desc: 'Ken brings technical expertise on issues affecting the relevant Building Code of Australia and Australian Standards.' },
  { old: 'Ian', newName: 'Kyriakos', desc: 'Kyriakos provides approachable, practical and reasonable fire safety services to all our clients across the Greater Sydney Area.' }
];

teamMap.forEach(t => {
  content = content.replace(`<h3 className="heading-style-h4">${t.old}</h3>`, `<h3 className="heading-style-h4">${t.newName}</h3>`);
});

// For descriptions, I'll just regex replace the <p>...</p> after the <h3> by finding them iteratively, or I can replace the whole team_content div.
teamMap.forEach(t => {
  const h3Str = `<h3 className="heading-style-h4">${t.newName}</h3>`;
  const h3Index = content.indexOf(h3Str);
  if (h3Index !== -1) {
    const pStart = content.indexOf('<p>', h3Index);
    const pEnd = content.indexOf('</p>', pStart);
    if (pStart !== -1 && pEnd !== -1) {
      const before = content.substring(0, pStart + 3);
      const after = content.substring(pEnd);
      content = before + t.desc + after;
    }
  }
});

// Image updates
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[a-zA-Z0-9_]+_James[^\.]*\.webp/g,
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-scaled-e1759978160459-1536x2048.webp'
);
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[a-zA-Z0-9_]+_David[^\.]*\.webp/g,
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp'
);
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[a-zA-Z0-9_]+_Joanne[^\.]*\.webp/g,
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-kyriakos-scaled-e1759977873822-2048x1536.webp'
);
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[a-zA-Z0-9_]+_Joseph[^\.]*\.webp/g,
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-with-guildo-scaled-e1759977755355-1536x2048.webp'
);
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[a-zA-Z0-9_]+_Glyn[^\.]*\.webp/g,
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-orlando-scaled-e1759977833504-2048x1536.webp'
);
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[a-zA-Z0-9_]+_Ian[^\.]*\.webp/g,
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-coffee-logo-pete-scaled-e1759977688325-2048x1536.webp'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('About page replacements done.');

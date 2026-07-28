const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Parallax Images
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/67864fe46913e952168c7743_Mountains%20Back%20v2.webp',
  '/herosectionimage.webp'
);
// Make layer 2 empty or transparent so it doesn't obstruct
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/67864feadafc51a78c7d9ba8_Van%20v2.webp',
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
);
// Make layer 4 empty
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/67864fe9da10c464db0c1771_Rocks%3AGround%20v2.webp',
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
);

// Other remaining images in home-products_card
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof.webp',
  '/Fireprotectionservicesimage/annualfiresafety.webp'
);
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof-p-500.webp 500w, https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof-p-800.webp 800w, https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof-p-1080.webp 1080w, https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof.webp 1352w',
  '/Fireprotectionservicesimage/annualfiresafety.webp 1352w'
);

content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof.webp',
  '/Fireprotectionservicesimage/monthlyfireprotection.webp'
);
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof-p-500.webp 500w, https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof-p-800.webp 800w, https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof-p-1080.webp 1080w, https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof.webp 1352w',
  '/Fireprotectionservicesimage/monthlyfireprotection.webp 1352w'
);

// home-products_card text
content = content.replace(
  'Elevated Roof',
  'Commercial Fire Safety'
);
content = content.replace(
  'Browse our front and rear elevating roofs by make and model.',
  'Browse our commercial fire safety solutions and compliance services.'
);
content = content.replace(
  'High-top Roof',
  'Residential Fire Safety'
);
content = content.replace(
  'Browse high top roof conversions by make and model.',
  'Browse our residential fire safety solutions for strata and multi-unit buildings.'
);

content = content.replace(
  'href="/products?roof=Elevated+Roof"',
  'href="/services"'
);
content = content.replace(
  'href="/products?roof=High+Top+Roof"',
  'href="/services"'
);

// Fitter image responsive sources
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/6756c556008e435ead447544_Fitters-p-500.webp 500w, https://cdn.prod.website-files.com/675171b75e69f27843937162/6756c556008e435ead447544_Fitters-p-800.webp 800w, https://cdn.prod.website-files.com/675171b75e69f27843937162/6756c556008e435ead447544_Fitters-p-1080.webp 1080w, https://cdn.prod.website-files.com/675171b75e69f27843937162/6756c556008e435ead447544_Fitters-p-1600.webp 1600w, https://cdn.prod.website-files.com/675171b75e69f27843937162/6756c556008e435ead447544_Fitters.webp 1632w',
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp 1632w'
);


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Final home page replacements done.');

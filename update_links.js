const fs = require('fs');
const path = 'c:/Users/S-300V5A/Downloads/allfireservices/allfireservices/lib/services.ts';
let c = fs.readFileSync(path, 'utf8');
c = c.replace(/href: "\/services\?category=[a-z-]+\"/g, 'href: "/services" /* temporary */');
fs.writeFileSync(path, c);

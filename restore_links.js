const fs = require('fs');
const path = 'c:/Users/S-300V5A/Downloads/allfireservices/allfireservices/lib/services.ts';
let c = fs.readFileSync(path, 'utf8');
let result = '';
let currentId = '';
c.split('\n').forEach(line => {
    const idMatch = line.match(/id:\s*"([^"]+)"/);
    if (idMatch) {
        currentId = idMatch[1];
    }
    if (line.includes('href: "/services" /* temporary */')) {
        result += line.replace('href: "/services" /* temporary */', 'href: "/services?category=' + currentId + '"') + '\n';
    } else {
        result += line + '\n';
    }
});
fs.writeFileSync(path, result.slice(0, -1));

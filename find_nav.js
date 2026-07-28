const fs = require('fs');
const html = fs.readFileSync('allfireservices-home.html', 'utf8');

// Usually Webflow navs have <div ... class="... navbar ...">
// and end before <main
const mainIdx = html.indexOf('<main');
let navHtml = "";
if (mainIdx !== -1) {
    // Nav is probably everything inside the body before main, or a specific wrapper
    const bodyStart = html.indexOf('<body');
    const firstDiv = html.indexOf('<div', bodyStart);
    navHtml = html.substring(firstDiv, mainIdx);
} else {
    navHtml = "Cannot find main tag";
}

fs.writeFileSync('navbar.html', navHtml);
console.log('Saved navbar.html');

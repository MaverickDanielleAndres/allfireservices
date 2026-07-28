const fs = require('fs');
const html = fs.readFileSync('allfireservices-home.html', 'utf8');

const startIdx = html.indexOf('<div data-animation="default"');
if (startIdx === -1) {
  console.log("Navbar start not found");
  process.exit(1);
}

// Find the end by looking for <main class="main-wrapper"> which comes right after the navbar in Webflow
const endIdx = html.indexOf('<main class="main-wrapper">', startIdx);
if (endIdx === -1) {
  console.log("Navbar end not found");
  process.exit(1);
}

const navbarHtml = html.substring(startIdx, endIdx);
fs.writeFileSync('navbar.html', navbarHtml);
console.log('Found Navbar');

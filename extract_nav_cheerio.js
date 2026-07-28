const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('drivelodge-home.html', 'utf8');
const $ = cheerio.load(html);

// Find the navbar. Usually it has class "navbar_component" or similar
const nav = $('.navbar_component').first();
let navHtml = "";
if (nav.length) {
    navHtml = $.html(nav);
} else {
    // try data-animation="default"
    const nav2 = $('[data-animation="default"]').first();
    if (nav2.length) {
        navHtml = $.html(nav2);
    } else {
        navHtml = "<div>Navbar not found</div>";
    }
}

fs.writeFileSync('navbar.html', navHtml);
console.log('Saved navbar.html');

const fs = require('fs');
const path = require('path');

const pages = [
  'contact',
  'confirmation',
  'qr-database-2',
  'talk-to-peter'
];

pages.forEach(page => {
  const pPath = path.join(__dirname, 'app', page, 'page.tsx');
  if (fs.existsSync(pPath)) {
    let content = fs.readFileSync(pPath, 'utf-8');
    // We added one too many `</div>` before `</header>`. Let's remove one.
    content = content.replace('</div>\n          </div>\n        </header>', '</div>\n        </header>');
    fs.writeFileSync(pPath, content, 'utf-8');
  }
});

console.log('Fixed syntax errors');

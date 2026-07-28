const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      content = content.replace(/maxLength="256"/g, 'maxLength={256}');
      content = content.replace(/maxLength="5000"/g, 'maxLength={5000}');
      
      // Also we need to make sure we fix the other one if any
      content = content.replace(/<form\s+method="get"\s+blocks-slot-children="ST265"/g, '<form method="get" data-blocks-slot-children="ST265"');
      content = content.replace(/blocks-name="/g, 'data-blocks-name="');
      content = content.replace(/blocks-non-deletable="true"/g, 'data-blocks-non-deletable="true"');
      content = content.replace(/blocks-slot-item-canonical="EL13"/g, 'data-blocks-slot-item-canonical="EL13"');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
console.log('Fixed typescript issues');

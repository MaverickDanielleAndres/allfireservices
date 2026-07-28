const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let newContent = content.replace(/<span[^>]+>/g, (match) => {
          return match.replace(/\s*htmlFor="[^"]+"/g, '');
      });
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf-8');
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
console.log('Fixed multiline span htmlFor');

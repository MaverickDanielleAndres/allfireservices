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
      // Change `<span htmlFor="X" ...> I accept ... </span>` to `<label htmlFor="X" ...> I accept ... </label>`
      // But maybe just removing `htmlFor` from span is safer if it's already inside a label, or change span to label.
      // Let's replace `<span htmlFor=` with `<label htmlFor=` and `</span>` with `</label>` in those specific lines.
      // Or just remove htmlFor from span.
      content = content.replace(/<span\s+htmlFor="[^"]+"/g, '<span');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
console.log('Fixed span htmlFor issues');

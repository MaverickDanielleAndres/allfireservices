const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix h1 -> h2
  // Find all h1 except the first one
  let h1Count = 0;
  content = content.replace(/<h1(.*?)>/g, (match, p1) => {
    h1Count++;
    if (h1Count > 1) return '<h2' + p1 + '>';
    return match;
  });
  
  let closeH1Count = 0;
  content = content.replace(/<\/h1>/g, (match) => {
    closeH1Count++;
    if (closeH1Count > 1) return '</h2>';
    return match;
  });

  fs.writeFileSync(filePath, content);
  console.log('Processed H1s in', filePath);
}

['app/home/page.tsx', 'app/homepage-2025/page.tsx', 'app/uncategorized-archive/page.tsx'].forEach(processFile);

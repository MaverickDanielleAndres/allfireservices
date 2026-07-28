const fs = require('fs');
let html = fs.readFileSync('footer_source.html', 'utf8');
html = html.replace(/class=/g, 'className=')
  .replace(/<!--\$-->/g, '')
  .replace(/<!--\/\$-->/g, '')
  .replace(/clip-path/g, 'clipPath')
  .replace(/fill-rule/g, 'fillRule')
  .replace(/stroke-width/g, 'strokeWidth')
  .replace(/stroke-linecap/g, 'strokeLinecap')
  .replace(/stroke-linejoin/g, 'strokeLinejoin')
  .replace(/<br\/>/g, '<br />')
  .replace(/<img([^>]+)>/g, (m, attrs) => {
    if (!attrs.endsWith('/')) {
      return `<img${attrs} />`;
    }
    return m;
  })
  .replace(/<input([^>]+)>/g, (m, attrs) => {
    if (!attrs.endsWith('/')) {
      return `<input${attrs} />`;
    }
    return m;
  });

const jsx = `import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    ${html}
  );
}
`;

fs.writeFileSync('components/Footer.tsx', jsx);
console.log('Done');

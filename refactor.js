const fs = require('fs');
const path = require('path');

const pageContent = fs.readFileSync('app/page.tsx', 'utf8');
const lines = pageContent.split('\n');

// 680 to 907 (1-indexed) is 679 to 907 (0-indexed slice)
const componentCode = lines.slice(679, 907).join('\n');

const contactCTA = `"use client";

import React from "react";

export default function ContactCTA() {
  return (
${componentCode}
  );
}
`;

fs.writeFileSync('components/ContactCTA.tsx', contactCTA);
console.log('Created components/ContactCTA.tsx');

// Now mass replace on other files

// Let's do simple recursive directory walk
function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.next')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.tsx') && dirFile !== path.join('app', 'page.tsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

const allFiles = walkSync('app');

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // For most pages
  if (content.includes('section_contact-cta')) {
    const regex = /<section data-theme="light" className="section_contact-cta">[\s\S]*?<\/section>/g;
    if (regex.test(content)) {
      content = content.replace(regex, '<ContactCTA />');
      changed = true;
    }
  }

  // For contact page
  if (file.includes('contact') && content.includes('section_contact')) {
     const contactRegex = /<header className="section_contact">[\s\S]*?<\/header>/g;
     if (contactRegex.test(content)) {
       content = content.replace(contactRegex, '<ContactCTA />');
       changed = true;
     }
  }
  
  if (changed) {
    if (!content.includes('import ContactCTA')) {
       // Insert import after "use client" or other imports
       if (content.includes('"use client";')) {
          content = content.replace('"use client";', '"use client";\nimport ContactCTA from "@/components/ContactCTA";');
       } else {
          content = 'import ContactCTA from "@/components/ContactCTA";\n' + content;
       }
    }
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});

// Also replace on page.tsx
let homeContent = fs.readFileSync('app/page.tsx', 'utf8');
const homeRegex = /<section data-theme="light" className="section_contact-cta">[\s\S]*?<\/section>/g;
if (homeRegex.test(homeContent)) {
  homeContent = homeContent.replace(homeRegex, '<ContactCTA />');
  if (!homeContent.includes('import ContactCTA')) {
     homeContent = homeContent.replace('"use client";', '"use client";\nimport ContactCTA from "@/components/ContactCTA";');
  }
  fs.writeFileSync('app/page.tsx', homeContent);
  console.log('Updated app/page.tsx');
}

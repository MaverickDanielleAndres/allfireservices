const fs = require('fs');
let html = fs.readFileSync('navbar.html', 'utf8');

// Convert to JSX
let jsxHtml = html.replace(/class=/g, 'className=')
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
  })
  .replace(/style="([^"]*)"/g, (m, val) => {
    let bgMatch = val.match(/background-image:\s*(url\([^)]+\))/i);
    if (bgMatch) {
      return `style={{ backgroundImage: '${bgMatch[1].replace(/'/g, "\\'")}' }}`;
    }
    return ''; // remove other styles
  })
  .replace(/<style>([\s\S]*?)<\/style>/gi, '')
  .replace(/for=/g, 'htmlFor=')
  .replace(/autoplay=""/g, 'autoPlay')
  .replace(/playsinline=""/g, 'playsInline')
  .replace(/loop=""/g, 'loop')
  .replace(/muted=""/g, 'muted')
  .replace(/maxlength=/g, 'maxLength')
  .replace(/tabindex=/g, 'tabIndex')
  .replace(/autocomplete=/g, 'autoComplete')
  .replace(/required=""/g, 'required');

const jsx = `"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      ${jsxHtml}
    </>
  );
}
`;

fs.writeFileSync('components/Navbar.tsx', jsx);
console.log('Done Navbar.tsx');

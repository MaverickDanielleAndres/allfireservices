const fs = require('fs');

let html = fs.readFileSync('allfireservices-home.html', 'utf8');

// The main content is inside <main class="main-wrapper">
let mainMatch = html.match(/<main class="main-wrapper">([\s\S]*?)<\/main>/i);
if (!mainMatch) {
  console.log("No main wrapper found");
  process.exit(1);
}
let mainHtml = mainMatch[1];

// Convert to JSX
let jsxHtml = mainHtml.replace(/class=/g, 'className=')
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
  .replace(/muted=""/g, 'muted');

const jsx = `"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="main-wrapper">
      ${jsxHtml}
    </main>
  );
}
`;

fs.writeFileSync('app/page.tsx', jsx);
console.log('Done convert_home');

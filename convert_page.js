const fs = require('fs');

const inFile = process.argv[2];
const outFile = process.argv[3];

const cheerio = require('cheerio');

let html = fs.readFileSync(inFile, 'utf8');
const $ = cheerio.load(html);

// Remove elements we don't want in the page.tsx (like navbar, footer, scripts, etc.)
$('.navbar_component').remove();
$('.footer_component').remove();
$('script').remove();
$('link').remove();
$('style').remove();

// Get the main wrapper HTML
let mainNode = $('.main-wrapper');
if (!mainNode.length) {
  mainNode = $('.scroll-wrapper');
}

let mainHtml = '';
if (mainNode.length) {
  mainHtml = mainNode.html();
} else {
  console.log("No main wrapper found in", inFile);
  process.exit(1);
}

// Convert to JSX
let jsxHtml = mainHtml.replace(/class=/g, 'className=')
  .replace(/<!--\$-->/g, '')
  .replace(/<!--\/\$-->/g, '')
  .replace(/clip-path/g, 'clipPath')
  .replace(/fill-rule/g, 'fillRule')
  .replace(/stroke-width/g, 'strokeWidth')
  .replace(/stroke-linecap/g, 'strokeLinecap')
  .replace(/stroke-linejoin/g, 'strokeLinejoin')
  .replace(/<br([^>]*)>/g, (m, attrs) => {
    if (!attrs.endsWith('/')) {
      return `<br${attrs} />`;
    }
    return m;
  })
  .replace(/<hr([^>]*)>/g, (m, attrs) => {
    if (!attrs.endsWith('/')) {
      return `<hr${attrs} />`;
    }
    return m;
  })
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
  .replace(/<source([^>]+)>/g, (m, attrs) => {
    if (!attrs.endsWith('/')) {
      return `<source${attrs} />`;
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
  .replace(/maxlength=/g, 'maxLength=')
  .replace(/tabindex=/g, 'tabIndex=')
  .replace(/autocomplete=/g, 'autoComplete=')
  .replace(/required=""/g, 'required');

const jsx = `"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="main-wrapper">
      ${jsxHtml}
    </main>
  );
}
`;

fs.writeFileSync(outFile, jsx);
console.log('Done', outFile);

const fs = require('fs');
const glob = require('glob');

function removeScripts(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove all script tags and their contents
    content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '');
    
    // Remove all link tags (unclosed or closed)
    content = content.replace(/<link\b[^>]*>/gi, '');

    // Also the Navbar is duplicated in page.tsx inside scroll-wrapper. We can remove the navbar_component if it exists.
    // However, it might be tricky to parse safely with Regex.
    // Instead of regex, let's fix any unclosed <style> tags too.
    content = content.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Cleaned ${filePath}`);
}

const files = glob.sync('app/**/*.tsx');
files.forEach(removeScripts);

// Also remove from components if any
const components = glob.sync('components/**/*.tsx');
components.forEach(removeScripts);

console.log("Done removing scripts and links.");

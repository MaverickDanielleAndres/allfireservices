const fs = require('fs');
const path = require('path');

const replacements = [
  // Fix DOM properties
  { from: /stroke-width=/g, to: 'strokeWidth=' },
  { from: /stroke-linecap=/g, to: 'strokeLinecap=' },
  { from: /stroke-linejoin=/g, to: 'strokeLinejoin=' },
  
  // Fix Image aspect ratio warnings (add style)
  { from: /<Image\s+src="\/logo\.png"\s+alt="Logo"\s+width=\{150\}\s+height=\{50\}\s+priority\s*\/>/g, to: '<Image src="/logo.png" alt="Logo" width={150} height={50} priority style={{ width: "auto", height: "auto" }} />' },
  { from: /<Image\s+src="\/secondlogo\.png"\s+alt="Logo"\s+width=\{150\}\s+height=\{50\}\s+priority\s*\/>/g, to: '<Image src="/secondlogo.png" alt="Logo" width={150} height={50} priority style={{ width: "auto", height: "auto" }} />' },
  { from: /<Image\s+src="\/logo\.png"\s+alt="Logo"\s+width=\{150\}\s+height=\{50\}\s*\/>/g, to: '<Image src="/logo.png" alt="Logo" width={150} height={50} style={{ width: "auto", height: "auto" }} />' },
  { from: /<Image\s+src="\/secondlogo\.png"\s+alt="Logo"\s+width=\{150\}\s+height=\{50\}\s*\/>/g, to: '<Image src="/secondlogo.png" alt="Logo" width={150} height={50} style={{ width: "auto", height: "auto" }} />' },

  // Empty src fix
  { from: /src=""/g, to: 'src="/logo.png"' },

  // Camper Van & Roof Sanitations
  { from: /All Fire Services - Raising the roof on/gi, to: 'All Fire Services - Raising the standard of' },
  { from: /High Top &amp; Elevating Roof/gi, to: 'Fire Safety &amp; Compliance' },
  { from: /high-top and elevating roofs for camper/gi, to: 'comprehensive fire safety solutions for commercial' },
  { from: /Browse our front and rear elevating roofs by/gi, to: 'Browse our comprehensive fire safety solutions by' },
  { from: /Browse high top roof conversions by make and/gi, to: 'Browse our fire protection systems and compliance' },
  { from: /roofs\. If you’re unable to deliver your vehicle to us/gi, to: 'systems. If you require on-site consultation, we come to you' },
  { from: /every roof we create is precisely designed, engineered/gi, to: 'every fire system we maintain is meticulously inspected' },
  { from: /to design and produce each of our roof conversions/gi, to: 'to ensure the highest standard of fire compliance' },
  { from: /and camper van accessories in our Crosshills/gi, to: 'and safety equipment in our Sydney facility' },
  { from: /As camper van lovers ourselves, we know that build/gi, to: 'As safety professionals ourselves, we know that compliance' },
  { from: /We’ve been providing quality camper van conversions/gi, to: 'We’ve been providing quality fire safety services' },
  { from: /and developing roofs for over 100 different base/gi, to: 'and maintaining systems for hundreds of properties' },
  { from: /Premium Roof Conversions/gi, to: 'Premium Fire Services' },
  { from: /range of elevated and high-top roofs\./gi, to: 'range of essential fire safety measures.' },
  { from: /Elevated Roofs/gi, to: 'Fire Extinguishers' },
  { from: /High-Top Roofs/gi, to: 'Emergency Lighting' },
  { from: /of camper van roof manufacturing\. We use only the highest/gi, to: 'of fire protection services. We use only the highest' },
  { from: /your roof stands the test of time\./gi, to: 'your systems remain fully compliant.' },
  { from: /Configure your camper van conversion/gi, to: 'Schedule your fire safety inspection' },
  { from: /high-top roof conversions and customise your build with/gi, to: 'comprehensive compliance audits and safeguard your property with' },
  { from: /quality and finish of every roof we build\./gi, to: 'quality and reliability of every inspection we conduct.' },
  { from: /Build your dream camper/gi, to: 'Secure your building today' },
  { from: /We’re always happy to hear from fellow camper van/gi, to: 'We’re always happy to hear from property managers and' },
  { from: /enthusiasts, whether it’s to enquire about a new roof/gi, to: 'owners, whether it’s to enquire about a new fire safety audit' },
  { from: /camper van/gi, to: 'commercial building' },
  { from: /campervan/gi, to: 'building' },
  { from: /Camper/gi, to: 'Building' },
  { from: /camper/gi, to: 'building' },
  { from: /roof conversion/gi, to: 'fire service' },
  { from: /roof/gi, to: 'system' },

  // 404 images from missing files
  { from: /https:\/\/cdn\.prod\.website-files\.com\/[^"]+DL_Clip_001_v001-poster-00001\.jpg/g, to: '/logo.png' },
  { from: /https:\/\/cdn\.prod\.website-files\.com\/[^"]+About-head-v3-poster-00001\.jpg/g, to: '/logo.png' },
  { from: /https:\/\/cdn\.prod\.website-files\.com\/[^"]+process-head-poster-00001\.jpg/g, to: '/logo.png' },
  { from: /hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT\/allfire-peter-scaled-[a-z0-9\-]+\.webp/g, to: '/logo.png' },
  { from: /hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT\/allfire-sam-[a-z0-9\-]+\.webp/g, to: '/logo.png' },
  { from: /hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT\/allfire-with-guildo-[a-z0-9\-]+\.webp/g, to: '/logo.png' },
  { from: /hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT\/allfire-[a-z0-9\-]+\.webp/g, to: '/logo.png' },
  { from: /assets\/placeholders\/annual-fire-safety-statement\/property-inspection\.webp/g, to: '/logo.png' },
  { from: /assets\/placeholders\/annual-fire-safety-statement\/essential-fire-safety-measures\.webp/g, to: '/logo.png' },
  { from: /assets\/placeholders\/annual-fire-safety-statement\/professional-firefighter-experience\.webp/g, to: '/logo.png' },
  { from: /assets\/placeholders\/annual-fire-safety-statement\/fire-safety-audit-maintenance\.webp/g, to: '/logo.png' },
  { from: /Logo-1-All-fire-services\.png/g, to: '/logo.png' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      
      replacements.forEach(r => {
        content = content.replace(r.from, r.to);
      });
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));

console.log('Sanitization complete.');

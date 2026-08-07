const sharp = require('sharp');
const path = require('path');

const src = './public/fpa-capability-strip.webp';
const outDir = './public/services-logo';

// Image is 1920x240
// Dividers at x: 264, 563, 801, 1015, 1229, 1430, 1644
// Only extracting the 6 red circular service icons:
//   563–801:  Fire Extinguishers  (238px)
//   801–1015: Fire Hoses & Reels  (214px)
//  1015–1229: Fire Hydrants & Boosters (214px)
//  1229–1430: Emergency Equipment (201px)
//  1430–1644: Fire Panels         (214px)
//  1644–1920: Testing & Compliance (276px)

const crops = [
  { name: 'fire-extinguishers',     left: 566,  top: 0, width: 232, height: 240 },
  { name: 'fire-hoses-reels',       left: 804,  top: 0, width: 208, height: 240 },
  { name: 'fire-hydrants-boosters', left: 1018, top: 0, width: 208, height: 240 },
  { name: 'emergency-equipment',    left: 1232, top: 0, width: 195, height: 240 },
  { name: 'fire-panels',            left: 1434, top: 0, width: 208, height: 240 },
  { name: 'testing-compliance',     left: 1647, top: 0, width: 273, height: 240 },
];

async function run() {
  for (const crop of crops) {
    const outPath = path.join(outDir, `${crop.name}.webp`);
    await sharp(src)
      .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
      .webp({ quality: 95, lossless: true })
      .toFile(outPath);
    console.log(`✓ Saved: ${outPath}`);
  }
  console.log('\nAll 6 icons extracted!');
}

run().catch(console.error);

// Re-crop the 3 uncropped stratapage originals more aggressively (banner + footer).
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public', 'stratapage');
const destDir = path.join(__dirname, 'public', 'stratapage-cropped');

const standardCrops = [
  // Glebe: top ~32% is banner area, bottom ~18% is CALL PETER footer.
  { src: 'Glebe.png', dest: '13-all-fire-services-welcome-glebe.webp', topPct: 32, bottomPct: 18 },
  // Marrickville-1: same proportions.
  { src: 'Marrickville-1.webp', dest: '14-all-fire-services-welcome-marrickville.webp', topPct: 32, bottomPct: 18 },
  // North Sydney: similar proportions.
  { src: 'northsydney.png', dest: '15-all-fire-services-welcome-north-sydney.webp', topPct: 25, bottomPct: 18 },
];

async function cropStandard(item) {
  const srcPath = path.join(srcDir, item.src);
  const destPath = path.join(destDir, item.dest);
  if (!fs.existsSync(srcPath)) {
    console.log(`Skip (missing): ${item.src}`);
    return;
  }
  const metadata = await sharp(srcPath).metadata();
  const topOffset = Math.floor(metadata.height * (item.topPct / 100));
  const bottomOffset = Math.floor(metadata.height * (item.bottomPct / 100));
  const extractHeight = metadata.height - topOffset - bottomOffset;
  await sharp(srcPath)
    .extract({ left: 0, top: topOffset, width: metadata.width, height: extractHeight })
    .toFile(destPath);
  console.log(`Standard-cropped ${item.src} -> ${item.dest} (top ${item.topPct}%, bottom ${item.bottomPct}%)`);
}

async function main() {
  for (const item of standardCrops) {
    await cropStandard(item);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
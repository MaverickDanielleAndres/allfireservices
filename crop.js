const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public', 'stratapage');
const destDir = path.join(__dirname, 'public', 'stratapage-cropped');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

const images = [
  '11-all-fire-services-welcome-bondi.webp',
  '9-all-fire-services-welcome-marrickville.webp',
  '8-all-fire-services-welcome-marrickville.webp',
  '7-all-fire-services-welcome-waterloo.webp',
  '4-all-fire-services-welcome-haberfield.webp',
  '12-all-fire-services-welcome-alexandria.webp'
];

// Special crops: { sourceFilename, destFilename, top%, bottom% }
const specialCrops = [
  // Crop the Randwick image: remove top header/logos and bottom phone bar
  { src: '2welcome-to-fireman-family.png', dest: 'randwick-building.webp', topPct: 25, bottomPct: 15 },
  // Crop the Rose Bay image: remove bottom phone bar
  { src: '1welcome-to-fireman-family.png', dest: '1welcome-to-fireman-family.png', topPct: 0, bottomPct: 18 },
];

async function cropImages() {
  for (const img of images) {
    const srcPath = path.join(srcDir, img);
    const destPath = path.join(destDir, img);

    if (fs.existsSync(srcPath)) {
      const metadata = await sharp(srcPath).metadata();

      // Let's crop the bottom 65% of the image (removes top 35%)
      const extractHeight = Math.floor(metadata.height * 0.65);
      const topOffset = metadata.height - extractHeight;

      await sharp(srcPath)
        .extract({ left: 0, top: topOffset, width: metadata.width, height: extractHeight })
        .toFile(destPath);
      console.log(`Cropped ${img}`);
    } else {
      console.log(`File not found: ${img}`);
    }
  }

  for (const crop of specialCrops) {
    const srcPath = path.join(srcDir, crop.src);
    const destPath = path.join(destDir, crop.dest);

    if (fs.existsSync(srcPath)) {
      const metadata = await sharp(srcPath).metadata();
      const topOffset = Math.floor(metadata.height * (crop.topPct / 100));
      const extractHeight = metadata.height - topOffset - Math.floor(metadata.height * (crop.bottomPct / 100));

      await sharp(srcPath)
        .extract({ left: 0, top: topOffset, width: metadata.width, height: extractHeight })
        .toFile(destPath);
      console.log(`Special-cropped ${crop.src} -> ${crop.dest}`);
    } else {
      console.log(`File not found: ${crop.src}`);
    }
  }
}

cropImages();

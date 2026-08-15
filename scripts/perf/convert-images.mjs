// One-off image converter: produces AVIF + WebP variants for every multi-MB
// image we serve. Existing source files are kept in place so paths keep working.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), "public");
const targets = [
  // (source, sizes: [{width, name-suffix}], qualityAVIF, qualityWebP)
  // Service card images (rendered at ~290px on home; max ~600 on /services)
  { src: "services/AFSS.png",                sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/Fire Panel &Detection (AS 1670.1).jpg", sizes: [320, 480, 640], qAvif: 55, qWebp: 70 },
  { src: "services/Smoke Alarms(AS 3786).png", sizes: [320, 480, 640],  qAvif: 55, qWebp: 70 },
  { src: "services/firedoor.jpg",             sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/Fire extinguishers.jpg",   sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/emergencylights.jpg",      sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/firehose.png",             sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/diesel hydrant.jpg",       sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/mechanical.jpg",           sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/flowtest.jpg",             sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/passivefire.jpg",          sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  { src: "services/zoneblockplan.jpg",        sizes: [320, 480, 640],   qAvif: 55, qWebp: 70 },
  // Hero poster — used full-bleed on home, ~1920 wide
  { src: "herosectionimage.webp",             sizes: [640, 960, 1280, 1920], qAvif: 50, qWebp: 65 },
  // About & service hero
  { src: "aboutimage.png",                    sizes: [480, 800, 1200], qAvif: 55, qWebp: 70 },
  { src: "serviceherosectionimage.jpg",       sizes: [640, 1024, 1600], qAvif: 55, qWebp: 70 },
  // Big raw staff / founder photos
  { src: "petercropped.jpg",                  sizes: [240, 480, 800],   qAvif: 60, qWebp: 75 },
  { src: "allbuildings.jpg",                  sizes: [480, 800, 1200],  qAvif: 55, qWebp: 70 },
  { src: "buildingcompilation-v2.jpg",        sizes: [480, 800, 1200],  qAvif: 55, qWebp: 70 },
  // Family (Peter / founders) - smaller but still multi-MB
  { src: "family/uncleian.png",               sizes: [240, 480, 800],   qAvif: 55, qWebp: 70 },
  { src: "family/greatgrandad.jpg",           sizes: [240, 480, 800],   qAvif: 55, qWebp: 70 },
  { src: "family/myfather.jpg",               sizes: [240, 480, 800],   qAvif: 55, qWebp: 70 },
  { src: "family/nexgenimage.png",            sizes: [240, 480, 800],   qAvif: 55, qWebp: 70 },
  // Technician photos
  { src: "technician/Caroline - Accounts manager.png", sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Cornelius - Diesel Pump and Sprinkler system technician.jpg", sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/George - Fire Panel manger.jpg",  sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/HAMID - SENIOR FIRE ELECTRICIAN.png", sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Ken - Administration Manager.jpg",  sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Mem - Fire Technician.jpg",         sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Paul - Senior Fire Technician.PNG", sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Peter - Managing Director.jpg",     sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Roda - Office Manager.jpg",         sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/Ryan - Fire Technician.jpg",        sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/partners.png",          sizes: [480, 800, 1200],  qAvif: 60, qWebp: 75 },
  { src: "technician/group.jpg",             sizes: [480, 800, 1200],  qAvif: 60, qWebp: 75 },
  { src: "technician/groupteam.jpg",         sizes: [480, 800, 1200],  qAvif: 60, qWebp: 75 },
  { src: "technician/paul.jpg",              sizes: [240, 480, 800],   qAvif: 60, qWebp: 75 },
  { src: "technician/peter-managing-director.jpg", sizes: [240, 480, 800], qAvif: 60, qWebp: 75 },
  { src: "technician/pete-selfie.jpg",       sizes: [240, 480, 800],   qAvif: 60, qWebp: 75 },
  { src: "technician/technician.jpg",        sizes: [240, 480, 800],   qAvif: 60, qWebp: 75 },
  // Strata suburb building showcase (rendered at ~360 on home in expanding card)
  { src: "stratapage-cropped/1welcome-to-fireman-family.png",     sizes: [360, 720, 1080], qAvif: 60, qWebp: 75 },
  { src: "stratapage-cropped/Glebe.png",                         sizes: [360, 720, 1080], qAvif: 60, qWebp: 75 },
  { src: "stratapage-cropped/Randwick.png",                       sizes: [360, 720, 1080], qAvif: 60, qWebp: 75 },
  { src: "stratapage-cropped/northsydney.png",                    sizes: [360, 720, 1080], qAvif: 60, qWebp: 75 },
  { src: "stratapage-cropped/2welcome-to-fireman-family.png",     sizes: [360, 720, 1080], qAvif: 60, qWebp: 75 },
];

async function processOne(target) {
  const inputPath = path.join(root, target.src);
  const dir = path.dirname(inputPath);
  const base = path.basename(target.src, path.extname(target.src));
  try {
    await fs.access(inputPath);
  } catch {
    console.warn(`Skip (missing): ${target.src}`);
    return;
  }
  const img = sharp(inputPath, { failOn: "none" });
  const meta = await img.metadata();
  for (const w of target.sizes) {
    if (meta.width && w > meta.width) continue;
    const outAvif = path.join(dir, `${base}-${w}.avif`);
    const outWebp = path.join(dir, `${base}-${w}.webp`);
    await sharp(inputPath, { failOn: "none" })
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: target.qAvif, effort: 6 })
      .toFile(outAvif);
    await sharp(inputPath, { failOn: "none" })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: target.qWebp, effort: 6 })
      .toFile(outWebp);
  }
  console.log(`OK ${target.src} -> ${target.sizes.length} sizes`);
}

for (const t of targets) {
  try { await processOne(t); }
  catch (e) { console.error(`FAIL ${t.src}: ${e.message}`); }
}
console.log("Done.");

// Aggressive optimizer for every large webp/jpg in public/. Resizes to
// max 720 px (mobile cards never render larger) and re-encodes webp at q65.
// Writes to public/<dir>/opt/ then copies back over the originals so any
// deployment (including old caches) serves the small files immediately.
import sharp from "sharp";
import { readdir, stat, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ROOTS = [
  "./public/annual-fire-safety-statement",
  "./public/services-wix",
  "./public/Fireprotectionservicesimage",
  "./public/stratapage-cropped",
];
const MAX_WIDTH = 720;
const QUALITY = 65;

async function processFile(root, name) {
  const src = join(root, name);
  const ext = extname(name).toLowerCase();
  const base = basename(name, ext);
  const outDir = join(root, "opt");
  const out = join(outDir, `${base}.webp`);
  await mkdir(outDir, { recursive: true });
  const before = (await stat(src)).size;
  const input = await readFile(src);
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const buffer = await sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: Math.min(meta.width || MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: QUALITY, effort: 4 })
    .toBuffer();
  // Save to opt/ AND overwrite original so any code path that references
  // the original filename still gets the small file.
  await writeFile(out, buffer);
  await writeFile(src, buffer);
  console.log(`${root.replace("./public/", "")}/${name}: ${(before / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB`);
}

async function run() {
  for (const root of ROOTS) {
    let files;
    try {
      files = await readdir(root);
    } catch {
      continue;
    }
    for (const name of files) {
      const ext = extname(name).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
      try {
        const s = await stat(join(root, name));
        if (s.size < 30000 && name.endsWith(".webp")) continue;
        await processFile(root, name);
      } catch (err) {
        console.error(`! ${name}: ${err.message}`);
      }
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


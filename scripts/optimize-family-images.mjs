// Optimize every family portrait to webp, resize to max 320 px (display size
// is ~140 px CSS), and overwrite originals so any deployment serves small.
import sharp from "sharp";
import { readdir, readFile, writeFile, stat, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ROOT = "./public/family";
const MAX_WIDTH = 320;
const QUALITY = 65;

async function processFile(name) {
  const src = join(ROOT, name);
  const ext = extname(name).toLowerCase();
  const base = basename(name, ext);
  const out = join(ROOT, `${base}.webp`);
  await mkdir(join(ROOT, "opt"), { recursive: true });
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
  await writeFile(out, buffer);
  await writeFile(src, buffer);
  console.log(`${name}: ${(before / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB`);
}

const files = await readdir(ROOT);
for (const name of files) {
  const ext = extname(name).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
  try {
    await processFile(name);
  } catch (err) {
    console.error(`! ${name}: ${err.message}`);
  }
}
console.log("Done.");

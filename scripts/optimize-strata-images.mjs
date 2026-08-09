// One-off image optimizer for the strata gallery. Reads every image in
// public/stratapage-cropped, downscales it, and writes the optimised webp
// next to the original under ./public/stratapage-cropped/opt/. This is fully
// non-destructive — the originals stay on disk so the script can be re-run or
// rolled back at any time. Update image references in code to point at the
// /opt/ variants to pick up the savings.
import sharp from "sharp";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "./public/stratapage-cropped";
const OUT = "./public/stratapage-cropped/opt";
const MAX_WIDTH = 720;

async function processFile(name) {
  const src = join(ROOT, name);
  const out = join(OUT, name.replace(/\.png$/i, ".webp"));
  const before = (await stat(src)).size;
  const meta = await sharp(src, { failOn: "none" }).metadata();
  const buffer = await sharp(src, { failOn: "none" })
    .rotate()
    .resize({
      width: Math.min(meta.width || MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 70, effort: 4 })
    .toBuffer();
  await writeFile(out, buffer);
  const after = buffer.length;
  const saved = before - after;
  const pct = before > 0 ? ((saved / before) * 100).toFixed(1) : "0";
  console.log(`${name} -> opt/${out.split(/[\\/]/).pop()}: ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB (${pct}% saved)`);
}

await mkdir(OUT, { recursive: true });
const files = await readdir(ROOT);
const targets = files.filter((f) => /\.(png|webp)$/i.test(f));
for (const f of targets) {
  try {
    await processFile(f);
  } catch (err) {
    console.error(`! ${f}: ${err.message}`);
  }
}
console.log("Done.");




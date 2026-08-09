// Overwrite the originals in public/stratapage-cropped with their /opt/
// counterparts. The originals are larger and unused now that all code paths
// point at /opt/. This script copies opt/* back over the source names so any
// deployment that only ships the source folder (eg older Vercel cache)
// automatically serves the small variants.
import { readdir, stat, copyFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "./public/stratapage-cropped";
const OPT = "./public/stratapage-cropped/opt";

async function run() {
  const files = await readdir(OPT);
  let replaced = 0;
  for (const name of files) {
    const optPath = join(OPT, name);
    // Replace the .png with .webp if the source is png.
    const targetName = name; // keep same filename so existing references still work
    const targetPath = join(ROOT, targetName);
    const beforeExists = await stat(targetPath).catch(() => null);
    if (!beforeExists) continue;
    const beforeSize = beforeExists.size;
    await copyFile(optPath, targetPath);
    const afterSize = (await stat(targetPath)).size;
    replaced++;
    console.log(
      `${targetName}: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB`,
    );
  }
  console.log(`\nReplaced ${replaced} files.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

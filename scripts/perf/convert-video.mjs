// Re-encode the hero video for fast web delivery.
// Generates a WebM (VP9, ~1.2 Mbps) and a smaller MP4 (~700 kbps) for mobile
// plus the desktop MP4 at ~1.5 Mbps. Audio stripped (video is muted everywhere).
// Original is preserved for now — we'll redirect in next.config.ts after.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { promisify } from "node:util";

const ffmpeg = "node_modules/ffmpeg-static/ffmpeg.exe";
const src = "public/hero-video.mp4";

function run(args) {
  return new Promise((resolve, reject) => {
    console.log(`> ffmpeg ${args.join(" ")}`);
    const p = spawn(ffmpeg, args, { stdio: "inherit" });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("ffmpeg exit " + code))));
  });
}

async function main() {
  if (!existsSync(src)) throw new Error("missing " + src);
  // Desktop MP4 (1080p, ~1.5 Mbps)
  await run([
    "-y", "-i", src,
    "-vf", "scale=-2:1080",
    "-c:v", "libx264", "-preset", "slow", "-crf", "26",
    "-movflags", "+faststart",
    "-an",
    "public/hero-video-1080.mp4",
  ]);
  // Mobile MP4 (540p, ~700 kbps)
  await run([
    "-y", "-i", src,
    "-vf", "scale=-2:540",
    "-c:v", "libx264", "-preset", "slow", "-crf", "28",
    "-movflags", "+faststart",
    "-an",
    "public/hero-video-540.mp4",
  ]);
  // Desktop WebM (1080p, VP9, ~1.0 Mbps)
  await run([
    "-y", "-i", src,
    "-vf", "scale=-2:1080",
    "-c:v", "libvpx-vp9", "-b:v", "1000k",
    "-deadline", "good", "-cpu-used", "2",
    "-row-mt", "1",
    "-an",
    "public/hero-video-1080.webm",
  ]);
  // Mobile WebM (540p, VP9, ~500 kbps)
  await run([
    "-y", "-i", src,
    "-vf", "scale=-2:540",
    "-c:v", "libvpx-vp9", "-b:v", "500k",
    "-deadline", "good", "-cpu-used", "2",
    "-row-mt", "1",
    "-an",
    "public/hero-video-540.webm",
  ]);
  console.log("All variants produced.");
}
main().catch((e) => { console.error(e); process.exit(1); });

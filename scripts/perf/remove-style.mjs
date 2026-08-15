import fs from "node:fs";
const p = process.argv[2];
const c = fs.readFileSync(p, "utf8");
const startMarker = "<style>{`";
const endMarker = "`}</style>";
const start = c.indexOf(startMarker);
const endIdx = c.indexOf(endMarker);
if (start < 0 || endIdx < 0) { console.error("not found"); process.exit(1); }
const end = endIdx + endMarker.length;
const before = c.slice(0, start);
const after = c.slice(end);
const newContent = before + "{/* Styles extracted to app/sitewide-cta.css so they ship in the prerendered HTML. */}" + after;
fs.writeFileSync(p, newContent);
console.log("Removed", end - start, "bytes");

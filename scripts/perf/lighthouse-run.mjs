// Run Lighthouse via the programmatic API and print a tight summary.
// Requires: lighthouse, chrome-launcher installed locally, chrome.exe available.
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import fs from "node:fs";

const URL = process.env.LH_URL ?? "http://localhost:3050/";
const FORM_FACTOR = (process.env.LH_FORM_FACTOR ?? "mobile").toLowerCase();
const SCREENSHOT = process.env.LH_SCREENSHOT ?? "1";

const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--hide-scrollbars",
];

const config = FORM_FACTOR === "desktop"
  ? {
      extends: "lighthouse:default",
      settings: {
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      },
    }
  : {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      },
    };

const chrome = await chromeLauncher.launch({
  chromePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  chromeFlags,
  logLevel: "error",
});

try {
  const result = await lighthouse(URL, { port: chrome.port, output: "json", logLevel: "error" }, config);
  const lhr = result.lhr;
  const cats = lhr.categories;
  const audits = lhr.audits;
  const fmt = (n) => (n == null ? "n/a" : Math.round(n * 100));
  console.log("URL:", URL, "Form:", FORM_FACTOR);
  console.log("Performance:    ", fmt(cats.performance.score));
  console.log("Accessibility:  ", fmt(cats.accessibility.score));
  console.log("Best Practices: ", fmt(cats["best-practices"].score));
  console.log("SEO:            ", fmt(cats.seo.score));
  const metrics = ["first-contentful-paint","largest-contentful-paint","total-blocking-time","cumulative-layout-shift","speed-index","interactive"];
  for (const m of metrics) {
    const a = audits[m];
    if (a) console.log(`${m.padEnd(28)} ${a.displayValue}`);
  }
  console.log("\nNetwork requests:", audits["network-requests"].details.items.length);
  const totalBytes = audits["network-requests"].details.items.reduce(
    (s, r) => s + (r.transferSize ?? 0), 0,
  );
  console.log("Total transfer:  ", (totalBytes / 1024 / 1024).toFixed(2), "MB");

  // Top 10 heaviest requests
  const items = [...audits["network-requests"].details.items]
    .sort((a, b) => (b.transferSize ?? 0) - (a.transferSize ?? 0))
    .slice(0, 10);
  console.log("\nTop 10 heaviest:");
  for (const r of items) {
    const size = ((r.transferSize ?? 0) / 1024).toFixed(1);
    console.log(`  ${size.padStart(7)} KB  ${r.resourceType.padEnd(8)} ${r.url.replace(/^https?:\/\/[^/]+/, "")}`);
  }

  // Failing audits
  const failing = Object.values(audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "notApplicable");
  if (failing.length) {
    console.log("\nFailing audits (score < 0.9):");
    for (const a of failing.slice(0, 30)) {
      console.log(`  ${a.score?.toFixed(2)}  ${a.id}  — ${a.title}`);
    }
  }
  if (SCREENSHOT === "1") fs.writeFileSync("lh-report.json", JSON.stringify(lhr));
} finally {
  await chrome.kill();
}

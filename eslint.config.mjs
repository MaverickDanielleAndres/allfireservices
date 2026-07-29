import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "app/about/page.tsx",
      "app/home/page.tsx",
      "app/homepage-2025/page.tsx",
      "app/page.tsx",
      "app/uncategorized-archive/page.tsx",
    ],
    rules: {
      // These files intentionally retain dynamic lightbox/data-URI or legacy
      // noindex imagery that cannot benefit from Next.js image optimization.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next-audit/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "skills/**",
    "*.js",
  ]),
]);

export default eslintConfig;

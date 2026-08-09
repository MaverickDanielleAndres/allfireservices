// Per-slug metadata is generated dynamically in [slug]/page.tsx via
// `generateMetadata`. This layout deliberately exports no static metadata
// so unknown slugs do not inherit an indexable title/description fallback
// — the page calls notFound() and Next renders the global not-found.tsx
// with the correct noindex directive.
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

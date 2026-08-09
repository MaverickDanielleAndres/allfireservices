import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Accessible, semantically-marked-up breadcrumb trail. Renders as a
 * `<nav aria-label="Breadcrumb">` containing an `<ol>` of items so
 * assistive technology announces it correctly.
 *
 * Pass items in DOM order from root → current page. The final item is
 * rendered as a plain span (the current location) and is marked with
 * `aria-current="page"`.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="breadcrumbs-item">
              {item.href && !isLast ? (
                <Link href={item.href} className="breadcrumbs-link">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="breadcrumbs-current"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="breadcrumbs-sep" aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .breadcrumbs {
              font-size: 0.85rem;
              line-height: 1.4;
              margin: 0 0 1.25rem;
            }
            .breadcrumbs-list {
              display: flex;
              flex-wrap: wrap;
              gap: 0.4rem 0.55rem;
              list-style: none;
              margin: 0;
              padding: 0;
            }
            .breadcrumbs-item {
              display: inline-flex;
              align-items: center;
              gap: 0.4rem;
            }
            .breadcrumbs-link {
              color: inherit;
              opacity: 0.78;
              text-decoration: none;
              transition: opacity 150ms ease;
            }
            .breadcrumbs-link:hover {
              opacity: 1;
              text-decoration: underline;
            }
            .breadcrumbs-current {
              color: inherit;
              font-weight: 600;
            }
            .breadcrumbs-sep {
              opacity: 0.55;
            }
          `,
        }}
      />
    </nav>
  );
}

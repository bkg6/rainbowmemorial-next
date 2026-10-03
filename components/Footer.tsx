import Link from "next/link";
import { footerColumns, type FooterLink } from "@/config/footer";

const linkClass = "underline-offset-4 hover:underline";
const linkStyle = { color: "var(--color-text-primary)" };

function renderLink(link: FooterLink) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener"
        className={linkClass}
        style={linkStyle}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass} style={linkStyle}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full border-t mt-24"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
        borderColor: "var(--color-border)",
        fontFamily: "var(--font-display)",
      }}
    >
      <div className="mx-auto px-6 py-12 md:py-16" style={{ maxWidth: 1200 }}>
        <div className="mb-10">
          <Link
            href="/"
            className="text-xl font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Rainbow Memorial
          </Link>
          <p
            className="mt-3 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Memorial pages stay up permanently.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {footerColumns.map((column) => {
            const liveLinks = column.links.filter((l) => l.live);
            if (liveLinks.length === 0) return null;
            return (
              <div key={column.heading}>
                <h3
                  className="mb-4 text-sm font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {column.heading}
                </h3>
                <ul className="space-y-3 text-sm">
                  {liveLinks.map((link) => (
                    <li key={link.href}>{renderLink(link)}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="mt-12 border-t pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Link
            href="/create"
            className="text-sm underline underline-offset-4 hover:no-underline"
            style={{ color: "var(--color-accent-primary)" }}
          >
            Create a memorial page for your pet →
          </Link>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            © {new Date().getFullYear()} Rainbow Memorial. Written by
            Hannah Wright unless noted.
          </p>
        </div>
      </div>
    </footer>
  );
}

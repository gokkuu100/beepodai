import { useEffect, type ReactNode } from 'react';
import { Link } from 'wouter';
// @ts-ignore
import beepodLogo from '@assets/beepodgen/beeplogo.png';

const ESPRESSO = '#1A0F00';
const BEE_ORANGE = '#FF9A00';
const WHITE = '#FFFFFF';
const CREAM = '#FFFDF5';
const WARM_WHITE = '#FFF8F0';
const MUTED_LIGHT = 'rgba(26,15,0,0.55)';
const BORDER_LIGHT = 'rgba(26,15,0,0.08)';

export function LegalLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: CREAM, color: ESPRESSO }}>
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255,255,255,0.97)',
          borderBottom: `1px solid ${BORDER_LIGHT}`,
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="block">
            <img src={beepodLogo} alt="BeePod" className="h-12 w-auto object-contain" />
          </Link>
          <Link
            href="/"
            className="text-[13px] font-semibold transition-colors"
            style={{ color: MUTED_LIGHT }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = BEE_ORANGE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = MUTED_LIGHT;
            }}
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14 lg:py-20">
        <p
          className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
          style={{ color: BEE_ORANGE }}
        >
          Legal
        </p>
        <h1
          className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[0.95] mb-3"
          style={{ color: ESPRESSO }}
        >
          {title}
        </h1>
        <p className="text-sm mb-10" style={{ color: MUTED_LIGHT }}>
          Effective date: {effectiveDate}
        </p>
        <div className="legal-prose">{children}</div>
      </main>

      <footer style={{ background: ESPRESSO, borderTop: '1px solid rgba(255,154,0,0.12)' }}>
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-5 text-[13px]">
            <Link href="/privacy" className="transition-colors" style={{ color: 'rgba(255,248,240,0.55)' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors" style={{ color: 'rgba(255,248,240,0.55)' }}>
              Terms of Service
            </Link>
          </div>
          <a href="mailto:info@beepodai.com" className="text-[13px]" style={{ color: WARM_WHITE }}>
            info@beepodai.com
          </a>
        </div>
      </footer>

      <style>{`
        .legal-prose h2 {
          font-family: inherit;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          margin: 2.5rem 0 0.85rem;
          color: ${ESPRESSO};
        }
        .legal-prose h3 {
          font-weight: 700;
          font-size: 1.05rem;
          margin: 1.75rem 0 0.65rem;
          color: ${ESPRESSO};
        }
        .legal-prose p, .legal-prose li {
          font-size: 0.98rem;
          line-height: 1.7;
          color: rgba(26,15,0,0.78);
          margin-bottom: 0.85rem;
        }
        .legal-prose ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .legal-prose a {
          color: ${BEE_ORANGE};
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-prose strong {
          color: ${ESPRESSO};
          font-weight: 700;
        }
        .legal-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0 1.5rem;
          font-size: 0.92rem;
          background: ${WHITE};
          border: 1px solid ${BORDER_LIGHT};
          border-radius: 14px;
          overflow: hidden;
        }
        .legal-prose th, .legal-prose td {
          text-align: left;
          vertical-align: top;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid ${BORDER_LIGHT};
          color: rgba(26,15,0,0.78);
        }
        .legal-prose th {
          background: #FFF3E0;
          color: ${ESPRESSO};
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .legal-prose tr:last-child td {
          border-bottom: none;
        }
        @media (max-width: 640px) {
          .legal-prose table, .legal-prose thead, .legal-prose tbody, .legal-prose th, .legal-prose td, .legal-prose tr {
            display: block;
          }
          .legal-prose thead { display: none; }
          .legal-prose tr {
            border-bottom: 1px solid ${BORDER_LIGHT};
            padding: 0.75rem 0;
          }
          .legal-prose td {
            border: none;
            padding: 0.25rem 1rem;
          }
          .legal-prose td::before {
            content: attr(data-label);
            display: block;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: ${BEE_ORANGE};
            margin-bottom: 0.15rem;
          }
        }
      `}</style>
    </div>
  );
}

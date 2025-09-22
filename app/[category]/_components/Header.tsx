// app/components/PageHeader.tsx
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { href: string; label: string }[];
  count?: number;
  youtubeUrl?: string;
}

/** Utility: Convert slugs/labels into "Pretty Case" */
function formatLabel(label: string): string {
  return label
    .replace(/-/g, " ") // hyphens -> spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize each word
}

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  count,
  youtubeUrl = "https://www.youtube.com/@kurunzinews", // ✅ default
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left: Branding + breadcrumbs + title */}
        <div className="flex-1">
          {/* Branding */}
          <div className="mb-3 md:mb-4">
            <span className="text-sm font-semibold tracking-wide text-white/80 uppercase">
              Kurunzi News
            </span>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="flex flex-wrap items-center space-x-1 text-sm text-white/80 mb-4">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center">
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {formatLabel(crumb.label)}
                  </Link>
                  {i < breadcrumbs.length - 1 && (
                    <span className="text-white/50 mx-2">/</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Title & Description */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {formatLabel(title)}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-white/90 max-w-3xl">
              {description}
            </p>
          )}

          {/* Count divider */}
          {typeof count === "number" && (
            <div className="flex items-center mt-6">
              <div className="h-px bg-white/30 flex-1"></div>
              <div className="mx-4 text-white/60">{count} articles</div>
              <div className="h-px bg-white/30 flex-1"></div>
            </div>
          )}
        </div>

        {/* Right: YouTube CTA */}
        {youtubeUrl && (
          <div className="mt-6 md:mt-0 md:ml-8">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg transition-colors"
            >
              <FaYoutube className="w-5 h-5 mr-2" />
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// app/components/PageHeader.tsx
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { href: string; label: string }[];
  count?: number;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  count,
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center">
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
                {i < breadcrumbs.length - 1 && (
                  <span className="text-white/50 mx-2">/</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title & Description */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            {description}
          </p>
        )}

        {/* Count divider */}
        {typeof count === "number" && (
          <div className="flex items-center mt-8">
            <div className="h-px bg-white/30 flex-1"></div>
            <div className="mx-4 text-white/60">{count} articles</div>
            <div className="h-px bg-white/30 flex-1"></div>
          </div>
        )}
      </div>
    </div>
  );
}

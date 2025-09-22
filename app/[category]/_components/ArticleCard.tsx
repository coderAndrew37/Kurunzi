import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity.image";
import { Story } from "@/app/components/types";

interface ArticleCardProps {
  article: Story;
  categoryLabel?: string; // e.g. "Technology"
  href: string; // full link to the article page
}

export default function ArticleCard({
  article,
  categoryLabel,
  href,
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-60 overflow-hidden">
        {article.img && (
          <Image
            src={urlFor(article.img).url()}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {categoryLabel && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {categoryLabel}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-neutral-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {article.readTime ? `${article.readTime} min read` : "Quick read"}
          </span>
        </div>
      </div>
    </Link>
  );
}

import { Story } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";
import { sanityClient } from "@/app/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { subcategoryStoriesQuery } from "@/app/lib/getCategoryStories";

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = params;

  const articles: Story[] = await sanityClient.fetch(subcategoryStoriesQuery, {
    subcategory,
  });

  if (!articles.length) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
        </h1>
        <p className="text-neutral-600">
          Latest stories in {subcategory} under {category}.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/${category}/${article.slug}`}>
            <div className="group">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                {article.img && (
                  <Image
                    src={urlFor(article.img).url()}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <h3 className="font-bold text-lg group-hover:text-blue-600">
                {article.title}
              </h3>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

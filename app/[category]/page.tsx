import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Category, Story } from "@/app/components/types";
import { categoryStoriesQuery } from "../lib/getCategoryStories";
import { sanityClient } from "../lib/sanity.client";
import { urlFor } from "../lib/sanity.image";
import { groq } from "next-sanity";

// Types
interface PageProps {
  params: {
    category: string;
  };
}

// Query to fetch category with subcategories
const categoryWithSubcategoriesQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    "subcategories": subcategories[]->{
      _id,
      title,
      description,
      "slug": slug.current
    }
  }
`;

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = params;

  // Fetch category
  const currentCategory: Category | null = await sanityClient.fetch(
    categoryWithSubcategoriesQuery,
    { slug: categorySlug }
  );

  if (!currentCategory) notFound();

  // Fetch articles for this category
  const articles: Story[] = await sanityClient.fetch(categoryStoriesQuery, {
    category: categorySlug,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Modern gradient header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">
              {currentCategory.title}
            </span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            {currentCategory.description}
          </p>

          <div className="flex items-center mt-8">
            <div className="h-px bg-white/30 flex-1"></div>
            <div className="mx-4 text-white/60">{articles.length} articles</div>
            <div className="h-px bg-white/30 flex-1"></div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 -mt-10">
        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
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
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {currentCategory.title}
                    </span>
                  </div>
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
                    {/* <span>
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span> */}
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
                      {article.readTime
                        ? `${article.readTime} min read`
                        : "Quick read"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No articles yet
            </h3>
            <p className="text-neutral-500">
              We haven&apos;t published any articles in {currentCategory.title}{" "}
              yet.
            </p>
          </div>
        )}

        {/* Subcategory navigation */}
        {currentCategory.subcategories &&
          currentCategory.subcategories.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                Explore {currentCategory.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    href={`/${currentCategory.slug}/${sub.slug}`}
                    className="group block p-8 bg-gradient-to-br from-white to-neutral-50 border border-neutral-100 rounded-2xl hover:border-blue-500/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {sub.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                      Explore
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
      </main>
    </div>
  );
}

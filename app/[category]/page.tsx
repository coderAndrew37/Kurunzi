import { Category, Story } from "@/app/components/types";
import { groq } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryStoriesQuery } from "../lib/getCategoryStories";
import { sanityClient } from "../lib/sanity.client";
import ArticleCard from "./_components/ArticleCard";
import EmptyState from "./_components/EmptyState";
import PageHeader from "./_components/Header";

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
  const { category: categorySlug } = await params;

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
      <PageHeader
        title={currentCategory.title}
        description={currentCategory.description}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: `/category/${categorySlug}`, label: currentCategory.title },
        ]}
        count={articles.length}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 -mt-10">
        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                categoryLabel={currentCategory.title}
                href={`/article/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles yet"
            message={`We haven't published any articles in ${currentCategory.title} yet.`}
          />
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

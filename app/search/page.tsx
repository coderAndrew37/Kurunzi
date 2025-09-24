import { Story } from "@/app/components/types";
import ArticleCard from "../[category]/_components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { searchArticlesQuery } from "../lib/getSearchResults";
import { sanityClient } from "../lib/sanity.client";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  if (!query) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg text-slate-600">
          Please enter a search query above.
        </p>
      </div>
    );
  }

  const articles: Story[] = await sanityClient.fetch(searchArticlesQuery, {
    q: `*${query}*`,
  });

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg text-slate-600">
          No results found for <span className="font-semibold">{query}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Search results for:{" "}
        <span className="text-blue-600">&quot;{query}&quot;</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            href={`/article/${article.slug}`}
          />
        ))}
      </div>
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Search Tips */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Search Tips
          </h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Try using specific keywords</li>
            <li>• Check your spelling</li>
            <li>• Use fewer words for broader results</li>
            <li>• Try related terms or synonyms</li>
          </ul>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}

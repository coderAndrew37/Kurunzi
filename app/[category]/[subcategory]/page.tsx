// app/[category]/[subcategory]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { generateSlug } from "@/app/components/generateSlug";

// Define the category and subcategory structure
interface Category {
  title: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  title: string;
  slug: string;
  description: string;
}

// Mock data for categories and subcategories
const categories: Category[] = [
  {
    title: "Politics",
    slug: "politics",
    description:
      "Latest political news, analysis, and commentary from Kenya and beyond.",
    subcategories: [
      {
        title: "Elections",
        slug: "elections",
        description:
          "Coverage of local and national elections, campaigns, and results.",
      },
      {
        title: "Policy",
        slug: "policy",
        description:
          "Analysis of government policies and their impacts on citizens.",
      },
      {
        title: "Government",
        slug: "government",
        description:
          "News about government operations, officials, and institutions.",
      },
    ],
  },
  {
    title: "Sports",
    slug: "sports",
    description:
      "Comprehensive sports coverage from local leagues to international events.",
    subcategories: [
      {
        title: "Football",
        slug: "football",
        description:
          "News about local and international football matches and teams.",
      },
      {
        title: "Athletics",
        slug: "athletics",
        description: "Track and field events, marathons, and running news.",
      },
      {
        title: "Basketball",
        slug: "basketball",
        description: "Coverage of basketball leagues and tournaments.",
      },
    ],
  },
  {
    title: "Business",
    slug: "business",
    description: "Business news, market updates, and economic analysis.",
    subcategories: [
      {
        title: "Markets",
        slug: "markets",
        description: "Stock market updates and financial market analysis.",
      },
      {
        title: "Finance",
        slug: "finance",
        description: "Banking, personal finance, and economic news.",
      },
      {
        title: "Tech",
        slug: "tech",
        description: "Technology sector news and innovation updates.",
      },
    ],
  },
  // Add other categories as needed
];

// Mock articles data - in a real app, this would come from a CMS or API
const mockArticles = [
  {
    id: 1,
    title: "2023 Elections: What You Need to Know",
    slug: "2023-elections-what-you-need-to-know",
    excerpt:
      "Comprehensive guide to the upcoming elections, including candidates and key issues.",
    category: "Politics",
    subcategory: "Elections",
    author: "Jane Mwende",
    date: "September 20, 2023",
    readTime: "5 min read",
    image: "/elections-article.jpg",
  },
  {
    id: 2,
    title: "New Election Laws Passed by Parliament",
    slug: "new-election-laws-passed-by-parliament",
    excerpt:
      "Parliament approves new legislation affecting upcoming electoral processes.",
    category: "Politics",
    subcategory: "Elections",
    author: "David Ouma",
    date: "September 18, 2023",
    readTime: "4 min read",
    image: "/election-laws.jpg",
  },
  {
    id: 3,
    title: "Local Team Wins National Championship",
    slug: "local-team-wins-national-championship",
    excerpt: "Underdog team surprises everyone by taking the national title.",
    category: "Sports",
    subcategory: "Football",
    author: "Mike Okoth",
    date: "September 19, 2023",
    readTime: "3 min read",
    image: "/football-championship.jpg",
  },
  {
    id: 4,
    title: "Stock Market Reaches Record High",
    slug: "stock-market-record-high",
    excerpt:
      "Nairobi Securities Exchange hits all-time high amid economic recovery.",
    category: "Business",
    subcategory: "Markets",
    author: "Sarah Atieno",
    date: "September 17, 2023",
    readTime: "6 min read",
    image: "/stock-market.jpg",
  },
  // Add more articles as needed
];

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default function SubcategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = params;

  // Find the current category and subcategory
  const currentCategory = categories.find((cat) => cat.slug === categorySlug);
  const currentSubcategory = currentCategory?.subcategories.find(
    (sub) => sub.slug === subcategorySlug
  );

  // If category or subcategory not found, show 404
  if (!currentCategory || !currentSubcategory) {
    notFound();
  }

  // Filter articles for this subcategory
  const articles = mockArticles.filter(
    (article) =>
      generateSlug(article.category) === categorySlug &&
      generateSlug(article.subcategory) === subcategorySlug
  );

  // Get related subcategories (other subcategories in the same category)
  const relatedSubcategories = currentCategory.subcategories.filter(
    (sub) => sub.slug !== subcategorySlug
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-neutral-600 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${currentCategory.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {currentCategory.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{currentSubcategory.title}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6 -ml-3" asChild>
          <Link href={`/${currentCategory.slug}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {currentCategory.title}
          </Link>
        </Button>

        {/* Category Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {currentSubcategory.title}
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            {currentSubcategory.description}
          </p>
        </header>

        {/* Featured Article (if exists) */}
        {articles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Featured Story
            </h2>
            <div className="bg-neutral-50 rounded-xl overflow-hidden">
              <Link href={`/article/${articles[0].slug}`}>
                <div className="relative h-64 md:h-96">
                  <Image
                    src={articles[0].image}
                    alt={articles[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-blue-600 text-xs font-medium rounded-full">
                        {articles[0].category}
                      </span>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {articles[0].date}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {articles[0].readTime}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {articles[0].title}
                    </h2>
                    <p className="text-lg mb-4">{articles[0].excerpt}</p>
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm">{articles[0].author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Articles in this Subcategory */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Latest Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <article key={article.id} className="group">
                <Link href={`/article/${article.slug}`}>
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Related Subcategories */}
        {relatedSubcategories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              More in {currentCategory.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedSubcategories.map((subcategory) => (
                <Link
                  key={subcategory.slug}
                  href={`/${currentCategory.slug}/${subcategory.slug}`}
                  className="block p-6 border border-neutral-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900 hover:text-blue-600">
                    {subcategory.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {subcategory.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-neutral-600 mb-6">
              Get the latest news and updates about {currentSubcategory.title}{" "}
              delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

// Generate static params for all category/subcategory combinations
export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];

  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      params.push({
        category: category.slug,
        subcategory: subcategory.slug,
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = params;

  const currentCategory = categories.find((cat) => cat.slug === categorySlug);
  const currentSubcategory = currentCategory?.subcategories.find(
    (sub) => sub.slug === subcategorySlug
  );

  if (!currentCategory || !currentSubcategory) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: `${currentSubcategory.title} - ${currentCategory.title} | Kurunzi News`,
    description: currentSubcategory.description,
  };
}

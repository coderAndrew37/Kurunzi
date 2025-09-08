import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "../components/generateSlug";
import Sidebar from "../components/Sidebar";
import { Article } from "../components/types";

// Define types

// Dummy data for search results
const allArticles: Article[] = [
  {
    id: 1,
    title: "Rigathi Gachagua Announces New Development Projects",
    img: "https://images.unsplash.com/photo-1567792244551-b4dec4c7e57b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Politics",
    date: "5 hours ago",
    excerpt:
      "Deputy President Rigathi Gachagua has unveiled new development projects aimed at improving infrastructure in the Mount Kenya region.",
    readTime: 4,
    author: {
      name: "John Kamau",
      role: "Political Analyst",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80",
    },
    tags: ["Infrastructure", "Development", "Politics"],
    content:
      "<p>In a recent press conference, Deputy President Rigathi Gachagua announced a series of new development projects focused on enhancing infrastructure in the Mount Kenya region. The initiatives include road construction, water supply improvements, and educational facility upgrades.</p>",
  },
  {
    id: 2,
    title: "Gachagua Speaks on Unity in Mount Kenya Region",
    img: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Politics",
    date: "1 day ago",
    excerpt:
      "Deputy President Rigathi Gachagua has called for unity among leaders from the Mount Kenya region, emphasizing the importance of working together for development.",
    readTime: 5,
    author: {
      name: "Alice Wanjiku",
      role: "Senior Reporter",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    tags: ["Unity", "Leadership", "Mount Kenya"],
    content:
      "<p>In a recent speech, Deputy President Rigathi Gachagua urged leaders from the Mount Kenya region to set aside their differences and work collaboratively towards the region's development. He highlighted the need for unity in addressing common challenges and leveraging opportunities for growth.</p>",
  },

  {
    id: 3,
    title: "Economic Policies by Deputy President Gachagua",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Economy",
    date: "2 days ago",
    excerpt:
      "Deputy President Rigathi Gachagua outlines new economic policies aimed at stimulating growth in various sectors.",
    readTime: 6,
    author: {
      name: "David Mwangi",
      role: "Economics Correspondent",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80",
    },
    tags: ["Economy", "Policies", "Growth"],
    content:
      "<p>In a recent press conference, Deputy President Rigathi Gachagua unveiled a series of new economic policies designed to stimulate growth and promote development in various sectors.</p>",
  },
  {
    id: 4,
    title: "Gachagua Attends Agricultural Fair in Nyeri",
    img: "https://images.unsplash.com/photo-1625246335525-f887e4fe8250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Agriculture",
    date: "3 days ago",
    excerpt:
      "Deputy President Rigathi Gachagua participated in an agricultural fair, promoting modern farming techniques.",
    readTime: 3,
    author: {
      name: "Sarah Kimani",
      role: "Agriculture Correspondent",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    tags: ["Agriculture", "Farming", "Nyeri"],
    content:
      "<p>Deputy President Rigathi Gachagua recently attended an agricultural fair in Nyeri, where he engaged with farmers and promoted the adoption of modern farming techniques to enhance productivity and sustainability.</p>",
  },
  {
    id: 5,
    title: "Government's Plan for Youth Empowerment",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Youth",
    date: "4 days ago",
    excerpt:
      "Deputy President Rigathi Gachagua outlined the government's plan for youth empowerment and job creation.",
    readTime: 5,
    author: {
      name: "Michael Otieno",
      role: "Youth Affairs Correspondent",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    tags: ["Youth Empowerment", "Job Creation", "Government Policies"],
    content:
      "<p>During a recent address, Deputy President Rigathi Gachagua presented the government's comprehensive plan for youth empowerment, focusing on job creation, skills development, and entrepreneurship support. The initiative aims to tackle youth unemployment and foster economic participation among young people.</p>",
  },
  {
    id: 6,
    title: "Infrastructure Development in Central Kenya",
    img: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Development",
    date: "5 days ago",
    excerpt:
      "Deputy President Rigathi Gachagua commissioned new infrastructure projects in Central Kenya.",
    readTime: 4,
    author: {
      name: "Linda Njeri",
      role: "Field Reporter",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    tags: ["Infrastructure", "Central Kenya", "Development"],
    content:
      "<p>Deputy President Rigathi Gachagua recently commissioned several infrastructure projects in Central Kenya, including road expansions and public facility upgrades. These projects aim to enhance connectivity and improve the quality of life for residents in the region.</p>",
  },
];

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = searchParams;
  const searchQuery = q || "";

  // Filter articles based on search query
  const filteredArticles = searchQuery
    ? allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Search News"}
          </h1>
          <p className="text-neutral-600">
            {searchQuery
              ? `Found ${filteredArticles.length} result${
                  filteredArticles.length !== 1 ? "s" : ""
                }`
              : "Enter a search term to find news articles"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery ? (
              filteredArticles.length > 0 ? (
                <>
                  {/* Articles List */}
                  <div className="space-y-6">
                    {filteredArticles.map((article) => {
                      const slug = generateSlug(article.title);
                      return (
                        <div
                          key={article.id}
                          className="bg-white rounded-xl shadow-sm overflow-hidden group"
                        >
                          <Link href={`/article/${slug}`}>
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0">
                                <Image
                                  src={article.img}
                                  alt={article.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <span className="text-xs font-medium text-blue-700 mb-2 block">
                                  {article.category}
                                </span>
                                <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                                  {article.title}
                                </h3>
                                {article.excerpt && (
                                  <p className="text-neutral-600 text-sm mb-3">
                                    {article.excerpt}
                                  </p>
                                )}
                                <div className="flex items-center text-xs text-neutral-500">
                                  <span>{article.date}</span>
                                  <span className="mx-2">•</span>
                                  <span>{article.readTime} min read</span>
                                  {article.author && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>By {article.author.name}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {filteredArticles.length > 5 && (
                    <div className="flex justify-center mt-8">
                      <nav className="flex items-center space-x-2">
                        <button className="px-3 py-1 rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300">
                          Previous
                        </button>
                        <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                          1
                        </button>
                        <button className="px-3 py-1 rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300">
                          2
                        </button>
                        <button className="px-3 py-1 rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300">
                          3
                        </button>
                        <span className="px-2 text-neutral-500">...</span>
                        <button className="px-3 py-1 rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300">
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <svg
                    className="w-16 h-16 text-neutral-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Try different keywords or check out our popular articles
                  </p>
                  <Link
                    href="/trending-topics"
                    className="text-blue-600 hover:underline"
                  >
                    Browse trending topics
                  </Link>
                </div>
              )
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <svg
                  className="w-16 h-16 text-neutral-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Search for news articles
                </h3>
                <p className="text-neutral-600">
                  Enter a keyword in the search bar above to find relevant
                  articles
                </p>
              </div>
            )}
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
      </main>
    </div>
  );
}

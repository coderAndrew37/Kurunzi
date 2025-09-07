import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "../components/generateSlug";
import { Article, Topic } from "../components/types";

// Dummy data for trending topics
const trendingTopics: Topic[] = [
  {
    id: 1,
    name: "Artificial Intelligence",
    description: "Latest developments in AI and machine learning",
    articleCount: 247,
    trendDirection: "up",
    trendPercentage: 32,
  },
  {
    id: 2,
    name: "Climate Change",
    description: "Environmental news and climate action updates",
    articleCount: 189,
    trendDirection: "up",
    trendPercentage: 18,
  },
  {
    id: 3,
    name: "Cryptocurrency",
    description: "Digital currencies and blockchain technology",
    articleCount: 156,
    trendDirection: "down",
    trendPercentage: 12,
  },
  {
    id: 4,
    name: "Space Exploration",
    description: "News about space missions and discoveries",
    articleCount: 132,
    trendDirection: "up",
    trendPercentage: 25,
  },
  {
    id: 5,
    name: "Remote Work",
    description: "Trends and tools for working from anywhere",
    articleCount: 121,
    trendDirection: "neutral",
    trendPercentage: 5,
  },
  {
    id: 6,
    name: "Sustainable Energy",
    description: "Renewable energy and green technology",
    articleCount: 118,
    trendDirection: "up",
    trendPercentage: 22,
  },
];

// Dummy data for articles by topic
const articlesByTopic: Record<string, Article[]> = {
  "artificial-intelligence": [
    {
      id: 1,
      title:
        "New AI Model Can Generate Realistic Images from Text Descriptions",
      img: "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Technology",
      date: "3 hours ago",
      excerpt:
        "Breakthrough AI system creates photorealistic images from simple text prompts, raising both excitement and ethical concerns.",
      readTime: 6,
      author: {
        name: "Emma Roberts",
        role: "Tech Journalist",
        avatar: "https://randomuser.me/api/portrait/women/44.jpg",
      },
      content: "",
    },
    {
      id: 2,
      title:
        "AI Assistants Now Capable of Understanding Complex Human Emotions",
      img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Technology",
      date: "1 day ago",
      excerpt:
        "New emotional intelligence algorithms allow AI systems to respond more appropriately to human emotional states.",
      readTime: 5,
      author: { name: "David Smith", role: "Tech Analyst", avatar: "" },
      content: "",
    },
  ],
  "climate-change": [
    {
      id: 3,
      title: "Global Summit Addresses Climate Change Emergency",
      img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Environment",
      date: "2 hours ago",
      excerpt:
        "World leaders gather to discuss urgent action on climate change as temperatures continue to rise globally.",
      readTime: 8,
      author: { name: "Sarah Johnson", role: "Climate Reporter", avatar: "" },
      content: "",
    },
    {
      id: 4,
      title: "Record Ice Melt in Arctic Raises Alarm Among Scientists",
      img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Environment",
      date: "1 day ago",
      excerpt:
        "New satellite data shows accelerated ice melt in polar regions, exceeding previous predictions.",
      readTime: 7,
      author: {
        name: "Michael Lee",
        role: "Environmental Reporter",
        avatar: "",
      },
      content: "",
    },
  ],
  // More topics would be added here
};

// Popular articles across all topics
const popularArticles: Article[] = [
  {
    id: 5,
    title: "Stock Markets Reach All-Time High",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Finance",
    date: "1 day ago",
    excerpt:
      "Major indices surge as investor confidence grows amid positive economic indicators.",
    readTime: 4,
    author: { name: "John Doe", role: "Finance Editor", avatar: "" },
    content: "",
  },
  {
    id: 6,
    title: "New Breakthrough in Cancer Treatment Research",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Health",
    date: "3 hours ago",
    excerpt:
      "Scientists discover promising new approach that could significantly improve cancer treatment outcomes.",
    readTime: 8,
    author: {
      name: "Linda Martinez",
      role: "Health Correspondent",
      avatar: "",
    },
    content: "",
  },
];

export default function TrendingTopicsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Trending Topics
          </h1>
          <p className="text-neutral-600">
            Discover what people are talking about right now
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Topics List */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Currently Trending
              </h2>
              <div className="divide-y divide-neutral-200">
                {trendingTopics.map((topic) => {
                  const topicSlug = generateSlug(topic.name);
                  return (
                    <div key={topic.id} className="py-4 first:pt-0 last:pb-0">
                      <Link href={`/topic/${topicSlug}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-neutral-900 hover:text-blue-600">
                              #{topic.name}
                            </h3>
                            <p className="text-neutral-600 text-sm mt-1">
                              {topic.description}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-neutral-500">
                              <span>{topic.articleCount} articles</span>
                              <span className="mx-2">•</span>
                              <span
                                className={`flex items-center ${
                                  topic.trendDirection === "up"
                                    ? "text-green-600"
                                    : topic.trendDirection === "down"
                                    ? "text-red-600"
                                    : "text-neutral-600"
                                }`}
                              >
                                {topic.trendDirection === "up" ? (
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    />
                                  </svg>
                                ) : topic.trendDirection === "down" ? (
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                  </svg>
                                )}
                                {topic.trendPercentage}%
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <svg
                              className="w-5 h-5 text-neutral-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Topic with Articles */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                #Artificial Intelligence
              </h2>

              {/* Featured Article */}
              {articlesByTopic["artificial-intelligence"].length > 0 && (
                <div className="mb-8">
                  <Link
                    href={`/article/${generateSlug(
                      articlesByTopic["artificial-intelligence"][0].title
                    )}`}
                  >
                    <div className="relative w-full h-96 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={articlesByTopic["artificial-intelligence"][0].img}
                        alt={
                          articlesByTopic["artificial-intelligence"][0].title
                        }
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-blue-300 text-sm font-medium mb-2 block">
                          {
                            articlesByTopic["artificial-intelligence"][0]
                              .category
                          }
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {articlesByTopic["artificial-intelligence"][0].title}
                        </h3>
                        {articlesByTopic["artificial-intelligence"][0]
                          .excerpt && (
                          <p className="text-gray-200 text-sm line-clamp-2">
                            {
                              articlesByTopic["artificial-intelligence"][0]
                                .excerpt
                            }
                          </p>
                        )}
                        <div className="flex items-center mt-3 text-sm text-gray-300">
                          <span>
                            {articlesByTopic["artificial-intelligence"][0].date}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {
                              articlesByTopic["artificial-intelligence"][0]
                                .readTime
                            }{" "}
                            min read
                          </span>
                          {articlesByTopic["artificial-intelligence"][0]
                            .author && (
                            <>
                              <span className="mx-2">•</span>
                              <span>
                                By{" "}
                                {
                                  articlesByTopic["artificial-intelligence"][0]
                                    .author?.name
                                }
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {articlesByTopic["artificial-intelligence"]
                  .slice(1)
                  .map((article) => {
                    const slug = generateSlug(article.title);
                    return (
                      <div
                        key={article.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden group"
                      >
                        <Link href={`/article/${slug}`}>
                          <div className="relative w-full h-48">
                            <Image
                              src={article.img}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs font-medium text-blue-700 mb-2 block">
                              {article.category}
                            </span>
                            <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            {article.excerpt && (
                              <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                              </p>
                            )}
                            <div className="flex items-center text-xs text-neutral-500">
                              <span>{article.date}</span>
                              <span className="mx-2">•</span>
                              <span>{article.readTime} min read</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* View More Button */}
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-full transition-colors">
                Load more topics
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Popular Articles
              </h3>
              <div className="space-y-4">
                {popularArticles.map((article) => {
                  const slug = generateSlug(article.title);
                  return (
                    <Link key={article.id} href={`/article/${slug}`}>
                      <div className="group flex space-x-3">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={article.img}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-neutral-500">
                              {article.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Trending Topics Widget */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Rising Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.slice(0, 5).map((topic) => {
                  const topicSlug = generateSlug(topic.name);
                  return (
                    <Link key={topic.id} href={`/topic/${topicSlug}`}>
                      <div className="flex items-center justify-between py-2 group">
                        <div>
                          <h4 className="font-medium text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">
                            #{topic.name}
                          </h4>
                          <p className="text-xs text-neutral-500">
                            {topic.articleCount} articles
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            topic.trendDirection === "up"
                              ? "text-green-600"
                              : topic.trendDirection === "down"
                              ? "text-red-600"
                              : "text-neutral-600"
                          }`}
                        >
                          {topic.trendDirection === "up"
                            ? "↑"
                            : topic.trendDirection === "down"
                            ? "↓"
                            : "→"}{" "}
                          {topic.trendPercentage}%
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Stay informed
              </h3>
              <p className="text-neutral-600 mb-4">
                Get the latest trending topics delivered to your inbox
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Advertisement */}
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl border border-neutral-300 p-6 flex flex-col items-center justify-center text-neutral-500">
              <div className="text-sm font-medium mb-1">Advertisement</div>
              <div className="text-xs text-center mb-3">Ad Slot (300x250)</div>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                Hide this ad
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

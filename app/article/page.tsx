"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define types
interface Author {
  name: string;
  role?: string;
  avatar?: string;
}

interface Article {
  id: number;
  title: string;
  subtitle?: string;
  img: string;
  category: string;
  date: string;
  author: Author;
  content: string;
  tags?: string[];
  readTime: number;
}

interface RelatedArticle {
  id: number;
  title: string;
  img: string;
  category: string;
  date: string;
  readTime: number;
}

// Dummy data for our article
const articleData: Article = {
  id: 1,
  title: "Global Summit Addresses Climate Change Emergency",
  subtitle:
    "World leaders gather to discuss urgent action as temperatures continue to rise globally",
  img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  category: "World News",
  date: "October 15, 2023",
  author: {
    name: "Sarah Johnson",
    role: "Senior Environmental Correspondent",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  readTime: 8,
  tags: ["Climate", "Environment", "Politics", "Global Summit"],
  content: `
    <p>World leaders from across the globe gathered in Geneva this week for an emergency climate summit, as new data shows record-breaking temperatures and unprecedented ice melt in polar regions.</p>
    
    <p>The conference, which was moved up by six months due to concerning environmental reports, aims to establish more aggressive carbon reduction targets than those set in the Paris Agreement.</p>
    
    <h2>Urgent Action Needed</h2>
    
    <p>"We are at a critical juncture in human history," said UN Secretary-General in his opening address. "The decisions we make in the next few years will determine the livability of our planet for centuries to come."</p>
    
    <p>Scientific data presented at the summit showed that current commitments would still lead to a 2.7°C temperature rise by 2100, far above the 1.5°C target that scientists say is necessary to avoid the most catastrophic impacts.</p>
    
    <blockquote>
      "This is not about politics; this is about survival. We need immediate, drastic action from every nation."
      <span>- Dr. Elena Martinez, Climate Scientist</span>
    </blockquote>
    
    <h2>New Commitments</h2>
    
    <p>Several countries announced new commitments during the first day of proceedings:</p>
    
    <ul>
      <li>The European Union pledged to reduce emissions by 65% by 2030</li>
      <li>The United States committed to 100% clean electricity by 2035</li>
      <li>China announced it would peak emissions before 2025, five years earlier than previously planned</li>
      <li>India outlined ambitious solar energy expansion plans</li>
    </ul>
    
    <h2>Economic Implications</h2>
    
    <p>While some critics argue that aggressive climate action will harm economies, a report presented at the summit suggested the opposite. The analysis projected that transitioning to clean energy would create millions of jobs and ultimately save trillions in climate-related damages.</p>
    
    <p>"The cost of inaction far exceeds the cost of action," said economist Dr. James Chen, who led the study. "We're not just talking about environmental benefits; we're talking about economic stability and growth."</p>
    
    <p>The summit continues through Friday, with additional announcements expected from emerging economies and private sector leaders.</p>
  `,
};

const relatedArticles: RelatedArticle[] = [
  {
    id: 2,
    title: "Renewable Energy Investments Reach Record High",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Energy",
    date: "October 12, 2023",
    readTime: 5,
  },
  {
    id: 3,
    title: "How Cities Are Adapting to Climate Change",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Urban Planning",
    date: "October 10, 2023",
    readTime: 7,
  },
  {
    id: 4,
    title: "The Role of Oceans in Climate Regulation",
    img: "https://images.unsplash.com/photo-1530533718754-001d2668365a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Science",
    date: "October 8, 2023",
    readTime: 6,
  },
];

// Generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Article Page Component
export default function ArticlePage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-8 bg-white rounded-xl shadow-sm p-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-neutral-500 mb-6">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/category/world" className="hover:text-blue-600">
                World News
              </Link>
              <span className="mx-2">/</span>
              <span>Article</span>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {articleData.category}
                </span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="text-neutral-500 text-sm">
                  {articleData.date}
                </span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="text-neutral-500 text-sm">
                  {articleData.readTime} min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {articleData.title}
              </h1>

              {articleData.subtitle && (
                <p className="text-xl text-neutral-600 mb-6">
                  {articleData.subtitle}
                </p>
              )}

              <div className="flex items-center mb-6">
                {articleData.author.avatar && (
                  <Image
                    src={articleData.author.avatar}
                    alt={articleData.author.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-medium text-neutral-900">
                    {articleData.author.name}
                  </p>
                  {articleData.author.role && (
                    <p className="text-sm text-neutral-500">
                      {articleData.author.role}
                    </p>
                  )}
                </div>
              </div>
            </header>

            {/* Article Image */}
            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
              <Image
                src={articleData.img}
                alt={articleData.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: articleData.content }}
            />

            {/* Article Tags */}
            {articleData.tags && articleData.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {articleData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Actions */}
            <div className="flex items-center justify-between py-6 border-t border-neutral-200">
              <div className="flex space-x-4">
                <button
                  className="flex items-center text-neutral-600 hover:text-blue-600"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 24 24">
                      <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.757.429L12 18.03l-7.243 4.543A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  )}
                  <span className="ml-1">Save</span>
                </button>
                <button className="flex items-center text-neutral-600 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="ml-1">Share</span>
                </button>
                <button
                  className="flex items-center text-neutral-600 hover:text-blue-600"
                  onClick={() => setShowComments(!showComments)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="ml-1">Comments</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-neutral-600 hover:text-blue-600 rounded-full hover:bg-neutral-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="pt-6 border-t border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  Comments (12)
                </h3>
                <div className="space-y-4">
                  {/* Comment form */}
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-neutral-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.67 0 8.85 2.343 11.996 5.993zM16 10a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <form>
                        <textarea
                          className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder="Join the discussion..."
                        ></textarea>
                        <div className="mt-2 flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                          >
                            Post Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Sample comment */}
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-neutral-100 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-neutral-900">
                            Michael Chen
                          </h4>
                          <span className="text-xs text-neutral-500">
                            2 hours ago
                          </span>
                        </div>
                        <p className="text-neutral-700">
                          This is a critical issue that needs immediate
                          attention. I&#39;m glad world leaders are finally
                          taking it seriously.
                        </p>
                        <div className="mt-2 flex items-center space-x-3">
                          <button className="text-sm text-neutral-600 hover:text-blue-600">
                            Like
                          </button>
                          <button className="text-sm text-neutral-600 hover:text-blue-600">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Stay informed
              </h3>
              <p className="text-neutral-600 mb-4">
                Get the latest news delivered to your inbox
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

            {/* Related Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((article) => {
                  const slug = generateSlug(article.title);
                  return (
                    <Link key={article.id} href={`/article/${slug}`}>
                      <div className="group flex space-x-3">
                        <div className="relative w-20 h-16 flex-shrink-0 rounded-md overflow-hidden">
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
                            <span className="mx-2 text-neutral-400">•</span>
                            <span className="text-xs text-neutral-500">
                              {article.readTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Advertisement */}
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl border border-neutral-300 p-6 flex flex-col items-center justify-center text-neutral-500">
              <div className="text-sm font-medium mb-1">Advertisement</div>
              <div className="text-xs text-center mb-3">Ad Slot (300x600)</div>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                Hide this ad
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Climate Change",
                  "Technology",
                  "Economy",
                  "Health",
                  "Space",
                  "Sports",
                  "Entertainment",
                  "Education",
                ].map((topic, index) => (
                  <Link
                    key={index}
                    href={`/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

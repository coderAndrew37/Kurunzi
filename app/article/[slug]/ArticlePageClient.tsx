"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/app/components/types";

export default function ArticlePageClient({ article }: { article: Article }) {
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
              <Link
                href={`/category/${article.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-blue-600"
              >
                {article.category}
              </Link>
              <span className="mx-2">/</span>
              <span>{article.title}</span>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {article.category}
                </span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="text-neutral-500 text-sm">{article.date}</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="text-neutral-500 text-sm">
                  {article.readTime} min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-xl text-neutral-600 mb-6">
                  {article.subtitle}
                </p>
              )}

              {article.author && (
                <div className="flex items-center mb-6">
                  {typeof article.author !== "string" &&
                    article.author.avatar && (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-3"
                      />
                    )}
                  <div>
                    <p className="font-medium text-neutral-900">
                      {typeof article.author === "string"
                        ? article.author
                        : article.author.name}
                    </p>
                    {typeof article.author !== "string" &&
                      article.author.role && (
                        <p className="text-sm text-neutral-500">
                          {article.author.role}
                        </p>
                      )}
                  </div>
                </div>
              )}
            </header>

            {/* Article Image */}
            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
              <Image
                src={article.img}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string, index: number) => (
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

            {/* Actions */}
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
            </div>

            {/* Comments */}
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
          <Sidebar />
        </div>
      </main>
    </div>
  );
}

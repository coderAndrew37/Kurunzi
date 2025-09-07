import { Link } from "lucide-react";
import React from "react";
import { generateSlug } from "./generateSlug";
import { RelatedArticle } from "./types";
import Image from "next/image";

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

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;

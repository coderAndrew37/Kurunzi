"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { Story as Article } from "@/app/components/types";
import ArticleActions from "../_components/ArticleActions";
import CommentsSection from "../_components/ArticleCommentSection";
import ArticleContent from "../_components/ArticleContent";
import ArticleHeader from "../_components/ArticleHeader";
import ArticleImage from "../_components/ArticleImage";
import Breadcrumbs from "../_components/BreadCrumbs";
import TagsList from "../_components/TagList";

export default function ArticlePageClient({ article }: { article: Article }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-8 bg-white rounded-xl shadow-sm p-6">
            <Breadcrumbs article={article} />
            <ArticleHeader article={article} />
            <ArticleImage article={article} />
            <ArticleContent article={article} />
            <TagsList tags={article.tags} />
            <ArticleActions
              isBookmarked={isBookmarked}
              setIsBookmarked={setIsBookmarked}
              showComments={showComments}
              setShowComments={setShowComments}
            />
            {showComments && <CommentsSection />}
          </article>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>
    </div>
  );
}

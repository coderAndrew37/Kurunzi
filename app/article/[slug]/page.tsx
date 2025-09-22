import { sanityClient } from "@/app/lib/sanity.client";
import ArticlePageClient from "./ArticlePageClient";
import { Story } from "@/app/components/types";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";

// GROQ query for single article by slug
const query = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  publishedAt,
  excerpt,
  readTime,
  isVideo,
  duration,
  isFeatured,
  tags,
  author->{
    name,
    image
  },
  category->{
    _id,
    title,
    "slug": slug.current
  },
  image,
  content
}`;

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch article by slug
  const rawArticle = await sanityClient.fetch(query, { slug });

  if (!rawArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-600">
        Article not found
      </div>
    );
  }

  // Transform into Story type
  const article: Story = transformSanityArticleToStory(rawArticle);

  return <ArticlePageClient article={article} />;
}

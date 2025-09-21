import { groq } from "next-sanity";

// Fetch latest stories by category
export const categoryStoriesQuery = groq`
  *[_type == "article" && category == $category] | order(publishedAt desc)[0...20] {
    "_id": _id,
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    category,
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
    image,
    content
  }
`;

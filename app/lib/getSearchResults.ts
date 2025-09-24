import { groq } from "next-sanity";

export const searchArticlesQuery = groq`
  *[
    _type == "article" &&
    (
      title match $q ||
      subtitle match $q ||
      excerpt match $q ||
      tags[] match $q ||
      pt::text(body) match $q ||
      author->name match $q
    )
  ] | order(publishedAt desc)[0...20] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    "img": mainImage,
    excerpt,
    publishedAt,
    readTime,
    isVideo,
    duration,
    tags,
    author->{
      name,
      image
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    "subcategory": subcategory->{
      _id,
      title,
      "slug": slug.current
    },
    "topic": topic->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

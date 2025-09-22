import { groq } from "next-sanity";

// Fetch latest stories by category
export const categoryStoriesQuery = groq`
  *[_type == "article" && category->slug.current == $category] 
  | order(publishedAt desc)[0...20] {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    "img": image,
    "category": category->{
      title,
      "slug": slug.current
    },
    publishedAt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
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
    content
  }
`;

export const categoriesWithStoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    "stories": *[_type == "article" && references(^._id)] | order(publishedAt desc)[0...20] {
      "_id": _id,
      "id": _id,
      title,
      subtitle,
      "slug": slug.current,
      category->{
        _id,
        title,
        "slug": slug.current
      },
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
  }
`;

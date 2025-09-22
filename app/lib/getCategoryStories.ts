import { groq } from "next-sanity";

// Fetch all stories for a category
export const categoryStoriesQuery = groq`
  *[
    _type == "article" &&
    $category in categories[]->slug.current
  ] | order(publishedAt desc)[0...20] {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    "img": mainImage,
    "categories": categories[]->{
      title,
      "slug": slug.current
    },
    "subcategory": subcategory->{
      title,
      "slug": slug.current
    },
    "topic": topic->{
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
    body
  }
`;

// Fetch all categories with their stories
export const categoriesWithStoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "stories": *[_type == "article" && references(^._id)] 
      | order(publishedAt desc)[0...20] {
        "_id": _id,
        "id": _id,
        title,
        subtitle,
        "slug": slug.current,
        "img": image,
        category->{
          _id,
          title,
          "slug": slug.current
        },
        "subcategory": subcategory->{
          title,
          "slug": slug.current
        },
        "topic": topic->{
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
        content
    }
  }
`;

// Fetch latest stories by category + subcategory
export const subcategoryStoriesQuery = groq`
  *[
    _type == "article" && 
    category->slug.current == $category && 
    subcategory->slug.current == $subcategory
  ] | order(publishedAt desc)[0...20] {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    "img": image,
    "category": category->{
      title,
      "slug": slug.current
    },
    "subcategory": subcategory->{
      title,
      "slug": slug.current
    },
    "topic": topic->{
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

// Fetch latest stories by category + subcategory + topic
export const topicStoriesQuery = groq`
  *[
    _type == "article" &&
    category->slug.current == $category &&
    subcategory->slug.current == $subcategory &&
    topic->slug.current == $topic
  ] | order(publishedAt desc)[0...20] {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    "img": image,
    "category": category->{
      title,
      "slug": slug.current
    },
    "subcategory": subcategory->{
      title,
      "slug": slug.current
    },
    "topic": topic->{
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

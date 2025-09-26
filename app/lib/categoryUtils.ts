import { groq } from "next-sanity";
import { sanityClient } from "./sanity.client";
import {
  categoryStoriesQuery,
  categoryWithSubcategoriesQuery,
  subcategoryStoriesQuery,
  topicStoriesQuery,
} from "./getCategoryStories";

// Common queries

// Data fetching functions
export async function getCategoryData(slug: string) {
  return await sanityClient.fetch(categoryWithSubcategoriesQuery, { slug });
}

export async function getCategoryArticles(category: string) {
  return await sanityClient.fetch(categoryStoriesQuery, { category });
}

export async function getSubcategoryArticles(subcategory: string) {
  return await sanityClient.fetch(subcategoryStoriesQuery, { subcategory });
}

export async function getTopicArticles(topic: string) {
  return await sanityClient.fetch(topicStoriesQuery, { topic });
}

// ISR: Generate static params
export async function generateCategoryStaticParams() {
  const query = groq`*[_type == "category"]{ "category": slug.current }`;
  const categories = await sanityClient.fetch(query);
  return categories;
}

export async function generateSubcategoryStaticParams() {
  const query = groq`*[_type == "subcategory"]{ 
    "category": category->slug.current, 
    "subcategory": slug.current 
  }`;
  const subcategories = await sanityClient.fetch(query);
  return subcategories;
}

export async function generateTopicStaticParams() {
  const query = groq`*[_type == "topic"]{ 
    "category": category->slug.current, 
    "subcategory": subcategory->slug.current,
    "topic": slug.current
  }`;
  const topics = await sanityClient.fetch(query);
  return topics;
}

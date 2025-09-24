import { groq } from "next-sanity";
import { sanityClient } from "./sanity.client";

export async function getSearchSuggestions(query: string) {
  if (!query) return [];

  const searchQuery = groq`
    *[
      _type == "article" &&
      (
        title match $q ||
        subtitle match $q ||
        excerpt match $q ||
        $q in tags[] ||
        author->name match $q
      )
    ][0...8]{
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      tags
    }
  `;

  return await sanityClient.fetch(searchQuery, { q: `${query}*` });
}

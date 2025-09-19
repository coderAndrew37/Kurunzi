import { createClient } from "next-sanity";

// WHY: single place to configure the Sanity client used on server and client
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-06",
  useCdn: process.env.NODE_ENV === "production",
  // Optional: set SANITY_READ_TOKEN in env for preview/drafts on server-side only
  token: process.env.SANITY_READ_TOKEN || undefined,
});

import { sanityClient } from "./sanity.client";

export async function getNavigation() {
  console.log("Fetching navigation from Sanity...");

  const nav = await sanityClient.fetch(`
    *[_type == "navigation" && !(_id match "_.**")]{
      _id,
      title,
      href,
      isLive,
      subItems[]->{
        _id,
        title,
        href,
        isLive,
        subItems[]->{
          _id,
          title,
          href,
          isLive
        }
      }
    } | order(title asc)
  `);

  console.log("Received navigation from Sanity:", nav);
  return nav;
}

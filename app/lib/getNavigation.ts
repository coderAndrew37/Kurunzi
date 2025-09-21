import { NavItem } from "../types/navigation";
import { sanityClient } from "./sanity.client";

export async function getNavigation() {
  console.log("Fetching navigation from Sanity...");
  try {
    const nav = await sanityClient.fetch(`
      *[_type == "navigation"]{
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

    // Normalize the data - ensure subItems is always an array
    const normalizedNav: NavItem[] = nav.map(
      (item: {
        _id: string;
        title: string;
        href: string;
        isLive?: boolean;
        subItems?: {
          _id: string;
          title: string;
          href: string;
          isLive?: boolean;
        }[];
      }) => ({
        ...item,
        subItems: item.subItems || [],
        isLive: item.isLive || false,
      })
    );

    console.log("Received navigation from Sanity:", normalizedNav);
    return normalizedNav;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}

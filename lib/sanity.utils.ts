import { Author, Story } from "@/app/components/types";
import type { PortableTextBlock, PortableTextChild } from "sanity";
interface RawSanityArticle {
  _id: string;
  slug?: { current: string };
  title: string;
  subtitle?: string | null;
  mainImage?: { asset?: { url?: string } };
  categories?: { title?: string }[];
  publishedAt?: string | null;
  author?: Author | null;
  body?: PortableTextBlock[];
  tags?: string[];
  readTime?: number;
  excerpt?: string | null;
  isFeatured?: boolean;
  isVideo?: boolean;
  duration?: string | null;
}

// Convert Portable Text blocks → plain string
export function blockContentToPlainText(
  blocks: PortableTextBlock[] | undefined
): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children
          .map((child: PortableTextChild) =>
            "text" in child ? child.text : ""
          )
          .join("");
      }
      return "";
    })
    .join("\n\n");
}

// Estimate read time from blocks
export function estimateReadTimeFromBlocks(
  blocks: PortableTextBlock[] | undefined,
  wpm = 200
): number {
  const text = blockContentToPlainText(blocks);
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

// Transform raw Sanity article → our Story type
export function transformSanityArticleToStory(raw: RawSanityArticle): Story {
  return {
    id: raw._id,
    slug: raw.slug?.current ?? "",
    title: raw.title,
    subtitle: raw.subtitle ?? null,
    img: raw.mainImage?.asset?.url ?? "/placeholder-hero.jpg",
    category:
      raw.categories && raw.categories.length
        ? (raw.categories[0]?.title ?? "General")
        : "General",
    date: raw.publishedAt ?? null,
    author: raw.author ?? null,
    content: raw.body,
    tags: raw.tags ?? [],
    readTime: raw.readTime ?? estimateReadTimeFromBlocks(raw.body),
    excerpt: raw.excerpt ?? null,
    isFeatured: !!raw.isFeatured,
    isVideo: !!raw.isVideo,
    duration: raw.duration ?? null,
  };
}

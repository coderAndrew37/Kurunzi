import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { HeroItem, Story } from "../components/types";
import { sanityClient } from "./sanity.client";

interface HeroResponse {
  items: {
    article: HeroItem;
    overrideTitle?: string;
    customImage?: SanityImageSource;
  }[];
}

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (src: SanityImageSource) =>
  builder.image(src).width(1200).height(800).url();

export async function getHeroStories(): Promise<Story[]> {
  const data = await sanityClient.fetch<HeroResponse>(`
    *[_type == "hero"][0]{
      items[] {
        article->{
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
        },
        overrideTitle,
        customImage
      }
    }
  `);

  return (
    data?.items?.map((item) => ({
      id: item.article.id ?? item.article.id, // 🔑 ensure both align
      slug: item.article.slug,
      title: item.overrideTitle ?? item.article.title,
      subtitle: item.article.subtitle ?? null,
      img: item.customImage
        ? urlFor(item.customImage)
        : item.article.image
          ? urlFor(item.article.image)
          : null,
      category: item.article.category ?? null,
      date: item.article.publishedAt ?? null,
      author: item.article.author ?? null,
      content: item.article.content ?? null,
      tags: item.article.tags ?? [],
      readTime: item.article.readTime ?? null,
      excerpt: item.article.excerpt ?? null,
      isFeatured: item.article.isFeatured ?? false,
      isVideo: item.article.isVideo ?? false,
      duration: item.article.duration ?? null,
    })) ?? []
  );
}

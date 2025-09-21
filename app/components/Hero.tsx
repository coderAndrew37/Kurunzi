"use client";

import Image from "next/image";
import Link from "next/link";
import { Story } from "./types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Generate slug from title
const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

interface HeroProps {
  stories: Story[];
}

export default function Hero({ stories }: HeroProps) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] mb-8">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {stories.map((story) => {
            const slug = generateSlug(story.title);

            return (
              <CarouselItem key={story.id} className="relative w-full h-full">
                {/* Background Image */}
                <Image
                  src={typeof story.img === "string" ? story.img : ""}
                  alt={story.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-10 left-8 right-8 md:left-16 md:right-16 text-white">
                  {story.category && (
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3 inline-block">
                      {story.category}
                    </span>
                  )}

                  <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-4xl">
                    {story.title}
                  </h1>

                  {story.excerpt && (
                    <p className="text-lg text-gray-200 max-w-2xl mb-6 line-clamp-3">
                      {story.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/article/${slug}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    Read Full Story →
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="left-4 text-white" />
        <CarouselNext className="right-4 text-white" />
      </Carousel>
    </section>
  );
}

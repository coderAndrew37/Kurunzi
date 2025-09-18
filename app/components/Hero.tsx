"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Story } from "./types";

interface HeroSectionProps {
  stories: Story[];
}

export default function HeroSection({ stories }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  }, [stories.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => setCurrentIndex(index);

  useEffect(() => {
    if (!isPlaying || stories.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, stories.length]);

  if (!stories || stories.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-neutral-500">
        No stories available.
      </section>
    );
  }

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  if (!stories || stories.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-lg">
        <div
          className="relative w-full h-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={story.img ?? "/placeholder-hero.jpg"}
                alt={story.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <div className="mb-4 flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-600 text-xs font-medium rounded-full">
                    {story.category}
                  </span>
                  <span className="text-sm text-neutral-300">
                    {story.date ? new Date(story.date).toLocaleString() : ""}
                  </span>
                </div>

                <Link href={`/article/${story.slug ?? story.id}`}>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 hover:underline">
                    {story.title}
                  </h1>
                </Link>

                <p className="text-lg text-neutral-200 mb-4 max-w-2xl">
                  {story.excerpt}
                </p>

                <Link href={`/article/${story.slug ?? story.id}`}>
                  <Button className="bg-white text-neutral-900 hover:bg-neutral-100">
                    Read Full Story
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-neutral-800 border-b pb-2">
          Latest Stories
        </h2>

        {stories.slice(1, 4).map((story) => (
          <Link
            key={story.id}
            href={`/article/${story.slug ?? story.id}`}
            className="flex gap-4 p-3 rounded-lg group hover:bg-neutral-50 transition-colors"
          >
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={story.img ?? "/placeholder-hero.jpg"}
                alt={story.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-1 left-1">
                <span className="px-2 py-0.5 bg-blue-600 text-xs font-medium text-white rounded">
                  {story.category}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-900 group-hover:text-blue-600 line-clamp-3">
                {story.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {story.date ? new Date(story.date).toLocaleString() : ""}
              </p>
            </div>
          </Link>
        ))}

        <div className="mt-4 p-4 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg border border-neutral-300 flex flex-col items-center justify-center text-neutral-500">
          <div className="text-sm font-medium mb-2">Advertisement</div>
          <div className="w-full h-40 bg-neutral-300/50 rounded flex items-center justify-center">
            Ad Slot (300x250)
          </div>
          <div className="text-xs mt-2">Your ad here</div>
        </div>
      </div>
    </section>
  );
}

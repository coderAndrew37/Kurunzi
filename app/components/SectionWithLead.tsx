"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Story } from "./types";

interface SectionWithLeadProps {
  sectionTitle: string;
  leadStory: Story;
  stories: Story[];
}

// Generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Carousel component for the left column
function ImageCarousel({ stories }: { stories: Story[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stories.length]);

  const currentStory = stories[currentIndex];
  const slug = generateSlug(currentStory.title);

  return (
    <div className="relative h-full rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={currentStory.img}
          alt={currentStory.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {currentStory.isVideo && (
          <div className="absolute top-4 left-4 flex items-center">
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>VIDEO</span>
            </div>
            {currentStory.duration && (
              <span className="ml-2 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
                {currentStory.duration}
              </span>
            )}
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6">
          {currentStory.category && (
            <span className="text-blue-300 text-sm font-medium mb-2 block">
              {currentStory.category}
            </span>
          )}
          <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">
            {currentStory.title}
          </h2>
          {currentStory.excerpt && (
            <p className="text-gray-200 text-sm line-clamp-2">
              {currentStory.excerpt}
            </p>
          )}
          <Link
            href={`/article/${slug}`}
            className="inline-block mt-3 text-white text-sm font-medium hover:underline"
          >
            Read story →
          </Link>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {stories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Main news section component
export default function SectionWithLead({
  sectionTitle,
  stories,
}: SectionWithLeadProps) {
  // In a real app, you would receive these as props
  const showAd = true;
  const adPosition = 2;

  // Separate carousel, middle, and top stories
  const carouselStories = stories.filter((_, i) => i < 3);
  const middleStory = stories[3];
  const topStories = stories.filter((_, i) => i > 3 && i < 8);
  const gridStories = stories.filter((_, i) => i >= 8);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-neutral-50">
      {/* Section header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-neutral-300">
        <h2 className="text-2xl font-bold text-neutral-800">{sectionTitle}</h2>
        <div className="flex space-x-4">
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-600">
            Follow
          </button>
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-600">
            Share
          </button>
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-600">
            ...
          </button>
        </div>
      </div>

      {/* Three-column lead section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left column - Carousel */}
        <div className="lg:col-span-1 h-96">
          <ImageCarousel stories={carouselStories} />
        </div>

        {/* Middle column - Featured story */}
        <div className="lg:col-span-1">
          {middleStory && (
            <div className="group h-full flex flex-col">
              <Link href={`/article/${generateSlug(middleStory.title)}`}>
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={middleStory.img}
                    alt={middleStory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {middleStory.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-700 text-white text-xs font-medium rounded">
                        {middleStory.category}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {middleStory.title}
                </h3>
                {middleStory.excerpt && (
                  <p className="text-neutral-600 text-sm mb-2 line-clamp-3">
                    {middleStory.excerpt}
                  </p>
                )}
                {middleStory.date && (
                  <p className="text-xs text-neutral-500 mt-auto">
                    {middleStory.date}
                  </p>
                )}
              </Link>
            </div>
          )}
        </div>

        {/* Right column - Top stories */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-neutral-200 p-4">
          <h3 className="font-bold text-lg text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
            Top Stories
          </h3>
          <div className="space-y-4">
            {topStories.map((story) => {
              const slug = generateSlug(story.title);
              return (
                <div key={story.id} className="group flex gap-3">
                  <Link href={`/article/${slug}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={story.img}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                      {story.date && (
                        <p className="text-xs text-neutral-500 mt-1">
                          {story.date}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advertisement banner */}
      {showAd && (
        <div className="w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl border border-neutral-300 flex flex-col items-center justify-center text-neutral-500 mb-8">
          <div className="text-sm font-medium mb-1">Advertisement</div>
          <div className="text-xs text-center mb-3">Ad Slot (728x90)</div>
          <button className="text-xs text-blue-600 hover:text-blue-800">
            Hide this ad
          </button>
        </div>
      )}

      {/* News grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gridStories.map((story, idx) => {
          const slug = generateSlug(story.title);
          return (
            <div key={story.id} className="group">
              <Link href={`/article/${slug}`}>
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={story.img}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {story.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-700 text-white text-xs font-medium rounded">
                        {story.category}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {story.title}
                </h3>
                {story.excerpt && (
                  <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                    {story.excerpt}
                  </p>
                )}
                {story.date && (
                  <p className="text-xs text-neutral-500">{story.date}</p>
                )}
              </Link>

              {/* Inject Ad after specified position */}
              {showAd && idx === adPosition && (
                <div className="w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg border border-neutral-300 flex flex-col items-center justify-center text-neutral-500 mt-4">
                  <div className="text-sm font-medium mb-1">Advertisement</div>
                  <div className="text-xs">Ad Slot (300x250)</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load more button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-full transition-colors">
          Load more stories
        </button>
      </div>
    </div>
  );
}

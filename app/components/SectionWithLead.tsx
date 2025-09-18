"use client";
import Image from "next/image";
import Link from "next/link";
import { Story } from "./types";

interface SectionWithLeadProps {
  sectionTitle: string;
  stories: Story[];
  leadStory?: Story;
}

export default function SectionWithLead({
  sectionTitle,
  stories,
}: SectionWithLeadProps) {
  const carouselStories = stories.slice(0, 3);
  const middleStory = stories[3];
  const topStories = stories.slice(4, 8);
  const gridStories = stories.slice(8);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-neutral-50">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 h-96">
          {/* Simple carousel: show first story */}
          {carouselStories.length > 0 && (
            <div className="relative h-full rounded-xl overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={carouselStories[0].img ?? "/placeholder-1.jpg"}
                  alt={carouselStories[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  {carouselStories[0].category && (
                    <span className="text-blue-300 text-sm font-medium mb-2 block">
                      {carouselStories[0].category}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                    {carouselStories[0].title}
                  </h2>
                  {carouselStories[0].excerpt && (
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {carouselStories[0].excerpt}
                    </p>
                  )}
                  <Link
                    href={`/article/${carouselStories[0].slug ?? carouselStories[0].id}`}
                    className="inline-block mt-3 text-white text-sm font-medium hover:underline"
                  >
                    Read story →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {middleStory && (
            <div className="group h-full flex flex-col">
              <Link href={`/article/${middleStory.slug ?? middleStory.id}`}>
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={middleStory.img ?? "/placeholder-2.jpg"}
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
                    {new Date(middleStory.date).toLocaleString()}
                  </p>
                )}
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-white rounded-xl border border-neutral-200 p-4">
          <h3 className="font-bold text-lg text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
            Top Stories
          </h3>
          <div className="space-y-4">
            {topStories.map((story) => (
              <div key={story.id} className="group flex gap-3">
                <Link
                  href={`/article/${story.slug ?? story.id}`}
                  className="flex gap-3"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={story.img ?? "/placeholder-3.jpg"}
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
                        {new Date(story.date).toLocaleString()}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gridStories.map((story) => (
          <div key={story.id} className="group">
            <Link href={`/article/${story.slug ?? story.id}`}>
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={story.img ?? "/placeholder-4.jpg"}
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
                <p className="text-xs text-neutral-500">
                  {new Date(story.date).toLocaleString()}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-full transition-colors">
          Load more stories
        </button>
      </div>
    </div>
  );
}

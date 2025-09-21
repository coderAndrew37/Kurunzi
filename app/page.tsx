// app/page.tsx
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import Hero from "./components/Hero";
import { getHeroStories } from "@/app/lib/getHeroStories"; // ✅ add
import { sanityClient as client } from "@/app/lib/sanity.client";
import { frontPageArticlesQuery as articlesQuery } from "@/app/lib/sanity.queries";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { Story } from "./components/types";

// --- Page ---
export default async function Home() {
  // 1. Fetch hero stories
  const heroStories: Story[] = await getHeroStories();

  // 2. Fetch other articles
  const data = await client.fetch(articlesQuery);
  const stories: Story[] = (data || []).map(transformSanityArticleToStory);

  return (
    <div className="flex flex-col">
      {/* Breaking News Bar */}
      <BreakingNewsTicker />

      {/* Hero Section */}
      {/* Hero Section */}
      {heroStories.length > 0 && <Hero stories={heroStories} />}

      {/* Example other sections */}
      {/* You can later add heroStories.slice(1,3) into a carousel/grid */}

      {/* Sidebar + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Sections go here */}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* Trending */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 border-b pb-2">Trending</h2>
            <ul className="space-y-2">
              {stories.slice(0, 5).map((story) => (
                <li
                  key={story.id}
                  className="text-sm hover:underline cursor-pointer"
                >
                  {story.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Ads */}
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            Sidebar Ad (300x600)
          </div>
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            Sidebar Ad (300x600)
          </div>
        </aside>
      </div>
    </div>
  );
}

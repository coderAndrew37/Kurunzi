// app/page.tsx
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import HeroSection from "./components/Hero";
import SectionWithLead from "./components/SectionWithLead";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { Story } from "./components/types";
import { sanityClient as client } from "@/app/lib/sanity.client";
import { frontPageArticlesQuery as articlesQuery } from "@/app/lib/sanity.queries";
// --- Page ---
export default async function Home() {
  // 1. Fetch from Sanity
  const data = await client.fetch(articlesQuery);

  // 2. Transform into Story[]
  const stories: Story[] = (data || []).map(transformSanityArticleToStory);

  return (
    <div className="flex flex-col">
      {/* Breaking News Bar */}
      <BreakingNewsTicker />

      {/* Hero Section */}
      <HeroSection stories={stories} />

      {/* Example other sections */}
      <SectionWithLead
        sectionTitle="Politics"
        leadStory={stories[0]} // 👈 pull from Sanity instead of hardcoding
        stories={stories.slice(1, 5)}
      />

      <SectionWithLead
        sectionTitle="Business"
        leadStory={stories[5]}
        stories={stories.slice(6, 10)}
      />

      {/* Sidebar + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Culture, Sports, Lifestyle, etc. can go here */}
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

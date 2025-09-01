// app/page.tsx
import HeroSection from "./components/Hero";
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import SectionWithLead from "./components/SectionWithLead";

// --- Data ---
const politicsLead = {
  id: 0,
  title: "President unveils new economic plan",
  href: "#",
  img: "/images/politics-lead.jpg",
  summary: "A bold roadmap aimed at job creation and tackling inflation.",
};

const politicsStories = [
  {
    id: 1,
    title: "Parliament passes new budget bill",
    href: "#",
    img: "/images/politics1.jpg",
  },
  {
    id: 2,
    title: "Opposition leader calls for reforms",
    href: "#",
    img: "/images/politics2.jpg",
  },
  {
    id: 3,
    title: "Election watchdog releases new report",
    href: "#",
    img: "/images/politics3.jpg",
  },
];

const businessLead = {
  id: 0,
  title: "Tech industry faces global supply chain crisis",
  href: "#",
  img: "/images/business-lead.jpg",
  summary: "Experts warn disruptions could last for years, impacting growth.",
};

const businessStories = [
  {
    id: 1,
    title: "Tech startups raise record funding",
    href: "#",
    img: "/images/business1.jpg",
  },
  {
    id: 2,
    title: "Central Bank cuts interest rates",
    href: "#",
    img: "/images/business2.jpg",
  },
  {
    id: 3,
    title: "Local currency strengthens against dollar",
    href: "#",
    img: "/images/business3.jpg",
  },
];

const trendingStories = [
  "Global markets tumble after Fed announcement",
  "Star striker transfers to rival club",
  "Tech giant unveils new smartphone",
  "Floods displace thousands in coastal region",
];

// --- Page ---
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Breaking News Bar */}
      <BreakingNewsTicker />

      {/* Hero Section */}
      <HeroSection />

      {/* Politics Section */}
      <SectionWithLead
        sectionTitle="Politics"
        leadStory={politicsLead}
        stories={politicsStories}
      />

      {/* Business Section */}
      <SectionWithLead
        sectionTitle="Business"
        leadStory={businessLead}
        stories={businessStories}
      />

      {/* Sidebar + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Main (can hold more sections in future) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* You could drop in Culture, Sports, Lifestyle, etc. here */}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* Trending */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 border-b pb-2">Trending</h2>
            <ul className="space-y-2">
              {trendingStories.map((story, i) => (
                <li key={i} className="text-sm hover:underline cursor-pointer">
                  {story}
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

import Image from "next/image";
import Link from "next/link";

// Static placeholder data
const stories = {
  featured: {
    id: 1,
    title: "Kenya’s Economy Shows Signs of Recovery Amid Inflation Struggles",
    href: "/article/kenya-economy-recovery",
    img: "/placeholder-hero.jpg",
    summary:
      "Analysts warn that despite improvements, inflation and global shocks remain a risk to growth.",
  },
  secondary: [
    {
      id: 2,
      title: "Political Tensions Rise Ahead of By-Elections",
      href: "/article/politics-tensions",
      img: "/placeholder-1.jpg",
    },
    {
      id: 3,
      title: "Investigative Report: Corruption in Public Sector Procurement",
      href: "/article/investigations-corruption",
      img: "/placeholder-2.jpg",
    },
    {
      id: 4,
      title: "Sports Roundup: Harambee Stars Secure Crucial Victory",
      href: "/article/sports-roundup",
      img: "/placeholder-3.jpg",
    },
  ],
};

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Featured Story */}
      <div className="lg:col-span-2 relative">
        <Link href={stories.featured.href} target="_blank">
          <div className="relative w-full h-[400px]">
            <Image
              src={stories.featured.img}
              alt={stories.featured.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold leading-snug">
            {stories.featured.title}
          </h1>
          <p className="mt-2 text-gray-600">{stories.featured.summary}</p>
        </Link>
      </div>

      {/* Secondary Stories + Ad Slot */}
      <div className="flex flex-col gap-4">
        {stories.secondary.map((story) => (
          <Link
            key={story.id}
            href={story.href}
            target="_blank"
            className="flex gap-3 items-center group"
          >
            <div className="relative w-24 h-20 flex-shrink-0">
              <Image
                src={story.img}
                alt={story.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="font-medium group-hover:underline">{story.title}</p>
          </Link>
        ))}

        {/* Ad Slot Placeholder */}
        <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          Ad Slot (300x250)
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

interface Story {
  id: number;
  title: string;
  img: string;
  category?: string;
  date?: string;
  excerpt?: string;
}

interface NewsSectionProps {
  title: string;
  stories: Story[];
  showAd?: boolean;
  adPosition?: number;
}

// Function to generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export default function NewsSection({
  title,
  stories,
  showAd = true,
  adPosition = 1,
}: NewsSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, idx) => {
          // Generate slug from title
          const slug = generateSlug(story.title);

          return (
            <div key={story.id} className="group">
              {/* Use the auto-generated slug to create the article URL */}
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
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                        {story.category}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
    </section>
  );
}

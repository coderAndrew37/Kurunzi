import Image from "next/image";
import Link from "next/link";

interface Story {
  id: number;
  title: string;
  href: string;
  img: string;
}

interface NewsSectionProps {
  title: string;
  stories: Story[];
}

export default function NewsSection({ title, stories }: NewsSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div key={story.id}>
            <Link href={story.href} target="_blank">
              <div className="relative w-full h-48">
                <Image
                  src={story.img}
                  alt={story.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h3 className="mt-2 font-semibold hover:underline">
                {story.title}
              </h3>
            </Link>

            {/* Inject Ad after 2nd story */}
            {idx === 1 && (
              <div className="w-full h-28 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mt-4">
                Ad Slot (728x90)
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

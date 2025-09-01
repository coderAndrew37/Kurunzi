import Image from "next/image";
import Link from "next/link";
import NewsSection from "./NewsSection";

interface Story {
  id: number;
  title: string;
  img: string;
  category?: string;
  date?: string;
  excerpt?: string;
  summary?: string;
}

interface Props {
  sectionTitle: string;
  leadStory: Story;
  stories: Story[];
}

// Function to generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export default function SectionWithLead({
  sectionTitle,
  leadStory,
  stories,
}: Props) {
  // Generate slug for the lead story
  const leadSlug = generateSlug(leadStory.title);

  return (
    <section className="w-full">
      {/* Lead fullscreen story */}
      <div className="relative w-full h-screen">
        <Image
          src={leadStory.img}
          alt={leadStory.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 lg:p-16">
          <span className="uppercase text-sm text-gray-300 tracking-wide mb-2">
            {sectionTitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
            {leadStory.title}
          </h2>
          {leadStory.summary && (
            <p className="mt-4 text-lg text-gray-200 max-w-2xl">
              {leadStory.summary}
            </p>
          )}
          <Link
            href={`/article/${leadSlug}`}
            className="mt-6 inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Supporting grid (re-using your NewsSection) */}
      <NewsSection title={sectionTitle} stories={stories} />
    </section>
  );
}

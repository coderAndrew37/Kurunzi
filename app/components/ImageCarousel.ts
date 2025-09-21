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
          src={typeof currentStory.img === "string" ? currentStory.img : null}
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
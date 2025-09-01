"use client";
import { useEffect, useState, useRef } from "react";

const placeholderHeadlines = [
  "Breaking: President announces new economic reforms",
  "Weather Alert: Heavy rains expected this weekend",
  "Global Markets: Oil prices hit 6-month high",
  "Health: New malaria vaccine shows promising results",
  "Sports: National team qualifies for continental championship",
  "Technology: Local startup secures $10M in funding",
];

export default function BreakingNewsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || !tickerRef.current) return;

    const ticker = tickerRef.current;
    const contentWidth = ticker.scrollWidth / 2; // Since we duplicated content
    const animationDuration = contentWidth / 50; // Adjust speed based on content length

    // Reset position when animation ends
    const handleAnimationIteration = () => {
      ticker.style.transition = "none";
      ticker.style.transform = "translateX(0)";
      // Force reflow
      ticker.offsetHeight; // eslint-disable-line no-unused-expressions
      ticker.style.transition = `transform ${animationDuration}s linear infinite`;
    };

    ticker.style.transition = `transform ${animationDuration}s linear infinite`;
    ticker.style.transform = `translateX(-${contentWidth}px)`;

    ticker.addEventListener("transitioniteration", handleAnimationIteration);

    return () => {
      ticker.removeEventListener(
        "transitioniteration",
        handleAnimationIteration
      );
    };
  }, [isPaused]);

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 overflow-hidden relative shadow-md">
      <div className="container mx-auto px-4 flex items-center">
        {/* Breaking News Label */}
        <div className="flex-shrink-0 bg-white text-red-700 font-bold text-xs uppercase tracking-wider py-1 px-3 rounded mr-4 flex items-center">
          <span className="h-2 w-2 bg-red-700 rounded-full mr-2 animate-pulse"></span>
          Breaking
        </div>

        {/* Ticker Container */}
        <div
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={tickerRef}
            className="flex whitespace-nowrap"
            style={{
              transform: isPaused ? "translateX(0)" : "",
              transition: isPaused ? "none" : "",
            }}
          >
            {/* Duplicate content for seamless looping */}
            {[...placeholderHeadlines, ...placeholderHeadlines].map(
              (headline, index) => (
                <div key={index} className="inline-flex items-center mr-8">
                  <span className="text-sm font-medium">{headline}</span>
                  {index < placeholderHeadlines.length * 2 - 1 && (
                    <span className="mx-4 text-white/40">•</span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Gradient fade effects on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-red-600 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-red-600 to-transparent pointer-events-none"></div>
    </div>
  );
}

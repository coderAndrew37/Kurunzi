"use client";
import { useState } from "react";

type Headline = {
  text: string;
  href: string;
};

interface BreakingNewsTickerProps {
  headlines?: Headline[];
}

const defaultHeadlines: Headline[] = [
  { text: "Breaking: President announces new economic reforms", href: "#" },
  { text: "Weather Alert: Heavy rains expected this weekend", href: "#" },
  { text: "Global Markets: Oil prices hit 6-month high", href: "#" },
  { text: "Health: New malaria vaccine shows promising results", href: "#" },
  {
    text: "Sports: National team qualifies for continental championship",
    href: "#",
  },
  { text: "Technology: Local startup secures $10M in funding", href: "#" },
];

export default function BreakingNewsTicker({
  headlines = defaultHeadlines,
}: BreakingNewsTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 overflow-hidden relative shadow-md">
      <div className="container mx-auto px-4 flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 bg-white text-red-700 font-bold text-xs uppercase tracking-wider py-1 px-3 rounded mr-4 flex items-center">
          <span className="h-2 w-2 bg-red-700 rounded-full mr-2 animate-pulse"></span>
          Breaking
        </div>

        {/* Ticker */}
        <div
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex whitespace-nowrap animate-marquee ${
              isPaused ? "pause" : ""
            }`}
          >
            {[...headlines, ...headlines].map((headline, index) => (
              <div key={index} className="inline-flex items-center mr-8">
                <a
                  href={headline.href}
                  className="text-sm font-medium hover:underline"
                >
                  {headline.text}
                </a>
                {index < headlines.length * 2 - 1 && (
                  <span className="mx-4 text-white/40">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-red-600 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-red-600 to-transparent pointer-events-none"></div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

const placeholderHeadlines = [
  "Breaking: President announces new economic reforms",
  "Weather Alert: Heavy rains expected this weekend",
  "Global Markets: Oil prices hit 6-month high",
  "Health: New malaria vaccine shows promising results",
];

export default function BreakingNewsTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholderHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-red-600 text-white py-2 px-4 overflow-hidden">
      <div className="animate-slide whitespace-nowrap font-semibold">
        {placeholderHeadlines[index]}
      </div>
    </div>
  );
}

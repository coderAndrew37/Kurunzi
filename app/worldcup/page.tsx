// app/fifa-world-cup-2026/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Play,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FIFAWorldCup2026() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for teams
  const qualifiedTeams = [
    { name: "Canada", flag: "/flags/canada.svg", fifaRank: 40 },
    { name: "Mexico", flag: "/flags/mexico.svg", fifaRank: 15 },
    { name: "USA", flag: "/flags/usa.svg", fifaRank: 13 },
    { name: "Brazil", flag: "/flags/brazil.svg", fifaRank: 3 },
    { name: "Argentina", flag: "/flags/argentina.svg", fifaRank: 1 },
    { name: "France", flag: "/flags/france.svg", fifaRank: 2 },
    { name: "England", flag: "/flags/england.svg", fifaRank: 4 },
    { name: "Germany", flag: "/flags/germany.svg", fifaRank: 16 },
  ];

  // Mock data for host cities
  const hostCities = [
    {
      name: "Vancouver",
      country: "Canada",
      stadium: "BC Place",
      capacity: "54,500",
    },
    {
      name: "Toronto",
      country: "Canada",
      stadium: "BMO Field",
      capacity: "45,500",
    },
    {
      name: "Mexico City",
      country: "Mexico",
      stadium: "Estadio Azteca",
      capacity: "87,523",
    },
    {
      name: "Guadalajara",
      country: "Mexico",
      stadium: "Estadio Akron",
      capacity: "49,850",
    },
    {
      name: "Monterrey",
      country: "Mexico",
      stadium: "Estadio BBVA",
      capacity: "53,500",
    },
    {
      name: "Los Angeles",
      country: "USA",
      stadium: "SoFi Stadium",
      capacity: "70,240",
    },
    {
      name: "New York",
      country: "USA",
      stadium: "MetLife Stadium",
      capacity: "82,500",
    },
    {
      name: "Dallas",
      country: "USA",
      stadium: "AT&T Stadium",
      capacity: "80,000",
    },
    {
      name: "Kansas City",
      country: "USA",
      stadium: "Arrowhead Stadium",
      capacity: "76,416",
    },
    {
      name: "Houston",
      country: "USA",
      stadium: "NRG Stadium",
      capacity: "72,220",
    },
    {
      name: "Atlanta",
      country: "USA",
      stadium: "Mercedes-Benz Stadium",
      capacity: "71,000",
    },
    {
      name: "Philadelphia",
      country: "USA",
      stadium: "Lincoln Financial Field",
      capacity: "69,796",
    },
    {
      name: "Seattle",
      country: "USA",
      stadium: "Lumen Field",
      capacity: "69,000",
    },
    {
      name: "San Francisco",
      country: "USA",
      stadium: "Levi's Stadium",
      capacity: "68,500",
    },
    {
      name: "Boston",
      country: "USA",
      stadium: "Gillette Stadium",
      capacity: "65,878",
    },
    {
      name: "Miami",
      country: "USA",
      stadium: "Hard Rock Stadium",
      capacity: "64,767",
    },
  ];

  // Mock data for matches
  const upcomingMatches = [
    {
      date: "June 11, 2026",
      time: "20:00",
      team1: "Canada",
      team2: "Mexico",
      venue: "Estadio Azteca",
    },
    {
      date: "June 12, 2026",
      time: "17:00",
      team1: "USA",
      team2: "England",
      venue: "MetLife Stadium",
    },
    {
      date: "June 13, 2026",
      time: "14:00",
      team1: "Argentina",
      team2: "France",
      venue: "SoFi Stadium",
    },
    {
      date: "June 14, 2026",
      time: "19:30",
      team1: "Brazil",
      team2: "Germany",
      venue: "AT&T Stadium",
    },
  ];

  // Countdown to World Cup
  const worldCupStartDate = new Date("June 11, 2026 00:00:00");
  const today = new Date();
  const daysUntil = Math.floor(
    (worldCupStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            Kurunzi News
          </span>
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link href="/sports" className="hover:text-blue-300">
            Sports
          </Link>
          <Link href="/sports/football" className="hover:text-blue-300">
            Football
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Image
              src="/fifa-world-cup-2026-logo.png"
              alt="2026 FIFA World Cup Logo"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            2026 FIFA World Cup
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Canada • Mexico • United States
          </p>

          {/* Countdown */}
          <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Countdown to Kickoff
            </h2>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{daysUntil}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {Math.floor((daysUntil % 365) / 30)}
                </div>
                <div className="text-sm">Months</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {Math.floor(daysUntil / 365)}
                </div>
                <div className="text-sm">Years</div>
              </div>
            </div>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
            <Play className="mr-2 h-5 w-5" /> Watch Highlights
          </Button>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto space-x-2 pb-4 mb-8">
          {["overview", "teams", "schedule", "cities", "news", "stats"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-blue-900 font-semibold"
                    : "bg-blue-800/50 text-white hover:bg-blue-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                Tournament Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Trophy className="mr-2 h-6 w-6 text-yellow-400" />{" "}
                    Tournament Facts
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      <span className="font-semibold">Dates:</span> June 11 -
                      July 19, 2026
                    </li>
                    <li className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      <span className="font-semibold">Teams:</span> 48 (expanded
                      from 32)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      <span className="font-semibold">Host Cities:</span> 16
                      cities across 3 countries
                    </li>
                    <li className="flex items-center">
                      <Star className="mr-2 h-5 w-5 text-yellow-400" />
                      <span className="font-semibold">
                        Defending Champions:
                      </span>{" "}
                      Argentina
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Historic First</h3>
                  <p className="mb-4">
                    The 2026 FIFA World Cup will be the first to feature 48
                    teams and the first to be hosted by three countries. This
                    expansion allows more nations to participate in the
                    world&#39;s most-watched sporting event.
                  </p>
                  <p>
                    The tournament will be spread across 16 cities in Canada,
                    Mexico, and the United States, with the final scheduled to
                    be played at MetLife Stadium in New Jersey.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "teams" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Qualified Teams</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {qualifiedTeams.map((team, index) => (
                  <div
                    key={index}
                    className="bg-blue-800/50 rounded-lg p-4 text-center"
                  >
                    <div className="h-16 w-16 mx-auto mb-2 bg-white rounded-full p-2">
                      <Image
                        src={team.flag}
                        alt={team.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-sm text-blue-200">
                      FIFA Rank: {team.fifaRank}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-blue-200">
                  More teams will qualify through regional competitions
                </p>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Upcoming Matches</h2>
              <div className="space-y-4">
                {upcomingMatches.map((match, index) => (
                  <div key={index} className="bg-blue-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-200">{match.date}</span>
                      <span className="flex items-center text-blue-200">
                        <Clock className="h-4 w-4 mr-1" /> {match.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="font-semibold">{match.team1}</div>
                      </div>
                      <div className="text-center mx-4">
                        <div className="text-lg font-bold">VS</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{match.team2}</div>
                      </div>
                    </div>
                    <div className="text-center mt-2 text-blue-200">
                      <MapPin className="h-4 w-4 inline mr-1" /> {match.venue}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Full Schedule <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {activeTab === "cities" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Host Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hostCities.map((city, index) => (
                  <div key={index} className="bg-blue-800/50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">{city.name}</h3>
                    <p className="text-blue-200 mb-2">{city.country}</p>
                    <div className="text-sm">
                      <p className="font-medium">{city.stadium}</p>
                      <p>Capacity: {city.capacity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "news" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">World Cup News</h2>
              <div className="space-y-4">
                <div className="bg-blue-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">
                    Stadium Preparations On Track
                  </h3>
                  <p className="text-blue-200 mb-2">September 20, 2023</p>
                  <p>
                    All host cities report stadium renovations and construction
                    are proceeding according to schedule for the 2026 World Cup.
                  </p>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">
                    Ticket Sales Announcement Coming Soon
                  </h3>
                  <p className="text-blue-200 mb-2">September 15, 2023</p>
                  <p>
                    FIFA to announce ticket sale phases and procedures in the
                    coming months for the expanded tournament.
                  </p>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">
                    Qualification Format Finalized
                  </h3>
                  <p className="text-blue-200 mb-2">September 10, 2023</p>
                  <p>
                    FIFA confirms qualification process for the 48-team World
                    Cup with expanded slots for several regions.
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View All News <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                Tournament Statistics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4">
                    Historical Records
                  </h3>
                  <ul className="space-y-2">
                    <li>Most Wins: Brazil (5 titles)</li>
                    <li>Most Appearances: Brazil (22 tournaments)</li>
                    <li>Top Scorer: Miroslav Klose (16 goals)</li>
                    <li>Most Matches: Lothar Matthäus (25 games)</li>
                  </ul>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4">
                    2026 Projections
                  </h3>
                  <ul className="space-y-2">
                    <li>Total Matches: 80</li>
                    <li>Expected Visitors: 5+ million</li>
                    <li>Global Audience: 5+ billion</li>
                    <li>Economic Impact: $5+ billion</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Never Miss a Moment
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Sign up for our World Cup 2026 newsletter to receive updates, ticket
            information, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-blue-300 bg-blue-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 border-t border-blue-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-blue-300">
              Official FIFA World Cup 2026 Coverage
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-blue-300 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-blue-300 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-blue-300 hover:text-white text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-blue-200 text-sm">
            © 2023 Kurunzi News. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

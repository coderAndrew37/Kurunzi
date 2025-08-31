"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About Kurunzi</h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            Kurunzi News is your trusted source for independent reporting,
            in-depth investigations, and analysis on politics, business, sports,
            and more.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/top-stories" target="_blank">
                Top Stories
              </Link>
            </li>
            <li>
              <Link href="/politics" target="_blank">
                Politics
              </Link>
            </li>
            <li>
              <Link href="/investigations" target="_blank">
                Investigations
              </Link>
            </li>
            <li>
              <Link href="/business" target="_blank">
                Business
              </Link>
            </li>
            <li>
              <Link href="/features" target="_blank">
                Features
              </Link>
            </li>
            <li>
              <Link href="/sports" target="_blank">
                Sports
              </Link>
            </li>
            <li>
              <Link href="/opinion" target="_blank">
                Opinion
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" target="_blank">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" target="_blank">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/advertise" target="_blank">
                Advertise
              </Link>
            </li>
            <li>
              <Link href="/privacy" target="_blank">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" target="_blank">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-neutral-400 mb-3">
            Subscribe to receive the latest news directly in your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-neutral-800 text-neutral-200 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded-r-md hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Kurunzi News. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="h-5 w-5 hover:text-accent" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="h-5 w-5 hover:text-accent" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="h-5 w-5 hover:text-accent" />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Youtube className="h-5 w-5 hover:text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  { title: "Square Paperback Book Cover Mockup for Indie Author Branding" },
  { title: "Square Paperback Book Cover Mockup Angled View" },
  { title: "Realistic Open Book Page Mockup with Hard Cover for Presentations" },
  { title: "Open Book Page Mockup with Hard Cover" },
  { title: "Top View of Open Book Mockup Generator for Publications" },
  { title: "Book Table Mockup with Bookshelf Background" },
  { title: "Book Cover Mockup on Top of Table in a Modern Home" },
  { title: "Hardcover Book Mockup on Wooden Surface" },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const visibleItems = 5;
  const maxIndex = Math.max(0, carouselItems.length - visibleItems);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + itemsPerPage));
  };

  const translateX = -(currentIndex * (100 / visibleItems));

  return (
    <div className="w-full bg-gray-50 border-y border-gray-200 py-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">More like this</h2>
          <button className="px-4 py-2 bg-brand hover:bg-brand-dark text-white font-medium text-sm rounded-lg transition-colors">
            Browse all mockups
          </button>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-[3/4] relative bg-gray-100">
                    <Image
                      src="/templates/book5.jpg"
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

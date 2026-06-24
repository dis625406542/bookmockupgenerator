"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-14 gap-8">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <Image src="/logo.png" alt="MyMockupBook" width={36} height={36} className="block" />
          <span className="text-[1.1rem] font-bold text-gray-900">MyMockupBook</span>
        </Link>

        {/* 中间导航 */}
        <nav className="hidden lg:flex items-center gap-7 mx-auto">
          <Link href="/" className="no-underline text-gray-700 font-medium text-sm hover:text-blue-500 transition-colors whitespace-nowrap">
            Generator
          </Link>
          <Link href="/#how-it-works" className="no-underline text-gray-700 font-medium text-sm hover:text-blue-500 transition-colors whitespace-nowrap">
            How It Works
          </Link>
          <Link href="/#templates" className="no-underline text-gray-700 font-medium text-sm hover:text-blue-500 transition-colors whitespace-nowrap">
            Templates
          </Link>
          <Link href="/#faq" className="no-underline text-gray-700 font-medium text-sm hover:text-blue-500 transition-colors whitespace-nowrap">
            FAQ
          </Link>
        </nav>

        {/* 右侧 CTA */}
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white no-underline px-[18px] py-2 rounded-md font-semibold text-sm hover:bg-blue-600 transition-colors flex-shrink-0 whitespace-nowrap"
        >
          Create Mockup
        </Link>
      </div>
    </header>
  );
}

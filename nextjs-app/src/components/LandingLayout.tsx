import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
import { getOtherLinks } from "@/lib/links";

interface LandingLayoutProps {
  h1: string;
  subtitle: string;
  currentPath: string;
  showTool?: boolean;
  ctaTitle?: string;
  children: React.ReactNode;
}

export default function LandingLayout({
  h1,
  subtitle,
  currentPath,
  showTool = true,
  ctaTitle = "Ready to design your book mockup?",
  children,
}: LandingLayoutProps) {
  const otherLinks = getOtherLinks(currentPath);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero + 工具区：宽布局 max-w-[1200px] */}
      <div className="max-w-[1200px] mx-auto px-5 pt-3 pb-0">
        <section className="text-center py-2 pb-4 border-b border-gray-200">
          <h1 className="text-[2.1rem] leading-tight font-extrabold text-gray-900 mb-1">
            {h1}
          </h1>
          <p className="text-lg text-gray-600 max-w-[640px] mx-auto mb-1 leading-relaxed">
            {subtitle}
          </p>
          {showTool && (
            <p className="text-sm text-gray-400 mt-2">
              No watermark · No signup · Download in JPG &amp; PNG
            </p>
          )}
        </section>

        {showTool && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>

      {/* 主体内容：窄布局 max-w-[860px] */}
      <main className="max-w-[860px] mx-auto px-5 py-10 pb-16">
        {!showTool && (
          <article className="py-10 text-base leading-relaxed text-gray-700">
            {children}
          </article>
        )}

        {/* 底部 CTA */}
        <section className="text-center bg-gray-50 border border-gray-200 rounded-xl px-6 py-10 my-4 mb-10">
          <h2 className="text-xl font-bold mb-5 text-gray-900">{ctaTitle}</h2>
          <Link
            href="/"
            className="inline-block bg-brand hover:bg-brand-dark text-white no-underline font-bold text-base px-7 py-3.5 rounded-lg transition-colors"
          >
            Create Your Mockup Now →
          </Link>
        </section>

        {/* 互链：其他落地页 */}
        <nav className="border-t border-gray-200 pt-7" aria-label="Related tools">
          <h2 className="text-lg font-bold mb-4">More Book Mockup Tools</h2>
          <ul className="list-none p-0 m-0 flex flex-wrap gap-2.5">
            {otherLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="text-blue-600 no-underline text-sm hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

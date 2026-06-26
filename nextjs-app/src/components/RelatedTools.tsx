import Link from "next/link";

interface RelatedTool {
  href: string;
  title: string;
  description: string;
}

interface RelatedToolsProps {
  currentPath: string;
}

const ALL_TOOLS: RelatedTool[] = [
  {
    href: "/",
    title: "Free Book Mockup Generator",
    description: "Classic book mockup with hands holding",
  },
  {
    href: "/hardcover-book-mockup",
    title: "Hardcover Book Mockup",
    description: "Premium hardbound book covers",
  },
  {
    href: "/paperback-book-mockup",
    title: "Paperback Book Mockup",
    description: "Softcover trade paperback editions",
  },
  {
    href: "/ebook-mockup-generator",
    title: "eBook Mockup Generator",
    description: "Digital book covers on devices",
  },
  {
    href: "/3d-book-mockup-generator",
    title: "3D Book Mockup Generator",
    description: "Realistic 3D depth and perspective",
  },
  {
    href: "/book-cover-mockup-generator",
    title: "Book Cover Mockup Generator",
    description: "Professional book cover presentations",
  },
  {
    href: "/free-book-mockup-generator",
    title: "Free Book Mockup - No Watermark",
    description: "100% free with no watermark",
  },
];

export default function RelatedTools({ currentPath }: RelatedToolsProps) {
  // 过滤掉当前页面，随机选择 3 个相关工具
  const otherTools = ALL_TOOLS.filter((tool) => tool.href !== currentPath);
  const selectedTools = otherTools.slice(0, 3);

  return (
    <section className="py-12 bg-gray-50 rounded-xl px-6">
      <h2 className="text-2xl font-bold text-center mb-2">
        Explore Other Book Mockup Styles
      </h2>
      <p className="text-center text-gray-600 text-sm mb-8">
        Try different templates to find the perfect look for your book cover
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {selectedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h3 className="font-bold text-lg mb-2 text-brand hover:underline">
              {tool.title}
            </h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

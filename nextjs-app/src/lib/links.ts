// 落地页路由定义，用于导航和内链
export interface LandingLink {
  path: string;
  label: string;
  h1: string;
  description: string;
}

export const LANDING_PAGES: LandingLink[] = [
  {
    path: "/",
    label: "Free Book Mockup Generator",
    h1: "Free Book Mockup Generator Online",
    description:
      "Create professional book mockups in seconds. Upload your cover and generate realistic 3D book mockups online. No watermark, no signup, download in JPG and PNG.",
  },
  {
    path: "/free-book-mockup-generator",
    label: "Free Book Mockup Generator (No Watermark)",
    h1: "Free Book Mockup Generator — No Watermark",
    description:
      "The only completely free book mockup tool with zero watermarks and zero signups. Upload any cover, get a clean rendering you can use commercially. Always free.",
  },
  {
    path: "/book-cover-mockup-generator",
    label: "Book Cover Mockup Generator",
    h1: "Book Cover Mockup Generator",
    description:
      "Turn your flat cover art into a professional book presentation in one click. Perfect for cover designers and authors promoting on social media.",
  },
  {
    path: "/ebook-mockup-generator",
    label: "eBook Mockup Generator",
    h1: "eBook Mockup Generator",
    description:
      "Preview your Kindle or Apple Books cover on a realistic device screen. See how your eBook artwork reads at thumbnail size on phones and tablets.",
  },
  {
    path: "/hardcover-book-mockup",
    label: "Hardcover Book Mockup",
    h1: "Hardcover Book Mockup Generator",
    description:
      "Create convincing hardback book mockups with visible spine, rigid cover shadows, and a premium casebound look. Free, no signup.",
  },
  {
    path: "/3d-book-mockup-generator",
    label: "3D Book Mockup Generator",
    h1: "3D Book Mockup Generator",
    description:
      "See your book from an angled perspective with realistic depth, page edges, and dynamic lighting. Free and instant, no watermark.",
  },
  {
    path: "/paperback-book-mockup",
    label: "Paperback Book Mockup",
    h1: "Paperback Book Mockup Generator",
    description:
      "Showcase your softcover book with realistic flexible cover curves and perfect-bound edges. Ideal for KDP authors and indie publishers.",
  },
];

// 获取除当前页外的其他落地页链接（用于底部互链）
export function getOtherLinks(currentPath: string): LandingLink[] {
  return LANDING_PAGES.filter((link) => link.path !== currentPath);
}

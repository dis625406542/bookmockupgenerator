import type { Metadata } from "next";
import dynamic from "next/dynamic";
import LandingLayout from "@/components/LandingLayout";

const MockupTool = dynamic(() => import("@/components/MockupTool"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg animate-pulse" />
  ),
});

export const metadata: Metadata = {
  title: "Free Book Mockup Generator — No Watermark | MyMockupBook",
  description:
    "The only completely free book mockup tool with zero watermarks and zero signups. Upload any cover, get a clean rendering you can use commercially. Always free.",
  openGraph: {
    title: "Free Book Mockup Generator — No Watermark",
    description:
      "The only completely free book mockup tool with zero watermarks and zero signups. Always free, commercial use OK.",
  },
};

export default function FreeBookMockupGeneratorPage() {
  return (
    <LandingLayout
      h1="Free Book Mockup Generator — No Watermark"
      subtitle="The only completely free book mockup tool with zero watermarks and zero signups. Upload any book cover image and get a clean, realistic rendering you can use commercially. Always free."
      currentPath="/free-book-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="free-book" />
    </LandingLayout>
  );
}

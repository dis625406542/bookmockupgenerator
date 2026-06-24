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
  title: "3D Book Mockup Generator | MyMockupBook",
  description:
    "See your book from an angled perspective with realistic depth, page edges, and dynamic lighting. Free and instant rendering.",
  openGraph: {
    title: "3D Book Mockup Generator",
    description:
      "See your book from an angled perspective with realistic depth, page edges, and dynamic lighting. Free and instant.",
  },
};

export default function ThreeDBookMockupGeneratorPage() {
  return (
    <LandingLayout
      h1="3D Book Mockup Generator"
      subtitle="See your book from an angled perspective with realistic depth, page edges, and dynamic lighting. Our 3D renderer maps your flat cover onto a dimensional book — free and instant."
      currentPath="/3d-book-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="3d" />
    </LandingLayout>
  );
}

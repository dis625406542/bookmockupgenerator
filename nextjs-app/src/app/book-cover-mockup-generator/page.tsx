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
  title: "Book Cover Mockup Generator | MyMockupBook",
  description:
    "Turn your flat cover art into a professional book presentation in one click. Perfect for cover designers and authors. Free, instant download.",
  openGraph: {
    title: "Book Cover Mockup Generator",
    description:
      "Turn your flat cover art into a professional book presentation in one click. Perfect for cover designers and authors.",
  },
};

export default function BookCoverMockupGeneratorPage() {
  return (
    <LandingLayout
      h1="Book Cover Mockup Generator"
      subtitle="Turn your flat cover art into a professional book presentation in one click. Perfect for cover designers showing work to clients or authors promoting on social media."
      currentPath="/book-cover-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="book-cover" />
    </LandingLayout>
  );
}

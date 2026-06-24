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
  title: "eBook Mockup Generator | MyMockupBook",
  description:
    "Preview your Kindle or Apple Books cover on a realistic device screen. See how your eBook artwork reads at thumbnail size. Free, instant, no watermark.",
  openGraph: {
    title: "eBook Mockup Generator",
    description:
      "Preview your Kindle or Apple Books cover on a realistic device screen. See how your eBook artwork reads at thumbnail size.",
  },
};

export default function EbookMockupGeneratorPage() {
  return (
    <LandingLayout
      h1="eBook Mockup Generator"
      subtitle="Preview your Kindle or Apple Books cover on a realistic device screen. See exactly how your eBook artwork reads at thumbnail size on phones and tablets. Free, instant, no watermark."
      currentPath="/ebook-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="ebook" />
    </LandingLayout>
  );
}

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
  title: "Hardcover Book Mockup Generator | MyMockupBook",
  description:
    "Create convincing hardback book mockups with visible spine, rigid cover shadows, and a premium casebound look. Free, no signup.",
  openGraph: {
    title: "Hardcover Book Mockup Generator",
    description:
      "Create convincing hardback book mockups with visible spine, rigid cover shadows, and a premium casebound look.",
  },
};

export default function HardcoverBookMockupPage() {
  return (
    <LandingLayout
      h1="Hardcover Book Mockup Generator"
      subtitle="Create convincing hardback book mockups with visible spine, rigid cover shadows, and a premium casebound look. Upload your front cover and download in high resolution — free, no signup."
      currentPath="/hardcover-book-mockup"
      showTool={true}
    >
      <MockupTool templateId="hardcover" />
    </LandingLayout>
  );
}

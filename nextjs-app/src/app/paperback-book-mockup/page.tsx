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
  title: "Paperback Book Mockup Generator | MyMockupBook",
  description:
    "Showcase your softcover book with realistic flexible cover curves and perfect-bound edges. Ideal for KDP authors and indie publishers.",
  openGraph: {
    title: "Paperback Book Mockup Generator",
    description:
      "Showcase your softcover book with realistic flexible cover curves and perfect-bound edges. Ideal for KDP authors and indie publishers.",
  },
};

export default function PaperbackBookMockupPage() {
  return (
    <LandingLayout
      h1="Paperback Book Mockup Generator"
      subtitle="Showcase your softcover book with realistic flexible cover curves and perfect-bound edges. Ideal for KDP authors and indie publishers — upload, preview, and download in JPG or PNG."
      currentPath="/paperback-book-mockup"
      showTool={true}
    >
      <MockupTool templateId="paperback" />
    </LandingLayout>
  );
}

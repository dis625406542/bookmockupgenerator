import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const SITE_URL = "https://www.mymockupbook.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Free Book Mockup Generator - No Watermark | MyMockupBook",
  description:
    "Free book mockup generator. Upload your book cover and create a realistic 3D book mockup online in seconds. No watermark, no signup, download in JPG and PNG.",
  openGraph: {
    type: "website",
    siteName: "MyMockupBook",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

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
  title: "Hardcover Book Mockup Generator — Free, No Watermark | MyMockupBook",
  description:
    "Create professional hardcover book mockups in seconds. Upload your cover design and get a realistic hardback book image with visible spine, rigid cover, and natural shadows. Free, no signup.",
  openGraph: {
    title: "Hardcover Book Mockup Generator — Free, No Watermark",
    description:
      "Create professional hardcover book mockups in seconds. Free tool, no watermark, instant download.",
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

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">How to Create a Hardcover Book Mockup</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Three steps. No software. No signup.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: "📤",
              color: "bg-blue-50 border-blue-200",
              numColor: "text-blue-600",
              title: "Upload Your Cover Design",
              desc: "Click \"Add image/design\" and upload your hardcover front cover in JPG or PNG format. Use the crop tool to position and scale it precisely inside the blue boundary. Any cover size is accepted — the tool maps it onto the hardback template automatically.",
            },
            {
              step: "2",
              icon: "📖",
              color: "bg-indigo-50 border-indigo-200",
              numColor: "text-indigo-600",
              title: "Preview on a Hardback Template",
              desc: "Your design appears instantly on a realistic hardcover book with rigid case binding, natural shadows, and subtle page texture on the spine edge. Toggle highlights on or off to adjust the lighting. What you see is exactly what you download.",
            },
            {
              step: "3",
              icon: "💾",
              color: "bg-green-50 border-green-200",
              numColor: "text-green-600",
              title: "Download Free — No Watermark",
              desc: "Select JPG or PNG and download your finished hardcover book mockup in high resolution. The image is completely clean — no watermark, no logo, no attribution required. Generate as many hardback mockups as you need, always free.",
            },
          ].map((item) => (
            <div key={item.step} className={`relative border rounded-xl p-6 ${item.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-3xl font-black ${item.numColor} leading-none`}>{item.step}</span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-base mb-2 text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Uses */}
      <section className="py-12 bg-gray-50 -mx-5 px-5">
        <h2 className="text-2xl font-bold text-center mb-2">Who Uses a Hardcover Book Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Anyone who needs to present a hardback book professionally — before it even goes to print.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: "✍️",
              title: "Authors & Self-Publishers",
              desc: "Show off your hardcover title on your author website, Amazon listing, or social media before the print run ships. A polished hardback mockup signals quality and builds pre-launch excitement.",
            },
            {
              icon: "🎨",
              title: "Book Cover Designers",
              desc: "Present your hardcover design concepts to clients in context. Seeing the front cover mapped onto a realistic casebound book — with spine shadow and page edges — is far more convincing than a flat JPEG.",
            },
            {
              icon: "🏢",
              title: "Publishers & Acquisitions Teams",
              desc: "Generate hardcover mockups for catalog pages, rights-fair pitches, and distributor sell-sheets. Professional-looking hardback imagery helps titles stand out in competitive marketplaces.",
            },
            {
              icon: "📢",
              title: "Marketing & PR Teams",
              desc: "Create scroll-stopping promotional images for book-launch campaigns, email newsletters, and paid ads. Realistic hardcover mockups consistently outperform flat cover images in engagement metrics.",
            },
            {
              icon: "🎓",
              title: "Academic & Non-Fiction Authors",
              desc: "Textbooks, academic volumes, and business books almost always ship as hardcovers. Use our generator to create mockup images for conference presentations, institutional websites, and funding proposals.",
            },
            {
              icon: "🛍️",
              title: "Gift & Lifestyle Brands",
              desc: "If your brand produces hardcover coffee-table books, journals, or gift sets, a clean mockup is essential for e-commerce product pages and influencer gifting campaigns.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg p-5 shadow-sm flex gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-bold text-sm mb-1 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Why Use Our Hardcover Book Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No Photoshop. No stock licenses. No waiting.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: "✅",
              title: "100% Free, No Strings Attached",
              desc: "No credit card, no trial period, no freemium gate. Every feature — including high-resolution download — is permanently free.",
            },
            {
              icon: "🚫",
              title: "Zero Watermarks",
              desc: "Your hardcover mockup image is completely clean. No overlay, no logo, no attribution. Use it commercially without restriction.",
            },
            {
              icon: "⚡",
              title: "Instant In-Browser Rendering",
              desc: "WebGL rendering runs entirely in your browser. Upload your cover and see the hardback mockup in real time — no upload queue, no processing delay.",
            },
            {
              icon: "🔒",
              title: "Your Files Stay Private",
              desc: "All rendering happens locally on your device. Your cover artwork is never uploaded to our servers, stored, or accessed by anyone.",
            },
            {
              icon: "📐",
              title: "Realistic Hardback Geometry",
              desc: "The template uses perspective-correct mesh deformation so your cover wraps naturally around the rigid casebound shape — no obvious flat-map distortion.",
            },
            {
              icon: "🖼️",
              title: "Export in JPG or PNG",
              desc: "Choose PNG for a transparent background (great for compositing) or JPG for smaller file sizes. Both formats export at full canvas resolution.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-sm mb-1 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 bg-gray-50 -mx-5 px-5">
        <h2 className="text-2xl font-bold text-center mb-2">MyMockupBook vs. The Alternatives</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Why authors and designers keep coming back.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Feature</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-brand">MyMockupBook</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Photoshop Template</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Paid Mockup Sites</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Free to use", "✅ Always free", "❌ Subscription", "❌ Credits / subscription"],
                ["No watermark", "✅ Yes", "✅ Yes", "❌ Free plan watermarks"],
                ["No software needed", "✅ Browser-based", "❌ Photoshop required", "✅ Browser-based"],
                ["No signup required", "✅ Instant", "✅ Download only", "❌ Account required"],
                ["Privacy (no upload)", "✅ Local rendering", "✅ Local", "❌ Files uploaded to server"],
                ["Instant preview", "✅ Real-time", "❌ Manual Photoshop steps", "⚠️ Processing delay"],
              ].map(([feature, us, ps, paid]) => (
                <tr key={feature} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">{feature}</td>
                  <td className="p-3 border border-gray-200 text-center text-green-700 font-medium">{us}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{ps}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Hardcover Book Mockup — FAQ</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Everything you need to know before you start.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is a hardcover book mockup?",
              a: "A hardcover book mockup is a photorealistic image that shows your book cover design placed on a physical-looking hardback book. It simulates the rigid casebound spine, cover texture, and natural lighting so that clients, readers, and marketing teams can visualize the finished product without printing a single copy.",
            },
            {
              q: "Is the hardcover book mockup generator really free?",
              a: "Yes — completely free, no credit card, no account, no watermark on the output. Every feature is available from the first visit. We do not offer a paid tier because the tool is funded by the website itself.",
            },
            {
              q: "What image size should I upload for the best result?",
              a: "For a hardcover front cover, a standard 6×9 inch book at 300 DPI would be 1800×2700 pixels. Any high-resolution image with a book-cover aspect ratio (roughly 2:3) will produce the sharpest result. The tool accepts JPG and PNG and scales the image to fit the template automatically.",
            },
            {
              q: "Can I use the hardcover mockup image commercially?",
              a: "Yes. The mockup images you generate belong to you. You can use them on Amazon KDP listings, your author website, social media, press kits, publisher submissions, or any commercial project without attribution.",
            },
            {
              q: "Does the tool support transparent PNG backgrounds?",
              a: "Select PNG in the Export Format selector and the downloaded file will have a transparent background where there is no book. This is useful for compositing the hardcover mockup into other scenes or placing it on a colored background in your own design software.",
            },
            {
              q: "How is a hardcover mockup different from a paperback mockup?",
              a: "A hardcover (casebound) book has a rigid board cover with a visible spine edge and typically a dust jacket or printed case. Our hardcover template reflects this with sharper edges and more rigid geometry. A paperback template uses a softer, slightly curved cover. We offer both — use the Related Tools links below to switch.",
            },
            {
              q: "Is my uploaded cover image stored on your servers?",
              a: "No. All rendering is done locally in your browser using WebGL. Your cover artwork never leaves your device and is not transmitted to or stored on any server.",
            },
          ].map((item) => (
            <details key={item.q} className="group bg-white border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-sm text-gray-900 list-none">
                {item.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4">▾</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </LandingLayout>
  );
}

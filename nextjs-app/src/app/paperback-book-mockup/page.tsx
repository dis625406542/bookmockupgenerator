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
  title: "Paperback Book Mockup Generator — Free Softcover Mockups | MyMockupBook",
  description:
    "Generate realistic paperback book mockups online. Perfect for KDP authors and indie publishers. Upload your softcover design and download a professional mockup image — free, no watermark.",
  openGraph: {
    title: "Paperback Book Mockup Generator — Free Softcover Mockups",
    description:
      "Generate realistic paperback book mockups online. Perfect for KDP authors and indie publishers.",
  },
};

export default function PaperbackBookMockupPage() {
  return (
    <LandingLayout
      h1="Paperback Book Mockup Generator"
      subtitle="Showcase your softcover book with realistic flexible cover curves and perfect-bound edges. Ideal for KDP authors and indie publishers."
      currentPath="/paperback-book-mockup"
      showTool={true}
    >
      <MockupTool templateId="paperback" />

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Create a Paperback Mockup in Seconds</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No design skills. No waiting. Just upload and download.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: "🖼️",
              color: "bg-purple-50 border-purple-200",
              numColor: "text-purple-600",
              title: "Upload Softcover Art",
              desc: "Click \"Add image/design\" and select your paperback front cover. The tool accepts JPG and PNG files. Use the interactive crop overlay to adjust positioning until your artwork fits perfectly inside the guide boundary.",
            },
            {
              step: "2",
              icon: "📚",
              color: "bg-pink-50 border-pink-200",
              numColor: "text-pink-600",
              title: "Adjust Paperback Settings",
              desc: "Your cover appears on a flexible softcover book with natural page curl and perfect binding. Toggle \"Highlights\" to control the paper texture visibility. The preview updates instantly — no render queue.",
            },
            {
              step: "3",
              icon: "⬇️",
              color: "bg-teal-50 border-teal-200",
              numColor: "text-teal-600",
              title: "Download Your Mockup",
              desc: "Choose JPG for smaller file size or PNG for transparent background. Click \"Download\" and your paperback mockup image is ready — clean, high-resolution, and completely free of watermarks.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Who Needs Paperback Book Mockups?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Self-publishers, indie authors, and anyone selling softcover books online.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: "📖",
              title: "KDP & Amazon Self-Publishers",
              desc: "Amazon allows only flat cover images on your product listing. A paperback mockup makes your book look three-dimensional and tangible — crucial for standing out in search results and improving conversion rates.",
            },
            {
              icon: "✍️",
              title: "Indie Fiction & Non-Fiction Authors",
              desc: "Whether you're publishing a novel, memoir, or how-to guide, a realistic paperback mockup elevates your author website and social media posts. Readers respond better to images that look like real books they can hold.",
            },
            {
              icon: "📚",
              title: "Small Presses & Independent Publishers",
              desc: "Generate softcover mockups for your catalog without waiting for print proofs. Send mockup images to bookstores, libraries, and distributors before the first copy ships.",
            },
            {
              icon: "🎓",
              title: "Educators & Workbook Creators",
              desc: "Workbooks, study guides, and lesson planners are almost always paperbacks. Use our generator to create mockup images for your Teachers Pay Teachers listing, course materials, or school board presentations.",
            },
            {
              icon: "🛒",
              title: "Print-on-Demand Sellers",
              desc: "If you're selling journals, planners, or coloring books via Etsy, Gumroad, or Shopify, clean paperback mockup photos are essential for your product pages. Skip the photoshoot and generate unlimited mockups instantly.",
            },
            {
              icon: "🎨",
              title: "Graphic Designers Pitching Clients",
              desc: "Show your softcover design concept in context. A mockup demonstrates how the front cover looks with spine shadow and page edges — far more persuasive than a flat proof.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Why Choose MyMockupBook for Paperback Mockups?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Built specifically for self-publishers who need fast, free, and flexible mockup generation.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: "💵",
              title: "Completely Free — Forever",
              desc: "No freemium upsells, no credit system, no hidden fees. Every feature — including full-resolution download — is free from day one.",
            },
            {
              icon: "🔓",
              title: "No Account Registration",
              desc: "Start generating paperback mockups immediately. No email verification, no password setup, no onboarding flow. Just open the page and upload.",
            },
            {
              icon: "🎯",
              title: "Perfect for KDP Authors",
              desc: "The paperback template proportions mirror standard Amazon KDP trim sizes. Your mockup will look realistic for 6×9, 5×8, and similar softcover formats.",
            },
            {
              icon: "🚀",
              title: "Real-Time Preview",
              desc: "See your cover on the paperback book as you upload. Adjust the crop area and watch the mockup update instantly. No wait time, no processing queue.",
            },
            {
              icon: "📦",
              title: "Flexible Softcover Geometry",
              desc: "Unlike rigid hardcover templates, our paperback mockup uses subtle page curl and flexible spine deformation so your cover looks natural on a softbound book.",
            },
            {
              icon: "🔐",
              title: "Your Images Stay Local",
              desc: "All rendering happens in your browser. Your cover artwork is never uploaded to any server, stored in a database, or accessible to anyone else.",
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
        <h2 className="text-2xl font-bold text-center mb-2">How We Compare to Other Mockup Tools</h2>
        <p className="text-center text-gray-500 text-sm mb-8">What sets MyMockupBook apart for indie authors and self-publishers.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Feature</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-brand">MyMockupBook</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Stock Photo Sites</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Freelance Designers</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cost", "✅ $0", "❌ $10–50 per image", "❌ $50–200 per mockup"],
                ["Turnaround time", "✅ Instant", "⚠️ Search + purchase", "❌ 1–3 days"],
                ["Unlimited revisions", "✅ Yes", "❌ Re-purchase needed", "⚠️ Limited rounds"],
                ["No watermark", "✅ Yes", "❌ Free previews watermarked", "✅ Yes"],
                ["Commercial use rights", "✅ Included", "⚠️ Extended license extra", "✅ Included"],
                ["Privacy (no upload)", "✅ Local rendering", "❌ Files uploaded", "❌ Files sent to designer"],
              ].map(([feature, us, stock, freelance]) => (
                <tr key={feature} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">{feature}</td>
                  <td className="p-3 border border-gray-200 text-center text-green-700 font-medium">{us}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{stock}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{freelance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Paperback Book Mockup — FAQ</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Common questions from KDP authors and indie publishers.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is a paperback book mockup?",
              a: "A paperback book mockup is a photorealistic image that shows your softcover book design in a three-dimensional, lifelike context. It's used to preview what your paperback will look like before printing, and to create promotional images for Amazon listings, social media, and author websites.",
            },
            {
              q: "Is this tool really free for commercial use?",
              a: "Yes. You can use the generated paperback mockups on your Amazon KDP listing, in paid ads, on your author website, in press kits, or any other commercial context. There are no licensing fees, attribution requirements, or usage restrictions.",
            },
            {
              q: "What cover dimensions work best for a paperback mockup?",
              a: "Most Amazon KDP paperbacks use 6×9 inch or 5×8 inch trim sizes. For a 6×9 book at 300 DPI, your front cover should be 1800×2700 pixels. The tool automatically scales your uploaded image to fit the paperback template, so any high-resolution cover file with a roughly 2:3 aspect ratio will work well.",
            },
            {
              q: "Can I generate mockups for different paperback trim sizes?",
              a: "The current template is optimized for standard trade paperback proportions (6×9, 5.5×8.5, 5×8). If your book uses an unusual trim size, the mockup will still render but the proportions may look slightly off. We recommend uploading a front cover image that matches common paperback aspect ratios for the best result.",
            },
            {
              q: "Why does my paperback mockup look different from a hardcover mockup?",
              a: "Paperbacks use flexible softcover binding, so the cover curves naturally and the spine is less rigid. Hardcovers have a stiff casebound spine and sharper edges. Our paperback template reflects this with subtle page curl and flexible geometry. If you're publishing both formats, generate separate mockups using the hardcover and paperback generators.",
            },
            {
              q: "Does the tool support back cover and spine images?",
              a: "Currently the generator uses only the front cover. The spine and back cover visible in the mockup are part of the background template. If you need a full-wrap paperback mockup (front, spine, back), consider using a 3D rendering tool or hiring a designer.",
            },
            {
              q: "Will my uploaded cover image be stored or shared?",
              a: "No. All image processing happens locally in your browser using WebGL. Your cover file never leaves your device, is not uploaded to any server, and cannot be accessed by anyone else. When you close the browser tab, the image is gone.",
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

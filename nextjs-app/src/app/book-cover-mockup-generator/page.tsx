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
  title: "Book Cover Mockup Generator — Preview Covers on Real Books Free | MyMockupBook",
  description:
    "Create professional book cover mockups in seconds. See your cover design on a realistic book before printing. Free tool, instant preview, no watermark.",
  openGraph: {
    title: "Book Cover Mockup Generator — Preview Covers on Real Books Free",
    description:
      "Create professional book cover mockups in seconds. See your cover design on a realistic book before printing.",
  },
};

export default function BookCoverMockupPage() {
  return (
    <LandingLayout
      h1="Book Cover Mockup Generator"
      subtitle="Visualize your cover design on a real book before you publish. Upload your artwork and see it on a realistic book mockup — free, instant, no watermark."
      currentPath="/book-cover-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="book-cover" />

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Preview Your Book Cover in 3 Simple Steps</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No printing required. See your cover on a real book instantly.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: "🎨",
              color: "bg-violet-50 border-violet-200",
              numColor: "text-violet-600",
              title: "Upload Cover Design",
              desc: "Click \"Add image/design\" and upload your book cover artwork in JPG or PNG format. The tool accepts any image resolution. Use the crop tool to position your design precisely within the blue boundary marker.",
            },
            {
              step: "2",
              icon: "👀",
              color: "bg-fuchsia-50 border-fuchsia-200",
              numColor: "text-fuchsia-600",
              title: "See It on a Real Book",
              desc: "Your cover design appears instantly on a photorealistic book mockup with natural lighting, page texture, and realistic proportions. Adjust the highlights toggle to control the lighting intensity. The preview updates in real time.",
            },
            {
              step: "3",
              icon: "💾",
              color: "bg-green-50 border-green-200",
              numColor: "text-green-600",
              title: "Export & Share",
              desc: "Select JPG or PNG format and download your book cover mockup. The image is high-resolution and completely free of watermarks. Use it to pitch clients, test marketing concepts, or preview your design before printing.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Who Uses a Book Cover Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Designers, authors, and agencies who need to preview or present book covers professionally.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: "🎨",
              title: "Book Cover Designers",
              desc: "Present multiple cover concepts to clients without printing physical proofs. A realistic book cover mockup shows exactly how the design will look on a finished book — making it easier for clients to choose a direction and approve final artwork.",
            },
            {
              icon: "🏢",
              title: "Publishing Houses & Literary Agencies",
              desc: "Generate book cover mockups for acquisition pitches, sales meetings, and rights-fair catalogs. Professional mockup images help titles stand out in competitive marketplaces and speed up internal approval processes.",
            },
            {
              icon: "🖌️",
              title: "Freelance Graphic Designers",
              desc: "Show clients how their book cover design will look in context before they commit to printing. A mockup demonstrates scale, readability, and visual impact far better than a flat JPEG on a white background.",
            },
            {
              icon: "✍️",
              title: "Self-Publishing Authors",
              desc: "Test different cover designs and variations before finalizing your KDP upload. Seeing your cover on a realistic book helps you evaluate whether the typography is legible, the imagery pops, and the overall design is marketable.",
            },
            {
              icon: "📢",
              title: "Marketing Teams & PR Professionals",
              desc: "Create eye-catching promotional images for book launch campaigns, social media teasers, and email newsletters. Book cover mockups grab attention better than flat cover files and communicate professionalism.",
            },
            {
              icon: "🎓",
              title: "Design Students & Portfolio Builders",
              desc: "Showcase book cover projects in your design portfolio with realistic mockups. A well-presented mockup demonstrates that you understand how covers translate from screen to print and makes your work look production-ready.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Why Use Our Book Cover Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">The fastest way to preview and present book cover designs professionally.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "Instant Book Cover Preview",
              desc: "Upload your design and see it on a realistic book in under a second. No rendering queue, no email delivery, no waiting. The mockup generates in real time as you adjust the crop.",
            },
            {
              icon: "🆓",
              title: "Free for Commercial Use",
              desc: "Generate unlimited book cover mockups without paying. Use the images in client pitches, portfolio pieces, marketing campaigns, or any other commercial project — no attribution required.",
            },
            {
              icon: "🚫",
              title: "No Watermark, No Branding",
              desc: "The downloaded mockup image is completely clean. No logo overlay, no \"created with\" attribution link, no usage restrictions. The image is yours to use however you need.",
            },
            {
              icon: "📐",
              title: "Accurate Book Proportions",
              desc: "The mockup uses realistic book dimensions and perspective so your cover appears at the correct scale. This helps you evaluate whether your design elements are legible and visually balanced at print size.",
            },
            {
              icon: "🎯",
              title: "Test Before You Print",
              desc: "Catch design issues before you commit to a print run. A book cover mockup lets you see if the title is readable from a distance, if the imagery translates well to physical format, and if the overall composition works.",
            },
            {
              icon: "🔐",
              title: "Privacy-First Architecture",
              desc: "All rendering happens in your browser using WebGL. Your unpublished cover artwork is never uploaded to any server, stored anywhere, or accessible to anyone else. Close the tab and the image is gone.",
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
        <h2 className="text-2xl font-bold text-center mb-2">MyMockupBook vs. Traditional Cover Preview Methods</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Why designers and authors choose our book cover mockup generator.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Method</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-brand">MyMockupBook</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Print Proof</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Mockup PSD</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Turnaround time", "✅ Instant", "❌ 5–14 days", "⚠️ 5–10 minutes"],
                ["Cost per mockup", "✅ Free", "❌ $10–50 + shipping", "⚠️ PSD price + Photoshop"],
                ["Revisions", "✅ Unlimited", "❌ Re-order required", "✅ Edit PSD layers"],
                ["No software needed", "✅ Browser-based", "✅ Physical proof", "❌ Photoshop required"],
                ["Shareable digitally", "✅ JPG/PNG download", "⚠️ Photo of proof", "✅ JPG/PNG export"],
                ["Privacy", "✅ Local rendering", "⚠️ Sent to printer", "✅ Local editing"],
              ].map(([method, us, print, psd]) => (
                <tr key={method} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">{method}</td>
                  <td className="p-3 border border-gray-200 text-center text-green-700 font-medium">{us}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{print}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{psd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Book Cover Mockup Generator — FAQ</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Everything you need to know about creating book cover mockups online.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is a book cover mockup?",
              a: "A book cover mockup is a photorealistic image that shows your cover design placed on a physical-looking book. It helps designers and authors visualize how a flat cover design will appear on a finished book — including scale, lighting, and context. Book cover mockups are used to preview designs before printing and to present concepts to clients or publishers.",
            },
            {
              q: "Is the book cover mockup generator free?",
              a: "Yes — completely free with no trial period, no credit card, and no watermark on the output. You can generate as many book cover mockups as you need for personal or commercial projects without ever paying.",
            },
            {
              q: "What file format should I upload for the best result?",
              a: "Upload your book cover design as a high-resolution JPG or PNG file. For a standard 6×9 inch book at print quality (300 DPI), your front cover should be at least 1800×2700 pixels. Higher resolution images produce sharper mockups.",
            },
            {
              q: "Can I use the mockup to preview my self-published book cover?",
              a: "Yes. If you're self-publishing on Amazon KDP, Draft2Digital, or IngramSpark, you can upload your cover design to our generator to see how it will look on a physical book before you finalize your upload. This helps you catch design issues early.",
            },
            {
              q: "Can I use the book cover mockup in client presentations?",
              a: "Absolutely. The generated mockup image is yours to use without restriction. Show it to clients, include it in pitch decks, add it to your portfolio, or use it in any other professional context. No attribution is required.",
            },
            {
              q: "Does the tool support back cover or spine mockups?",
              a: "The current generator focuses on the front cover. The spine and back cover visible in the mockup are part of the background template. If you need a full-wrap mockup (front, spine, and back), you'll need to use a 3D rendering tool or Smart Object PSD.",
            },
            {
              q: "Is my uploaded cover design stored on your servers?",
              a: "No. All rendering happens locally in your browser. Your cover artwork is never uploaded to any server, stored in a database, or accessible to anyone else. The tool is completely privacy-first.",
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

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
  title: "eBook Mockup Generator — Create Digital Book Mockups Free | MyMockupBook",
  description:
    "Generate realistic eBook mockups for Kindle, iPad, and digital reading apps. Upload your cover and create professional ebook mockup images — free, instant, no watermark.",
  openGraph: {
    title: "eBook Mockup Generator — Create Digital Book Mockups Free",
    description:
      "Generate realistic eBook mockups for Kindle, iPad, and digital reading apps. Free, instant, no watermark.",
  },
};

export default function EbookMockupPage() {
  return (
    <LandingLayout
      h1="eBook Mockup Generator"
      subtitle="Showcase your digital book on tablet and e-reader screens with realistic device frames and reflections. Perfect for promoting Kindle eBooks and digital downloads."
      currentPath="/ebook-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="ebook" />

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Generate an eBook Mockup in 3 Steps</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No device. No screenshots. Just upload your ebook cover.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: "📱",
              color: "bg-cyan-50 border-cyan-200",
              numColor: "text-cyan-600",
              title: "Upload eBook Cover Art",
              desc: "Click \"Add image/design\" and upload your digital book cover in JPG or PNG format. The tool works with any ebook cover aspect ratio — standard Kindle sizes (1600×2560), square covers, or custom dimensions. Use the crop tool to position your design.",
            },
            {
              step: "2",
              icon: "💻",
              color: "bg-sky-50 border-sky-200",
              numColor: "text-sky-600",
              title: "Preview on Device Frame",
              desc: "Your ebook cover appears on a realistic tablet or e-reader screen with subtle screen glare and bezel shadows. The mockup updates in real time as you adjust the crop. Toggle highlights to control the screen reflection intensity.",
            },
            {
              step: "3",
              icon: "🎁",
              color: "bg-emerald-50 border-emerald-200",
              numColor: "text-emerald-600",
              title: "Download Clean Mockup",
              desc: "Select JPG or PNG and download your finished ebook mockup image. The file is high-resolution, completely free, and has no watermark or branding. Use it on your book launch page, email campaigns, or Amazon Author Central.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Who Needs eBook Mockup Images?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Digital creators, Kindle authors, and anyone selling downloadable books.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: "📕",
              title: "Kindle Direct Publishing (KDP) Authors",
              desc: "Amazon only shows flat cover images on your Kindle book listing. An ebook mockup showing your cover on a realistic tablet screen makes your digital book look more tangible and professional — improving click-through rates and sales.",
            },
            {
              icon: "💼",
              title: "Digital Course Creators & Lead Magnet Authors",
              desc: "If you're offering a free ebook as a lead magnet or bonus resource, a polished mockup image elevates your landing page. Readers perceive ebooks with professional mockups as more valuable than those shown as flat PDFs.",
            },
            {
              icon: "🌐",
              title: "Web Designers & App Developers",
              desc: "Showcasing ebook content within a reading app? Generate clean device-frame mockups for your product pages, pitch decks, and app store screenshots without needing actual device photography.",
            },
            {
              icon: "📧",
              title: "Email Marketers & Newsletter Publishers",
              desc: "Promote your latest ebook release with eye-catching visuals. An ebook mockup in your newsletter header or promotional email performs significantly better than a plain cover image.",
            },
            {
              icon: "🎓",
              title: "Educators & Online Instructors",
              desc: "Sell digital textbooks, study guides, or course workbooks? An ebook mockup makes your PDF downloads look like legitimate published resources, not hastily assembled documents.",
            },
            {
              icon: "🛒",
              title: "Digital Product Sellers on Gumroad & Etsy",
              desc: "If you sell ebooks, digital planners, or downloadable guides, high-quality mockup images are essential for your product listing. They communicate professionalism and increase perceived value.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Why Use Our eBook Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Built for digital creators who need professional mockups without Photoshop or stock photos.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: "🆓",
              title: "Free, No Limits",
              desc: "Generate unlimited ebook mockups without paying a cent. No trial period, no credit card, no premium upgrade. Every feature is free from the first use.",
            },
            {
              icon: "🚀",
              title: "Instant Ebook Mockup Creation",
              desc: "Upload your cover and see the ebook mockup in under a second. No rendering queue, no waiting for email delivery. The preview updates in real time as you adjust the crop.",
            },
            {
              icon: "📐",
              title: "Any eBook Cover Size Works",
              desc: "Whether you're using standard Kindle dimensions (1600×2560), square covers, or custom sizes, the tool automatically scales your artwork to fit the device screen realistically.",
            },
            {
              icon: "🖼️",
              title: "Realistic Device Frame",
              desc: "The ebook mockup includes a tablet or e-reader bezel with subtle screen glare and shadow. Your cover looks like it's displayed on a real reading device, not pasted onto a generic rectangle.",
            },
            {
              icon: "🔐",
              title: "Privacy-First Architecture",
              desc: "All rendering happens in your browser. Your ebook cover is never uploaded to any server or stored in a database. When you close the tab, the image is gone. No one can access your unpublished work.",
            },
            {
              icon: "📥",
              title: "Download JPG or PNG",
              desc: "Export your ebook mockup as a JPG for web use or PNG for transparency. Both formats are full-resolution and completely free of watermarks, logos, or attribution requirements.",
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
        <h2 className="text-2xl font-bold text-center mb-2">MyMockupBook vs. Other eBook Mockup Options</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Why digital creators choose our ebook mockup generator.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Feature</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-brand">MyMockupBook</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Screenshot + Photoshop</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Mockup Marketplaces</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Time to create", "✅ 30 seconds", "❌ 15–30 minutes", "⚠️ 5 minutes + purchase"],
                ["Cost", "✅ Free forever", "❌ Photoshop subscription", "❌ $5–25 per mockup"],
                ["Design skills required", "✅ None", "❌ Intermediate Photoshop", "⚠️ Basic editing"],
                ["Watermark-free", "✅ Yes", "✅ Yes", "❌ Free versions watermarked"],
                ["Privacy", "✅ Local rendering", "✅ Local", "❌ Upload to third party"],
                ["Editable after download", "⚠️ Re-generate", "✅ PSD layers", "⚠️ Depends on file type"],
              ].map(([feature, us, ps, marketplace]) => (
                <tr key={feature} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">{feature}</td>
                  <td className="p-3 border border-gray-200 text-center text-green-700 font-medium">{us}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{ps}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{marketplace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">eBook Mockup Generator — FAQ</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Everything you need to know about creating ebook mockups online.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is an ebook mockup and why do I need one?",
              a: "An ebook mockup is an image that shows your digital book cover displayed on a realistic device screen (tablet, e-reader, or phone). It helps potential readers visualize your ebook as a tangible product rather than a flat file. Ebook mockups are proven to increase click-through rates on Amazon KDP listings and digital product landing pages.",
            },
            {
              q: "Is this ebook mockup generator really free?",
              a: "Yes. There is no trial period, no freemium upsell, and no watermark on the downloaded image. You can generate as many ebook mockups as you need without ever paying or creating an account.",
            },
            {
              q: "What cover dimensions should I use for Kindle ebooks?",
              a: "Amazon KDP recommends 1600×2560 pixels for Kindle ebook covers (a 5:8 aspect ratio). However, our ebook mockup generator accepts any cover size and scales it to fit the device screen. If your cover uses a different aspect ratio, the tool will still generate a realistic mockup.",
            },
            {
              q: "Can I use the ebook mockup on my Amazon Author Central page?",
              a: "Yes. The generated ebook mockup image is yours to use commercially without restriction. You can upload it to Amazon Author Central, your author website, paid advertising campaigns, or any other promotional channel.",
            },
            {
              q: "Does the ebook mockup include a device frame?",
              a: "Yes. The mockup shows your cover on a tablet or e-reader screen with a realistic device bezel, subtle screen glare, and shadow. This makes your ebook look like it's displayed on an actual reading device.",
            },
            {
              q: "What's the difference between an ebook mockup and a paperback mockup?",
              a: "An ebook mockup shows your cover on a digital device screen (tablet, Kindle, phone). A paperback mockup shows your cover on a physical softcover book. Use an ebook mockup when promoting digital-only titles or Kindle editions. Use a paperback mockup for print books or print-on-demand.",
            },
            {
              q: "Can I generate mockups for other devices like smartphones?",
              a: "The current template uses a tablet/e-reader frame optimized for ebook covers. If you need a smartphone mockup or a different device, you can use the PNG export with a transparent background and composite it into your own device screenshot using any image editor.",
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

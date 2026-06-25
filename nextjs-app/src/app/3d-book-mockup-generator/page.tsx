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
  title: "3D Book Mockup Generator — Create Realistic 3D Book Covers Free | MyMockupBook",
  description:
    "Generate stunning 3D book mockups with realistic depth, perspective, and page edges. Upload your cover and create a three-dimensional book image — free, instant, no watermark.",
  openGraph: {
    title: "3D Book Mockup Generator — Create Realistic 3D Book Covers Free",
    description:
      "Generate stunning 3D book mockups with realistic depth, perspective, and page edges. Free, instant, no watermark.",
  },
};

export default function ThreeDBookMockupPage() {
  return (
    <LandingLayout
      h1="3D Book Mockup Generator"
      subtitle="See your book from an angled perspective with realistic depth, page edges, and dynamic lighting. Free and instant, no watermark."
      currentPath="/3d-book-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="3d-book" />

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Create a 3D Book Mockup in Seconds</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No 3D software. No modeling skills. Just upload and download.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: "🎨",
              color: "bg-rose-50 border-rose-200",
              numColor: "text-rose-600",
              title: "Upload Your Book Cover",
              desc: "Click \"Add image/design\" and upload your book cover artwork. The tool supports JPG and PNG files at any resolution. Use the interactive crop tool to position and scale your design until it fits perfectly within the guide area.",
            },
            {
              step: "2",
              icon: "🔄",
              color: "bg-amber-50 border-amber-200",
              numColor: "text-amber-600",
              title: "See Your Cover in 3D",
              desc: "Your flat cover image is instantly mapped onto a three-dimensional book model with realistic perspective, visible page thickness, and natural shadowing. The 3D transformation happens in real time — no rendering delay.",
            },
            {
              step: "3",
              icon: "✨",
              color: "bg-lime-50 border-lime-200",
              numColor: "text-lime-600",
              title: "Download High-Res 3D Image",
              desc: "Choose JPG for smaller file size or PNG for transparency. Your finished 3D book mockup downloads immediately — no watermark, no branding, no usage restrictions. Use it anywhere you need a stunning book visual.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Who Uses 3D Book Mockups?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Anyone who needs eye-catching book visuals that stand out from flat cover images.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: "📱",
              title: "Social Media Managers & Book Marketers",
              desc: "Three-dimensional book images outperform flat covers in social media engagement metrics. Use 3D mockups for Instagram posts, Facebook ads, Twitter announcements, and Pinterest pins to grab attention and drive clicks.",
            },
            {
              icon: "🎬",
              title: "Book Trailer & Video Creators",
              desc: "Need a rotating or angled book shot for your book trailer? Export a 3D mockup and import it into your video editor. The perspective-correct rendering looks far more professional than a flat cover pasted onto a generic 3D template.",
            },
            {
              icon: "🖥️",
              title: "Website Designers & Landing Page Builders",
              desc: "Hero sections with 3D book mockups convert better than flat imagery. The depth and shadow make your book look tangible and desirable — essential for sales pages, author websites, and product launch landing pages.",
            },
            {
              icon: "📧",
              title: "Email Campaign Designers",
              desc: "Break through inbox clutter with a striking 3D book visual. Readers are more likely to open and click through an email featuring a realistic three-dimensional book than one with a standard flat cover.",
            },
            {
              icon: "🎨",
              title: "Graphic Designers Presenting Mockups",
              desc: "Show clients how their book cover will look in a real-world context. A 3D mockup demonstrates depth, lighting, and perspective — far more persuasive than handing over a flat JPEG proof.",
            },
            {
              icon: "🛍️",
              title: "Amazon & E-Commerce Sellers",
              desc: "While Amazon product images must meet specific requirements, 3D mockups work beautifully in A+ Content, Sponsored Brand ads, and external traffic campaigns. They make your book listing stand out against competitors using flat covers.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Why Use Our 3D Book Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">The fastest way to turn a flat cover into a stunning three-dimensional book image.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: "🎯",
              title: "True 3D Perspective Transform",
              desc: "Unlike tools that simply skew a flat image, our generator uses perspective-correct mesh deformation to wrap your cover around a three-dimensional book shape. The result is a realistic angled view with accurate foreshortening.",
            },
            {
              icon: "⚡",
              title: "Real-Time 3D Rendering",
              desc: "See your 3D book mockup instantly as you upload. Adjust the crop and watch the three-dimensional preview update in real time. No export queue, no waiting for server-side rendering.",
            },
            {
              icon: "💯",
              title: "100% Free, No Watermark",
              desc: "Generate unlimited 3D book mockups without paying a cent. The downloaded image is completely clean — no logo, no attribution link, no usage restrictions. Use it commercially without hesitation.",
            },
            {
              icon: "📏",
              title: "Works With Any Cover Size",
              desc: "Upload a standard 6×9 inch front cover, a square cover, or a custom aspect ratio — the tool automatically scales your artwork to fit the 3D book template. High-resolution images produce the sharpest results.",
            },
            {
              icon: "🌟",
              title: "Visible Page Thickness & Depth",
              desc: "The 3D mockup includes realistic page edges along the spine so your book looks physically substantial. This depth cue makes the mockup far more convincing than a flat or barely-angled image.",
            },
            {
              icon: "🔐",
              title: "Privacy-First Design",
              desc: "All 3D rendering happens in your browser using WebGL. Your cover artwork is never uploaded to any server or stored anywhere. When you close the tab, the image is gone. No one can access your unpublished cover.",
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
        <h2 className="text-2xl font-bold text-center mb-2">How We Compare to Other 3D Mockup Tools</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Why authors and marketers choose MyMockupBook for 3D book visuals.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Feature</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-brand">MyMockupBook</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Blender / 3D Software</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Smart Object PSDs</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Learning curve", "✅ None — instant", "❌ Weeks of training", "⚠️ Photoshop skills needed"],
                ["Time per mockup", "✅ 30 seconds", "❌ 15–60 minutes", "⚠️ 5–10 minutes"],
                ["Cost", "✅ Free forever", "❌ Software license", "⚠️ PSD purchase + Photoshop"],
                ["Perspective accuracy", "✅ Mesh deformation", "✅ True 3D", "⚠️ Fixed smart object"],
                ["No watermark", "✅ Yes", "✅ Yes", "⚠️ Depends on source"],
                ["Browser-based", "✅ Yes", "❌ Desktop app", "❌ Desktop app"],
              ].map(([feature, us, blender, psd]) => (
                <tr key={feature} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">{feature}</td>
                  <td className="p-3 border border-gray-200 text-center text-green-700 font-medium">{us}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{blender}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{psd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">3D Book Mockup Generator — FAQ</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Common questions about creating realistic 3D book images online.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is a 3D book mockup?",
              a: "A 3D book mockup is a photorealistic image that shows your book cover from an angled, three-dimensional perspective. It includes visible depth, page thickness along the spine, and realistic lighting. 3D mockups are used in marketing materials, social media, and website hero sections to make flat cover designs look tangible and professional.",
            },
            {
              q: "Is the 3D book mockup generator free to use?",
              a: "Yes. There is no trial period, no freemium gate, and no watermark on the output. You can generate as many 3D book mockups as you need without ever paying or creating an account. All features are permanently free.",
            },
            {
              q: "Do I need 3D modeling software like Blender?",
              a: "No. The tool uses WebGL rendering in your browser to transform your flat cover image into a three-dimensional book. You don't need to install any software, learn 3D modeling, or understand perspective transforms. Just upload and download.",
            },
            {
              q: "What resolution should my cover image be?",
              a: "For the sharpest 3D mockup, upload a high-resolution cover image (at least 1200 pixels on the long edge). Standard book cover dimensions like 1800×2700 pixels (6×9 inch at 300 DPI) work perfectly. The tool accepts any aspect ratio and scales it to fit the 3D template.",
            },
            {
              q: "Can I change the angle or perspective of the 3D mockup?",
              a: "The current template uses a fixed three-quarter perspective view optimized for marketing visuals. If you need a different angle, you can export the PNG with a transparent background and rotate or composite it in your own image editor.",
            },
            {
              q: "How is a 3D mockup different from a flat or 2D mockup?",
              a: "A flat (2D) mockup shows only the front cover with no visible depth or spine. A 3D mockup shows the book at an angle with visible page thickness, spine shadow, and realistic perspective foreshortening. 3D mockups are more eye-catching and perform better in promotional materials.",
            },
            {
              q: "Will my uploaded cover be stored on your servers?",
              a: "No. All 3D rendering happens locally in your browser. Your cover image is never uploaded to any server, stored in a database, or accessible to anyone else. The tool is completely privacy-first.",
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

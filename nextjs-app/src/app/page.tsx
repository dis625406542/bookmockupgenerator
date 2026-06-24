import dynamic from "next/dynamic";
import LandingLayout from "@/components/LandingLayout";
import ImageCarousel from "@/components/ImageCarousel";

// 工具是纯客户端（PIXI/WebGL/canvas），跳过 SSR
const MockupTool = dynamic(() => import("@/components/MockupTool"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg animate-pulse" />
  ),
});

export default function Home() {
  return (
    <LandingLayout
      h1="Free Book Mockup Generator Online"
      subtitle="Upload your cover and create a realistic book mockup in seconds. No watermark, no signup."
      currentPath="/"
      showTool={true}
    >
      <MockupTool templateId="child-book" />
      <ImageCarousel />

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="text-4xl">📤</div>
            <div className="text-lg font-bold text-brand">1</div>
            <h3 className="font-bold text-lg">Upload Your Book Cover</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Click &ldquo;Add image/design&rdquo; and upload your book cover. Adjust the position, scale, and crop to fit perfectly within the blue border. The tool supports JPG, PNG, and other common image formats.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl">🎨</div>
            <div className="text-lg font-bold text-brand">2</div>
            <h3 className="font-bold text-lg">Preview the Realistic Render</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your cover appears instantly on the book with realistic page texture, shadows, and natural lighting. Toggle highlights and shadows on or off to match the look you want. What you see on screen is exactly what you will download — a professional <strong>book cover mockup</strong> ready to publish.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl">💾</div>
            <div className="text-lg font-bold text-brand">3</div>
            <h3 className="font-bold text-lg">Download With No Watermark</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Choose JPG or PNG and download your finished <strong>book mockup</strong> in high resolution. The exported image is completely clean — no watermark, no logo, no branding. Come back anytime and create as many mockups as you like, totally free.
            </p>
          </div>
        </div>
      </section>

      {/* Who Uses */}
      <section className="py-12 bg-gray-50 -mx-5 px-5">
        <h2 className="text-2xl font-bold text-center mb-8">Who Uses Book Mockups?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold text-lg mb-2">Self-Published Authors</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Show off your book cover on social media, your author website, or in promotional materials. A professional mockup makes your book look real and ready to read.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold text-lg mb-2">Cover Designers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Present cover concepts to clients in context. A 3D mockup shows how the design looks on an actual book, making it easier for clients to visualize the final product.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">📢</div>
            <h3 className="font-bold text-lg mb-2">Marketing Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Create eye-catching promotional images for book launches, email campaigns, and ads. Realistic mockups grab attention and increase engagement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🏢</div>
            <h3 className="font-bold text-lg mb-2">Publishers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Generate mockups for catalog pages, distributor pitches, and rights sales. Professional imagery helps books stand out in crowded marketplaces.
            </p>
          </div>
        </div>
      </section>

      {/* Why Use */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Use Our Free Book Mockup Generator?</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            { icon: "✅", title: "100% Free Forever", desc: "No hidden costs, no premium tiers, no trial periods. Everything is free." },
            { icon: "🚫", title: "No Watermark", desc: "Your mockup is completely clean. No logo, no branding overlay." },
            { icon: "⚡", title: "Instant Results", desc: "Upload and see your mockup in real-time. No waiting, no processing delays." },
            { icon: "🎯", title: "Realistic Rendering", desc: "Professional lighting, shadows, and page texture make your book look real." },
            { icon: "📱", title: "No Account Required", desc: "Start creating immediately. No signup, no email, no hassle." },
            { icon: "🔒", title: "Privacy First", desc: "Your images stay on your device. We don't store or track your uploads." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 bg-gray-50 -mx-5 px-5">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              q: "Is this book mockup generator really free?",
              a: "Yes, our <strong>book cover mockups free</strong> service is completely free to use. No registration required, no hidden fees, and no watermarks on your final mockups.",
            },
            {
              q: "What file formats can I download my mockup in?",
              a: "You can download your <strong>book cover mockup</strong> in JPG or PNG format. Both are high quality and ready for digital use, social media, and print-on-demand platforms.",
            },
            {
              q: "Do I need to create an account?",
              a: "No account needed. Just upload your cover image, adjust it, and download. We don't store your images or track your activity.",
            },
            {
              q: "Can I use these mockups commercially?",
              a: "Yes! The mockups you create are yours to use however you like — book marketing, social media, client presentations, or commercial projects.",
            },
            {
              q: "What image formats can I upload?",
              a: "You can upload JPG, PNG, and most common image formats. For best results, use a high-resolution cover image (at least 1000px on the shortest side).",
            },
            {
              q: "Will my uploaded images be stored or shared?",
              a: "No. All processing happens in your browser. Your images never leave your device, and we don't store or access them.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">{item.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          ))}
        </div>
      </section>
    </LandingLayout>
  );
}

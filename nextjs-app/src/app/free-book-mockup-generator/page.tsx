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
  title: "Free Book Mockup Generator — No Watermark, No Signup | MyMockupBook",
  description:
    "The only completely free book mockup tool with zero watermarks and zero signups. Upload any cover, get a clean rendering you can use commercially. Always free.",
  openGraph: {
    title: "Free Book Mockup Generator — No Watermark, No Signup",
    description:
      "The only completely free book mockup tool with zero watermarks and zero signups. Always free.",
  },
};

export default function FreeBookMockupPage() {
  return (
    <LandingLayout
      h1="Free Book Mockup Generator — No Watermark"
      subtitle="The only completely free book mockup tool with zero watermarks and zero signups. Upload any book cover image and get a clean, realistic rendering you can use commercially. Always free."
      currentPath="/free-book-mockup-generator"
      showTool={true}
    >
      <MockupTool templateId="free-book" />

      {/* How It Works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Free Book Mockup in 3 Easy Steps</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No credit card. No account. No watermark. Just upload and download.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: "📂",
              color: "bg-blue-50 border-blue-200",
              numColor: "text-blue-600",
              title: "Upload Any Cover Image",
              desc: "Click \"Add image/design\" and select your book cover file. The free tool accepts JPG and PNG at any resolution. Adjust the crop area to position your artwork perfectly inside the guide boundary. No file size limits, no format restrictions.",
            },
            {
              step: "2",
              icon: "👁️",
              color: "bg-indigo-50 border-indigo-200",
              numColor: "text-indigo-600",
              title: "Preview Free Mockup",
              desc: "Your cover appears instantly on a realistic book with natural lighting and accurate proportions. Use the highlights toggle to adjust the page texture. The preview is real-time — no processing delay, no render queue, no waiting.",
            },
            {
              step: "3",
              icon: "✅",
              color: "bg-teal-50 border-teal-200",
              numColor: "text-teal-600",
              title: "Download — No Watermark",
              desc: "Choose JPG or PNG format and click download. Your free book mockup image is ready immediately — clean, high-resolution, and completely free of watermarks, logos, or attribution links. Use it anywhere without restriction.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Who Needs a Free Book Mockup Generator?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Students, beginners, and anyone who needs professional mockups without a budget.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: "🎓",
              title: "Students & Design School Projects",
              desc: "Creating a book cover for a class project? You need a mockup to show your work in context, but you can't afford expensive mockup subscriptions or Photoshop licenses. Our free generator gives you professional results without asking for a credit card.",
            },
            {
              icon: "✍️",
              title: "First-Time Self-Published Authors",
              desc: "You've written your first book and designed a simple cover, but you don't have a marketing budget yet. A free, clean book mockup helps you create promotional images for social media and your author website without spending money on tools.",
            },
            {
              icon: "💡",
              title: "Aspiring Authors Testing Ideas",
              desc: "Experimenting with different cover concepts before committing to a design? Generate unlimited free mockups to test typography, imagery, and layouts without worrying about watermarks ruining your previews.",
            },
            {
              icon: "🤝",
              title: "Non-Profits & Community Publishers",
              desc: "Publishing community cookbooks, church directories, or local history books on a tight budget? Free book mockups let you create professional promotional materials without diverting funds from printing or distribution.",
            },
            {
              icon: "🆓",
              title: "Freelancers Building Portfolios",
              desc: "Starting out as a book cover designer and need portfolio pieces? Generate free mockups to showcase your work professionally. No watermarks mean your portfolio looks clean and hireable.",
            },
            {
              icon: "🚀",
              title: "Indie Creators & Side Projects",
              desc: "Working on a passion project in your spare time? You don't want to pay a monthly subscription for mockup tools you'll only use occasionally. Our free generator is available whenever you need it — no signup, no expiration.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Why Our Free Book Mockup Generator is Actually Free</h2>
        <p className="text-center text-gray-500 text-sm mb-10">No hidden costs. No freemium upsell. No catch.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              icon: "🔓",
              title: "Truly Free — No Paywall",
              desc: "Every feature is free from day one. High-resolution download? Free. No watermark? Free. Unlimited mockups? Free. There is no premium tier, no credit system, no trial period that expires.",
            },
            {
              icon: "🚫",
              title: "Zero Watermarks",
              desc: "Most \"free\" mockup tools slap a watermark on your output unless you pay. Not us. Your downloaded image is completely clean — no logo, no URL, no \"created with\" branding. The mockup is yours.",
            },
            {
              icon: "📧",
              title: "No Signup Required",
              desc: "No email address, no password, no verification link, no onboarding flow. Open the page and start generating free book mockups immediately. We don't collect your contact information or send marketing emails.",
            },
            {
              icon: "⏱️",
              title: "No Usage Limits",
              desc: "Generate 10 mockups today and 100 more tomorrow if you need to. No daily limit, no monthly quota, no \"you've used all your free credits\" message. Use the tool as much as you want.",
            },
            {
              icon: "💼",
              title: "Commercial Use Allowed",
              desc: "Use your free book mockups in client projects, paid marketing campaigns, portfolio pieces, or anywhere else. There are no licensing restrictions, no terms-of-service gotchas, no \"free for personal use only\" clauses.",
            },
            {
              icon: "🌐",
              title: "Browser-Based — No Install",
              desc: "The free tool runs entirely in your browser. No desktop app to download, no plugin to install, no system requirements to meet. Works on Mac, Windows, Linux, tablets, and Chromebooks.",
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
        <h2 className="text-2xl font-bold text-center mb-2">Free vs. &ldquo;Free&rdquo; — How We Compare</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Most &ldquo;free&rdquo; mockup tools aren&rsquo;t actually free. Here&rsquo;s the difference.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Feature</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-brand">MyMockupBook</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Freemium Tools</th>
                <th className="text-center p-3 border border-gray-200 font-semibold text-gray-500">Canva Free</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Watermark on output", "✅ Never", "❌ Yes, unless you pay", "❌ Canva branding on free"],
                ["Signup required", "✅ No", "❌ Email required", "❌ Account required"],
                ["High-res download", "✅ Always free", "❌ Paid tier only", "⚠️ Limited resolution free"],
                ["Daily/monthly limits", "✅ Unlimited", "❌ Credit system", "⚠️ Limited exports"],
                ["Commercial use rights", "✅ Included", "⚠️ Terms vary", "⚠️ Pro license for some"],
                ["Full feature access", "✅ Everything free", "❌ Core features paid", "❌ Premium templates paid"],
              ].map(([feature, us, freemium, canva]) => (
                <tr key={feature} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">{feature}</td>
                  <td className="p-3 border border-gray-200 text-center text-green-700 font-medium">{us}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{freemium}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-500">{canva}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Free Book Mockup Generator — FAQ</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Common questions about our truly free book mockup tool.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Is the free book mockup generator really free, or is there a catch?",
              a: "It's genuinely free. No trial period, no credit card required, no premium tier. You can generate unlimited book mockups and download them in high resolution without watermarks. The tool is funded by the website itself, not by charging users.",
            },
            {
              q: "Why do most free mockup tools have watermarks but yours doesn't?",
              a: "Most \"free\" mockup generators use watermarks to push users toward paid subscriptions. We believe a truly free tool should deliver clean, usable output. Our business model doesn't rely on converting free users to paid plans, so we can offer watermark-free mockups from the start.",
            },
            {
              q: "Do I need to create an account to use the free book mockup generator?",
              a: "No. You can open the page, upload your cover, and download your mockup without providing any personal information. No email address, no password, no verification step.",
            },
            {
              q: "Can I use the free book mockup for commercial projects?",
              a: "Yes. The mockup images you generate are yours to use however you need — client work, paid ads, portfolio pieces, book launch campaigns, or any other commercial purpose. There are no licensing fees or attribution requirements.",
            },
            {
              q: "Is there a limit to how many free mockups I can create?",
              a: "No. Generate as many book mockups as you need — one today, fifty next week, a hundred next month. There are no daily limits, no monthly quotas, no credit systems.",
            },
            {
              q: "Will the tool stay free forever, or will it become paid later?",
              a: "The core free book mockup generator will always be free. We may add optional paid features in the future (like custom backgrounds or batch processing), but the current tool — upload cover, generate mockup, download clean image — will remain free indefinitely.",
            },
            {
              q: "How do you make money if the tool is free?",
              a: "The free book mockup generator is part of a broader website ecosystem. We may display non-intrusive ads or offer optional premium services, but the core mockup tool itself will always be free with no watermarks.",
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

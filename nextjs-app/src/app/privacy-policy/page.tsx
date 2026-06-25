import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MyMockupBook",
  description: "Privacy policy for MyMockupBook — how we handle your data and protect your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              MyMockupBook (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our free book mockup generator tool at mymockupbook.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.1 Information You Provide</h3>
            <p>
              Our tool does not require account registration or personal information. You can use the book mockup generator anonymously without providing any personally identifiable information.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.2 Uploaded Images</h3>
            <p>
              When you upload a book cover image to generate a mockup, the image is processed entirely in your browser using WebGL. Your uploaded files are never transmitted to our servers, stored in any database, or accessible to us or any third party. When you close the browser tab, the image is permanently deleted from your device&rsquo;s memory.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.3 Automatically Collected Information</h3>
            <p>
              Like most websites, we automatically collect certain technical information when you visit:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website</li>
            </ul>
            <p>
              This information is collected through standard web server logs and analytics tools to understand how visitors use our site and improve the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the automatically collected information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Analyze website traffic and user behavior to improve our tool</li>
              <li>Diagnose technical problems and maintain site security</li>
              <li>Understand which features are most popular</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies and Tracking Technologies</h2>
            <p>
              We use minimal cookies and similar tracking technologies to analyze site traffic and improve user experience. You can control cookie preferences through your browser settings. Our tool will function normally even if you block all cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p>
              We may use third-party services such as Google Analytics to understand site usage. These services may collect information about your visit according to their own privacy policies. We do not share personally identifiable information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
            <p>
              Because your uploaded images are processed locally in your browser and never transmitted to our servers, your book cover artwork remains completely private and secure. We implement industry-standard security measures to protect any automatically collected technical information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Children&rsquo;s Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided information to us, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
            <p>
              Depending on your location, you may have rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access to your data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Objection to processing</li>
              <li>Data portability</li>
            </ul>
            <p>
              To exercise these rights, contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our service after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your information, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@mymockupbook.com<br />
              Website: <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

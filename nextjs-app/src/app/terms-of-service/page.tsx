import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MyMockupBook",
  description: "Terms of service for using MyMockupBook — your rights and responsibilities when using our free book mockup generator.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using MyMockupBook (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              MyMockupBook provides a free, browser-based tool for generating book mockup images. You can upload book cover artwork, apply it to realistic book templates, and download the resulting mockup images for personal or commercial use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Use License</h2>
            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">3.1 Your Use of the Service</h3>
            <p>
              We grant you a non-exclusive, non-transferable, revocable license to use the Service for lawful purposes in accordance with these Terms.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">3.2 Generated Mockup Images</h3>
            <p>
              All mockup images you generate using the Service are yours to use without restriction. You may use them for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal projects</li>
              <li>Commercial projects</li>
              <li>Client work</li>
              <li>Marketing and promotional materials</li>
              <li>Portfolio pieces</li>
            </ul>
            <p>
              No attribution to MyMockupBook is required, though it is appreciated.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">3.3 Your Uploaded Content</h3>
            <p>
              You retain all ownership rights to the book cover artwork you upload. By uploading content, you represent that you have the right to use that content and that it does not infringe any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Service to create mockups containing illegal, defamatory, or obscene content</li>
              <li>Attempt to reverse-engineer, decompile, or extract the source code of the Service</li>
              <li>Use automated tools (bots, scrapers) to access the Service at scale</li>
              <li>Interfere with the proper functioning of the Service</li>
              <li>Impersonate MyMockupBook or falsely claim affiliation with us</li>
              <li>Use the Service to infringe intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>
              The Service, including its design, layout, code, and branding, is owned by MyMockupBook and protected by copyright and other intellectual property laws. The book template images and background assets used in mockup generation remain the property of MyMockupBook.
            </p>
            <p>
              You may not copy, reproduce, distribute, or create derivative works from the Service itself without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The Service is free of viruses or harmful components</li>
              <li>Results from using the Service will meet your requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, MyMockupBook shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service. Our total liability for any claim related to the Service is limited to $100 USD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Privacy</h2>
            <p>
              Your use of the Service is also governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>. Please review it to understand how we collect and use information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Service</h2>
            <p>
              We reserve the right to modify or discontinue the Service at any time without notice. We are not liable to you or any third party for any modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Your continued use of the Service after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts located in the United States.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              Email: support@mymockupbook.com<br />
              Website: <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

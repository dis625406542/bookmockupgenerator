import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MyMockupBook",
  description: "Get in touch with the MyMockupBook team. Questions, feedback, or support requests welcome.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12">
          Have a question, feedback, or need support? We&rsquo;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Get In Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Email</h3>
                <a href="mailto:support@mymockupbook.com" className="text-blue-600 hover:underline">
                  support@mymockupbook.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Response Time</h3>
                <p className="text-sm text-gray-600">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Before You Write</h2>
            <p className="text-sm text-gray-600 mb-4">
              Many common questions are answered in our FAQ sections on each tool page. Check there first for faster answers.
            </p>
            <a
              href="/#faq"
              className="inline-block text-sm text-blue-600 hover:underline font-medium"
            >
              View FAQ →
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Tell us more about your question or feedback..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Send Message
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our{" "}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            For urgent technical issues, please include your browser version and operating system in your message.
          </p>
        </div>
      </div>
    </div>
  );
}

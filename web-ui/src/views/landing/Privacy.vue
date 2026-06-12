<template>
  <LandingLayout
    h1="Privacy Policy"
    sub="How MyMockupBook handles your data."
    current-path="/privacy"
    :show-tool="false"
  >
    <h2>Overview</h2>
    <p>
      MyMockupBook is a client-side tool. Your uploaded images are processed entirely in
      your browser using WebGL. We do not upload, store, or transmit your cover images to
      any server.
    </p>

    <h2>Data We Collect</h2>
    <ul>
      <li><strong>Analytics</strong> — We use privacy-friendly analytics to understand page views and usage patterns. No personal data is collected.</li>
      <li><strong>No cookies for tracking</strong> — We do not use advertising cookies or third-party trackers.</li>
      <li><strong>No account data</strong> — We do not require signup, so we do not store emails, passwords, or profiles.</li>
    </ul>

    <h2>Your Images</h2>
    <p>
      All image processing happens locally in your browser. Your book cover files never
      leave your device. We cannot see, access, or recover any image you upload.
    </p>

    <h2>Third-Party Services</h2>
    <p>
      Our site is hosted on Vercel. Vercel may collect standard server logs (IP address,
      user agent) as part of normal web hosting. See
      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Vercel's Privacy Policy</a>
      for details.
    </p>

    <h2>Contact</h2>
    <p>
      For privacy-related questions, email
      <a href="mailto:support@mymockupbook.com"><strong>support@mymockupbook.com</strong></a>.
    </p>
  </LandingLayout>
</template>

<script>
export default {
  name: 'PrivacyPage',
  components: {
    LandingLayout: () => import('@/components/LandingLayout.vue'),
  },
  metaInfo: {
    title: 'Privacy Policy — MyMockupBook',
    meta: [
      { vmid: 'description', name: 'description', content: 'MyMockupBook privacy policy. Your images are processed in-browser and never uploaded to our servers. No tracking cookies, no account required.' },
      { vmid: 'og:title', property: 'og:title', content: 'Privacy Policy — MyMockupBook' },
      { vmid: 'og:url', property: 'og:url', content: 'https://www.mymockupbook.com/privacy' },
    ],
    link: [
      { rel: 'canonical', href: 'https://www.mymockupbook.com/privacy' },
    ],
  },
};
</script>

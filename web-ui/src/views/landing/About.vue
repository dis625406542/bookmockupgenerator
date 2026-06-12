<template>
  <LandingLayout
    h1="About MyMockupBook"
    sub="We build free tools for authors and designers who want professional book mockups without the hassle."
    current-path="/about"
    :show-tool="false"
  >
    <h2>Who We Are</h2>
    <p>
      MyMockupBook is a free online book mockup generator built for self-published authors,
      cover designers, and indie publishers. Our mission is simple: make it easy to create
      professional, realistic book mockup images without expensive software, design skills,
      or watermarks.
    </p>

    <h2>Why We Built This</h2>
    <p>
      We noticed that most mockup tools either charge a subscription, slap a watermark on
      your downloads, or require Photoshop expertise. Authors launching on Amazon KDP
      or promoting on social media deserve a fast, free option that just works. So we built one.
    </p>

    <h2>What We Offer</h2>
    <ul>
      <li><strong>Free forever</strong> — no hidden fees, no premium tier required for basic use.</li>
      <li><strong>No watermark</strong> — every download is clean and ready to publish.</li>
      <li><strong>No signup</strong> — start creating the moment you land on the page.</li>
      <li><strong>Browser-based</strong> — works on any device, no software to install.</li>
    </ul>

    <h2>Contact Us</h2>
    <p>
      Questions, feedback, or partnership inquiries? Reach us at
      <a href="mailto:support@mymockupbook.com"><strong>support@mymockupbook.com</strong></a>.
    </p>
  </LandingLayout>
</template>

<script>
export default {
  name: 'AboutPage',
  components: {
    LandingLayout: () => import('@/components/LandingLayout.vue'),
  },
  metaInfo: {
    title: 'About MyMockupBook — Free Book Mockup Generator',
    meta: [
      { vmid: 'description', name: 'description', content: 'Learn about MyMockupBook — a free online book mockup generator for authors, designers, and publishers. No watermark, no signup, browser-based.' },
      { vmid: 'og:title', property: 'og:title', content: 'About MyMockupBook' },
      { vmid: 'og:description', property: 'og:description', content: 'Free online book mockup generator for authors, designers, and publishers.' },
      { vmid: 'og:url', property: 'og:url', content: 'https://www.mymockupbook.com/about' },
    ],
    link: [
      { rel: 'canonical', href: 'https://www.mymockupbook.com/about' },
    ],
  },
};
</script>

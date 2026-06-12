<template>
  <LandingLayout
    h1="Contact Us"
    sub="Have a question, suggestion, or partnership inquiry? We'd love to hear from you."
    current-path="/contact"
    :show-tool="false"
  >
    <h2>Email</h2>
    <p>
      The fastest way to reach us is by email:
      <a href="mailto:support@mymockupbook.com"><strong>support@mymockupbook.com</strong></a>
    </p>
    <p>We typically respond within 24–48 hours.</p>

    <h2>What You Can Reach Out About</h2>
    <ul>
      <li><strong>Bug reports</strong> — something not working as expected? Let us know.</li>
      <li><strong>Feature requests</strong> — want a new book template or export format? Tell us.</li>
      <li><strong>Partnership inquiries</strong> — integrations, affiliate, or bulk use cases.</li>
      <li><strong>General feedback</strong> — we read every message.</li>
    </ul>

    <h2>Social</h2>
    <p>
      We are working on building our community. Follow along as we add new templates and
      features.
    </p>
  </LandingLayout>
</template>

<script>
export default {
  name: 'ContactPage',
  components: {
    LandingLayout: () => import('@/components/LandingLayout.vue'),
  },
  metaInfo: {
    title: 'Contact Us — MyMockupBook',
    meta: [
      { vmid: 'description', name: 'description', content: 'Contact the MyMockupBook team. Email support@mymockupbook.com for bug reports, feature requests, partnership inquiries, or general feedback.' },
      { vmid: 'og:title', property: 'og:title', content: 'Contact Us — MyMockupBook' },
      { vmid: 'og:url', property: 'og:url', content: 'https://www.mymockupbook.com/contact' },
    ],
    link: [
      { rel: 'canonical', href: 'https://www.mymockupbook.com/contact' },
    ],
  },
};
</script>

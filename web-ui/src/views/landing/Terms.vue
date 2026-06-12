<template>
  <LandingLayout
    h1="Terms of Service"
    sub="By using MyMockupBook you agree to the following terms."
    current-path="/terms"
    :show-tool="false"
  >
    <h2>Acceptance</h2>
    <p>
      By accessing or using MyMockupBook (mymockupbook.com), you agree to be bound by
      these Terms of Service. If you do not agree, please do not use the site.
    </p>

    <h2>Service Description</h2>
    <p>
      MyMockupBook provides a free, browser-based book mockup generator. You upload a book
      cover image and the tool renders it onto a realistic book template. The service is
      provided "as is" without warranty.
    </p>

    <h2>Your Content</h2>
    <p>
      You retain full ownership of any images you upload. Since all processing happens
      locally in your browser, we never access, store, or claim rights to your content.
    </p>

    <h2>Acceptable Use</h2>
    <ul>
      <li>Do not use the service for any unlawful purpose.</li>
      <li>Do not upload content that infringes on others' intellectual property rights.</li>
      <li>Do not attempt to disrupt or overload the service.</li>
    </ul>

    <h2>Limitation of Liability</h2>
    <p>
      MyMockupBook is provided free of charge. To the maximum extent permitted by law,
      we are not liable for any damages arising from your use of the service.
    </p>

    <h2>Changes</h2>
    <p>
      We may update these terms from time to time. Continued use of the service after
      changes constitutes acceptance of the new terms.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about these terms? Email
      <a href="mailto:support@mymockupbook.com"><strong>support@mymockupbook.com</strong></a>.
    </p>
  </LandingLayout>
</template>

<script>
export default {
  name: 'TermsPage',
  components: {
    LandingLayout: () => import('@/components/LandingLayout.vue'),
  },
  metaInfo: {
    title: 'Terms of Service — MyMockupBook',
    meta: [
      { vmid: 'description', name: 'description', content: 'Terms of Service for MyMockupBook. Free book mockup generator — your images stay in your browser, we never access them.' },
      { vmid: 'og:title', property: 'og:title', content: 'Terms of Service — MyMockupBook' },
      { vmid: 'og:url', property: 'og:url', content: 'https://www.mymockupbook.com/terms' },
    ],
    link: [
      { rel: 'canonical', href: 'https://www.mymockupbook.com/terms' },
    ],
  },
};
</script>

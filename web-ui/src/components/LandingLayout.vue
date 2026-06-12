<template>
  <div class="landing-page">
    <Header />

    <!-- Hero + 工具：宽布局，和首页一致 -->
    <div class="landing-tool-wrap">
      <section class="hero">
        <h1>{{ h1 }}</h1>
        <p class="hero-sub">{{ sub }}</p>
        <p v-if="showTool" class="hero-note">No watermark · No signup · Download in JPG &amp; PNG</p>
      </section>

      <template v-if="showTool">
        <MockupTool />
        <ImageCarousel />
      </template>
    </div>

    <main class="landing-main">
      <!-- 主体内容插槽 -->
      <article class="landing-body">
        <slot />
      </article>

      <!-- 底部再次 CTA -->
      <section class="cta-band">
        <h2>{{ ctaTitle }}</h2>
        <a href="/" class="cta-primary">Create Your Mockup Now →</a>
      </section>

      <!-- 互链：其他落地页 -->
      <nav class="related-links" aria-label="Related tools">
        <h2>More Book Mockup Tools</h2>
        <ul>
          <li v-for="link in otherLinks" :key="link.path">
            <a :href="link.path">{{ link.label }}</a>
          </li>
        </ul>
      </nav>
    </main>

    <footer class="landing-footer">
      <p>© {{ year }} MyMockupBook — Free Book Mockup Generator. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
const ALL_LINKS = [
  { path: '/', label: 'Free Book Mockup Generator' },
  { path: '/free-book-mockup-generator', label: 'Free Book Mockup Generator (No Watermark)' },
  { path: '/book-cover-mockup-generator', label: 'Book Cover Mockup Generator' },
  { path: '/ebook-mockup-generator', label: 'eBook Mockup Generator' },
  { path: '/hardcover-book-mockup', label: 'Hardcover Book Mockup' },
  { path: '/3d-book-mockup-generator', label: '3D Book Mockup Generator' },
  { path: '/paperback-book-mockup', label: 'Paperback Book Mockup' },
];

export default {
  name: 'LandingLayout',
  components: {
    Header: () => import('@/components/Header.vue'),
    MockupTool: () => import('@/components/MockupTool.vue'),
    ImageCarousel: () => import('@/components/ImageCarousel.vue'),
  },
  props: {
    h1: { type: String, required: true },
    sub: { type: String, required: true },
    ctaTitle: { type: String, default: 'Ready to design your book mockup?' },
    currentPath: { type: String, required: true },
    showTool: { type: Boolean, default: true },
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    otherLinks() {
      return ALL_LINKS.filter(l => l.path !== this.currentPath);
    },
  },
};
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #ffffff;
  color: #1f2937;
}
.landing-tool-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 1rem;
}
.landing-main {
  max-width: 860px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}
.hero {
  text-align: center;
  padding: 2rem 0 2.5rem;
  border-bottom: 1px solid #eef0f3;
}
.hero h1 {
  font-size: 2.1rem;
  line-height: 1.25;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem;
}
.hero-sub {
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 640px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}
.cta-primary {
  display: inline-block;
  background: #ef4444;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  transition: background 0.2s;
}
.cta-primary:hover {
  background: #dc2626;
}
.hero-note {
  font-size: 0.85rem;
  color: #9ca3af;
  margin-top: 0.85rem;
}
.landing-body {
  padding: 2.5rem 0;
  font-size: 1.02rem;
  line-height: 1.75;
  color: #374151;
}
.landing-body :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 2.25rem 0 1rem;
}
.landing-body :deep(h3) {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 0.6rem;
}
.landing-body :deep(p) {
  margin: 0 0 1.1rem;
}
.landing-body :deep(ul) {
  margin: 0 0 1.2rem;
  padding-left: 1.4rem;
}
.landing-body :deep(li) {
  margin-bottom: 0.5rem;
}
.landing-body :deep(strong) {
  color: #111827;
}
.cta-band {
  text-align: center;
  background: #f9fafb;
  border: 1px solid #eef0f3;
  border-radius: 12px;
  padding: 2.5rem 1.5rem;
  margin: 1rem 0 2.5rem;
}
.cta-band h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
  color: #111827;
}
.related-links {
  border-top: 1px solid #eef0f3;
  padding-top: 1.75rem;
}
.related-links h2 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 1rem;
}
.related-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.25rem;
}
.related-links a {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.95rem;
}
.related-links a:hover {
  text-decoration: underline;
}
.landing-footer {
  text-align: center;
  padding: 2rem 1rem;
  border-top: 1px solid #eef0f3;
  color: #9ca3af;
  font-size: 0.85rem;
}
@media (max-width: 768px) {
  .hero h1 { font-size: 1.6rem; }
  .hero-sub { font-size: 1rem; }
}
</style>

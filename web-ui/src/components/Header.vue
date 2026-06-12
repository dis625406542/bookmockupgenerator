<template>
  <div class="header">
    <div class="header-content">
      <!-- Logo + Brand -->
      <a href="/" class="logo">
        <img src="/logo.png" alt="MyMockupBook" class="logo-img" />
        <span class="brand-name">MyMockupBook</span>
      </a>

      <!-- 中间导航 -->
      <nav class="nav-links">
        <a href="/" class="nav-link">Generator</a>
        <a href="/#how-it-works" class="nav-link">How It Works</a>
        <a href="/#templates" class="nav-link">Templates</a>
        <a href="/#faq" class="nav-link">FAQ</a>
      </nav>

      <!-- 右侧 CTA -->
      <a href="/" class="cta-btn">Create Mockup</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
}

.header-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-img {
  height: 36px;
  width: auto;
  display: block;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  margin: 0 auto;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #3b82f6;
}

.cta-btn {
  display: inline-block;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.88rem;
  transition: background 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.cta-btn:hover {
  background: #2563eb;
}

/* 平板：收起中间导航 */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
    height: 50px;
    gap: 1rem;
  }

  .logo-img {
    height: 30px;
  }

  .brand-name {
    font-size: 0.95rem;
  }

  .cta-btn {
    padding: 6px 12px;
    font-size: 0.82rem;
  }
}
</style>

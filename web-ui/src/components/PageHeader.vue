<template>
  <div class="page-header">
    <div class="page-header-content">
      <h1 class="page-title">{{ title }}</h1>
      <div class="breadcrumbs">
        <span class="breadcrumb-item">Home</span>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-item">Print</span>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-item current">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: 'Book Mockup Generator Tool'
    }
  }
}
</script>

<style scoped>
.page-header {
  background: white;
  padding: 24px 0;
  border-bottom: 1px solid #e5e7eb;
}

.page-header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.breadcrumb-item {
  color: #6b7280;
}

.breadcrumb-item.current {
  color: #374151;
  font-weight: 500;
}

.breadcrumb-separator {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
}
</style>

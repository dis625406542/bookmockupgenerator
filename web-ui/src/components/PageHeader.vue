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
  background: transparent; /* 改为透明，因为父容器已经是白色背景 */
  padding: 0; /* 移除所有padding，避免多余的白色区域 */
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
}

.page-header-content {
  /* 移除max-width限制，让PageHeader真正覆盖全屏 */
  width: 100%;
  margin: 0;
  padding: 24px 6rem; /* 增加左右边距，与页面其他部分保持一致 */
  text-align: left; /* 确保内容左对齐 */
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
  .page-header-content {
    padding: 24px 2rem; /* 移动端减少左右边距 */
  }
  
  .page-title {
    font-size: 24px;
  }
}
</style>

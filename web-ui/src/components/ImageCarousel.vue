<template>
  <div class="image-carousel">
    <div class="carousel-header">
      <span style="font-size: 20px;">More like this</span>
    </div>
    
    <div class="carousel-container">
      <div class="carousel-wrapper" :style="{ transform: `translateX(${translateX}px)` }">
        <div 
          v-for="(item, index) in carouselItems" 
          :key="index"
          class="carousel-item"
          :class="{ active: currentIndex === index }"
        >
          <div class="item-image">
            <div class="mockup-placeholder">
              <span>YOUR IMAGE HERE</span>
            </div>
          </div>
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
      
      <button 
        class="carousel-arrow carousel-arrow-left" 
        @click="prevSlide"
        :disabled="currentIndex === 0"
      >
        <i class="el-icon-arrow-left"></i>
      </button>
      
      <button 
        class="carousel-arrow carousel-arrow-right" 
        @click="nextSlide"
        :disabled="currentIndex === carouselItems.length - 1"
      >
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
    
    <div class="browse-all-section">
      <el-button type="primary" class="browse-all-btn">
        Browse all mockups
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  data() {
    return {
      currentIndex: 0,
      translateX: 0,
      autoPlayInterval: null,
      carouselItems: [
        {
          title: 'Square Paperback Book Cover Mockup for Indie Author Branding'
        },
        {
          title: 'Square Paperback Book Cover Mockup Angled View'
        },
        {
          title: 'Realistic Open Book Page Mockup with Hard Cover for Presentations'
        },
        {
          title: 'Open Book Page Mockup with Hard Cover'
        },
        {
          title: 'Top View of Open Book Mockup Generator for Publications'
        },
        {
          title: 'Book Table Mockup with Bookshelf Background'
        }
      ]
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeDestroy() {
    this.stopAutoPlay();
  },
  methods: {
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000); // 每3秒自动切换
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.carouselItems.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateTranslateX();
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.carouselItems.length - 1;
      }
      this.updateTranslateX();
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.updateTranslateX();
    },
    updateTranslateX() {
      const itemWidth = 200; // 每个轮播项的宽度
      const gap = 20; // 项目之间的间距
      this.translateX = -(this.currentIndex * (itemWidth + gap));
    }
  }
}
</script>

<style scoped>
.image-carousel {
  margin-top: 0; /* 移除顶部间距，与信息模块自然衔接 */
  margin-left: 0; /* 移除左边距 */
  padding: 0 0; /* 减少内边距，只保留上下间距 */
  background: transparent; /* 移除白色背景 */
  border-radius: 0; /* 移除圆角 */
  box-shadow: none; /* 移除阴影 */
}

.carousel-header {
  text-align: left;
  margin-bottom: 1.5rem; /* 减少标题下方间距 */
  position: relative; /* 移除sticky定位 */
  background: transparent; /* 移除背景 */
  z-index: 1;
  padding: 0; /* 移除内边距 */
}

.carousel-header h3 {
  font-size: 1.5rem; /* 稍微减小字体 */
  font-weight: 700; /* 调整字重 */
  color: #1a1a1a;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: -0.3px;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  border-radius: 0; /* 移除圆角 */
  background: transparent; /* 移除背景 */
  border: none; /* 移除边框 */
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* 稍微加快动画 */
  padding: 0.5rem 0; /* 减少内边距 */
  gap: 20px; /* 增加项目间距 */
}

.carousel-item {
  flex: 0 0 200px; /* 稍微减小项目宽度 */
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel-item:hover {
  transform: translateY(-4px); /* 减少悬停效果 */
}

.carousel-item.active {
  transform: scale(1.02); /* 减少激活状态的缩放 */
}

.item-image {
  width: 200px; /* 调整图片尺寸 */
  height: 200px;
  border-radius: 6px; /* 减小圆角 */
  overflow: hidden;
  border: 1px solid #f0f0f0; /* 更淡的边框 */
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  background: #fafafa; /* 更淡的背景色 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item:hover .item-image {
  border-color: #e0e0e0; /* 悬停时稍微深一点的边框 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); /* 更淡的阴影 */
}

.mockup-placeholder {
  color: #9ca3af; /* 更淡的文字颜色 */
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  line-height: 1.4;
}

.item-title {
  font-size: 0.75rem; /* 稍微减小字体 */
  font-weight: 500;
  color: #4b5563; /* 更淡的文字颜色 */
  margin-top: 0.5rem;
  line-height: 1.3;
  text-align: left;
  padding: 0 0.25rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px; /* 稍微减小箭头尺寸 */
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #f3f4f6; /* 更淡的背景色 */
  color: #6b7280; /* 更淡的图标颜色 */
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* 更淡的阴影 */
  z-index: 10;
}

.carousel-arrow:hover {
  transform: translateY(-50%) scale(1.05);
  background: #e5e7eb; /* 悬停时稍微深一点的背景 */
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
}

.carousel-arrow:disabled {
  background: #f9fafb;
  color: #d1d5db;
  cursor: not-allowed;
  transform: translateY(-50%) scale(0.95);
}

.carousel-arrow-left {
  left: 10px; /* 调整位置 */
}

.carousel-arrow-right {
  right: 10px;
}

.browse-all-section {
  text-align: center;
  margin-top: 1.5rem; /* 减少顶部间距 */
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0; /* 更淡的分隔线 */
}

.browse-all-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important; /* 更柔和的渐变色 */
  border: none !important;
  padding: 10px 28px !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  border-radius: 6px !important;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2) !important;
  transition: all 0.3s ease !important;
}

.browse-all-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-item {
    flex: 0 0 160px;
  }
  
  .item-image {
    width: 160px;
    height: 160px;
  }
  
  .carousel-arrow {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
  
  .carousel-header h3 {
    font-size: 1.3rem;
  }
}
</style>

<template>
  <div class="image-carousel">
    <div class="carousel-header">
      <span class="header-title">More like this</span>
      <el-button type="primary" class="browse-all-btn">
        Browse all mockups
      </el-button>
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
            <img :src="bookImage" alt="Book mockup" class="mockup-image" />
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
    </div>
</template>

<script>
// 导入 book5.jpg 图片
import bookImage from '@/assets/images/book5.jpg';

export default {
  name: 'ImageCarousel',
  data() {
    return {
      currentIndex: 0,
      translateX: 0,
      autoPlayInterval: null,
      bookImage: bookImage, // 添加图片数据
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
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
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

.mockup-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.carousel-item:hover .item-image {
  border-color: #e0e0e0; /* 悬停时稍微深一点的边框 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); /* 更淡的阴影 */
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
  background: #ff6b6b !important; /* 明显的红色背景 */
  border: none !important;
  color: #ffffff !important; /* 白色文字 */
  padding: 8px 16px !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  border-radius: 6px !important;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3) !important;
  transition: all 0.3s ease !important;
  height: auto !important;
  line-height: 1.4 !important;
  min-width: 120px !important;
}

.browse-all-btn:hover {
  background: #ff5252 !important; /* 悬停时更深的红色 */
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4) !important;
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

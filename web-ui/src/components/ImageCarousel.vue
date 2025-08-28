<template>
  <div class="image-carousel">
    <div class="carousel-header">
      <h3>More like this</h3>
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
  margin-top: 3rem;
  margin-left: -4rem; /* 进一步向左移动，与信息模块扩展后的左边完全对齐 */
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.carousel-header {
  text-align: left;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 10;
  padding: 1rem 0;
}

.carousel-header h3 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: -0.5px;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 1.5rem;
  gap: 16px;
}

.carousel-item {
  flex: 0 0 220px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel-item:hover {
  transform: translateY(-8px);
}

.carousel-item.active {
  transform: scale(1.05);
}

.item-image {
  width: 220px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item:hover .item-image {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mockup-placeholder {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  line-height: 1.4;
}

.item-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  margin-top: 0.75rem;
  line-height: 1.3;
  text-align: left;
  padding: 0 0.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.carousel-arrow:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.carousel-arrow:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: translateY(-50%) scale(0.9);
}

.carousel-arrow-left {
  left: 20px;
}

.carousel-arrow-right {
  right: 20px;
}

.browse-all-section {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.browse-all-btn {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%) !important;
  border: none !important;
  padding: 12px 32px !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3) !important;
  transition: all 0.3s ease !important;
}

.browse-all-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-item {
    flex: 0 0 180px;
  }
  
  .item-image {
    width: 180px;
    height: 180px;
  }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .carousel-header h3 {
    font-size: 1.4rem;
  }
}
</style>

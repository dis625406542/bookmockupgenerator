<template>
  <div class="home-container">
    <header class="main-header">
      <div class="logo">BookMockup</div>
      <div class="actions">
        <router-link to="/coordinate-picker" class="nav-link">
          <el-button type="info" round>坐标选择器</el-button>
        </router-link>
        <el-button type="primary" round>Upgrade</el-button>
        <el-avatar icon="el-icon-user-solid" style="margin-left: 15px;"></el-avatar>
      </div>
    </header>

    <main class="main-content">
      <div class="preview-wrapper">
        <PreviewArea ref="previewArea" :cover-image-url="coverImageUrl" />
        <div class="image-info">
          <p><strong>专业的书模型生成器</strong> 支持动态封面展示，完美适合作者和设计师预览封面艺术效果</p>
          <div class="tags">
            <span>mockup</span>
            <span>book</span>
            <span>paperback</span>
            <span>online mockup</span>
          </div>
        </div>
      </div>
      
      <div class="controls-wrapper">
        <ControlPanel @request-upload="handleRequestUpload" @test-hand-mask="testHandMask" />
        <div style="margin-top: 1rem;">
          <el-button type="warning" @click="resetToBackground">显示纯背景</el-button>
          <el-button type="primary" @click="forceBackgroundRender">测试固定图片渲染</el-button>
        </div>
      </div>
    </main>

    <ImageCarousel />

    <ImageUploader 
      :visible.sync="showUploader"
      @image-cropped="handleImageCropped"
    />
  </div>
</template>

<script>
import PreviewArea from '../components/PreviewArea.vue';
import ControlPanel from '../components/ControlPanel.vue';
import ImageUploader from '../components/ImageUploader.vue';
import ImageCarousel from '../components/ImageCarousel.vue';
import { mergeUserImageWithHandMask, testHandMaskLoading } from '../utils/imageProcessor';

export default {
  name: 'Home',
  components: {
    PreviewArea,
    ControlPanel,
    ImageUploader,
    ImageCarousel,
  },
  data() {
    return {
      coverImageUrl: null, // 初始为null，显示背景图片
      showUploader: false,
      currentEditingType: 'cover',
    };
  },
  methods: {
    handleRequestUpload(type) {
      this.currentEditingType = type;
      this.showUploader = true;
    },

    async handleImageCropped(croppedImage) {
      if (this.currentEditingType === 'cover') {
        try {
          // 使用手部覆盖算法处理图片
          console.log('应用手部覆盖效果...');
          const mergedImageUrl = await mergeUserImageWithHandMask(croppedImage);
          
          // 更新封面图片
          this.coverImageUrl = mergedImageUrl;
          
          this.$message({
            message: '封面图片处理成功！',
            type: 'success',
            duration: 3000
          });
          
        } catch (error) {
          console.error('手部覆盖效果应用失败:', error);
          
          // 显示错误消息
          this.$message({
            message: `手部覆盖效果应用失败: ${error.message}`,
            type: 'error',
            duration: 5000
          });
          
          // 降级：直接使用裁剪后的图片
          this.coverImageUrl = croppedImage;
        }
      }
      this.showUploader = false;
    },
    
    async testHandMask() {
      try {
        console.log('开始测试手部遮罩加载...');
        const result = await testHandMaskLoading();
        console.log('手部遮罩测试成功:', result);
        
        this.$message({
          message: `手部遮罩测试成功！检测到 ${result.nonWhitePixels} 个非白色像素`,
          type: 'success',
          duration: 5000
        });
      } catch (error) {
        console.error('手部遮罩测试失败:', error);
        
        this.$message({
          message: `手部遮罩测试失败: ${error.message}`,
          type: 'error',
          duration: 5000
        });
      }
    },



    resetToBackground() {
      console.log('重置为背景图片...');
      console.log('当前coverImageUrl:', this.coverImageUrl);
      this.coverImageUrl = null;
      console.log('重置后coverImageUrl:', this.coverImageUrl);
      
      // 强制触发重新渲染
      this.$nextTick(() => {
        if (this.$refs.previewArea && this.$refs.previewArea.forceRerender) {
          this.$refs.previewArea.forceRerender();
        }
      });
      
      this.$message({
        message: '已重置为背景图片',
        type: 'info',
        duration: 3000
      });
    },

    forceBackgroundRender() {
      console.log('强制背景渲染...');
      console.log('将book-with-hands-fixed.png渲染到book-background1.jpg背景上...');
      
      // 设置固定图片作为封面，让它渲染到背景上
      this.coverImageUrl = require('@/assets/images/book-with-hands-fixed.png');
      
      this.$message({
        message: '已将固定图片渲染到背景上',
        type: 'success',
        duration: 3000
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.actions {
  display: flex;
  align-items: center;
}

.main-content {
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 0 3rem;
}

.preview-wrapper {
  width: 520px;
  flex-shrink: 0;
}

.controls-wrapper {
  width: 480px;
  flex-shrink: 0;
}

.image-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
}

.image-info p {
  line-height: 1.6;
  color: var(--text-color-secondary);
}

.tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tags span {
  background-color: var(--background-color);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  color: var(--text-color-secondary);
}

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }
}
</style> 

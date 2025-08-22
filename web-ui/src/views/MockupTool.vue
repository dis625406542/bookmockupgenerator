<template>
    <div class="mockup-tool-container">
      <el-card class="header-card">
        <div class="header-content">
          <h1 class="main-title">书本模型生成器工具</h1>
          <p class="subtitle">
            基于Canvas的分层渲染与透视变换技术
          </p>
          <router-link to="/">
            <el-button type="text" icon="el-icon-arrow-left">返回首页</el-button>
          </router-link>
        </div>
      </el-card>
  
      <div class="content-grid">
        <!-- 控制面板 -->
        <el-card class="control-panel">
          <div slot="header" class="card-header">
            <h2 class="card-title">控制面板</h2>
          </div>
  
          <div class="upload-section">
            <label class="upload-label">
              1. 上传封面图片 (例如：小狗图片)
            </label>
            <el-upload
              class="image-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageUpload"
              accept="image/*"
            >
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
            <img
              ref="previewImage"
              class="preview-image"
              alt="上传图片预览"
            />
          </div>
  
          <div class="render-section">
            <el-button
              type="primary"
              @click="handleRender"
              :loading="isLoading"
              class="render-button"
            >
              {{ isLoading ? '正在渲染...' : '2. 渲染封面' }}
            </el-button>
          </div>
  
          <el-alert
            title="说明"
            type="warning"
            :closable="false"
            show-icon
          >
            <p class="alert-content">
              此工具演示了如何将您上传的图片，通过透视变换算法，精准地嵌入到模板中，并利用前景蒙版实现手指的遮挡效果。
            </p>
          </el-alert>
        </el-card>
  
        <!-- 渲染结果 -->
        <el-card class="result-panel">
          <div slot="header" class="card-header">
            <h2 class="card-title">渲染效果</h2>
          </div>
          <div ref="canvasContainer" class="canvas-container">
            <canvas ref="mockupCanvas"></canvas>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  // 【重要】这是在Vue项目中引入图片的标准方式
  import bookBackground1 from '@/assets/images/book-background1.jpg';
  import bookHighlights1 from '@/assets/images/book-highlights1.png';
  import bookMask1 from '@/assets/images/book-mask1.png';
  
  export default {
    name: 'MockupTool',
    data() {
      return {
        userImage: null, // 存储用户上传的图片对象
        isLoading: false,
        // 模板数据现在直接定义在组件内部
        template: {
          id: 'child-book',
          width: 800,
          height: 600,
          layers: [
            { type: 'image', src: bookBackground1, id: 'background' },
            {
              type: 'transformed-image',
              name: 'cover',
              destPoints: [
                { x: 385, y: 102 }, { x: 704, y: 125 },
                { x: 631, y: 526 }, { x: 312, y: 490 },
              ],
            },
            { type: 'image', src: bookHighlights1, id: 'highlights' },
            { type: 'image', src: bookMask1, id: 'mask' },
          ],
        },
      };
    },
    mounted() {
      // 页面加载后，首先渲染一次基础模板
      this.renderMockup(null);
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.renderMockup(this.userImage);
        }, 200);
      },
  
      handleImageUpload(file) {
        if (file.raw) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              this.userImage = await this.loadImage(e.target.result);
              this.$refs.previewImage.src = e.target.result;
              this.$refs.previewImage.style.display = 'block';
            } catch (error) {
              this.$message.error('加载预览图片失败！');
              console.error(error);
            }
          };
          reader.readAsDataURL(file.raw);
        }
      },
  
      handleRender() {
        if (!this.userImage) {
          this.$message.warning('请先上传一张封面图片！');
          return;
        }
        this.renderMockup(this.userImage);
      },
  
      loadImage(src) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(`图片加载失败: ${src}, ${err}`);
          img.src = src;
        });
      },
  
      adjustCanvasSize(canvas) {
        const container = this.$refs.canvasContainer;
        if (!container) return;
        const containerWidth = container.clientWidth;
        const aspectRatio = this.template.width / this.template.height;
        canvas.width = containerWidth;
        canvas.height = containerWidth / aspectRatio;
      },
  
      async renderMockup(coverImage) {
        this.isLoading = true;
        const canvas = this.$refs.mockupCanvas;
        const ctx = canvas.getContext('2d');
  
        try {
          const imageResources = {};
          const promises = this.template.layers
            .filter(layer => layer.type === 'image' && layer.src)
            .map(layer => this.loadImage(layer.src).then(img => {
              imageResources[layer.id] = img;
            }));
          
          await Promise.all(promises);
  
          this.adjustCanvasSize(canvas);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const scale = canvas.width / this.template.width;
  
          for (const layer of this.template.layers) {
            if (layer.type === 'image') {
              const img = imageResources[layer.id];
              if (img) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            } else if (layer.type === 'transformed-image' && layer.name === 'cover') {
              if (coverImage) {
                this.drawTransformedImage(ctx, coverImage, layer.destPoints, scale);
              }
            }
          }
        } catch (error) {
          console.error("渲染过程中出错:", error);
          this.$message.error("渲染失败，请检查控制台。");
        } finally {
          this.isLoading = false;
        }
      },
  
      drawTransformedImage(ctx, image, destPoints, scale) {
        const dest = destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));
        const src = [
          { x: 0, y: 0 },
          { x: image.width, y: 0 },
          { x: image.width, y: image.height },
          { x: 0, y: image.height },
        ];
        this.drawTriangle(ctx, image, [src[0], src[1], src[2]], [dest[0], dest[1], dest[2]]);
        this.drawTriangle(ctx, image, [src[0], src[2], src[3]], [dest[0], dest[2], dest[3]]);
      },
  
      drawTriangle(ctx, image, src, dst) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(dst[0].x, dst[0].y);
        ctx.lineTo(dst[1].x, dst[1].y);
        ctx.lineTo(dst[2].x, dst[2].y);
        ctx.closePath();
        ctx.clip();
        const t = this.getTransform(src, dst);
        ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
        ctx.drawImage(image, 0, 0);
        ctx.restore();
      },
  
      getTransform(src, dst) {
        const D = src[0].x * (src[1].y - src[2].y) + src[1].x * (src[2].y - src[0].y) + src[2].x * (src[0].y - src[1].y);
        if (D === 0) return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
        return {
          a: (dst[0].x * (src[1].y - src[2].y) + dst[1].x * (src[2].y - src[0].y) + dst[2].x * (src[0].y - src[1].y)) / D,
          b: (dst[0].y * (src[1].y - src[2].y) + dst[1].y * (src[2].y - src[0].y) + dst[2].y * (src[0].y - src[1].y)) / D,
          c: (dst[0].x * (src[2].x - src[1].x) + dst[1].x * (src[0].x - src[2].x) + dst[2].x * (src[1].x - src[0].x)) / D,
          d: (dst[0].y * (src[2].x - src[1].x) + dst[1].y * (src[0].x - src[2].x) + dst[2].y * (src[1].x - src[0].x)) / D,
          e: (dst[0].x * (src[1].y * src[2].x - src[2].y * src[1].x) + dst[1].x * (src[2].y * src[0].x - src[0].y * src[2].x) + dst[2].x * (src[0].y * src[1].x - src[1].y * src[0].x)) / D,
          f: (dst[0].y * (src[1].y * src[2].x - src[2].y * src[1].x) + dst[1].y * (src[2].y * src[0].x - src[0].y * src[2].x) + dst[2].y * (src[0].y * src[1].x - src[1].y * src[0].x)) / D,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .mockup-tool-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .header-card {
    margin-bottom: 2rem;
  }
  
  .header-content {
    text-align: center;
  }
  
  .main-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #303133;
    margin: 0 0 0.5rem 0;
  }
  
  .subtitle {
    font-size: 1.125rem;
    color: #606266;
    margin: 0 0 1rem 0;
  }
  
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .control-panel,
  .result-panel {
    height: fit-content;
  }
  
  .card-header {
    border-bottom: 1px solid #e4e7ed;
    padding-bottom: 0.5rem;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #303133;
    margin: 0;
  }
  
  .upload-section {
    margin-bottom: 1.5rem;
  }
  
  .upload-label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #606266;
    margin-bottom: 0.5rem;
  }
  
  .image-uploader {
    margin-bottom: 1rem;
  }
  
  .preview-image {
    max-height: 160px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: none;
  }
  
  .render-section {
    margin-bottom: 1.5rem;
  }
  
  .render-button {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .alert-content {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .canvas-container {
    width: 100%;
  }
  
  canvas {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: auto;
  }
  </style>
    
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
            :disabled="!userImage"
            class="render-button"
          >
            {{ isLoading ? '正在渲染...' : '2. 渲染封面（智能合成手部遮罩）' }}
          </el-button>
          <p class="render-hint">自动执行：先合成手部遮罩，再应用到书本模板</p>
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
              { x: 259, y: 136 }, // 左上：向右移动100px
              { x: 548, y: 134 }, // 右上：向右移动100px
              { x: 548, y: 495 }, // 右下：向右移动100px
              { x: 255, y: 503 }, // 左下：向右移动100px
            ],
          },
          { type: 'image', src: bookHighlights1, id: 'highlights' },
          { type: 'image', src: bookMask1, id: 'mask' },
        ],
      },
    };
  },
  mounted() {
    // 等待DOM完全渲染后再初始化
    this.$nextTick(() => {
      console.log('DOM已渲染完成，开始显示背景图');
      // 延迟一点时间确保Canvas完全准备好
      setTimeout(() => {
        this.showBackgroundOnly();
      }, 100);
    });
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
      // 自动执行智能合成流程：先合成手部遮罩，再进行书本渲染
      this.renderWithSmartMerge();
    },

    // 智能渲染：自动合成手部遮罩，再进行书本渲染
    async renderWithSmartMerge() {
      this.isLoading = true;
      
      try {
        console.log('=== 开始智能渲染流程 ===');
        
        // 第一步：合成用户图片与手部遮罩
        const mergedUserImage = await this.mergeUserImageWithHandMask(this.userImage);
        
        if (!mergedUserImage) {
          this.$message.error('图片合成失败，请重试！');
          return;
        }
        
        // 第二步：使用合成后的图片进行书本渲染
        await this.renderMockupWithMergedImage(mergedUserImage);
        
        console.log('=== 智能渲染完成 ===');
        
      } catch (error) {
        console.error('智能渲染过程中出错:', error);
        this.$message.error('渲染失败，请检查控制台。');
      } finally {
        this.isLoading = false;
      }
    },

    loadImage(src) {
      return new Promise((resolve, reject) => {
        console.log('开始加载图片:', src);
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
          console.log('图片加载成功:', src, '尺寸:', img.width, 'x', img.height);
          resolve(img);
        };
        
        img.onerror = (err) => {
          console.error('图片加载失败:', src, err);
          reject(`图片加载失败: ${src}, ${err}`);
        };
        
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

    // 显示背景图（页面初始化时使用）
    async showBackgroundOnly() {
      const canvas = this.$refs.mockupCanvas;
      if (!canvas) {
        console.error('Canvas未找到');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('无法获取Canvas上下文');
        return;
      }

      try {
        console.log('开始显示背景图');
        
        // 调整Canvas尺寸
        this.adjustCanvasSize(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 只加载并显示背景图
        const backgroundLayer = this.template.layers.find(l => l.id === 'background');
        if (backgroundLayer) {
          console.log('加载背景图片:', backgroundLayer.src);
          const backgroundImg = await this.loadImage(backgroundLayer.src);
          
          // 修复：保持背景图原始宽高比，自适应显示
          const bgAspectRatio = backgroundImg.width / backgroundImg.height;
          const canvasAspectRatio = canvas.width / canvas.height;
          
          let bgWidth, bgHeight, bgX, bgY;
          
          if (canvasAspectRatio > bgAspectRatio) {
            // Canvas更宽，以高度为准
            bgHeight = canvas.height;
            bgWidth = bgHeight * bgAspectRatio;
            bgX = (canvas.width - bgWidth) / 2;
            bgY = 0;
          } else {
            // Canvas更高，以宽度为准
            bgWidth = canvas.width;
            bgHeight = bgWidth / bgAspectRatio;
            bgX = 0;
            bgY = (canvas.height - bgHeight) / 2;
          }
          
          console.log('背景图自适应参数:', { bgWidth, bgHeight, bgX, bgY });
          ctx.drawImage(backgroundImg, bgX, bgY, bgWidth, bgHeight);
          console.log('✓ 背景图显示完成（保持宽高比）');
        }
      } catch (error) {
        console.error('显示背景图失败:', error);
      }
    },

    // --- 【核心渲染函数 - 严格按照app.min.js的图层顺序】 ---
    async renderMockup(coverImage) {
      this.isLoading = true;
      const canvas = this.$refs.mockupCanvas;
      const ctx = canvas.getContext('2d');

      try {
        console.log('=== 开始渲染，严格按照图层顺序 ===');
        console.log('封面图片:', coverImage ? '存在' : '不存在');
        
        this.adjustCanvasSize(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = canvas.width / this.template.width;
        
        console.log('Canvas尺寸:', canvas.width, 'x', canvas.height, '缩放比例:', scale);

        // === 第1步：绘制背景图层 (最底层) ===
        console.log('第1步：绘制背景图层');
        const backgroundLayer = this.template.layers.find(l => l.id === 'background');
        if (!backgroundLayer) throw new Error("模板中未找到背景图层");
        
        const backgroundImg = await this.loadImage(backgroundLayer.src);
        
        // 修复：保持背景图原始宽高比，自适应显示
        const bgAspectRatio = backgroundImg.width / backgroundImg.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        
        let bgWidth, bgHeight, bgX, bgY;
        
        if (canvasAspectRatio > bgAspectRatio) {
          // Canvas更宽，以高度为准
          bgHeight = canvas.height;
          bgWidth = bgHeight * bgAspectRatio;
          bgX = (canvas.width - bgWidth) / 2;
          bgY = 0;
        } else {
          // Canvas更高，以宽度为准
          bgWidth = canvas.width;
          bgHeight = bgWidth / bgAspectRatio;
          bgX = 0;
          bgY = (canvas.height - bgHeight) / 2;
        }
        
        console.log('背景图自适应参数:', { bgWidth, bgHeight, bgX, bgY });
        ctx.drawImage(backgroundImg, bgX, bgY, bgWidth, bgHeight);
        console.log('✓ 背景图层绘制完成（保持宽高比）');

        // === 第2步：绘制用户封面 (透视变换) ===
        if (coverImage) {
          console.log('第2步：绘制用户封面（透视变换）');
          const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
          if (coverLayer) {
            console.log('封面图层坐标:', coverLayer.destPoints);
            this.drawTransformedImage(ctx, coverImage, coverLayer.destPoints, scale);
            console.log('✓ 封面图层绘制完成');
          }
        } else {
          console.log('第2步：跳过封面图层（无封面图片）');
        }

        // === 第3步：绘制光影效果图层 ===
        console.log('第3步：绘制光影效果图层');
        const highlightsLayer = this.template.layers.find(l => l.id === 'highlights');
        if (highlightsLayer) {
          const highlightsImg = await this.loadImage(highlightsLayer.src);
          
          // 关键修复：光影效果应该只覆盖封面区域，增加书本纹理
          // 使用与封面相同的坐标区域来绘制光影效果
          const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
          if (coverLayer) {
            console.log('使用封面坐标区域绘制光影效果');
            
            // 计算光影效果的绘制区域（与封面区域完全一致）
            const dest = coverLayer.destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));
            
            // 计算边界框（与封面完全一致）
            const minX = Math.min(...dest.map(p => p.x));
            const minY = Math.min(...dest.map(p => p.y));
            const maxX = Math.max(...dest.map(p => p.x));
            const maxY = Math.max(...dest.map(p => p.y));
            const width = maxX - minX;
            const height = maxY - minY;
            
            console.log('光影效果绘制区域:', { minX, minY, width, height });
            
            // 只在这个区域内绘制光影效果
            ctx.save();
            ctx.beginPath();
            ctx.rect(minX, minY, width, height);
            ctx.clip();
            
            // 绘制光影效果，但只在这个区域内
            ctx.drawImage(highlightsImg, minX, minY, width, height);
            ctx.restore();
            
            console.log('✓ 光影效果图层绘制完成（限制在封面区域）');
          } else {
            // 如果没有封面图层，则按原来的方式绘制
            ctx.drawImage(highlightsImg, 0, 0, canvas.width, canvas.height);
            console.log('✓ 光影效果图层绘制完成（全Canvas覆盖）');
          }
        }

        // === 第4步：绘制前景蒙版图层 (手指) ===
        console.log('第4步：绘制前景蒙版图层（手指）- 已注释掉');
        // 暂时注释掉手指蒙版渲染，先看封面效果
        /*
        const maskLayer = this.template.layers.find(l => l.id === 'mask');
        if (maskLayer) {
          const maskImg = await this.loadImage(maskLayer.src);
          
          // 关键修复：手指蒙版应该只覆盖书本区域，不是整个Canvas
          // 使用与封面相同的坐标区域来绘制手指蒙版
          const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
          if (coverLayer) {
            console.log('使用封面坐标区域绘制手指蒙版');
            
            // 计算手指蒙版的绘制区域（与封面区域完全一致）
            const dest = coverLayer.destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));
            
            // 计算边界框（与封面完全一致）
            const minX = Math.min(...dest.map(p => p.x));
            const minY = Math.min(...dest.map(p => p.y));
            const maxX = Math.max(...dest.map(p => p.x));
            const maxY = Math.max(...dest.map(p => p.y));
            const width = maxX - minX;
            const height = maxY - minY;
            
            console.log('手指蒙版绘制区域:', { minX, minY, width, height });
            
            // 只在这个区域内绘制手指蒙版
            ctx.save();
            ctx.beginPath();
            ctx.rect(minX, minY, width, height);
            ctx.clip();
            
            // 绘制手指蒙版，但只在这个区域内
            ctx.drawImage(maskImg, minX, minY, width, height);
            ctx.restore();
            
            console.log('✓ 手指蒙版图层绘制完成（限制在封面区域）');
          } else {
            // 如果没有封面图层，则按原来的方式绘制
            ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
            console.log('✓ 手指蒙版图层绘制完成（全Canvas覆盖）');
          }
        }
        */
        console.log('✓ 手指蒙版图层已跳过（注释掉）');
        
        console.log('=== 渲染完成，图层顺序：背景→封面→光影→手指 ===');
      } catch (error) {
        console.error("渲染过程中出错:", error);
        this.$message.error("渲染失败，请检查控制台。");
      } finally {
        this.isLoading = false;
      }
    },

    drawTransformedImage(ctx, image, destPoints, scale) {
      console.log('开始透视变换，图片尺寸:', image.width, 'x', image.height);
      console.log('目标坐标点:', destPoints);
      console.log('缩放比例:', scale);
      
      // 使用原始坐标，不添加偏移量
      const dest = destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));
      console.log('缩放后的目标坐标:', dest);
      
      // 计算边界框
      const minX = Math.min(...dest.map(p => p.x));
      const minY = Math.min(...dest.map(p => p.y));
      const maxX = Math.max(...dest.map(p => p.x));
      const maxY = Math.max(...dest.map(p => p.y));
      const width = maxX - minX;
      const height = maxY - minY;
      
      console.log('边界框:', { minX, minY, width, height });
      console.log('Canvas尺寸:', ctx.canvas.width, 'x', ctx.canvas.height);
      
      // 检查边界框是否在Canvas范围内
      if (minX < 0 || minY < 0 || maxX > ctx.canvas.width || maxY > ctx.canvas.height) {
        console.warn('警告：边界框超出Canvas范围！');
      }
      
      // 如果边界框太小，增加尺寸
      const minSize = 80; // 增加最小尺寸
      if (width < minSize || height < minSize) {
        console.warn('边界框太小，调整尺寸');
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const newSize = Math.max(width, height, minSize);
        
        const newMinX = centerX - newSize / 2;
        const newMinY = centerY - newSize / 2;
        
        console.log('调整后的边界框:', { newMinX, newMinY, newSize });
        
        // 绘制调整后的图片
        ctx.save();
        ctx.globalAlpha = 0.9; // 增加透明度
        ctx.drawImage(image, newMinX, newMinY, newSize, newSize);
        ctx.restore();
      } else {
        // 绘制原始边界框的图片
        ctx.save();
        ctx.globalAlpha = 0.9; // 增加透明度
        ctx.drawImage(image, minX, minY, width, height);
        ctx.restore();
      }
      
      console.log('透视变换完成');
    },

    drawTriangle(ctx, image, src, dst) {
      console.log('绘制三角形:', { src, dst });
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(dst[0].x, dst[0].y);
      ctx.lineTo(dst[1].x, dst[1].y);
      ctx.lineTo(dst[2].x, dst[2].y);
      ctx.closePath();
      ctx.clip();
      
      // 计算变换矩阵
      const t = this.getTransform(src, dst);
      console.log('变换矩阵:', t);
      
      // 应用变换
      ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
      
      // 绘制图片
      ctx.drawImage(image, 0, 0);
      
      // 恢复Canvas状态
      ctx.restore();
      
      console.log('三角形绘制完成');
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



    // 基础手部遮罩合成算法 - 简单可靠版本
    async mergeUserImageWithHandMask(userImage) {
      console.log('开始基础手部遮罩合成...');
      
      if (!userImage) {
        console.error('用户图片不存在');
        return null;
      }

      try {
        // 加载手部遮罩
        const handMask = await this.loadImage(bookMask1);
        
        // 创建临时Canvas进行合成
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // 设置Canvas尺寸为用户图片尺寸
        tempCanvas.width = userImage.width;
        tempCanvas.height = userImage.height;
        
        console.log(`合成尺寸: ${tempCanvas.width}x${tempCanvas.height}`);
        
        // 1. 绘制用户图片作为底图
        tempCtx.drawImage(userImage, 0, 0, tempCanvas.width, tempCanvas.height);
        
        // 2. 创建手部遮罩Canvas并进行边缘平滑处理
        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d');
        maskCanvas.width = tempCanvas.width;
        maskCanvas.height = tempCanvas.height;
        
        // 绘制调整尺寸后的手部遮罩
        maskCtx.drawImage(handMask, 0, 0, maskCanvas.width, maskCanvas.height);
        
        // 3. 多级边缘平滑处理（模拟Python的完整算法）
        console.log('开始多级边缘平滑处理...');
        
        // 第一级：轻微高斯模糊，软化边缘
        maskCtx.filter = 'blur(1.5px)'; // 增加模糊半径，更自然
        maskCtx.drawImage(maskCanvas, 0, 0);
        maskCtx.filter = 'none';
        
        // 第二级：应用对比度调整，让边缘更柔和
        maskCtx.filter = 'contrast(0.9)'; // 降低对比度，减少硬边缘
        maskCtx.drawImage(maskCanvas, 0, 0);
        maskCtx.filter = 'none';
        
        // 第三级：应用亮度调整，让手部区域更自然
        maskCtx.filter = 'brightness(1.1)'; // 轻微提亮，减少PS痕迹
        maskCtx.drawImage(maskCanvas, 0, 0);
        maskCtx.filter = 'none';
        
        // 4. 获取像素数据进行合成
        const userImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const maskImageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
        const resultImageData = tempCtx.createImageData(tempCanvas.width, tempCanvas.height);
        
        const userPixels = userImageData.data;
        const maskPixels = maskImageData.data;
        const resultPixels = resultImageData.data;
        
        console.log('开始像素级合成处理...');
        
        // 4. 基础合成算法
        const whiteThreshold = 240; // 白色阈值
        let handRegionCount = 0;
        
        for (let i = 0; i < userPixels.length; i += 4) {
          const maskR = maskPixels[i];
          const maskG = maskPixels[i + 1];
          const maskB = maskPixels[i + 2];
          
          // 简单的白色检测
          const isWhite = maskR > whiteThreshold && maskG > whiteThreshold && maskB > whiteThreshold;
          
          if (isWhite) {
            // 白色区域：保持用户图片
            resultPixels[i] = userPixels[i];
            resultPixels[i + 1] = userPixels[i + 1];
            resultPixels[i + 2] = userPixels[i + 2];
            resultPixels[i + 3] = userPixels[i + 3];
          } else {
            // 非白色区域：使用手部遮罩
            resultPixels[i] = maskPixels[i];
            resultPixels[i + 1] = maskPixels[i + 1];
            resultPixels[i + 2] = maskPixels[i + 2];
            resultPixels[i + 3] = maskPixels[i + 3];
            handRegionCount++;
          }
        }
        
        console.log(`手部区域像素数: ${handRegionCount}`);
        
        // 5. 将合成结果绘制到临时Canvas
        tempCtx.putImageData(resultImageData, 0, 0);
        

        const mergedImageDataUrl = tempCanvas.toDataURL('image/png');
        const mergedImage = await this.loadImage(mergedImageDataUrl);
        
        console.log('✓ 基础手部遮罩合成完成');
        return mergedImage;
        
      } catch (error) {
        console.error('合成过程中出错:', error);
        return null;
      }
    },

    // 使用合成后的图片进行书本渲染
    async renderMockupWithMergedImage(mergedImage) {
      console.log('开始使用合成图片进行书本渲染...');
      
      const canvas = this.$refs.mockupCanvas;
      const ctx = canvas.getContext('2d');

      try {
        this.adjustCanvasSize(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = canvas.width / this.template.width;

        // === 第1步：绘制背景图层 ===
        const backgroundLayer = this.template.layers.find(l => l.id === 'background');
        if (backgroundLayer) {
          const backgroundImg = await this.loadImage(backgroundLayer.src);
          
          // 保持背景图原始宽高比，自适应显示
          const bgAspectRatio = backgroundImg.width / backgroundImg.height;
          const canvasAspectRatio = canvas.width / canvas.height;
          
          let bgWidth, bgHeight, bgX, bgY;
          
          if (canvasAspectRatio > bgAspectRatio) {
            bgHeight = canvas.height;
            bgWidth = bgHeight * bgAspectRatio;
            bgX = (canvas.width - bgWidth) / 2;
            bgY = 0;
          } else {
            bgWidth = canvas.width;
            bgHeight = bgWidth / bgAspectRatio;
            bgX = 0;
            bgY = (canvas.height - bgHeight) / 2;
          }
          
          ctx.drawImage(backgroundImg, bgX, bgY, bgWidth, bgHeight);
          console.log('✓ 背景图层绘制完成');
        }

        // === 第2步：绘制合成后的用户封面（透视变换）===
        const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
        if (coverLayer) {
          this.drawTransformedImage(ctx, mergedImage, coverLayer.destPoints, scale);
          console.log('✓ 合成封面图层绘制完成');
        }

        // === 第3步：绘制光影效果图层 ===
        const highlightsLayer = this.template.layers.find(l => l.id === 'highlights');
        if (highlightsLayer) {
          const highlightsImg = await this.loadImage(highlightsLayer.src);
          
          // 限制光影效果在封面区域
          if (coverLayer) {
            const dest = coverLayer.destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));
            const minX = Math.min(...dest.map(p => p.x));
            const minY = Math.min(...dest.map(p => p.y));
            const maxX = Math.max(...dest.map(p => p.x));
            const maxY = Math.max(...dest.map(p => p.y));
            const width = maxX - minX;
            const height = maxY - minY;
            
            ctx.save();
            ctx.beginPath();
            ctx.rect(minX, minY, width, height);
            ctx.clip();
            ctx.drawImage(highlightsImg, minX, minY, width, height);
            ctx.restore();
          } else {
            ctx.drawImage(highlightsImg, 0, 0, canvas.width, canvas.height);
          }
          console.log('✓ 光影效果图层绘制完成');
        }

        console.log('✓ 书本渲染完成');
        
      } catch (error) {
        console.error('书本渲染过程中出错:', error);
        throw error;
      }
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

.render-hint {
  font-size: 0.875rem;
  color: #909399;
  margin-top: 0.5rem;
  text-align: center;
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

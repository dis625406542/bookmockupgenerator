<template>
  <div class="page-container">
    <!-- Header 固定置顶，覆盖全屏 -->
    <Header />
    
    <!-- 主内容区域 -->
    <div class="mockup-tool-container">
      <div class="unified-content-container">
        <!-- 标题区域 -->
        <div class="header-section">
          <PageHeader title="Book Mockup Generator Tool" />
        </div>

        <!-- 功能区域 -->
        <div class="function-section">
          <!-- 渲染结果 (移到左边) -->
          <div class="result-panel">
            <div ref="canvasContainer" class="canvas-container">
              <canvas ref="mockupCanvas"></canvas>
            </div>
            
            <!-- 新增：信息模块 -->
            <div class="info-panel">
              <div class="info-tags">
                <span class="tag">Tags:  </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="tag">front</span>
                <span class="tag-separator">|</span>
                <span class="tag">book</span>
                <span class="tag-separator">|</span>
                <span class="tag">hardcover book</span>
                <span class="tag-separator">|</span>
                <span class="tag">book mockup</span>
                <span class="tag-separator">|</span>
                <span class="tag">hardcover</span>
                <span class="tag-separator">|</span>
                <span class="tag">hardcover book mockup</span>
                <span class="tag-separator">|</span>
                <span class="tag">book mockup generator</span>
              </div>
              
              <div class="info-description">
                This charming mockup template features a small child sitting among friends, holding a book cover in their hands.
              </div>
              
              <div class="info-template">
                <div class="template-item">
                  <span class="template-label">Published:</span>
                  <span class="template-value">24 Jun 2024</span>
                </div>
                <div class="template-item">
                  <span class="template-label">Size:</span>
                  <span class="template-value">1024x1024px</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 控制面板 (移到右边) -->
          <div class="control-panel">
            <div class="panel-header">
              <span class="panel-title">Edit this template</span>
              <el-button style="float: right; padding: 3px 0" type="text">Download PSD</el-button>
            </div>

            <div class="control-group">
              <div class="format-selector">
                <el-radio-group v-model="format" size="small">
                  <el-radio-button label="JPEG"></el-radio-button>
                  <el-radio-button label="PNG"></el-radio-button>
                </el-radio-group>
              </div>
              <el-button type="primary" class="upgrade-btn" @click="downloadRenderedImage">Upgrade to Download</el-button>
            </div>

            <el-divider></el-divider>

            <div class="control-item">
              <span class="label">Highlights</span>
              <el-switch v-model="highlights" active-color="#13ce66"></el-switch>
            </div>

            <div class="control-item">
              <span class="label">Shadows</span>
              <el-switch v-model="shadows" active-color="#13ce66"></el-switch>
            </div>

            <el-divider></el-divider>

            <div class="image-control">
              <div class="control-item">
                <span class="label">Your image:</span>
                <el-switch v-model="coverEnabled" active-color="#13ce66"></el-switch>
              </div>
              <span class="image-size">512x636px</span>
              <el-button 
                class="upload-action-btn" 
                type="danger" 
                icon="el-icon-picture-outline"
                @click="openImageModal"
              >
                Add image/design
              </el-button>
              
            </div>
            <el-divider></el-divider>
            <div class="control-group">
              <div class="format-selector">
                <el-radio-group v-model="format" size="small">
                  <el-radio-button label="JPEG"></el-radio-button>
                  <el-radio-button label="PNG"></el-radio-button>
                </el-radio-group>
              </div>
              <el-button type="primary" class="upgrade-btn" @click="downloadRenderedImage">Upgrade to Download</el-button>
            </div>

<!--            <div class="render-section" style="margin-top: 1rem;">-->
<!--              <el-button-->
<!--                type="primary"-->
<!--                @click="handleRender"-->
<!--                :loading="isLoading"-->
<!--                :disabled="!userImage"-->
<!--                class="render-button"-->
<!--              >-->
<!--                {{ isLoading ? '正在渲染...' : '2. 渲染封面（智能合成手部遮罩）' }}-->
<!--              </el-button>-->
<!--            </div>-->
          </div>
        </div>

        <!-- 新增：More like this 轮播组件 -->
        <div class="more-like-this-section">
          <ImageCarousel />
        </div>

      </div>
    </div>

    <!-- 图片上传弹窗 -->
    <ImageUploadModal 
      :visible="showImageModal"
      @close="closeImageModal"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script>
// 【重要】这是在Vue项目中引入图片的标准方式
import bookBackground1 from '@/assets/images/book-background1.jpg';
import bookHighlights1 from '@/assets/images/book-highlights1.png';
import bookMask1 from '@/assets/images/book-mask1.png';

export default {
  name: 'MockupTool',
  components: {
    Header: () => import('@/components/Header.vue'),
    PageHeader: () => import('@/components/PageHeader.vue'),
    ImageCarousel: () => import('@/components/ImageCarousel.vue'),
    ImageUploadModal: () => import('@/components/ImageUploadModal.vue')
  },
  data() {
    return {
      userImage: null, // 存储用户上传的图片对象
      isLoading: false,
      // 新增的控制选项
      format: 'PNG',
      highlights: true,
      shadows: true,
      coverEnabled: true,
      colorEnabled: true,
      selectedColor: '#FFFFFF',
      backgroundEnabled: true,
      backgroundFormat: 'PNG',
      // 弹窗状态
      showImageModal: false,
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
            { x: 252, y: 136 }, // 左上：向右移动100px
              { x: 548, y: 134 }, // 右上：向右移动100px
              { x: 550, y: 495 }, // 右下：向右移动100px
              { x: 260, y: 503 }, // 左下：向右移动100px
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

    // 打开图片上传弹窗
    openImageModal() {
      this.showImageModal = true;
    },

    // 关闭图片上传弹窗
    closeImageModal() {
      this.showImageModal = false;
    },

    // 处理弹窗确认
    handleModalConfirm(data) {
      // 将弹窗中的图片数据转换为 Image 对象
      const img = new Image();
      img.onload = () => {
        this.userImage = img;
        // 显示预览图片
        if (this.$refs.previewImage) {
          this.$refs.previewImage.src = data.image;
          this.$refs.previewImage.style.display = 'block';
        }
        // 这里可以保存缩放和位置信息，用于后续渲染
        console.log('弹窗确认数据:', data);
        
        // 检查是否需要自动渲染
        if (data.autoRender) {
          console.log('检测到自动渲染标记，开始渲染封面...');
          // 延迟一点时间确保图片加载完成，然后自动触发渲染
          this.$nextTick(() => {
            setTimeout(() => {
              this.handleRender();
            }, 100);
          });
        }
      };
      img.src = data.image;
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
        // 第一步：先将用户图片拉伸到书本封面尺寸
        const stretchedUserImage = await this.stretchImageToCoverSize(this.userImage);
        
        if (!stretchedUserImage) {
          this.$message.error('图片拉伸失败，请重试！');
          return;
        }
        
        // 第二步：拉伸后的图片与手部遮罩合成
        const mergedUserImage = await this.mergeUserImageWithHandMask(stretchedUserImage);
        
        if (!mergedUserImage) {
          this.$message.error('图片合成失败，请重试！');
          return;
        }
        
        // 第三步：使用合成后的图片进行书本渲染
        await this.renderMockupWithMergedImage(mergedUserImage);
        
      } catch (error) {
        console.error('智能渲染过程中出错:', error);
        this.$message.error('渲染失败，请检查控制台。');
      } finally {
        this.isLoading = false;
      }
    },

    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
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
        // 调整Canvas尺寸
        this.adjustCanvasSize(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 只加载并显示背景图
        const backgroundLayer = this.template.layers.find(l => l.id === 'background');
        if (backgroundLayer) {
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
          
          ctx.drawImage(backgroundImg, bgX, bgY, bgWidth, bgHeight);
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
        this.adjustCanvasSize(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = canvas.width / this.template.width;

        // === 第1步：绘制背景图层 (最底层) ===
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
        
        ctx.drawImage(backgroundImg, bgX, bgY, bgWidth, bgHeight);

        // === 第2步：绘制用户封面 (透视变换) ===
        if (coverImage) {
          const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
          if (coverLayer) {
            this.drawTransformedImage(ctx, coverImage, coverLayer.destPoints, scale);
          }
        }

        // === 第3步：绘制光影效果图层 ===
        const highlightsLayer = this.template.layers.find(l => l.id === 'highlights');
        if (highlightsLayer) {
          const highlightsImg = await this.loadImage(highlightsLayer.src);
          
          // 关键修复：光影效果应该只覆盖封面区域，增加书本纹理
          // 使用与封面相同的坐标区域来绘制光影效果
          const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
          if (coverLayer) {
            // 计算光影效果的绘制区域（与封面区域完全一致）
            const dest = coverLayer.destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));
            
            // 计算边界框（与封面完全一致）
            const minX = Math.min(...dest.map(p => p.x));
            const minY = Math.min(...dest.map(p => p.y));
            const maxX = Math.max(...dest.map(p => p.x));
            const maxY = Math.max(...dest.map(p => p.y));
            const width = maxX - minX;
            const height = maxY - minY;
            
            // 只在这个区域内绘制光影效果
            ctx.save();
            ctx.beginPath();
            ctx.rect(minX, minY, width, height);
            ctx.clip();
            
            // 绘制光影效果，但只在这个区域内
            ctx.drawImage(highlightsImg, minX, minY, width, height);
            ctx.restore();
          } else {
            // 如果没有封面图层，则按原来的方式绘制
            ctx.drawImage(highlightsImg, 0, 0, canvas.width, canvas.height);
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

      
      // 修复Vue Observer问题，正确获取坐标值
      const dest = destPoints.map(p => {
        // 确保能正确访问x, y属性
        const x = p.x || (p._value && p._value.x) || 0;
        const y = p.y || (p._value && p._value.y) || 0;
        return { x: x * scale, y: y * scale };
      });

      
      // 特别标注左下角坐标
      
      // 检查数组结构，修复Observer访问问题（已注释掉未使用的变量）
      // destPoints.forEach((point) => {
      //   // 确保能正确访问x, y属性（已注释掉console.log）
      //   // const x = point.x || (point._value && point._value.x) || 0;
      //   // const y = point.y || (point._value && point._value.y) || 0;
      // });
      
      // 注释掉未使用的变量
      // const bottomLeft = dest[3]; // 第四个点是左下角
      
      // 获取左下角原始值（已注释掉未使用的变量）
      // const bottomLeftOriginal = destPoints[3];
      // const bottomLeftX = bottomLeftOriginal.x || (bottomLeftOriginal._value && bottomLeftOriginal._value.x) || 0;
      // const bottomLeftY = bottomLeftOriginal.y || (bottomLeftOriginal._value && bottomLeftOriginal._value.y) || 0;
      
      // 【重要修复】使用真正的四边形渲染，按照四个坐标点围成的形状
      
      // 使用Canvas的路径绘制四边形
      ctx.save();
      ctx.globalAlpha = 0.9; // 增加透明度
      
      // 创建四边形路径，确保坐标正确
      
      // 按照正确的顺序绘制四边形：左上→右上→右下→左下→左上
      ctx.beginPath();
      
      // 左上角
      ctx.moveTo(dest[0].x, dest[0].y);
      
      // 右上角
      ctx.lineTo(dest[1].x, dest[1].y);
      
      // 右下角
      ctx.lineTo(dest[2].x, dest[2].y);
      
      // 左下角
      ctx.lineTo(dest[3].x, dest[3].y);
      
      // 回到左上角，形成闭合路径
      ctx.lineTo(dest[0].x, dest[0].y);
      
      ctx.closePath();
      
      // 调试：路径轮廓已注释掉（去掉红色圈）
      // ctx.strokeStyle = 'red';
      // ctx.lineWidth = 2;
      // ctx.stroke();
      
      // 设置裁剪区域为四边形
      ctx.clip();
      
      // 计算图片的绘制区域（使用四个坐标点的边界）
      const minX = Math.min(...dest.map(p => p.x));
      const minY = Math.min(...dest.map(p => p.y));
      const maxX = Math.max(...dest.map(p => p.x));
      const maxY = Math.max(...dest.map(p => p.y));
      const width = maxX - minX;
      const height = maxY - minY;
      
      // 在四边形区域内绘制图片
      ctx.drawImage(image, minX, minY, width, height);
      
      ctx.restore();
    },

    drawTriangle(ctx, image, src, dst) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(dst[0].x, dst[0].y);
      ctx.lineTo(dst[1].x, dst[1].y);
      ctx.lineTo(dst[2].x, dst[2].y);
      ctx.closePath();
      ctx.clip();
      
      // 计算变换矩阵
      const t = this.getTransform(src, dst);
      
      // 应用变换
      ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
      
      // 绘制图片
      ctx.drawImage(image, 0, 0);
      
      // 恢复Canvas状态
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

    // 将用户图片拉伸到书本封面尺寸
    async stretchImageToCoverSize(userImage) {
      if (!userImage) {
        console.error('用户图片不存在');
        return null;
      }

      try {
        // 获取模板中封面图层的目标尺寸
        const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
        if (!coverLayer) {
          console.error('未找到封面图层配置');
          return userImage;
        }

        // 计算封面图层的实际尺寸（基于destPoints）
        const destPoints = coverLayer.destPoints;
        const minX = Math.min(...destPoints.map(p => p.x));
        const minY = Math.min(...destPoints.map(p => p.y));
        const maxX = Math.max(...destPoints.map(p => p.x));
        const maxY = Math.max(...destPoints.map(p => p.y));
        const coverWidth = maxX - minX;
        const coverHeight = maxY - minY;

        // 创建临时Canvas进行拉伸
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // 设置Canvas尺寸为封面尺寸
        tempCanvas.width = coverWidth;
        tempCanvas.height = coverHeight;
        
        // 将用户图片拉伸到封面尺寸
        tempCtx.drawImage(userImage, 0, 0, coverWidth, coverHeight);
        
        // 转换为Image对象并返回
        const stretchedImageDataUrl = tempCanvas.toDataURL('image/png');
        const stretchedImage = await this.loadImage(stretchedImageDataUrl);
        
        return stretchedImage;
        
      } catch (error) {
        console.error('图片拉伸过程中出错:', error);
        return null;
      }
    },

    // 真正的优化版手部遮罩合成算法 - 手指透明 + 边缘暗化
    async mergeUserImageWithHandMask(userImage) {
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
        

        
                 // 5. 真正的优化版合成算法（手指透明 + 边缘暗化）
         const whiteThreshold = 240; // 白色阈值
         const transparencyFactor = 0.6; // 手指透明度因子（0.6 = 40%透明）
         const edgeDarkenFactor = 0.5; // 边缘暗化因子（0.5 = 暗化50%）
         // 注释掉未使用的统计变量
         // let handRegionCount = 0;
         // let transparentPixelsCount = 0;
         // let edgeDarkenedCount = 0;
        
        // 单遍扫描，直接处理每个像素
        for (let i = 0; i < userPixels.length; i += 4) {
          const maskR = maskPixels[i];
          const maskG = maskPixels[i + 1];
          const maskB = maskPixels[i + 2];
          const maskA = maskPixels[i + 3];
          
          // 检测是否为手部区域
          const isWhite = maskR > whiteThreshold && maskG > whiteThreshold && maskB > whiteThreshold;
          
          if (isWhite) {
            // 白色区域：保持用户图片
            resultPixels[i] = userPixels[i];
            resultPixels[i + 1] = userPixels[i + 1];
            resultPixels[i + 2] = userPixels[i + 2];
            resultPixels[i + 3] = userPixels[i + 3];
          } else {
            // 非白色区域：手部遮罩处理
            
            // 计算手部像素的亮度（用于判断边缘）
            const brightness = (maskR + maskG + maskB) / 3;
            
            // 判断是否为边缘像素（亮度接近白色阈值）
            const isEdgePixel = brightness > (whiteThreshold - 30); // 边缘检测阈值
            
            if (isEdgePixel) {
              // 边缘像素：应用边缘暗化 + 透明度
              const edgeDarkness = (brightness - (whiteThreshold - 30)) / 30; // 0-1的暗化程度
              const finalDarkness = edgeDarkness * (1 - edgeDarkenFactor);
              
                             // 边缘暗化处理
               resultPixels[i] = Math.round(maskR * (1 - finalDarkness));     // R
               resultPixels[i + 1] = Math.round(maskG * (1 - finalDarkness)); // G
               resultPixels[i + 2] = Math.round(maskB * (1 - finalDarkness)); // B
               resultPixels[i + 3] = Math.round(maskA * transparencyFactor);  // A 降低透明度
               
               // edgeDarkenedCount++; // 已注释掉未使用的变量
             } else {
               // 核心手部像素：保持原色，但降低透明度
               resultPixels[i] = maskR;
               resultPixels[i + 1] = maskG;
               resultPixels[i + 2] = maskB;
               resultPixels[i + 3] = Math.round(maskA * transparencyFactor); // A 降低透明度
             }
             
             // handRegionCount++; // 已注释掉未使用的变量
             // transparentPixelsCount++; // 已注释掉未使用的变量
          }
        }
        

        
        // 6. 将合成结果绘制到临时Canvas
        tempCtx.putImageData(resultImageData, 0, 0);
        
        // 7. 最终边缘平滑处理 - 暂时注释掉模糊处理，保持手指清晰度
        // tempCtx.filter = 'blur(0.5px)'; // 轻微模糊，进一步平滑边缘
        // tempCtx.drawImage(tempCanvas, 0, 0);
        // tempCtx.filter = 'none';
        
        const mergedImageDataUrl = tempCanvas.toDataURL('image/png');
        const mergedImage = await this.loadImage(mergedImageDataUrl);
        

        return mergedImage;
        
      } catch (error) {
        console.error('合成过程中出错:', error);
        return null;
      }
    },

    // 使用合成后的图片进行书本渲染
    async renderMockupWithMergedImage(mergedImage) {
      
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
        }

        // === 第2步：绘制合成后的用户封面（透视变换）===
        const coverLayer = this.template.layers.find(l => l.type === 'transformed-image' && l.name === 'cover');
        if (coverLayer) {
          this.drawTransformedImage(ctx, mergedImage, coverLayer.destPoints, scale);
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
        }


        
      } catch (error) {
        console.error('书本渲染过程中出错:', error);
        throw error;
      }
    },

    // 下载渲染后的图片
    async downloadRenderedImage() {
      const canvas = this.$refs.mockupCanvas;
      if (!canvas) {
        this.$message.error('没有可下载的图片');
        return;
      }
      
      // 生成带时间戳的文件名
      const now = new Date();
      const timestamp = now.getHours().toString().padStart(2, '0') + 
                       now.getMinutes().toString().padStart(2, '0') + 
                       now.getSeconds().toString().padStart(2, '0');
      
      // 根据选择的格式决定输出格式和质量
      let dataURL, filename;
      if (this.format === 'PNG') {
        dataURL = canvas.toDataURL('image/png');
        filename = `book-mockup-${timestamp}.png`;
      } else {
        dataURL = canvas.toDataURL('image/jpeg', 0.9);
        filename = `book-mockup-${timestamp}.jpg`;
      }
      
      // 创建下载链接并触发下载
      this.triggerDownload(dataURL, filename);
    },

    // 触发下载
    triggerDownload(dataURL, filename) {
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.$message.success(`Image downloaded successfully: ${filename}`);
    },
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #ffffff;
  width: 100vw !important; /* 强制使用视口宽度 */
  max-width: none !important; /* 移除任何最大宽度限制 */
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  left: 0;
  right: 0;
  box-sizing: border-box;
}

/* Header 固定置顶，覆盖全屏 */
.page-container :deep(.header) {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important; /* 强制使用视口宽度 */
  max-width: none !important; /* 移除任何最大宽度限制 */
  z-index: 1000 !important;
  background-color: #ffffff !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  box-sizing: border-box;
}

/* 完全移除容器概念，直接在全屏背景上布局 */
.mockup-tool-container {
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 0; /* 移除顶部间距，避免多余的白色区域 */
}

/* 移除所有容器样式，直接在全屏背景上布局 */
.unified-content-container {
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
}

/* 标题区域直接在全屏背景上 */
.header-section {
  width: 100%;
  padding: 0 6rem; /* 增加左右边距，让内容更居中 */
  margin: 0;
  background-color: transparent;
  border: 1px solid #e5e7eb; /* 添加银色1px边框 */
  box-shadow: none;
  border-radius: 0;
  display: flex;
  justify-content: flex-start; /* 标题区域左对齐 */
}

/* 标题内容左对齐 */
.header-section :deep(.page-header) {
  width: 100%;
  max-width: 1200px; /* 限制内容最大宽度，避免在大屏幕上过宽 */
  text-align: left; /* 标题内容左对齐 */
  border: 1px solid transparent; /* 边框透明，不要有颜色 */
}

.header-section :deep(.page-header-content) {
  text-align: left; /* 确保PageHeader内容左对齐 */
}

/* 功能区域直接在全屏背景上 */
.function-section {
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0 6rem 2rem 6rem; /* 增加左右边距，与标题区域保持一致 */
  padding-top: 30px;
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  justify-content: center; /* 功能区域居中对齐 */
  gap: 2rem; /* 减少左右面板之间的间距，让控制面板更靠近图片模板 */
}

/* 功能区域内容容器 */
.function-section > * {
  max-width: 1200px; /* 限制内容最大宽度，与标题区域保持一致 */
  width: 100%;
}

/* 左右面板直接在全屏背景上 */
.control-panel,
.result-panel {
  flex: 1;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
}

/* 控制面板特定样式 */
.control-panel {
  max-width: 30vw; /* 从480px改为380px，更窄 */
  flex-shrink: 0;
  /* 重新定义所有被覆盖的属性 */
  border: 1px solid rgba(192, 192, 192, 0.3) !important; /* 更细更透明的银色边框 */
  border-radius: 6px !important; /* 稍微减小圆角 */
  background: #ffffff !important; /* 纯白背景，去掉渐变 */
  box-shadow: none !important; /* 去掉所有阴影 */
  padding: 1.5rem !important; /* 内边距 */
  position: relative; /* 为伪元素定位 */
}

/* 去掉顶部装饰条 */
.control-panel::before {
  display: none; /* 隐藏顶部装饰条 */
}

/* 结果面板特定样式 */
.result-panel {
  max-width: 520px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

/* 新增：信息模块样式 */
.info-panel {
  margin-top: 3rem; /* 减少顶部间距，确保底部对齐 */
  margin-left: -2rem; /* 进一步向左扩展，让信息模块更靠左 */
  padding: 1rem;
  padding-bottom: 1.5rem; /* 增加底部内边距，微调底部位置 */
  background-color: #ffffff; /* 改为白色背景，与页面背景一致 */
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.8rem; /* 减小字体大小 */
  line-height: 1.4; /* 调整行高 */
  width: calc(100% + 4rem); /* 进一步增加宽度，向左扩展 */
}

.info-tags {
  margin-bottom: 0.75rem;
  line-height: 1.6; /* 增加标签行高，便于换行 */
}

.tag {
  color: #495057;
  font-weight: 500;
  display: inline-block; /* 让标签可以换行 */
  margin-bottom: 0.2rem; /* 标签底部间距 */
}

.tag-separator {
  color: #6c757d;
  margin: 0 0.3rem; /* 减少分隔符间距 */
}

.info-description {
  color: #6c757d;
  margin-bottom: 0.75rem;
  font-style: italic;
}

.info-template {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.template-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-label {
  color: #495057;
  font-weight: 500;
}

.template-value {
  color: #6c757d;
  font-family: monospace;
}

/* 控制面板样式 */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e4e7ed;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.format-selector {
  display: flex;
  justify-content: center;
}

.upgrade-btn {
  width: 100%;
  font-weight: bold;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.upgrade-btn:hover {
  background-color: #cf9236;
  border-color: #cf9236;
}

.control-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.control-item .label {
  font-weight: 500;
  color: #606266;
}

.image-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.image-control .image-size {
  font-size: 0.8rem;
  color: #909399;
  margin-bottom: 0.75rem;
}

.upload-action-btn {
  width: 100%;
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
}

.upload-action-btn:hover {
  background-color: #f78989 !important;
  border-color: #f78989 !important;
}

.color-control {
  margin-bottom: 1.5rem;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
}

.color-value {
  font-family: monospace;
  font-size: 0.9rem;
  color: #606266;
}

/* More like this 组件样式 */
.more-like-this-section {
  margin-top: 0; /* 减少与信息模块的间距 */
  margin-left: 12rem; /* 与信息模块左边对齐 */
  width: calc(100% + 4rem); /* 与信息模块宽度一致 */
}

.background-control {
  margin-bottom: 1.5rem;
}

.upload-section {
  margin-bottom: 2rem;
}

.upload-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #606266;
  margin-bottom: 0.75rem;
}

.image-uploader {
  margin-bottom: 1rem;
}



.render-section {
  margin-bottom: 2rem;
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

.vertical-divider {
  width: 1px;
  background-color: #e4e7ed;
  margin: 0;
  align-self: stretch;
  opacity: 0.6;
}



.canvas-container {
  width: 95%;
}

canvas {
  width: 100%;
  height: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container :deep(.header) {
    width: 100% !important;
    position: fixed !important;
    top: 0 !important;
  }
  
  .mockup-tool-container {
    padding-top: 5rem; /* 移动端减少顶部间距 */
  }
  
  .header-section {
    padding: 0 3rem; /* 移动端减少左右边距 */
  }
  
  .function-section {
    padding: 0 3rem 2rem 3rem; /* 移动端减少左右边距 */
    flex-direction: column;
    gap: 2rem;
  }
  
  .unified-content-container {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  .vertical-divider {
    width: 100%;
    height: 1px;
    margin: 1.5rem 0;
  }
  
  .control-panel,
  .result-panel {
    max-width: 100%;
  }
}
</style>

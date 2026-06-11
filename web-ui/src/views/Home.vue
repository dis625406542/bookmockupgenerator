<template>
  <div class="page-container">
    <!-- Header 固定置顶，覆盖全屏 -->
    <Header />
    
    <!-- 主内容区域 -->
    <div class="mockup-tool-container">
      <div class="unified-content-container">
        <!-- 标题区域 -->
        <div class="header-section">
          <PageHeader title="Free Book Mockup Generator Online" />
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
              <el-button style="float: right; padding: 3px 0" type="text">100% Free</el-button>
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

        <!-- SEO优化内容区域 - FAQ样式 -->
        <div class="seo-content-section">
          <h2>Frequently Asked Questions</h2>
          
          <div class="faq-item">
            <h3>Is it possible to add my logo or design to the Book mockup?</h3>
            <p>Absolutely. Select a template within the Book category and upload your design file, it will be placed automatically on the <strong>mockup book cover</strong> with perfect alignment.</p>
          </div>

          <div class="faq-item">
            <h3>Do I need Photoshop to use these Book mockups?</h3>
            <p>No, you don't need Photoshop. Our <strong>book cover mockup online</strong> tool is web-based and works directly in your browser. Simply upload your design and download the result.</p>
          </div>

          <div class="faq-item">
            <h3>Can I download the Book mockup in high resolution?</h3>
            <p>Yes, you can download your <strong>book mockup</strong> in JPG or PNG format in high resolution. Perfect for both digital and print use.</p>
          </div>

          <div class="faq-item">
            <h3>Are the Book mockups suitable for commercial use?</h3>
            <p>Yes, all our <strong>book cover mockup free</strong> templates are suitable for commercial use. Perfect for authors, designers, and publishers.</p>
          </div>

          <div class="faq-item">
            <h3>Can I edit the colors or textures of the Book mockup?</h3>
            <p>Yes, you can customize various aspects of your <strong>book cover mockup</strong> including colors, textures, and lighting effects to match your brand.</p>
          </div>

          <div class="faq-item">
            <h3>How do I make sure my design fits perfectly in the Book mockup?</h3>
            <p>Our <strong>book mockup generator</strong> automatically adjusts your design to fit perfectly. For best results, use high-resolution images and follow our recommended dimensions.</p>
          </div>

          <div class="faq-item">
            <h3>What file formats can I download my mockup in?</h3>
            <p>You can download your <strong>book cover mockup</strong> in JPG or PNG format. Both are high quality and ready for digital use, social media, and print-on-demand platforms.</p>
          </div>

          <div class="faq-item">
            <h3>Is this book cover mockup generator really free?</h3>
            <p>Yes, our <strong>book cover mockups free</strong> service is completely free to use. No registration required, no hidden fees, and no watermarks on your final mockups.</p>
          </div>
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
import * as PIXI from 'pixi.js';
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
  metaInfo: {
    title: 'Free Book Mockup Generator Online | No Watermark - MyMockupBook',
    meta: [
      {
        name: 'description',
        content: 'Free online book mockup generator — upload your cover and create realistic 3D book mockups in seconds. No watermark, no signup. Download in JPG and PNG.'
      },
      {
        name: 'keywords',
        content: 'book mockup generator, free book mockup generator, book mockup generator online free, book cover mockup generator, book mockup online, book mockup generator no watermark'
      },
      {
        property: 'og:title',
        content: 'Free Book Mockup Generator Online | No Watermark'
      },
      {
        property: 'og:description',
        content: 'Upload your cover and create realistic book mockups in seconds. Free, no watermark, no signup. Download in JPG and PNG.'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'twitter:title',
        content: 'Free Book Mockup Generator Online | No Watermark'
      },
      {
        name: 'twitter:description',
        content: 'Upload your cover and create realistic book mockups in seconds. Free, no watermark, no signup. Download in JPG and PNG.'
      },
      {
        rel: 'canonical',
        href: 'https://www.mymockupbook.com/'
      }
    ]
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
            { x: 252, y: 134 }, // 左上：往上拉2px
              { x: 548, y: 134 }, // 右上：原值
              { x: 548, y: 501 }, // 右下：往下拉2px
              { x: 248, y: 503 }, // 左下：底部左移12px
            ],
          },
          { type: 'image', src: bookHighlights1, id: 'highlights' },
          { type: 'image', src: bookMask1, id: 'mask' },
        ],
      },
    };
  },
  mounted() {
    // 等待DOM完全渲染后再初始化 PIXI 渲染器并显示底图
    this.$nextTick(() => {
      setTimeout(() => {
        this.initPixiRenderer();
      }, 100);
    });
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.pixiApp) {
      this.pixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
      this.pixiApp = null;
    }
  },
  methods: {
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.resizePixiRenderer();
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
      // PIXI WebGL 渲染：底图 + 封面网格变形 + 手部羽化遮罩 + 高光
      this.renderPixiMockup(this.userImage);
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

    // ===== PIXI.js WebGL 渲染 =====

    // 初始化 PIXI 应用 + 加载固定图层（底图/遮罩/高光/置换），并显示底图
    async initPixiRenderer() {
      const container = this.$refs.canvasContainer;
      const canvas = this.$refs.mockupCanvas;
      if (!container || !canvas) return;

      const w = container.clientWidth;
      const h = w / (this.template.width / this.template.height);

      this.pixiApp = new PIXI.Application({
        view: canvas,
        width: w,
        height: h,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        preserveDrawingBuffer: true, // 保留缓冲，否则 toDataURL 下载得到空白图
      });

      // 预加载固定纹理（PIXI v5：Texture.from + 等待 baseTexture 就绪）
      this.tex = {
        bg: await this.loadPixiTexture(bookBackground1),
        mask: await this.loadPixiTexture(bookMask1),
        highlights: await this.loadPixiTexture(bookHighlights1),
      };

      this.drawPixiScene(null);
    },

    // PIXI v5 纹理加载：确保 baseTexture 加载完成后再返回，避免宽高为 0
    loadPixiTexture(url) {
      return new Promise((resolve, reject) => {
        const texture = PIXI.Texture.from(url);
        if (texture.baseTexture.valid) {
          resolve(texture);
        } else {
          texture.baseTexture.once('loaded', () => resolve(texture));
          texture.baseTexture.once('error', reject);
        }
      });
    },

    resizePixiRenderer() {
      if (!this.pixiApp) return;
      const container = this.$refs.canvasContainer;
      const w = container.clientWidth;
      const h = w / (this.template.width / this.template.height);
      this.pixiApp.renderer.resize(w, h);
      this.drawPixiScene(this.coverTex || null);
    },

    // 用户上传后调用：把封面转成纹理再重绘场景
    async renderPixiMockup(coverImage) {
      if (!this.pixiApp) await this.initPixiRenderer();
      this.isLoading = true;
      try {
        // 封面图转 PIXI 纹理（coverImage 是 HTMLImageElement）
        this.coverTex = PIXI.Texture.from(coverImage);
        this.drawPixiScene(this.coverTex);
      } catch (e) {
        console.error('PIXI 渲染失败:', e);
        this.$message.error('渲染失败，请检查控制台。');
      } finally {
        this.isLoading = false;
      }
    },

    // 组装场景：底图 → 封面(网格变形，shader 内合成手部遮罩) → 高光
    drawPixiScene(coverTex) {
      const app = this.pixiApp;
      if (!app || !this.tex) return;
      const stage = app.stage;
      stage.removeChildren();

      const W = app.renderer.width / (app.renderer.resolution || 1);
      const H = app.renderer.height / (app.renderer.resolution || 1);

      // 背景以 contain 方式居中铺满（与模板坐标系统一用同一缩放+偏移）
      const bg = this.tex.bg;
      const bgRatio = bg.width / bg.height;
      const viewRatio = W / H;
      let bgW, bgH, bgX, bgY;
      if (viewRatio > bgRatio) {
        bgH = H; bgW = H * bgRatio; bgX = (W - bgW) / 2; bgY = 0;
      } else {
        bgW = W; bgH = W / bgRatio; bgX = 0; bgY = (H - bgH) / 2;
      }
      const bgSprite = new PIXI.Sprite(bg);
      bgSprite.position.set(bgX, bgY);
      bgSprite.width = bgW; bgSprite.height = bgH;
      stage.addChild(bgSprite);

      if (!coverTex) return;

      // 封面四边形坐标系：与旧 Canvas2D 完全一致——scale = W/800，不叠加背景偏移。
      // destPoints 是历史在该坐标系下手调好的值，必须精确复用，加偏移反而会错位。
      const scale = W / this.template.width;
      const dp = this.template.layers.find(l => l.name === 'cover').destPoints;
      const quad = dp.map(p => ({ x: p.x * scale, y: p.y * scale }));
      const geometry = this.buildQuadGeometry(quad);

      // 封面：mask 的 alpha 控制显隐——白区(a=1)显示封面，透明区(a=0)露出底图真实手指
      const cover = this.buildCoverMesh(geometry, coverTex, this.tex.mask);
      stage.addChild(cover);

      // 高光/阴影：与旧 Canvas2D 一致——highlights 图拉伸进封面包围盒(bbox)，普通 alpha 混合。
      // highlights PNG 自带透明通道，只有书页纹理/明暗部分可见。
      if (this.highlights) {
        const xs = quad.map(p => p.x), ys = quad.map(p => p.y);
        const minX = Math.min(...xs), minY = Math.min(...ys);
        const w = Math.max(...xs) - minX, h = Math.max(...ys) - minY;
        const hl = new PIXI.Sprite(this.tex.highlights);
        hl.position.set(minX, minY);
        hl.width = w; hl.height = h;
        stage.addChild(hl);
      }
    },

    // 构建双线性细分四边形 geometry（可被封面和高光复用）
    buildQuadGeometry(quad) {
      const seg = 20;
      const verts = [], uvs = [], idx = [];
      const [tl, tr, br, bl] = quad;
      for (let r = 0; r <= seg; r++) {
        const v = r / seg;
        for (let c = 0; c <= seg; c++) {
          const u = c / seg;
          const top = { x: tl.x + (tr.x - tl.x) * u, y: tl.y + (tr.y - tl.y) * u };
          const bot = { x: bl.x + (br.x - bl.x) * u, y: bl.y + (br.y - bl.y) * u };
          verts.push(top.x + (bot.x - top.x) * v, top.y + (bot.y - top.y) * v);
          uvs.push(u, v);
        }
      }
      const stride = seg + 1;
      for (let r = 0; r < seg; r++) {
        for (let c = 0; c < seg; c++) {
          const a = r * stride + c, b = a + 1, d = a + stride, e = d + 1;
          idx.push(a, b, d, b, e, d);
        }
      }
      return new PIXI.Geometry()
        .addAttribute('aVertexPosition', verts, 2)
        .addAttribute('aTextureCoord', uvs, 2)
        .addIndex(idx);
    },

    // 封面网格：封面纹理用 mask 的 alpha 通道做遮罩。
    // mask 白区 a=1 显示封面；透明区 a=0 露出底图真实手指。GPU 双线性采样天然羽化消白边
    buildCoverMesh(geometry, coverTex, maskTex) {
      const vert = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        uniform mat3 projectionMatrix;
        varying vec2 vUv;
        void main() {
          gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
          vUv = aTextureCoord;
        }`;
      const frag = `
        precision mediump float;
        varying vec2 vUv;
        uniform sampler2D uCover;
        uniform sampler2D uMask;
        void main() {
          vec4 cover = texture2D(uCover, vUv);
          float m = texture2D(uMask, vUv).a; // 封面区=1，手指区=0
          float a = cover.a * m;
          gl_FragColor = vec4(cover.rgb * a, a); // 预乘 alpha
        }`;
      const shader = PIXI.Shader.from(vert, frag, { uCover: coverTex, uMask: maskTex });
      return new PIXI.Mesh(geometry, shader);
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

/* SEO内容区域样式 - FAQ样式 */
.seo-content-section {
  margin-top: 3rem;
  margin-left: 12rem;
  margin-right: 12rem;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  max-width: 1200px;
}

.seo-content-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.3;
  text-align: center;
}

.faq-item {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.faq-item h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.faq-item p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}

.faq-item strong {
  color: #2c3e50;
  font-weight: 600;
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
  
  .seo-content-section {
    margin-left: 3rem;
    margin-right: 3rem;
    padding: 1.5rem;
  }
  
  .seo-content-section h2 {
    font-size: 1.5rem;
  }
  
  .faq-item {
    padding: 1rem;
  }
  
  .faq-item h3 {
    font-size: 1rem;
  }
}
</style>

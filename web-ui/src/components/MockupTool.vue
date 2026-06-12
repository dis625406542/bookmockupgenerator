<template>
  <div class="mockup-tool-widget">
    <div class="function-section">
      <div class="result-panel">
        <div ref="canvasContainer" class="canvas-container">
          <canvas ref="mockupCanvas"></canvas>
        </div>
        <div class="info-panel">
          <div class="info-tags">
            <span class="tag">Tags:</span>&nbsp;&nbsp;
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
          <div class="info-description">This charming mockup template features a small child sitting among friends, holding a book cover in their hands.</div>
          <div class="info-template">
            <div class="template-item"><span class="template-label">Published:</span><span class="template-value">24 Jun 2024</span></div>
            <div class="template-item"><span class="template-label">Size:</span><span class="template-value">1024x1024px</span></div>
          </div>
        </div>
      </div>
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
        <div class="control-item"><span class="label">Highlights</span><el-switch v-model="highlights" active-color="#13ce66"></el-switch></div>
        <div class="control-item"><span class="label">Shadows</span><el-switch v-model="shadows" active-color="#13ce66"></el-switch></div>
        <el-divider></el-divider>
        <div class="image-control">
          <div class="control-item"><span class="label">Your image:</span><el-switch v-model="coverEnabled" active-color="#13ce66"></el-switch></div>
          <span class="image-size">512x636px</span>
          <el-button class="upload-action-btn" type="danger" icon="el-icon-picture-outline" @click="openImageModal">Add image/design</el-button>
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
      </div>
    </div>
    <ImageUploadModal :visible="showImageModal" @close="closeImageModal" @confirm="handleModalConfirm" />
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import bookBackground1 from '@/assets/images/book-background1.jpg';
import bookHighlights1 from '@/assets/images/book-highlights1.png';
import bookMask1 from '@/assets/images/book-mask1.png';

export default {
  name: 'MockupTool',
  components: {
    ImageUploadModal: () => import('@/components/ImageUploadModal.vue'),
  },
  data() {
    return {
      userImage: null,
      isLoading: false,
      format: 'PNG',
      highlights: true,
      shadows: true,
      coverEnabled: true,
      showImageModal: false,
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
              { x: 252, y: 134 },
              { x: 548, y: 134 },
              { x: 548, y: 501 },
              { x: 248, y: 503 },
            ],
          },
          { type: 'image', src: bookHighlights1, id: 'highlights' },
          { type: 'image', src: bookMask1, id: 'mask' },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => { this.initPixiRenderer(); }, 100);
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
      this.resizeTimer = setTimeout(() => { this.resizePixiRenderer(); }, 200);
    },
    openImageModal() { this.showImageModal = true; },
    closeImageModal() { this.showImageModal = false; },
    handleModalConfirm(data) {
      const img = new Image();
      img.onload = () => {
        this.userImage = img;
        if (data.autoRender) {
          this.$nextTick(() => { setTimeout(() => { this.handleRender(); }, 100); });
        }
      };
      img.src = data.image;
    },
    handleRender() {
      if (!this.userImage) { this.$message.warning('Please upload a cover image first.'); return; }
      this.renderPixiMockup(this.userImage);
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
      });
    },

    // ===== PIXI.js WebGL 渲染（原样搬迁，不改算法）=====
    async initPixiRenderer() {
      const container = this.$refs.canvasContainer;
      const canvas = this.$refs.mockupCanvas;
      if (!container || !canvas) return;
      const w = container.clientWidth;
      const h = w / (this.template.width / this.template.height);
      this.pixiApp = new PIXI.Application({
        view: canvas, width: w, height: h,
        backgroundAlpha: 0, antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true, preserveDrawingBuffer: true,
      });
      this.tex = {
        bg: await this.loadPixiTexture(bookBackground1),
        mask: await this.loadPixiTexture(bookMask1),
        highlights: await this.loadPixiTexture(bookHighlights1),
      };
      this.drawPixiScene(null);
    },
    loadPixiTexture(url) {
      return new Promise((resolve, reject) => {
        const texture = PIXI.Texture.from(url);
        if (texture.baseTexture.valid) { resolve(texture); }
        else {
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
    async renderPixiMockup(coverImage) {
      if (!this.pixiApp) await this.initPixiRenderer();
      this.isLoading = true;
      try {
        this.coverTex = PIXI.Texture.from(coverImage);
        this.drawPixiScene(this.coverTex);
      } catch (e) {
        console.error('PIXI render failed:', e);
        this.$message.error('Render failed.');
      } finally { this.isLoading = false; }
    },
    drawPixiScene(coverTex) {
      const app = this.pixiApp;
      if (!app || !this.tex) return;
      const stage = app.stage;
      stage.removeChildren();
      const W = app.renderer.width / (app.renderer.resolution || 1);
      const H = app.renderer.height / (app.renderer.resolution || 1);
      const bg = this.tex.bg;
      const bgRatio = bg.width / bg.height;
      const viewRatio = W / H;
      let bgW, bgH, bgX, bgY;
      if (viewRatio > bgRatio) { bgH = H; bgW = H * bgRatio; bgX = (W - bgW) / 2; bgY = 0; }
      else { bgW = W; bgH = W / bgRatio; bgX = 0; bgY = (H - bgH) / 2; }
      const bgSprite = new PIXI.Sprite(bg);
      bgSprite.position.set(bgX, bgY);
      bgSprite.width = bgW; bgSprite.height = bgH;
      stage.addChild(bgSprite);
      if (!coverTex) return;
      const scale = W / this.template.width;
      const dp = this.template.layers.find(l => l.name === 'cover').destPoints;
      const quad = dp.map(p => ({ x: p.x * scale, y: p.y * scale }));
      const geometry = this.buildQuadGeometry(quad);
      const cover = this.buildCoverMesh(geometry, coverTex, this.tex.mask);
      stage.addChild(cover);
      if (this.highlights) {
        const xs = quad.map(p => p.x), ys = quad.map(p => p.y);
        const minX = Math.min(...xs), minY = Math.min(...ys);
        const w = Math.max(...xs) - minX, h = Math.max(...ys) - minY;
        const hl = new PIXI.Sprite(this.tex.highlights);
        hl.position.set(minX, minY); hl.width = w; hl.height = h;
        stage.addChild(hl);
      }
    },
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
          float m = texture2D(uMask, vUv).a;
          float a = cover.a * m;
          gl_FragColor = vec4(cover.rgb * a, a);
        }`;
      const shader = PIXI.Shader.from(vert, frag, { uCover: coverTex, uMask: maskTex });
      return new PIXI.Mesh(geometry, shader);
    },
    async downloadRenderedImage() {
      const canvas = this.$refs.mockupCanvas;
      if (!canvas) { this.$message.error('No image to download'); return; }
      const now = new Date();
      const ts = now.getHours().toString().padStart(2,'0') + now.getMinutes().toString().padStart(2,'0') + now.getSeconds().toString().padStart(2,'0');
      let dataURL, filename;
      if (this.format === 'PNG') { dataURL = canvas.toDataURL('image/png'); filename = `book-mockup-${ts}.png`; }
      else { dataURL = canvas.toDataURL('image/jpeg', 0.9); filename = `book-mockup-${ts}.jpg`; }
      const link = document.createElement('a');
      link.href = dataURL; link.download = filename;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      this.$message.success(`Downloaded: ${filename}`);
    },
  },
};
</script>

<style scoped>
.mockup-tool-widget {
  width: 100%;
}
.function-section {
  display: flex;
  width: 100%;
  padding: 30px 2rem 2rem;
  gap: 2rem;
  justify-content: center;
}
.result-panel {
  flex: 1;
  max-width: 600px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
.canvas-container { width: 100%; }
canvas { width: 100%; height: auto; }
.info-panel {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.4;
}
.info-tags { margin-bottom: 0.75rem; line-height: 1.6; }
.tag { color: #495057; font-weight: 500; }
.tag-separator { color: #6c757d; margin: 0 0.3rem; }
.info-description { color: #6c757d; margin-bottom: 0.75rem; font-style: italic; }
.info-template { display: flex; flex-direction: column; gap: 0.25rem; }
.template-item { display: flex; justify-content: space-between; align-items: center; }
.template-label { color: #495057; font-weight: 500; }
.template-value { color: #6c757d; font-family: monospace; }
.control-panel {
  width: 380px;
  flex-shrink: 0;
  border: 1px solid rgba(192,192,192,0.3);
  border-radius: 6px;
  background: #ffffff;
  padding: 1.5rem;
}
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e4e7ed; }
.panel-title { font-size: 1.1rem; font-weight: 600; color: #303133; }
.control-group { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
.format-selector { display: flex; justify-content: center; }
.upgrade-btn { width: 100%; font-weight: bold; background-color: #e6a23c; border-color: #e6a23c; }
.upgrade-btn:hover { background-color: #cf9236; border-color: #cf9236; }
.control-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.control-item .label { font-weight: 500; color: #606266; }
.image-control { display: flex; flex-direction: column; margin-bottom: 1.5rem; }
.image-control .image-size { font-size: 0.8rem; color: #909399; margin-bottom: 0.75rem; }
.upload-action-btn { width: 100%; background-color: #f56c6c !important; border-color: #f56c6c !important; }
.upload-action-btn:hover { background-color: #f78989 !important; border-color: #f78989 !important; }
@media (max-width: 768px) {
  .function-section { flex-direction: column; gap: 1.5rem; padding: 20px 1rem 1.5rem; }
  .control-panel, .result-panel { width: 100%; max-width: 100%; }
}
</style>

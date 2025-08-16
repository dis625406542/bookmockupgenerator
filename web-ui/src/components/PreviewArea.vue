<template>
  <div class="preview-area">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script>
// 引入我们的背景图片
import bookBackground from '@/assets/images/book-background.jpg';

export default {
  name: 'PreviewArea',
  props: {
    coverImageUrl: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      // 定义背景图的原始尺寸和封面四个角的坐标
      config: {
        width: 800,
        height: 600,
        // 这四个点是根据 800x600 的 book-background.jpg 精确测量的
        destPoints: [
          { x: 385, y: 102 }, // 左上
          { x: 704, y: 125 }, // 右上
          { x: 631, y: 526 }, // 右下
          { x: 312, y: 490 }, // 左下
        ],
      },
      backgroundImage: null,
      coverImage: null,
    };
  },
  watch: {
    // 监听 coverImageUrl prop 的变化
    // 当父组件传来新的图片URL时，重新渲染 canvas
    coverImageUrl: {
      immediate: true, // 立即执行一次
      handler(newUrl) {
        if (newUrl) {
          this.renderMockup();
        }
      },
    },
  },
  mounted() {
    console.log('PreviewArea组件已挂载，coverImageUrl:', this.coverImageUrl);
    
    // 延迟初始化，确保DOM完全渲染
    this.$nextTick(() => {
      console.log('DOM已渲染完成，开始初始化Canvas');
      this.initCanvas();
      
      // 如果没有coverImageUrl，也要渲染背景
      if (!this.coverImageUrl) {
        console.log('没有封面图片，渲染仅背景');
        this.renderBackgroundOnly();
      } else {
        console.log('有封面图片，渲染完整mockup');
        this.renderMockup();
      }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    // 清理事件监听器
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      // 窗口大小变化时重新初始化Canvas
      this.initCanvas();
      // 重新渲染
      if (!this.coverImageUrl) {
        this.renderBackgroundOnly();
      } else {
        this.renderMockup();
      }
    },

    initCanvas() {
      const canvas = this.$refs.canvasRef;
      if (!canvas) {
        console.error('Canvas元素未找到');
        return;
      }
      
      const container = canvas.parentElement;
      if (!container) {
        console.error('Canvas容器未找到');
        return;
      }
      
      // 获取容器的实际尺寸
      const containerWidth = container.clientWidth || 800;
      const containerHeight = container.clientHeight || 600;
      
      // 设置Canvas的实际像素尺寸（保持宽高比）
      const aspectRatio = this.config.width / this.config.height;
      let canvasWidth, canvasHeight;
      
      if (containerWidth / containerHeight > aspectRatio) {
        // 容器更宽，以高度为准
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * aspectRatio;
      } else {
        // 容器更高，以宽度为准
        canvasWidth = containerWidth;
        canvasHeight = containerWidth / aspectRatio;
      }
      
      // 设置Canvas的实际像素尺寸
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // 设置CSS样式尺寸
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
      
      console.log('Canvas初始化完成:', {
        width: canvas.width,
        height: canvas.height,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        aspectRatio: aspectRatio
      });
    },

    async renderMockup() {
      const canvas = this.$refs.canvasRef;
      if (!canvas) {
        console.error('renderMockup: Canvas未找到');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('renderMockup: 无法获取Canvas上下文');
        return;
      }

      console.log('开始渲染mockup, coverImageUrl:', this.coverImageUrl);

      try {
        // 先加载背景图片
        const bgImg = await this.loadImage(bookBackground);
        this.backgroundImage = bgImg;
        console.log('背景图片加载成功');

        // 如果有封面图片，则加载封面
        if (this.coverImageUrl) {
          const coverImg = await this.loadImage(this.coverImageUrl);
          this.coverImage = coverImg;
          console.log('封面图片加载成功');
        }

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 计算缩放比例
        const scale = canvas.width / this.config.width;
        console.log('缩放比例:', scale);

        // 1. 绘制扭曲后的封面图片（如果有的话）
        if (this.coverImage) {
          this.drawTransformedImage(ctx, this.coverImage, scale);
        }

                 // 2. 绘制背景图，保持宽高比
         const bgScale = Math.min(canvas.width / this.backgroundImage.width, canvas.height / this.backgroundImage.height);
         const bgScaledWidth = this.backgroundImage.width * bgScale;
         const bgScaledHeight = this.backgroundImage.height * bgScale;
         const bgX = (canvas.width - bgScaledWidth) / 2;
         const bgY = (canvas.height - bgScaledHeight) / 2;
         
         ctx.drawImage(this.backgroundImage, bgX, bgY, bgScaledWidth, bgScaledHeight);
        
        console.log('Mockup渲染完成');
      } catch (error) {
        console.error("图片加载失败:", error);
        // 即使图片加载失败，也要显示背景
        this.renderBackgroundOnly();
      }
    },

    async renderBackgroundOnly() {
      const canvas = this.$refs.canvasRef;
      if (!canvas) {
        console.error('renderBackgroundOnly: Canvas未找到');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('renderBackgroundOnly: 无法获取Canvas上下文');
        return;
      }

      console.log('开始渲染仅背景，Canvas尺寸:', canvas.width, 'x', canvas.height);

      // 先绘制一个简单的测试图案，确保Canvas工作正常
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制一个简单的边框
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      
      // 绘制一些测试文字
      ctx.fillStyle = '#666';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Canvas测试 - 正在加载背景图片...', canvas.width / 2, canvas.height / 2);

      try {
        // 只加载背景图片
        const bgImg = await this.loadImage(bookBackground);
        this.backgroundImage = bgImg;
        
        console.log('背景图片加载成功，尺寸:', bgImg.width, 'x', bgImg.height);
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制背景图，保持宽高比
        const scale = Math.min(canvas.width / bgImg.width, canvas.height / bgImg.height);
        const scaledWidth = bgImg.width * scale;
        const scaledHeight = bgImg.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;
        
        ctx.drawImage(bgImg, x, y, scaledWidth, scaledHeight);
        
        console.log('仅背景渲染完成，绘制参数:', {
          scale, scaledWidth, scaledHeight, x, y
        });
      } catch (error) {
        console.error("背景图片加载失败:", error);
        // 如果背景图片也加载失败，显示错误信息
        this.renderError(ctx);
      }
    },

    renderError(ctx) {
      const canvas = this.$refs.canvasRef;
      if (!canvas) return;
      
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 设置背景色
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 显示错误信息
      ctx.fillStyle = '#666';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('图片加载失败', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillText('请检查网络连接', canvas.width / 2, canvas.height / 2 + 10);
    },

    loadImage(src) {
      // 封装一个 Promise 用于加载图片
      return new Promise((resolve, reject) => {
        console.log('开始加载图片:', src);
        
        const img = new Image();
        
        // 设置超时
        const timeout = setTimeout(() => {
          console.error('图片加载超时:', src);
          reject(new Error(`图片加载超时: ${src}`));
        }, 10000); // 10秒超时
        
        img.crossOrigin = 'Anonymous'; // 允许跨域图片
        
        img.onload = () => {
          clearTimeout(timeout);
          console.log('图片加载成功:', src, '尺寸:', img.width, 'x', img.height);
          resolve(img);
        };
        
        img.onerror = (error) => {
          clearTimeout(timeout);
          console.error('图片加载失败:', src, error);
          reject(new Error(`图片加载失败: ${src}`));
        };
        
        // 开始加载
        img.src = src;
      });
    },

    drawTransformedImage(ctx, image, scale) {
      // 安全检查：确保配置和图片都存在
      if (!this.config || !this.config.destPoints || !image) {
        console.error('drawTransformedImage: 缺少必要的配置或图片');
        return;
      }

      // 确保destPoints有4个点
      if (this.config.destPoints.length !== 4) {
        console.error('drawTransformedImage: destPoints必须有4个点');
        return;
      }

      // 这个函数是实现透视变换的核心
      const dest = this.config.destPoints.map(p => ({ x: p.x * scale, y: p.y * scale }));

      const src = [
        { x: 0, y: 0 },
        { x: image.width, y: 0 },
        { x: image.width, y: image.height },
        { x: 0, y: image.height },
      ];

      // 将目标四边形分割成两个三角形进行绘制
      // 第一个三角形：点0, 1, 2
      // 第二个三角形：点0, 2, 3
      const triangles = [
        [0, 1, 2], // 第一个三角形
        [0, 2, 3]  // 第二个三角形
      ];

      for (let i = 0; i < triangles.length; i++) {
        const triangleIndices = triangles[i];
        const src_tri = triangleIndices.map(idx => src[idx]);
        const dst_tri = triangleIndices.map(idx => dest[idx]);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(dst_tri[0].x, dst_tri[0].y);
        ctx.lineTo(dst_tri[1].x, dst_tri[1].y);
        ctx.lineTo(dst_tri[2].x, dst_tri[2].y);
        ctx.closePath();
        ctx.clip(); // 裁剪区域为目标三角形

        // 计算从源三角形到目标三角形的仿射变换矩阵
        const t = this.getTransform(src_tri, dst_tri);
        ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
        ctx.drawImage(image, 0, 0);
        ctx.restore();
      }
    },

    getTransform(src, dst) {
      // 基于三个点计算仿射变换矩阵的数学函数
      const t = {
        a: (dst[1].x * src[2].y - dst[2].x * src[1].y - dst[0].x * src[2].y + dst[2].x * src[0].y + dst[0].x * src[1].y - dst[1].x * src[0].y) / (src[1].x * src[2].y - src[2].x * src[1].y - src[0].x * src[2].y + src[2].x * src[0].y + src[0].x * src[1].y - src[1].x * src[0].y),
        b: (dst[1].y * src[2].y - dst[2].y * src[1].y - dst[0].y * src[2].y + dst[2].y * src[0].y + dst[0].y * src[1].y - dst[1].y * src[0].y) / (src[1].x * src[2].y - src[2].x * src[1].y - src[0].x * src[2].y + src[2].x * src[0].y + src[0].x * src[1].y - src[1].x * src[0].y),
        c: (dst[1].x * src[2].x - dst[2].x * src[1].x - dst[0].x * src[2].x + dst[2].x * src[0].x + dst[0].x * src[1].x - dst[1].x * src[0].x) / (src[1].y * src[2].x - src[2].y * src[1].x - src[0].y * src[2].x + src[2].y * src[0].x + src[0].y * src[1].x - src[1].y * src[0].x),
        d: (dst[1].y * src[2].x - dst[2].y * src[1].x - dst[0].y * src[2].x + dst[2].y * src[0].x + dst[0].y * src[1].x - dst[1].y * src[0].x) / (src[1].y * src[2].x - src[2].y * src[1].x - src[0].y * src[2].x + src[2].y * src[0].x + src[0].y * src[1].x - src[1].y * src[0].x),
        e: dst[0].x - (dst[1].x * src[2].y - dst[2].x * src[1].y - dst[0].x * src[2].y + dst[2].x * src[0].y + dst[0].x * src[1].y - dst[1].x * src[0].y) * src[0].x / (src[1].x * src[2].y - src[2].x * src[1].y - src[0].x * src[2].y + src[2].x * src[0].y + src[0].x * src[1].y - src[1].x * src[0].y) - (dst[1].x * src[2].x - dst[2].x * src[1].x - dst[0].x * src[2].x + dst[2].x * src[0].x + dst[0].x * src[1].x - dst[1].x * src[0].x) * src[0].y / (src[1].y * src[2].x - src[2].y * src[1].x - src[0].y * src[2].x + src[2].y * src[0].x + src[0].y * src[1].x - src[1].y * src[0].x),
        f: dst[0].y - (dst[1].y * src[2].y - dst[2].y * src[1].y - dst[0].y * src[2].y + dst[2].y * src[0].y + dst[0].y * src[1].y - dst[1].y * src[0].y) * src[0].x / (src[1].x * src[2].y - src[2].x * src[1].y - src[0].x * src[2].y + src[2].x * src[0].y + src[0].x * src[1].y - src[1].x * src[0].y) - (dst[1].y * src[2].x - dst[2].y * src[1].x - dst[0].y * src[2].x + dst[2].y * src[0].x + dst[0].y * src[1].x - dst[1].y * src[0].x) * src[0].y / (src[1].y * src[2].x - src[2].y * src[1].x - src[0].y * src[2].x + src[2].y * src[0].x + src[0].y * src[1].x - src[1].y * src[0].x),
      };
      return t;
    },
  },
};
</script>

<style scoped>
.preview-area {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: #f0f0f0;
  border-radius: var(--border-radius);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid #ddd;
}

canvas {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid #ccc;
  background-color: white;
}
</style>
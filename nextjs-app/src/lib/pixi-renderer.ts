// 框架无关的 PIXI.js v5 渲染器，从 Vue Home.vue 原样移植。
// 算法与模板无关：换书本模型时这些函数一行都不用动。
import * as PIXI from "pixi.js";

export interface TemplatePoint {
  x: number;
  y: number;
}

export interface Template {
  id: string;
  width: number;
  height: number;
  bg: string;
  mask: string;
  highlights: string;
  destPoints: [TemplatePoint, TemplatePoint, TemplatePoint, TemplatePoint];
}

export interface SceneTextures {
  bg: PIXI.Texture;
  mask: PIXI.Texture;
  highlights: PIXI.Texture;
}

export interface DrawOptions {
  highlights: boolean;
}

// 模板定义：所有模板共用素材（底图+mask+高光），仅 destPoints 不同。
// 素材在 public/templates/ 下。
const ASSETS = {
  bg: "/templates/book-background1.jpg",
  mask: "/templates/book-mask1.png",
  highlights: "/templates/book-highlights1.png",
} as const;

export const CHILD_BOOK_TEMPLATE: Template = {
  id: "child-book",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 252, y: 134 },
    { x: 548, y: 134 },
    { x: 548, y: 501 },
    { x: 248, y: 503 },
  ],
};

export const HARDCOVER_TEMPLATE: Template = {
  id: "hardcover",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 252, y: 134 },
    { x: 548, y: 134 },
    { x: 548, y: 501 },
    { x: 248, y: 503 },
  ],
};

export const PAPERBACK_TEMPLATE: Template = {
  id: "paperback",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 270, y: 152 },
    { x: 530, y: 152 },
    { x: 530, y: 483 },
    { x: 270, y: 485 },
  ],
};

export const EBOOK_TEMPLATE: Template = {
  id: "ebook",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 290, y: 100 },
    { x: 510, y: 100 },
    { x: 510, y: 530 },
    { x: 290, y: 535 },
  ],
};

export const THREE_D_TEMPLATE: Template = {
  id: "3d",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 230, y: 144 },
    { x: 560, y: 120 },
    { x: 570, y: 490 },
    { x: 240, y: 510 },
  ],
};

export const BOOK_COVER_TEMPLATE: Template = {
  id: "book-cover",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 260, y: 140 },
    { x: 540, y: 140 },
    { x: 540, y: 495 },
    { x: 260, y: 497 },
  ],
};

export const FREE_BOOK_TEMPLATE: Template = {
  id: "free-book",
  width: 800,
  height: 600,
  ...ASSETS,
  destPoints: [
    { x: 252, y: 134 },
    { x: 548, y: 134 },
    { x: 548, y: 501 },
    { x: 248, y: 503 },
  ],
};

export const TEMPLATE_MAP: Record<string, Template> = {
  "child-book": CHILD_BOOK_TEMPLATE,
  hardcover: HARDCOVER_TEMPLATE,
  paperback: PAPERBACK_TEMPLATE,
  ebook: EBOOK_TEMPLATE,
  "3d": THREE_D_TEMPLATE,
  "book-cover": BOOK_COVER_TEMPLATE,
  "free-book": FREE_BOOK_TEMPLATE,
};

export interface TemplateInfo {
  tags: string;
  description: string;
}

export const TEMPLATE_INFO: Record<string, TemplateInfo> = {
  "child-book": {
    tags: "front | book | hardcover book | book mockup | hardcover | hardcover book mockup | book mockup generator",
    description:
      "This charming mockup template features a small child sitting among friends, holding a book cover in their hands.",
  },
  hardcover: {
    tags: "hardcover | hardback | casebound | book mockup generator | rigid cover | spine detail",
    description:
      "Classic hardcover book with rigid case binding, visible spine, and crisp shadow detail — ideal for premium book presentations.",
  },
  paperback: {
    tags: "paperback | softcover | trade paperback | book mockup | KDP | perfect bound | indie author",
    description:
      "Realistic paperback book with flexible softcover appearance, perfect for indie author listings and Amazon KDP previews.",
  },
  ebook: {
    tags: "ebook | Kindle | digital book | device mockup | e-reader | tablet | Apple Books",
    description:
      "Digital book cover displayed on a device screen — see how your cover reads at thumbnail size for Kindle and Apple Books.",
  },
  "3d": {
    tags: "3D | perspective | dimensional | book mockup | angled view | spine | page edges",
    description:
      "Angled 3D perspective view showing the book with depth, page edges, and realistic shading — great for promotional images.",
  },
  "book-cover": {
    tags: "book cover | cover art | front cover | book mockup | presentation | portfolio",
    description:
      "Clean front-facing book presentation with natural lighting and shadows — perfect for cover designers showcasing work to clients.",
  },
  "free-book": {
    tags: "free | no watermark | book mockup | no signup | commercial use | unlimited",
    description:
      "Completely free book mockup with no watermarks, no signup required, and full commercial use rights.",
  },
};

// 建 PIXI Application。让 PIXI 自己建 canvas（不传 view），避免 React StrictMode
// 双挂载复用同一 canvas 元素导致 WebGL context 失效（表现为下载有图但屏幕空白）。
// backgroundAlpha:0 透明底；preserveDrawingBuffer:true 否则 toDataURL 下载得到空白图。
export function initPixiApp(
  width: number,
  height: number
): PIXI.Application {
  // PIXI v5.3 运行时支持 backgroundAlpha，但 TS 类型定义未含，故断言。
  const options = {
    width,
    height,
    backgroundAlpha: 0,
    antialias: true,
    resolution: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    autoDensity: true,
    preserveDrawingBuffer: true,
  } as unknown as ConstructorParameters<typeof PIXI.Application>[0];
  return new PIXI.Application(options);
}

// PIXI v5 纹理加载：确保 baseTexture 加载完成后再返回，避免宽高为 0。
export function loadPixiTexture(url: string): Promise<PIXI.Texture> {
  return new Promise((resolve, reject) => {
    const texture = PIXI.Texture.from(url);
    if (texture.baseTexture.valid) {
      resolve(texture);
    } else {
      texture.baseTexture.once("loaded", () => resolve(texture));
      texture.baseTexture.once("error", reject);
    }
  });
}

// 预加载模板三张固定纹理。
export async function loadSceneTextures(
  template: Template
): Promise<SceneTextures> {
  const [bg, mask, highlights] = await Promise.all([
    loadPixiTexture(template.bg),
    loadPixiTexture(template.mask),
    loadPixiTexture(template.highlights),
  ]);
  return { bg, mask, highlights };
}

// 构建双线性细分四边形 geometry（seg=20）。
export function buildQuadGeometry(quad: TemplatePoint[]): PIXI.Geometry {
  const seg = 20;
  const verts: number[] = [];
  const uvs: number[] = [];
  const idx: number[] = [];
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
      const a = r * stride + c;
      const b = a + 1;
      const d = a + stride;
      const e = d + 1;
      idx.push(a, b, d, b, e, d);
    }
  }
  return new PIXI.Geometry()
    .addAttribute("aVertexPosition", verts, 2)
    .addAttribute("aTextureCoord", uvs, 2)
    .addIndex(idx);
}

// 封面网格：封面纹理用 mask 的 alpha 通道做遮罩。
// mask 白区 a=1 显示封面；透明区 a=0 露出底图真实手指。
// GPU 双线性采样天然羽化消白边。输出预乘 alpha。
export function buildCoverMesh(
  geometry: PIXI.Geometry,
  coverTex: PIXI.Texture,
  maskTex: PIXI.Texture
): PIXI.Mesh {
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
  // Mesh 运行时接受 Shader，类型签名要 MeshMaterial，故断言。
  return new PIXI.Mesh(geometry, shader as unknown as PIXI.MeshMaterial);
}

// 组装场景：底图(contain 居中) → 封面(网格变形+mask 抠图) → 高光。
// 坐标系铁律：封面 quad 用 scale = canvasWidth/template.width，绝不叠加背景 bgX/bgY 偏移。
export function drawPixiScene(
  app: PIXI.Application,
  tex: SceneTextures,
  template: Template,
  coverTex: PIXI.Texture | null,
  opts: DrawOptions
): void {
  const stage = app.stage;
  stage.removeChildren();

  const resolution = app.renderer.resolution || 1;
  const W = app.renderer.width / resolution;
  const H = app.renderer.height / resolution;

  // 背景以 contain 方式居中铺满。
  const bg = tex.bg;
  const bgRatio = bg.width / bg.height;
  const viewRatio = W / H;
  let bgW: number, bgH: number, bgX: number, bgY: number;
  if (viewRatio > bgRatio) {
    bgH = H;
    bgW = H * bgRatio;
    bgX = (W - bgW) / 2;
    bgY = 0;
  } else {
    bgW = W;
    bgH = W / bgRatio;
    bgX = 0;
    bgY = (H - bgH) / 2;
  }
  const bgSprite = new PIXI.Sprite(bg);
  bgSprite.position.set(bgX, bgY);
  bgSprite.width = bgW;
  bgSprite.height = bgH;
  stage.addChild(bgSprite);

  if (!coverTex) return;

  // 封面四边形：scale = W/template.width，不叠加背景偏移。
  const scale = W / template.width;
  const quad = template.destPoints.map((p) => ({ x: p.x * scale, y: p.y * scale }));
  const geometry = buildQuadGeometry(quad);

  const cover = buildCoverMesh(geometry, coverTex, tex.mask);
  stage.addChild(cover);

  // 高光：highlights 图拉进封面包围盒(bbox)，普通 alpha 混合。
  if (opts.highlights) {
    const xs = quad.map((p) => p.x);
    const ys = quad.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const w = Math.max(...xs) - minX;
    const h = Math.max(...ys) - minY;
    const hl = new PIXI.Sprite(tex.highlights);
    hl.position.set(minX, minY);
    hl.width = w;
    hl.height = h;
    stage.addChild(hl);
  }
}

// 从 canvas 导出图片并触发下载。
export function downloadCanvas(
  canvas: HTMLCanvasElement,
  format: "PNG" | "JPEG"
): string {
  const now = new Date();
  const ts =
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0");
  let dataURL: string;
  let filename: string;
  if (format === "PNG") {
    dataURL = canvas.toDataURL("image/png");
    filename = `book-mockup-${ts}.png`;
  } else {
    dataURL = canvas.toDataURL("image/jpeg", 0.9);
    filename = `book-mockup-${ts}.jpg`;
  }
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return filename;
}

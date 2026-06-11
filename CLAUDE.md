# CLAUDE.md — bookmockupgenerator

## 协作规则（重要）
在本项目目录下**直接改代码，不要逐个改动停下来确认**。按指示和判断连续推进。

明确授权（无需逐次确认）：
- 读取本项目目录下任意文件
- 新建 / 修改 / 删除本项目源码与配置文件（开发相关）
- 跑构建、lint、本地 dev server 等验证命令

唯一停止线：
- 不要 git 提交 / push（除非明确要求）
- 全局红线中与本项目无关的仍生效：改 .env/密钥、数据库迁移、强制推送、装全局依赖、公开发布
- 删除「本项目目录之外」的文件或 git 历史仍需先问

## 项目概况
线上站点：https://www.mymockupbook.com/ —— 图书封面 mockup 生成器（用户上传封面图，渲染到书本模板上）。
目标用户：英文用户（自出版作者、设计师），美国为主。

## 技术栈
- **Vue 2.6 + vue-cli 4 + vue-router**（history 模式），纯 SPA
- Element UI 2.15、vue-cropper、axios
- 代码在 `web-ui/` 子目录，不是仓库根
- `npm run dev` 本地、`npm run build` 构建、`npm run lint`

## 核心渲染逻辑：PIXI.js v5 WebGL（2026-06 重写，已替代旧 Canvas2D）

渲染全部在 `web-ui/src/views/Home.vue` 的 PIXI 方法里，**算法与模板无关**，换书本模型时这些方法一行都不用动：
- `initPixiRenderer()` — 建 `PIXI.Application`（`backgroundAlpha:0`、`preserveDrawingBuffer:true` 否则 toDataURL 下载空白），预加载三张固定纹理。
- `drawPixiScene(coverTex)` — 组装场景：背景 Sprite(contain 居中) → 封面 Mesh(网格变形+mask 抠图) → highlights Sprite(拉进封面 bbox，普通 alpha 混合)。
- `buildQuadGeometry(quad)` — seg=20 双线性细分四边形，destPoints 四角 → 网格顶点。
- `buildCoverMesh()` — 自定义 GLSL shader：`a = cover.a * mask.a`，输出预乘 alpha。mask 白区(a=1)显示封面、透明区(a=0)漏出底图真实手指，GPU 双线性采样天然羽化、消白边。

**坐标系铁律（踩过坑，别再错）**：封面 quad 用 `scale = canvasWidth / template.width`，**绝不叠加背景的 bgX/bgY 偏移**。destPoints 是在这个无偏移坐标系下手调的，加偏移必错位。highlights 拉进封面 bbox + 普通 alpha 混合（不是 SCREEN、不是全画布）。

旧的 `imageProcessor.js`（2倍重采样+白色阈值240像素覆盖）已弃用，仅留作参考，不要再走那条路。

## 换新书本模型的标准改造流程
算法通用，但**不是只换底图+坐标**。每个新模型需一套**配套素材 + 一组坐标**：
- `background.jpg` — 底图(书+手+场景)，新做。
- `mask.png` — indexed/带 alpha，白=封面区、透明=漏底图手指的孔。**必须和底图手指位置精确对齐**。
- `highlights.png` — 书页纹理/明暗，带透明通道，叠在封面上。
- `destPoints` — 封面四角 `[左上,右上,右下,左下]`，在新底图上重调。

铁律：mask/highlights 跟着 background 的手指位置和书本透视走，三张图必须配套出，光换底图不换 mask 手指会漏不出或错位。

destPoints 微调口诀：x=水平(大=右)、y=垂直(大=下，往上就减小 y)。当前 child-book 定稿值：`[252,134][548,134][548,501][248,503]`。

**多模型支持的代码改造**（目前是写死单模板：顶部 3 个 import + `data.template` 单对象）：
1. 改成 `templates: [{ id, width, height, bg, mask, highlights, destPoints }, ...]` 数组 + `currentTemplateId`。
2. `drawPixiScene` 读 `this.currentTemplate` 取素材和坐标。
3. 可选：把调 destPoints 做成画布上拖拽 4 个角点，省去改数字刷新的来回。

## SEO 现状与诊断（2026-06 据 GSC + SEMrush）
- **根因**：纯 SPA 客户端渲染 + 全站只有首页 1 个真实页面（路由里 home1/home2/home3 是开发残版，coordinate-picker 是调试工具）。
- GSC：3个月仅首页有曝光，总曝光317/点击3，平均排名约75（第7-8页）。
- 真实有曝光的词：book mockup generator(155)、free book mockup generator(45)、book cover mockup generator、book mockup online。
- niche 有量：`book mockup` 美国 3.6K / 全球 38.5K，KD 36。低 KD 长尾词总量约 4220/月。
- 规划：阶段一零风险修复 SEO meta/sitemap；阶段二（验证后）Next.js 重做铺落地页矩阵。

## 已知待办 / 注意
- 工具下载格式仅 JPEG/PNG（无 PSD），文案不要承诺 PSD。
- 首页 URL `/` 不可改、不可删（已被收录，保住收录）。

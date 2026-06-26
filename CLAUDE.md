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
- **Next.js 14.2 + React + TypeScript**（SSG 静态生成）
- 主站在 `nextjs-app/` 子目录
- Tailwind CSS、PIXI.js v5（WebGL 渲染）、vue-cropper
- `npm run dev` 本地（3000端口）、`npm run build` 构建、`npm run lint`
- 旧 Vue 2.6 SPA 在 `web-ui/` 保留作参考，已弃用

## 核心渲染逻辑：PIXI.js v5 WebGL（2026-06 重写）

渲染核心在 `nextjs-app/src/lib/pixi-renderer.ts` 和 `nextjs-app/src/components/tool/PixiCanvas.tsx`。**算法与模板无关**，换书本模型时这些文件不用动：
- `initPixiApp()` — 建 `PIXI.Application`（`backgroundAlpha:0`、`preserveDrawingBuffer:true` 否则 toDataURL 下载空白），预加载三张固定纹理。
- `drawPixiScene()` — 组装场景：背景 Sprite(contain 居中) → 封面 Mesh(网格变形+mask 抠图) → highlights Sprite(拉进封面 bbox，普通 alpha 混合)。
- `buildQuadGeometry()` — seg=20 双线性细分四边形，destPoints 四角 → 网格顶点。
- `buildCoverMesh()` — 自定义 GLSL shader：`a = cover.a * mask.a`，输出预乘 alpha。mask 白区(a=1)显示封面、透明区(a=0)漏出底图真实手指，GPU 双线性采样天然羽化、消白边。

**坐标系铁律（踩过坑，别再错）**：封面 quad 用 `scale = canvasWidth / template.width`，**绝不叠加背景的 bgX/bgY 偏移**。destPoints 是在这个无偏移坐标系下手调的，加偏移必错位。highlights 拉进封面 bbox + 普通 alpha 混合（不是 SCREEN、不是全画布）。

旧 Vue 实现在 `web-ui/src/views/Home.vue`，已弃用仅作参考。

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

## SEO 现状与架构（2026-06 完成改造）
- **改造前根因**：纯 Vue SPA 客户端渲染 + 全站只有首页 1 个真实页面。
- **改造后架构**：Next.js 14 SSG，7 个静态落地页矩阵（首页 + 6 个关键词页面）。
- 关键词页面：hardcover-book-mockup, paperback-book-mockup, ebook-mockup-generator, 3d-book-mockup-generator, book-cover-mockup-generator, free-book-mockup-generator。
- 每页 800-1000 词差异化内容，避免模板页判定。
- 法律页面已完备：/privacy-policy, /terms-of-service, /contact（Google Ads 必需）。
- niche 有真实量：`book mockup` 美国 3.6K/全球 38.5K，KD 36。低 KD 长尾词总量约 4220/月。

## 已知待办 / 注意
- 工具下载格式仅 JPEG/PNG（无 PSD），文案不要承诺 PSD。
- 首页 URL `/` 不可改、不可删（已被收录，保住收录）。
- 控制面板功能：Highlights 开关（书页纹理）、Your image 开关（显隐封面）、Shadows 占位（未实现）。
- 7 个模板共用素材（book-background1.jpg/mask1.png/highlights1.png），仅 destPoints 不同。

## 开发规范（踩坑教训，务必遵守）

### 代码提交前强制 checklist
改完代码后，按顺序完成以下验证，**全部通过才能 commit**：
- [ ] `npm run build` 通过（nextjs-app 目录下）
- [ ] `npm run lint` 无 error（可以有 warning）
- [ ] 浏览器打开受影响的页面，**截图验证**功能正常
- [ ] 涉及多模板/多落地页的改动，**逐个测试**每个模板/页面的渲染效果

### 模板坐标管理铁律
**背景**：2026-06-25 发现 ebook/3d-book 模板 destPoints 错误，导致封面变形，直到用户截图才暴露。

**规范**：
1. **所有模板保持一致的书本宽高比**（1:1.2 ~ 1:1.3），不要出现正方形或超窄比例。
2. **改坐标前先算宽高比**：
   ```
   宽 = 右上x - 左上x
   高 = 左下y - 左上y
   比例 = 高/宽，应在 1.2~1.3 之间
   ```
3. **新增模板时**，用 child-book 的坐标作为起点微调，不要从零开始瞎调。
4. **改完后必须验证**：打开对应落地页，上传测试图，截图确认封面不变形。

### UI 组件改动验证规范
**背景**：2026-06-25 改完 Footer 后，LandingLayout 和 Footer 都有工具链接重复，直到用户指出才发现。

**规范**：
1. 改完 Footer/Header/Layout 等全局组件后，**必须完整刷新一次页面**，从用户视角检查整体布局。
2. 不要只看单个组件的代码，要看渲染出来的完整页面有没有重复/冲突。
3. 重复内容包括：链接、文案、图标、区块，优先保留用户体验更好的那个位置。

### 多落地页改动的验证流程
**背景**：2026-06-25 扩充 6 个落地页内容到 800-1000 词，只跑了 build 没逐页验证，导致模板错误漏测。

**规范**：
1. 改完落地页后，**逐个打开浏览器验证**：
   - `/` 首页
   - `/hardcover-book-mockup`
   - `/paperback-book-mockup`
   - `/ebook-mockup-generator`
   - `/3d-book-mockup-generator`
   - `/book-cover-mockup-generator`
   - `/free-book-mockup-generator`
2. 每个页面至少做一次「上传封面 → 生成 → 下载」完整流程。
3. 发现问题立即修复，不要等到用户反馈。

### 自动化测试方向（未来改进）
- [ ] 模板坐标自动化测试：每个模板渲染标准测试图，检查宽高比是否在合理范围
- [ ] E2E 测试：Playwright 自动截图 7 个落地页，对比基准图
- [ ] 可视化坐标调试工具：拖拽 4 个角点实时预览，避免手工改数字

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

## 核心渲染逻辑（用户调试已久，谨慎对待）
- `web-ui/src/utils/imageProcessor.js` —— **纯 Canvas + 纯 JS 算法，不依赖 Vue**。手部遮罩叠加：2倍中间尺寸重采样 + 白色阈值(240)判断手部区域 + 像素覆盖。框架无关，可整体移植。
- `web-ui/src/templates.js` —— 模板定义（底图/封面透视坐标 destPoints/光影/手部蒙版图层），纯数据。
- 透视变换（封面 warp 到书的四角）是质量短板所在，Canvas 2D 原生不支持，需 WebGL 或三角剖分纹理映射才能锐利。
- **方向结论**：保留"模板+图层+透视变换"方案，不要换成 AI 重绘（AI 会破坏用户原始封面的文字/logo）。问题在执行质量，不在方法。

## SEO 现状与诊断（2026-06 据 GSC + SEMrush）
- **根因**：纯 SPA 客户端渲染 + 全站只有首页 1 个真实页面（路由里 home1/home2/home3 是开发残版，coordinate-picker 是调试工具）。
- GSC：3个月仅首页有曝光，总曝光317/点击3，平均排名约75（第7-8页）。
- 真实有曝光的词：book mockup generator(155)、free book mockup generator(45)、book cover mockup generator、book mockup online。
- niche 有量：`book mockup` 美国 3.6K / 全球 38.5K，KD 36。低 KD 长尾词总量约 4220/月。
- 规划：阶段一零风险修复 SEO meta/sitemap；阶段二（验证后）Next.js 重做铺落地页矩阵。

## 已知待办 / 注意
- 工具下载格式仅 JPEG/PNG（无 PSD），文案不要承诺 PSD。
- 首页 URL `/` 不可改、不可删（已被收录，保住收录）。

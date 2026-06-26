# MyMockupBook — Free Book Mockup Generator

在线图书封面 mockup 生成器，支持上传封面图并渲染到逼真的书本模板。

🌐 **线上站点**：https://www.mymockupbook.com/

## 技术栈

- **Next.js 14.2** + React + TypeScript（SSG 静态生成）
- **PIXI.js v5** WebGL 渲染（封面网格变形 + mask 抠图）
- Tailwind CSS + vue-cropper
- 7 个静态落地页矩阵（SEO 优化）

## 快速开始

```bash
cd nextjs-app
npm install
npm run dev    # 本地开发 http://localhost:3000
npm run build  # 生产构建
npm run lint   # 代码检查
```

## 项目结构

```
├── nextjs-app/          # Next.js 主站（当前版本）
│   ├── src/
│   │   ├── app/        # 页面路由
│   │   ├── components/ # React 组件
│   │   └── lib/        # PIXI 渲染核心
│   └── public/
│       └── templates/  # 书本素材（背景/mask/高光）
└── web-ui/             # 旧 Vue 2.6 SPA（已弃用，保留作参考）
```

## 核心特性

- **7 种书本模板**：hardcover、paperback、ebook、3d-book、book-cover、free-book、child-book
- **WebGL 高性能渲染**：PIXI.js 网格变形 + GPU shader mask 抠图
- **无水印下载**：支持 JPG/PNG 格式
- **SEO 优化**：800-1000 词差异化落地页内容
- **隐私优先**：封面图本地渲染，不上传服务器

## 开发规范

详见 [CLAUDE.md](CLAUDE.md) 开发规范章节，包括：
- 代码提交前强制 checklist
- 模板坐标管理铁律（宽高比 1:1.2~1.3）
- 多落地页验证流程

## 联系方式

- 官网：https://www.mymockupbook.com/
- Contact：https://www.mymockupbook.com/contact
- Email: support@mymockupbook.com

## License

MIT

# MyMockupBook — Free Book Mockup Generator

Online book cover mockup generator. Upload your cover and render it onto realistic book templates.

🌐 **Live Site**: https://www.mymockupbook.com/

## Tech Stack

- **Next.js 14.2** + React + TypeScript (SSG)
- **PIXI.js v5** WebGL rendering (mesh deformation + mask compositing)
- Tailwind CSS + vue-cropper
- 7 static landing pages (SEO optimized)

## Quick Start

```bash
cd nextjs-app
npm install
npm run dev    # Local dev at http://localhost:3000
npm run build  # Production build
npm run lint   # Code linting
```

## Project Structure

```
├── nextjs-app/          # Next.js main site (current version)
│   ├── src/
│   │   ├── app/        # Page routes
│   │   ├── components/ # React components
│   │   └── lib/        # PIXI rendering core
│   └── public/
│       └── templates/  # Book assets (background/mask/highlights)
└── web-ui/             # Old Vue 2.6 SPA (deprecated, kept for reference)
```

## Core Features

- **7 Book Templates**: hardcover, paperback, ebook, 3d-book, book-cover, free-book, child-book
- **High-Performance WebGL Rendering**: PIXI.js mesh deformation + GPU shader mask compositing
- **Watermark-Free Download**: JPG/PNG formats
- **SEO Optimized**: 800-1000 word differentiated landing pages
- **Privacy First**: Client-side rendering, no server upload

## Development Guidelines

See [CLAUDE.md](CLAUDE.md) development guidelines, including:
- Pre-commit checklist
- Template coordinate management (aspect ratio 1:1.2~1.3)
- Multi-landing-page validation workflow

## Contact

- Website: https://www.mymockupbook.com/
- Contact: https://www.mymockupbook.com/contact
- Email: support@mymockupbook.com

## License

MIT

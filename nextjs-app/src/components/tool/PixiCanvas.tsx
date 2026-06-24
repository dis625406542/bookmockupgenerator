"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as PIXI from "pixi.js";
import {
  CHILD_BOOK_TEMPLATE,
  type Template,
  initPixiApp,
  loadSceneTextures,
  loadPixiTexture,
  drawPixiScene,
  type SceneTextures,
} from "@/lib/pixi-renderer";

export interface PixiCanvasRef {
  renderCover: (coverDataURL: string) => Promise<void>;
  getCanvas: () => HTMLCanvasElement | null;
}

interface PixiCanvasProps {
  highlights: boolean;
  template?: Template;
  onReady?: () => void;
}

const PixiCanvas = forwardRef<PixiCanvasRef, PixiCanvasProps>(
  ({ highlights, template = CHILD_BOOK_TEMPLATE, onReady }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);
    const texRef = useRef<SceneTextures | null>(null);
    const coverTexRef = useRef<PIXI.Texture | null>(null);
    const highlightsRef = useRef(highlights);
    const templateRef = useRef(template);

    // 同步 props 到 ref
    highlightsRef.current = highlights;
    templateRef.current = template;

    // 初始化 PIXI，加载固定纹理，显示底图
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      let destroyed = false;

      const t = templateRef.current;
      const w = container.clientWidth || 800;
      const h = w / (t.width / t.height);

      // PIXI 自建 canvas，由我们 append 进容器，避免复用导致 context 失效。
      const app = initPixiApp(w, h);
      appRef.current = app;

      const view = app.view;
      view.style.maxWidth = "100%";
      view.style.maxHeight = "100%";
      view.style.display = "block";
      container.appendChild(view);

      (async () => {
        const tt = templateRef.current;
        const tex = await loadSceneTextures(tt);
        if (destroyed) return;
        texRef.current = tex;

        // 初始只显示底图（无封面）
        drawPixiScene(app, tex, tt, null, {
          highlights: highlightsRef.current,
        });

        if (onReady) onReady();
      })();

      return () => {
        destroyed = true;
        if (view.parentElement === container) {
          container.removeChild(view);
        }
        app.destroy(true, { children: true, texture: true, baseTexture: true });
        appRef.current = null;
        texRef.current = null;
        coverTexRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // highlights 变化时重绘
    useEffect(() => {
      const app = appRef.current;
      const tex = texRef.current;
      const coverTex = coverTexRef.current;
      if (!app || !tex) return;
      drawPixiScene(app, tex, templateRef.current, coverTex, { highlights });
    }, [highlights]);

    // 暴露方法给父组件：渲染封面、获取 canvas
    useImperativeHandle(ref, () => ({
      async renderCover(coverDataURL: string) {
        const app = appRef.current;
        const tex = texRef.current;
        if (!app || !tex) return;

        const coverTex = await loadPixiTexture(coverDataURL);
        coverTexRef.current = coverTex;
        drawPixiScene(app, tex, templateRef.current, coverTex, {
          highlights: highlightsRef.current,
        });
      },
      getCanvas() {
        return (appRef.current?.view as HTMLCanvasElement) ?? null;
      },
    }));

    return (
      <div
        ref={containerRef}
        className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden"
      />
    );
  }
);

PixiCanvas.displayName = "PixiCanvas";

export default PixiCanvas;

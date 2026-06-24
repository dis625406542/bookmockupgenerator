"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload, ZoomIn, ZoomOut } from "lucide-react";

interface ImageUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (dataURL: string) => void;
}

const CONTAINER_HEIGHT = 330;
const BOOK_ASPECT_RATIO = 0.8;

export default function ImageUploadModal({
  visible,
  onClose,
  onConfirm,
}: ImageUploadModalProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [zoomSlider, setZoomSlider] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [borderPosition, setBorderPosition] = useState({ x: 0, y: 0 });
  const [borderSize, setBorderSize] = useState({ width: 200, height: 250 });
  const [borderVisible, setBorderVisible] = useState(false);

  // 记忆：关闭弹窗后保留上次状态，再打开时恢复（照抄旧版 lastUser*/cached* 机制）
  const lastUserImage = useRef<string | null>(null);
  const lastZoomSlider = useRef(1);
  const lastImagePosition = useRef({ x: 0, y: 0 });
  const cachedBorderPosition = useRef({ x: 0, y: 0 });
  const cachedBorderSize = useRef({ width: 200, height: 250 });
  const hasCachedBorder = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const uploadedImgRef = useRef<HTMLImageElement>(null);
  const coverImgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDragging = useRef(false);
  const isBorderDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeType = useRef<string>("");
  const dragStart = useRef({ x: 0, y: 0 });
  const borderDragStart = useRef({ x: 0, y: 0, width: 0, height: 0, startX: 0, startY: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const bPosRef = useRef({ x: 0, y: 0 });
  const bSizeRef = useRef({ width: 0, height: 0 });

  posRef.current = imagePosition;
  bPosRef.current = borderPosition;
  bSizeRef.current = borderSize;

  // ---- 蓝框对齐：根据图片渲染位置计算 ----
  const alignBorderToImage = (imgEl: HTMLImageElement) => {
    const c = containerRef.current;
    if (!c) return;
    const cr = c.getBoundingClientRect();
    const r = imgEl.getBoundingClientRect();
    const cw = cr.width;

    const x = r.left - cr.left, y = r.top - cr.top;
    const w = r.width, h = r.height;

    let bl = Math.max(0, x);
    let bt = Math.max(0, y);
    let bw = Math.min(w, cw - bl);
    let bh = Math.min(h, CONTAINER_HEIGHT - bt);

    // 蓝框最小尺寸
    if (bw < 20) { bw = 200; bl = Math.max(0, (cw - bw) / 2); }
    if (bh < 20) { bh = 250; bt = Math.max(0, (CONTAINER_HEIGHT - bh) / 2); }

    setBorderPosition({ x: bl, y: bt });
    setBorderSize({ width: bw, height: bh });
    setBorderVisible(true);
  };

  useEffect(() => {
    if (visible) {
      // 打开弹窗：恢复上次状态
      if (lastUserImage.current) {
        setUploadedImage(lastUserImage.current);
        setZoomSlider(lastZoomSlider.current);
        setImagePosition({ ...lastImagePosition.current });
      } else {
        setUploadedImage(null);
        setZoomSlider(1);
        setImagePosition({ x: 0, y: 0 });
      }
      if (hasCachedBorder.current) {
        setBorderPosition({ ...cachedBorderPosition.current });
        setBorderSize({ ...cachedBorderSize.current });
        setBorderVisible(true);
      } else {
        setBorderPosition({ x: 0, y: 0 });
        setBorderSize({ width: 200, height: 250 });
        setBorderVisible(false);
      }
    }
  }, [visible]);

  const onCoverImageLoad = () => {
    if (coverImgRef.current) alignBorderToImage(coverImgRef.current);
  };

  const onUploadedImageLoad = () => {
    if (uploadedImgRef.current) alignBorderToImage(uploadedImgRef.current);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string);
      setZoomSlider(1);
      setImagePosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ---- 图片拖拽 ----
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
  };
  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setImagePosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const stopDrag = () => { isDragging.current = false; };

  // ---- 蓝框拖拽 ----
  const startBorderDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    isBorderDragging.current = true;
    borderDragStart.current = {
      x: e.clientX - bPosRef.current.x, y: e.clientY - bPosRef.current.y,
      width: bSizeRef.current.width, height: bSizeRef.current.height,
      startX: bPosRef.current.x, startY: bPosRef.current.y,
    };
  };
  const onBorderDrag = (e: React.MouseEvent) => {
    if (!isBorderDragging.current) return;
    const cw = containerRef.current?.clientWidth ?? 480;
    let nx = e.clientX - borderDragStart.current.x;
    let ny = e.clientY - borderDragStart.current.y;
    nx = Math.max(0, Math.min(nx, cw - bSizeRef.current.width));
    ny = Math.max(0, Math.min(ny, CONTAINER_HEIGHT - bSizeRef.current.height));
    setBorderPosition({ x: nx, y: ny });
  };
  const stopBorderDrag = () => { isBorderDragging.current = false; };

  // ---- resize ----
  const startResize = (type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    resizeType.current = type;
    borderDragStart.current = {
      x: e.clientX, y: e.clientY,
      width: bSizeRef.current.width, height: bSizeRef.current.height,
      startX: bPosRef.current.x, startY: bPosRef.current.y,
    };
  };
  const onResize = (e: React.MouseEvent) => {
    if (!isResizing.current) return;
    const cw = containerRef.current?.clientWidth ?? 480;
    const bd = borderDragStart.current;
    const dx = e.clientX - bd.x, dy = e.clientY - bd.y;
    let nw = bd.width, nh = bd.height, nx = bd.startX, ny = bd.startY;

    switch (resizeType.current) {
      case "bottom-right":
        if (Math.abs(dx) > Math.abs(dy)) { nw = Math.max(50, bd.width + dx); nh = nw / BOOK_ASPECT_RATIO; }
        else { nh = Math.max(50, bd.height + dy); nw = nh * BOOK_ASPECT_RATIO; }
        break;
      case "bottom-left":
        if (Math.abs(dx) > Math.abs(dy)) { nw = Math.max(50, bd.width - dx); nh = nw / BOOK_ASPECT_RATIO; nx = bd.startX + bd.width - nw; }
        else { nh = Math.max(50, bd.height + dy); nw = nh * BOOK_ASPECT_RATIO; nx = bd.startX + bd.width - nw; }
        break;
      case "top-right":
        if (Math.abs(dx) > Math.abs(dy)) { nw = Math.max(50, bd.width + dx); nh = nw / BOOK_ASPECT_RATIO; ny = bd.startY + bd.height - nh; }
        else { nh = Math.max(50, bd.height - dy); nw = nh * BOOK_ASPECT_RATIO; ny = bd.startY + bd.height - nh; }
        break;
      case "top-left":
        if (Math.abs(dx) > Math.abs(dy)) { nw = Math.max(50, bd.width - dx); nh = nw / BOOK_ASPECT_RATIO; nx = bd.startX + bd.width - nw; ny = bd.startY + bd.height - nh; }
        else { nh = Math.max(50, bd.height - dy); nw = nh * BOOK_ASPECT_RATIO; nx = bd.startX + bd.width - nw; ny = bd.startY + bd.height - nh; }
        break;
    }
    nx = Math.max(0, Math.min(nx, cw - nw));
    ny = Math.max(0, Math.min(ny, CONTAINER_HEIGHT - nh));
    setBorderPosition({ x: nx, y: ny });
    setBorderSize({ width: nw, height: nh });
  };
  const stopResize = () => { isResizing.current = false; resizeType.current = ""; };

  // 全局 mouseup 兜底
  useEffect(() => {
    const up = () => { isDragging.current = false; isBorderDragging.current = false; stopResize(); };
    document.addEventListener("mouseup", up);
    return () => document.removeEventListener("mouseup", up);
  }, []);

  // ---- 裁剪（通用：按蓝框裁剪任意 img 元素） ----
  const cropImageFromEl = (imgEl: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      const container = containerRef.current;
      if (!imgEl || !container) { resolve(""); return; }

      const src = imgEl.src;
      const img = new Image();
      img.onload = () => {
        const cr = container.getBoundingClientRect();
        const ir = imgEl.getBoundingClientRect();
        const imgX = ir.left - cr.left, imgY = ir.top - cr.top;
        const sx = img.naturalWidth / ir.width, sy = img.naturalHeight / ir.height;
        const cx = (bPosRef.current.x - imgX) * sx;
        const cy = (bPosRef.current.y - imgY) * sy;
        const cw = bSizeRef.current.width * sx, ch = bSizeRef.current.height * sy;

        const canvas = document.createElement("canvas");
        canvas.width = bSizeRef.current.width;
        canvas.height = bSizeRef.current.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, cx, cy, cw, ch, 0, 0, canvas.width, canvas.height);
        }
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = src;
    });
  };

  const handleConfirm = async () => {
    const imgEl = uploadedImgRef.current || coverImgRef.current;
    if (!imgEl) { onClose(); return; }

    // 保存状态记忆（下次打开弹窗时恢复）
    lastUserImage.current = uploadedImage;
    lastZoomSlider.current = zoomSlider;
    lastImagePosition.current = { ...imagePosition };
    cachedBorderPosition.current = { ...borderPosition };
    cachedBorderSize.current = { ...borderSize };
    hasCachedBorder.current = true;

    const cropped = await cropImageFromEl(imgEl);
    onConfirm(cropped);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[5vh]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Upload and Crop Image</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* 棋盘格容器 */}
          <div
            ref={containerRef}
            className="relative mx-auto rounded-lg overflow-hidden select-none flex items-center justify-center"
            style={{
              width: "80%", height: `${CONTAINER_HEIGHT}px`,
              backgroundColor: "#505050",
              backgroundImage: "linear-gradient(45deg,#707070 25%,transparent 25%),linear-gradient(-45deg,#707070 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#707070 75%),linear-gradient(-45deg,transparent 75%,#707070 75%)",
              backgroundSize: "16px 16px", backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
              boxShadow: "inset 0 4px 12px rgba(0,0,0,.5),0 6px 20px rgba(0,0,0,.25)",
            }}
          >
            {uploadedImage ? (
              <img ref={uploadedImgRef} src={uploadedImage} alt="Upload preview" draggable={false}
                onMouseDown={startDrag} onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}
                style={{
                  maxWidth: "100%", maxHeight: "100%", objectFit: "contain", cursor: "move",
                  transform: `scale(${zoomSlider}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,.1))",
                }}
              />
            ) : (
              <img ref={coverImgRef} src="/cover1.png" alt="Default cover" draggable={false}
                onLoad={onCoverImageLoad}
                onMouseDown={startDrag}
                onMouseMove={onDrag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                style={{
                  maxWidth: "100%", height: "100%", objectFit: "contain", cursor: "move",
                  transform: `scale(${zoomSlider}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,.1))",
                }}
              />
            )}

            {/* 蓝色裁剪框 */}
            {borderVisible && (
              <div
                className="absolute border-2 border-blue-500 bg-blue-500/10 cursor-move"
                style={{ left: borderPosition.x, top: borderPosition.y, width: borderSize.width, height: borderSize.height, pointerEvents: "auto" }}
                onMouseDown={startBorderDrag}
                onMouseMove={(e) => { onBorderDrag(e); onResize(e); }}
                onMouseUp={() => { stopBorderDrag(); stopResize(); }}
              >
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white -top-1 -left-1 cursor-nw-resize" onMouseDown={(e) => startResize("top-left", e)} />
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white -top-1 -right-1 cursor-ne-resize" onMouseDown={(e) => startResize("top-right", e)} />
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white -bottom-1 -left-1 cursor-sw-resize" onMouseDown={(e) => startResize("bottom-left", e)} />
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white -bottom-1 -right-1 cursor-se-resize" onMouseDown={(e) => startResize("bottom-right", e)} />
              </div>
            )}
          </div>

          {/* 尺寸标签 */}
          <div className="text-center text-xs text-gray-500 mt-1">
            {Math.round(borderSize.width)} x {Math.round(borderSize.height)}
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white font-medium rounded-lg transition-colors whitespace-nowrap">
              <Upload size={18} /> Upload Your Image
            </button>
            <div className="flex items-center gap-2 w-[200px]">
              <button onClick={() => setZoomSlider((prev) => Math.max(0.1, Math.min(2, prev - 0.2)))}
                className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600"><ZoomOut size={20} /></button>
              <input type="range" min={0.1} max={2} step={0.1} value={zoomSlider}
                onChange={(e) => setZoomSlider(parseFloat(e.target.value))} className="flex-1" />
              <button onClick={() => setZoomSlider((prev) => Math.max(0.1, Math.min(2, prev + 0.2)))}
                className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600"><ZoomIn size={20} /></button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 text-[#5b8def] hover:bg-blue-50 rounded-lg transition-colors font-medium">Cancel</button>
          <button onClick={handleConfirm}
            className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-medium rounded-lg transition-colors">
            Crop &amp; Use Image
          </button>
        </div>
      </div>
    </div>
  );
}

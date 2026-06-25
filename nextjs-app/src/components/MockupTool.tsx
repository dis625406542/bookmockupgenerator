"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import PixiCanvas, { type PixiCanvasRef } from "./tool/PixiCanvas";
import ControlPanel from "./tool/ControlPanel";
import ImageUploadModal from "./tool/ImageUploadModal";
import {
  downloadCanvas,
  TEMPLATE_MAP,
  CHILD_BOOK_TEMPLATE,
  TEMPLATE_INFO,
} from "@/lib/pixi-renderer";

interface MockupToolProps {
  templateId?: string;
}

export default function MockupTool({
  templateId = "child-book",
}: MockupToolProps) {
  const template = TEMPLATE_MAP[templateId] ?? CHILD_BOOK_TEMPLATE;
  const canvasRef = useRef<PixiCanvasRef>(null);
  const [format, setFormat] = useState<"PNG" | "JPEG">("PNG");
  const [showModal, setShowModal] = useState(false);
  const [hasCover, setHasCover] = useState(false);
  const [highlights, setHighlights] = useState(true);
  const [coverEnabled, setCoverEnabled] = useState(true);
  const [imageSize, setImageSize] = useState<string>("");

  const handleConfirm = async (dataURL: string) => {
    // 获取图片尺寸
    const img = new Image();
    img.onload = () => {
      setImageSize(`${img.width}x${img.height}px`);
    };
    img.src = dataURL;

    await canvasRef.current?.renderCover(dataURL);
    setHasCover(true);
    toast.success("Cover applied to the book mockup");
  };

  const handleDownload = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) {
      toast.error("Nothing to download yet");
      return;
    }
    const filename = downloadCanvas(canvas, format);
    toast.success(`Downloaded: ${filename}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center px-2 lg:px-6 py-4">
      {/* 左侧：Canvas + Info Panel */}
      <div className="flex-1 max-w-[580px]">
        <PixiCanvas ref={canvasRef} highlights={highlights} coverEnabled={coverEnabled} template={template} />
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          <ImageIcon size={18} />
          {hasCover ? "Change image/design" : "Add image/design"}
        </button>

        {/* Info Panel */}
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Tags:</span>
            <span className="ml-2">{TEMPLATE_INFO[templateId]?.tags ?? TEMPLATE_INFO["child-book"].tags}</span>
          </div>
          <p className="text-sm text-gray-600 italic leading-relaxed">
            {TEMPLATE_INFO[templateId]?.description ?? TEMPLATE_INFO["child-book"].description}
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <div>
              <span className="font-medium">Published:</span>
              <span className="ml-2">24 Jun 2024</span>
            </div>
            <div>
              <span className="font-medium">Size:</span>
              <span className="ml-2">1024x1024px</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧：Control Panel */}
      <div className="w-full lg:w-[320px] flex-shrink-0">
        <ControlPanel
          format={format}
          onFormatChange={setFormat}
          onDownload={handleDownload}
          highlights={highlights}
          onHighlightsChange={setHighlights}
          coverEnabled={coverEnabled}
          onCoverEnabledChange={setCoverEnabled}
          imageSize={imageSize}
          hasCover={hasCover}
        />
      </div>

      <ImageUploadModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

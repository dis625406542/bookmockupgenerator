"use client";

interface ControlPanelProps {
  format: "PNG" | "JPEG";
  onFormatChange: (format: "PNG" | "JPEG") => void;
  onDownload: () => void;
  disabled?: boolean;
  highlights: boolean;
  onHighlightsChange: (value: boolean) => void;
  coverEnabled: boolean;
  onCoverEnabledChange: (value: boolean) => void;
  imageSize: string;
  hasCover: boolean;
}

export default function ControlPanel({
  format,
  onFormatChange,
  onDownload,
  disabled = false,
  highlights,
  onHighlightsChange,
  coverEnabled,
  onCoverEnabledChange,
  imageSize,
  hasCover,
}: ControlPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">Edit this template</span>
        <span className="text-xs text-gray-500">100% Free</span>
      </div>

      {/* Format selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Export Format</label>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => onFormatChange("JPEG")}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-medium border ${
              format === "JPEG"
                ? "bg-brand text-white border-brand"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            JPEG
          </button>
          <button
            type="button"
            onClick={() => onFormatChange("PNG")}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              format === "PNG"
                ? "bg-brand text-white border-brand"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            PNG
          </button>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={onDownload}
        disabled={disabled}
        className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download
      </button>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Highlights toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Highlights</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={highlights}
            onChange={(e) => onHighlightsChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
        </label>
      </div>

      {/* Shadows toggle (placeholder, not implemented in renderer yet) */}
      <div className="flex items-center justify-between opacity-50">
        <span className="text-sm font-medium text-gray-700">Shadows</span>
        <label className="relative inline-flex items-center cursor-not-allowed">
          <input
            type="checkbox"
            checked={true}
            disabled
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-brand"></div>
        </label>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Your image toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Your image:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={coverEnabled}
              onChange={(e) => onCoverEnabledChange(e.target.checked)}
              disabled={!hasCover}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
          </label>
        </div>
        {imageSize && (
          <span className="text-xs text-gray-500">{imageSize}</span>
        )}
      </div>
    </div>
  );
}

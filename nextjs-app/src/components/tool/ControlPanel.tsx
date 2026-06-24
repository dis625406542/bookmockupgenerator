"use client";

interface ControlPanelProps {
  format: "PNG" | "JPEG";
  onFormatChange: (format: "PNG" | "JPEG") => void;
  onDownload: () => void;
  disabled?: boolean;
}

export default function ControlPanel({
  format,
  onFormatChange,
  onDownload,
  disabled = false,
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
    </div>
  );
}

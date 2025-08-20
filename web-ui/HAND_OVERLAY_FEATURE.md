# 手部覆盖功能说明

## 功能概述

当用户上传图片并点击 "Crop & Use Image" 按钮后，系统会自动应用手部覆盖算法，将用户上传的图片与手部遮罩（`book-mask1.png`）合并，生成带有手部覆盖效果的新图片。

## 工作流程

1. **用户上传图片** → 点击 "Add Image" 按钮
2. **裁剪图片** → 用户调整裁剪区域
3. **点击 "Crop & Use Image"** → 触发手部覆盖算法
4. **自动合并处理** → 应用与 `book-with-hands-fixed.png` 相同的算法
5. **生成新图片** → 创建带手部覆盖效果的新图片
6. **自动替换封面** → 新图片覆盖到原来的封面模版坐标位置

## 技术实现

### 核心算法

使用 Canvas API 实现手部覆盖效果：

```javascript
// 检测手部遮罩中的非白色像素（手部轮廓区域）
const whiteThreshold = 240;

for (let i = 0; i < maskData.length; i += 4) {
  const r = maskData[i];
  const g = maskData[i + 1];
  const b = maskData[i + 2];
  const a = maskData[i + 3];
  
  // 检测是否为白色像素
  const isWhite = r > whiteThreshold && g > whiteThreshold && b > whiteThreshold;
  
  // 如果不是白色像素（手部轮廓区域），用遮罩像素覆盖用户图片
  if (!isWhite && a > 0) {
    userData[i] = r;     // R
    userData[i + 1] = g; // G
    userData[i + 2] = b; // B
    userData[i + 3] = a; // A
  }
}
```

### 文件结构

- `src/utils/imageProcessor.js` - 图片处理工具，包含手部覆盖算法
- `src/views/Home.vue` - 主页面，集成手部覆盖功能
- `public/images/book-mask1.png` - 手部遮罩图片（浏览器可访问）

### 算法特点

- ✅ **智能检测手部轮廓**：通过白色阈值检测非白色像素
- ✅ **精确像素替换**：只在手部区域进行像素覆盖
- ✅ **保留用户内容**：白色背景区域保持原用户图片
- ✅ **支持不同尺寸**：自动调整图片尺寸匹配
- ✅ **错误处理**：包含完整的错误处理和降级方案

## 使用方法

1. 确保手部遮罩图片 `book-mask1.png` 已放置在 `public/images/` 目录下
2. 用户上传图片后，系统会自动应用手部覆盖效果
3. 如果处理失败，系统会降级使用原始裁剪图片

## 注意事项

- 手部遮罩图片必须是白色背景 + 手部轮廓的格式
- 算法会自动检测手部轮廓区域（非白色像素）
- 支持 JPG、PNG、WebP 格式的图片
- 图片大小限制为 10MB

## 扩展功能

- 支持批量处理多张图片
- 可调节白色阈值参数
- 支持不同的手部遮罩图片
- 可集成到其他图片处理流程中


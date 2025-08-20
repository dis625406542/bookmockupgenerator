/**
 * 图片处理工具
 * 严格按照 test_user_image_merge.py 的算法实现
 */

/**
 * 测试手部遮罩图片加载
 */
export function testHandMaskLoading() {
  return new Promise((resolve, reject) => {
    const handMask = new Image();
    
    handMask.onload = () => {
      console.log('✓ 手部遮罩图片加载成功');
      console.log('图片尺寸:', handMask.width, 'x', handMask.height);
      
      // 创建Canvas分析图片
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = handMask.width;
      canvas.height = handMask.height;
      
      ctx.drawImage(handMask, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        console.log('像素数据长度:', data.length);
        console.log('总像素数:', data.length / 4);
        
        // 分析像素分布
        let whitePixels = 0;
        let nonWhitePixels = 0;
        const whiteThreshold = 240;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const isWhite = r > whiteThreshold && g > whiteThreshold && b > whiteThreshold;
          
          if (isWhite) {
            whitePixels++;
          } else {
            nonWhitePixels++;
          }
        }
        
        console.log('白色像素数:', whitePixels);
        console.log('非白色像素数:', nonWhitePixels);
        console.log('白色像素比例:', (whitePixels / (data.length / 4) * 100).toFixed(2) + '%');
        
        if (nonWhitePixels === 0) {
          reject(new Error('没有检测到非白色像素，手部遮罩可能有问题'));
        } else {
          resolve({
            width: handMask.width,
            height: handMask.height,
            whitePixels,
            nonWhitePixels,
            totalPixels: data.length / 4
          });
        }
      } catch (error) {
        reject(new Error('Canvas处理失败: ' + error.message));
      }
    };
    
    handMask.onerror = () => {
      reject(new Error('手部遮罩图片加载失败，路径: /images/book-mask1.png'));
    };
    
    handMask.src = '/images/book-mask1.png';
  });
}

/**
 * 将用户上传的图片与手部遮罩合并
 * 严格按照 Python 版本的算法实现
 */
export async function mergeUserImageWithHandMask(userImageData) {
  return new Promise((resolve, reject) => {
    try {
      console.log('开始应用手部覆盖效果（Python算法版本）...');
      
      const userImage = new Image();
      const handMask = new Image();
      
      let userImageLoaded = false;
      let handMaskLoaded = false;
      
      // 用户图片加载完成
      userImage.onload = () => {
        console.log('用户图片加载完成:', userImage.width, 'x', userImage.height);
        userImageLoaded = true;
        if (handMaskLoaded) {
          processImages();
        }
      };
      
      // 手部遮罩加载完成
      handMask.onload = () => {
        console.log('手部遮罩加载完成:', handMask.width, 'x', handMask.height);
        handMaskLoaded = true;
        if (userImageLoaded) {
          processImages();
        }
      };
      
      // 错误处理
      userImage.onerror = (error) => {
        console.error('用户图片加载失败:', error);
        reject(new Error('用户图片加载失败'));
      };
      
      handMask.onerror = (error) => {
        console.error('手部遮罩加载失败:', error);
        reject(new Error('手部遮罩加载失败'));
      };
      
      // 处理图片合并（严格按照Python算法）
      const processImages = () => {
        try {
          console.log('开始处理图片合并（Python算法版本）...');
          
          // === 步骤1: 创建用户图片Canvas ===
          const userCanvas = document.createElement('canvas');
          const userCtx = userCanvas.getContext('2d');
          userCanvas.width = userImage.width;
          userCanvas.height = userImage.height;
          
          // 启用高质量渲染
          userCtx.imageSmoothingEnabled = true;
          userCtx.imageSmoothingQuality = 'high';
          
          // 绘制用户图片
          userCtx.drawImage(userImage, 0, 0);
          console.log('用户图片尺寸:', userImage.width, 'x', userImage.height);
          
          // === 步骤2: 手部遮罩高质量重采样 ===
          console.log('手部遮罩尺寸:', handMask.width, 'x', handMask.height);
          
          // 目标尺寸 = 用户图片尺寸
          const targetSize = { width: userImage.width, height: userImage.height };
          const intermediateSize = { width: targetSize.width * 2, height: targetSize.height * 2 };
          
          console.log('中间尺寸:', intermediateSize.width, 'x', intermediateSize.height);
          
          // 第一步：放大到中间尺寸
          const largeCanvas = document.createElement('canvas');
          const largeCtx = largeCanvas.getContext('2d');
          largeCanvas.width = intermediateSize.width;
          largeCanvas.height = intermediateSize.height;
          largeCtx.imageSmoothingEnabled = true;
          largeCtx.imageSmoothingQuality = 'high';
          largeCtx.drawImage(handMask, 0, 0, intermediateSize.width, intermediateSize.height);
          
          // 第二步：缩小到目标尺寸
          const maskCanvas = document.createElement('canvas');
          const maskCtx = maskCanvas.getContext('2d');
          maskCanvas.width = targetSize.width;
          maskCanvas.height = targetSize.height;
          maskCtx.imageSmoothingEnabled = true;
          maskCtx.imageSmoothingQuality = 'high';
          maskCtx.drawImage(largeCanvas, 0, 0, targetSize.width, targetSize.height);
          
          console.log('手部遮罩调整后尺寸:', targetSize.width, 'x', targetSize.height);
          
          // === 步骤3: 获取像素数据 ===
          const userImageData = userCtx.getImageData(0, 0, userCanvas.width, userCanvas.height);
          const maskImageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
          
          const userData = userImageData.data;
          const maskData = maskImageData.data;
          
          console.log('用户图片数组长度:', userData.length);
          console.log('手部遮罩数组长度:', maskData.length);
          
          // === 步骤4: 应用手部覆盖算法（Python逻辑） ===
          const whiteThreshold = 240;
          let handPixelCount = 0;
          const totalPixels = userData.length / 4;
          
          console.log('白色像素阈值:', whiteThreshold);
          console.log('总像素数:', totalPixels);
          
          // 创建结果数组（复制用户图片）
          const resultData = new Uint8ClampedArray(userData);
          
          // 检测手部遮罩中的非白色像素（手部轮廓区域）
          let whitePixels = 0;
          let nonWhitePixels = 0;
          
          // 分析像素分布
          for (let i = 0; i < maskData.length; i += 4) {
            const r = maskData[i];
            const g = maskData[i + 1];
            const b = maskData[i + 2];
            
            // Python逻辑：np.all(hand_array[:, :, :3] > white_threshold, axis=2)
            const isWhite = (r > whiteThreshold) && (g > whiteThreshold) && (b > whiteThreshold);
            
            if (isWhite) {
              whitePixels++;
            } else {
              nonWhitePixels++;
            }
          }
          
          console.log('手部遮罩像素分析:');
          console.log('- 白色像素数:', whitePixels);
          console.log('- 非白色像素数:', nonWhitePixels);
          console.log('- 白色像素比例:', (whitePixels / totalPixels * 100).toFixed(2) + '%');
          
          // 应用手部覆盖效果
          let currentThreshold = whiteThreshold;
          
          // 如果检测不到手部像素，尝试降低阈值
          if (nonWhitePixels === 0) {
            console.log('警告：没有检测到手部轮廓像素，尝试降低阈值...');
            currentThreshold = 200;
            
            // 重新计算
            nonWhitePixels = 0;
            for (let i = 0; i < maskData.length; i += 4) {
              const r = maskData[i];
              const g = maskData[i + 1];
              const b = maskData[i + 2];
              
              const isWhite = (r > currentThreshold) && (g > currentThreshold) && (b > currentThreshold);
              
              if (!isWhite) {
                nonWhitePixels++;
              }
            }
            
            console.log(`降低阈值到 ${currentThreshold} 后，检测到手部区域像素数:`, nonWhitePixels);
          }
          
          // 在手部区域，用遮罩像素覆盖用户图片
          if (nonWhitePixels > 0) {
            for (let i = 0; i < maskData.length; i += 4) {
              const r = maskData[i];
              const g = maskData[i + 1];
              const b = maskData[i + 2];
              const a = maskData[i + 3];
              
              // Python逻辑：手部区域 = 非白色区域
              const isWhite = (r > currentThreshold) && (g > currentThreshold) && (b > currentThreshold);
              
              if (!isWhite) {
                // Python逻辑：result_array[hand_regions] = hand_array[hand_regions]
                resultData[i] = r;     // R
                resultData[i + 1] = g; // G
                resultData[i + 2] = b; // B
                resultData[i + 3] = a; // A
                handPixelCount++;
              }
            }
            
            console.log('成功应用手部覆盖效果');
            console.log('- 手部区域像素数:', handPixelCount);
            console.log('- 手部覆盖比例:', (handPixelCount / totalPixels * 100).toFixed(2) + '%');
          } else {
            console.log('警告：仍然没有检测到手部区域，无法应用覆盖效果');
          }
          
          // === 步骤5: 生成最终结果 ===
          const resultCanvas = document.createElement('canvas');
          const resultCtx = resultCanvas.getContext('2d');
          resultCanvas.width = userCanvas.width;
          resultCanvas.height = userCanvas.height;
          
          const resultImageData = new ImageData(resultData, userCanvas.width, userCanvas.height);
          resultCtx.putImageData(resultImageData, 0, 0);
          
          // 转换为base64数据URL
          const resultDataUrl = resultCanvas.toDataURL('image/png', 0.95);
          console.log('Python算法版本的手部覆盖效果处理完成！');
          
          // 统计信息
          console.log('\n处理完成统计:');
          console.log('- 使用阈值:', currentThreshold);
          console.log('- 手部区域像素数:', handPixelCount);
          console.log('- 优化措施: 2倍中间尺寸重采样');
          
          // 尝试保存图片到本地
          trySaveImageToLocal(resultDataUrl);
          
          resolve(resultDataUrl);
          
        } catch (error) {
          console.error('Canvas处理失败:', error);
          reject(new Error(`Canvas处理失败: ${error.message}`));
        }
      };
      
      // 尝试保存图片到本地
      const trySaveImageToLocal = (dataUrl) => {
        try {
          const link = document.createElement('a');
          link.download = `user-book-with-hands-python-algo-${Date.now()}.png`;
          link.href = dataUrl;
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          console.log('Python算法版本图片已下载到本地');
        } catch (error) {
          console.log('无法自动下载图片，但合并已完成');
        }
      };
      
      // 加载图片
      console.log('开始加载图片...');
      userImage.src = userImageData;
      handMask.src = '/images/book-mask1.png';
      
    } catch (error) {
      console.error('图片处理初始化失败:', error);
      reject(new Error(`图片处理初始化失败: ${error.message}`));
    }
  });
}

/**
 * 生成唯一的文件名
 */
export function generateUniqueFileName(prefix = 'user-book-', extension = '.png') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}-${random}${extension}`;
}

/**
 * 验证图片格式和尺寸
 */
export function validateImage(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!validTypes.includes(file.type)) {
    throw new Error('只支持 JPG, PNG, WebP 格式的图片');
  }
  
  if (file.size > maxSize) {
    throw new Error('图片大小不能超过 10MB');
  }
  
  return true;
}
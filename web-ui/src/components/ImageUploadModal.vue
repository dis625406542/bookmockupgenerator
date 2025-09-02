<template>
     <el-dialog
     title="Upload and Crop Image"
     :visible="visible"
     width="600px"
     @close="handleClose"
     :close-on-click-modal="false"
     top="5vh"
     custom-class="image-upload-modal"
   >
    <div class="cropper-container">
      <div class="image-preview-area">
                 <div class="image-placeholder">
           <img 
             v-if="uploadedImage" 
             :src="uploadedImage" 
             class="uploaded-image"
             :style="imageStyle"
             @mousedown="startDrag"
             @mousemove="onDrag"
             @mouseup="stopDrag"
             @mouseleave="stopDrag"
           />
                                   <div v-else class="default-cover">
               <img 
                 :src="defaultCover" 
                 alt="默认封面" 
                 class="default-cover-img"
                 @load="onCoverImageLoad"
                 ref="coverImage"
               />
             </div>
           
           <!-- 蓝色选择边框 -->
           <div class="selection-border" 
                :style="borderStyle"
                @mousedown="startBorderDrag"
                @mousemove="onBorderDrag"
                @mouseup="stopBorderDrag">
             <div class="resize-handle top-left" @mousedown="startResize('top-left', $event)"></div>
             <div class="resize-handle top-right" @mousedown="startResize('top-right', $event)"></div>
             <div class="resize-handle bottom-left" @mousedown="startResize('bottom-left', $event)"></div>
             <div class="resize-handle bottom-right" @mousedown="startResize('bottom-right', $event)"></div>
           </div>
         </div>
        <div class="dimensions">282 x 350</div>
      </div>
    </div>
    
    <div class="cropper-actions">
      <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" accept="image/*" />
      <el-button @click="triggerUpload" icon="el-icon-upload2">↑ Upload Your Image</el-button>
      <div class="zoom-control">
        <i class="el-icon-zoom-out" @click="zoom(-0.2)"></i>
        <el-slider v-model="zoomSlider" :min="0.1" :max="2" :step="0.1" @input="onZoomSliderChange" style="flex-grow: 1; margin: 0 10px;"></el-slider>
        <i class="el-icon-zoom-in" @click="zoom(0.2)"></i>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="handleConfirm" :disabled="!uploadedImage">Crop & Use Image</el-button>
    </span>
  </el-dialog>
</template>

<script>
import defaultCover from '@/assets/images/cover1.png';

export default {
  name: 'ImageUploadModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
    data() {
    return {
      defaultCover,
      uploadedImage: null,
      zoomSlider: 1,
      imageStyle: {
        transform: 'scale(1)',
        cursor: 'move'
      },
             isDragging: false,
       dragStart: { x: 0, y: 0 },
       imagePosition: { x: 0, y: 0 },
               // 选择边框相关数据
        borderPosition: { x: 0, y: 0 },
        borderSize: { width: 200, height: 250 },
        isBorderDragging: false,
        isResizing: false,
        resizeType: null,
        borderDragStart: { x: 0, y: 0 },
        // 蓝色框缓存数据
        cachedBorderPosition: null,  // 缓存的边框位置
        cachedBorderSize: null,      // 缓存的边框尺寸
        hasUserResized: false,       // 用户是否手动调整过尺寸
        // 新增：用户操作状态记忆
        lastUserImage: null,         // 上次上传的用户图片
        lastZoomSlider: 1,           // 上次的缩放值
        lastImagePosition: { x: 0, y: 0 }  // 上次的图片位置
    };
   },
   computed: {
     borderStyle() {
       return {
         left: this.borderPosition.x + 'px',
         top: this.borderPosition.y + 'px',
         width: this.borderSize.width + 'px',
         height: this.borderSize.height + 'px'
       };
     }
   },
      watch: {
     visible(newVal) {
       if (newVal) {
         this.resetModal();
       }
     }
   },
   mounted() {
     // 添加全局鼠标事件监听
     document.addEventListener('mousemove', this.handleGlobalMouseMove);
     document.addEventListener('mouseup', this.handleGlobalMouseUp);
     
     // 不在这里初始化边框位置，等待图片onload事件
   },
   beforeDestroy() {
     // 移除全局鼠标事件监听
     document.removeEventListener('mousemove', this.handleGlobalMouseMove);
     document.removeEventListener('mouseup', this.handleGlobalMouseUp);
   },
  methods: {
             // 重置弹窗状态
     resetModal() {
       // 检查是否有上次的用户操作状态
       if (this.lastUserImage) {
         // 恢复上次的状态
         this.uploadedImage = this.lastUserImage;
         this.zoomSlider = this.lastZoomSlider;
         this.imagePosition = { ...this.lastImagePosition };
         this.updateImageStyle();
       } else {
         // 首次打开，使用默认值
         this.uploadedImage = null;
         this.zoomSlider = 1;
         this.imagePosition = { x: 0, y: 0 };
         this.imageStyle = {
           transform: 'scale(1)',
           cursor: 'move'
         };
       }
       
       // 蓝色框位置重置逻辑 - 优先使用缓存数据
       if (this.cachedBorderPosition && this.cachedBorderSize && !this.hasUserResized) {
         // 使用缓存的边框信息
         this.borderPosition = { ...this.cachedBorderPosition };
         this.borderSize = { ...this.cachedBorderSize };
       } else {
         // 使用默认值
         this.borderPosition = { x: 100, y: 40 };
         this.borderSize = { width: 280, height: 250 };
       }
       
       // 不在这里调用updateBorderPosition，等待图片onload事件
     },

    // 触发文件上传
    triggerUpload() {
      this.$refs.fileInput.click();
    },

    // 文件选择处理
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
          this.$nextTick(() => {
            this.resetImagePosition();
          });
        };
        reader.readAsDataURL(file);
      }
    },

    // 重置图片位置
    resetImagePosition() {
      this.imagePosition = { x: 0, y: 0 };
      this.updateImageStyle();
    },

    // 缩放处理
    zoom(percent) {
      this.zoomSlider = Math.max(0.1, Math.min(2, this.zoomSlider + percent));
      this.updateImageStyle();
    },

    // 缩放滑块变化
    onZoomSliderChange(value) {
      this.zoomSlider = value;
      this.updateImageStyle();
    },

    // 更新图片样式
    updateImageStyle() {
      this.imageStyle = {
        transform: `scale(${this.zoomSlider}) translate(${this.imagePosition.x}px, ${this.imagePosition.y}px)`,
        cursor: 'move'
      };
    },

    // 开始拖拽
    startDrag(event) {
      this.isDragging = true;
      this.dragStart = {
        x: event.clientX - this.imagePosition.x,
        y: event.clientY - this.imagePosition.y
      };
    },

    // 拖拽中
    onDrag(event) {
      if (this.isDragging) {
        this.imagePosition = {
          x: event.clientX - this.dragStart.x,
          y: event.clientY - this.dragStart.y
        };
        this.updateImageStyle();
      }
    },

    // 停止拖拽
    stopDrag() {
      this.isDragging = false;
    },

    // 确认
    async handleConfirm() {
      if (this.uploadedImage) {
        // 保存当前蓝色框信息到缓存
        this.cachedBorderPosition = { ...this.borderPosition };
        this.cachedBorderSize = { ...this.borderSize };
        this.hasUserResized = false;  // 重置标记
        
                 // 保存用户操作状态，用于下次打开弹窗时恢复
         this.lastUserImage = this.uploadedImage;
         this.lastZoomSlider = this.zoomSlider;
         this.lastImagePosition = { ...this.imagePosition };
        
        // 裁剪图片：根据蓝色框位置和尺寸裁剪用户图片
        const croppedImage = await this.cropImage();
        
        this.$emit('confirm', {
          image: croppedImage || this.uploadedImage, // 如果有裁剪结果就用裁剪的，否则用原图
          zoom: this.zoomSlider,
          position: this.imagePosition,
          cropData: {
            x: this.borderPosition.x,
            y: this.borderPosition.y,
            width: this.borderSize.width,
            height: this.borderSize.height
          },
          autoRender: true // 新增：标记需要自动渲染
        });
        this.handleClose();
      }
    },

    // 关闭弹窗
    handleClose() {
      this.$emit('close');
    },

    // 开始拖拽边框
    startBorderDrag(event) {
      if (event.target.classList.contains('resize-handle')) return;
      this.isBorderDragging = true;
      this.borderDragStart = {
        x: event.clientX - this.borderPosition.x,
        y: event.clientY - this.borderPosition.y
      };
    },

    // 拖拽边框中
    onBorderDrag(event) {
      if (this.isBorderDragging) {
        let newX = event.clientX - this.borderDragStart.x;
        let newY = event.clientY - this.borderDragStart.y;
        
        // 边界限制 - 使用方格框的实际尺寸
        const maxX = 528 - this.borderSize.width; // 80% * 600px = 480px, 480 * 0.8 = 384px
        const maxY = 330 - this.borderSize.height;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        this.borderPosition = { x: newX, y: newY };
      }
    },

    // 停止拖拽边框
    stopBorderDrag() {
      this.isBorderDragging = false;
    },

    // 全局鼠标事件处理
    handleGlobalMouseMove(event) {
      if (this.isBorderDragging) {
        this.onBorderDrag(event);
      }
      if (this.isResizing) {
        this.onResize(event);
      }
    },

    handleGlobalMouseUp() {
      if (this.isBorderDragging) {
        this.stopBorderDrag();
      }
      if (this.isResizing) {
        this.stopResize();
      }
    },

         // 开始调整大小
     startResize(type, event) {
       this.isResizing = true;
       this.resizeType = type;
       this.hasUserResized = true;  // 标记用户已手动调整
       
       this.borderDragStart = {
         x: event.clientX,
         y: event.clientY,
         width: this.borderSize.width,
         height: this.borderSize.height,
         startX: this.borderPosition.x,
         startY: this.borderPosition.y
       };
     },

         // 调整大小中
     onResize(event) {
       if (!this.isResizing) return;
       
       const deltaX = event.clientX - this.borderDragStart.x;
       const deltaY = event.clientY - this.borderDragStart.y;
       
       // 计算书本模型的宽高比（基于默认封面图片的尺寸）
       // 这里使用一个合理的书本封面比例，比如 2:3 或 3:4
       const bookAspectRatio = 0.8; // 宽度/高度，可以根据实际书本模型调整
       
       let newWidth = this.borderDragStart.width;
       let newHeight = this.borderDragStart.height;
       let newX = this.borderDragStart.startX;
       let newY = this.borderDragStart.startY;
       
       // 根据调整类型计算新的尺寸和位置，保持等比例
       switch (this.resizeType) {
         case 'bottom-right':
           // 以较大的变化量为准，保持比例
           if (Math.abs(deltaX) > Math.abs(deltaY)) {
             newWidth = Math.max(50, this.borderDragStart.width + deltaX);
             newHeight = newWidth / bookAspectRatio;
           } else {
             newHeight = Math.max(50, this.borderDragStart.height + deltaY);
             newWidth = newHeight * bookAspectRatio;
           }
           break;
         case 'bottom-left':
           if (Math.abs(deltaX) > Math.abs(deltaY)) {
             newWidth = Math.max(50, this.borderDragStart.width - deltaX);
             newHeight = newWidth / bookAspectRatio;
             newX = this.borderDragStart.startX + this.borderDragStart.width - newWidth;
           } else {
             newHeight = Math.max(50, this.borderDragStart.height + deltaY);
             newWidth = newHeight * bookAspectRatio;
             newX = this.borderDragStart.startX + this.borderDragStart.width - newWidth;
           }
           break;
         case 'top-right':
           if (Math.abs(deltaX) > Math.abs(deltaY)) {
             newWidth = Math.max(50, this.borderDragStart.width + deltaX);
             newHeight = newWidth / bookAspectRatio;
             newY = this.borderDragStart.startY + this.borderDragStart.height - newHeight;
           } else {
             newHeight = Math.max(50, this.borderDragStart.height - deltaY);
             newWidth = newHeight * bookAspectRatio;
             newY = this.borderDragStart.startY + this.borderDragStart.height - newHeight;
           }
           break;
         case 'top-left':
           if (Math.abs(deltaX) > Math.abs(deltaY)) {
             newWidth = Math.max(50, this.borderDragStart.width - deltaX);
             newHeight = newWidth / bookAspectRatio;
             newX = this.borderDragStart.startX + this.borderDragStart.width - newWidth;
             newY = this.borderDragStart.startY + this.borderDragStart.height - newHeight;
           } else {
             newHeight = Math.max(50, this.borderDragStart.height - deltaY);
             newWidth = newHeight * bookAspectRatio;
             newX = this.borderDragStart.startX + this.borderDragStart.width - newWidth;
             newY = this.borderDragStart.startY + this.borderDragStart.height - newHeight;
           }
           break;
       }
       
       // 边界限制 - 确保蓝色框不会超出容器
       const maxX = 528 - newWidth;
       const maxY = 330 - newHeight;
       
       newX = Math.max(0, Math.min(newX, maxX));
       newY = Math.max(0, Math.min(newY, maxY));
       
       // 应用新的位置和尺寸
       this.borderPosition = { x: newX, y: newY };
       this.borderSize = { width: newWidth, height: newHeight };
     },

         // 停止调整大小
     stopResize() {
       this.isResizing = false;
       this.resizeType = null;
     },

                   // 封面图片加载完成后的处理
      onCoverImageLoad() {
        this.updateBorderPosition();
      },

           // 获取封面图片位置并设置蓝色框
      updateBorderPosition() {
        this.$nextTick(() => {
          const coverImg = this.$refs.coverImage;
          if (coverImg && coverImg.complete && coverImg.naturalWidth > 0) {
            const rect = coverImg.getBoundingClientRect();
            const containerRect = this.$el.querySelector('.cropper-container').getBoundingClientRect();
            
            // 计算相对于容器的位置
            const x = rect.left - containerRect.left;
            const y = rect.top - containerRect.top;
            const width = rect.width;
            const height = rect.height;
            
            
            
            // 精确算法：蓝色框四个角与封面图片四个角完全对齐
            // 1. 计算图片的四个角坐标
            const imgLeft = x;
            const imgTop = y;
            const imgRight = x + width;
            const imgBottom = y + height;
            
                         // 2. 设置蓝色框位置 - 直接使用图片坐标，无padding
             // 蓝色框应该完全贴合图片边缘
            
            let borderLeft, borderTop, borderWidth, borderHeight;
            
            // 处理图片超出容器边界的情况
            if (imgTop < 0) {
              // 图片顶部超出容器，蓝色框从容器顶部开始
              borderTop = 0;
              borderHeight = Math.min(imgBottom, 330);
            } else {
              // 图片顶部在容器内
              borderTop = Math.max(0, imgTop);
              borderHeight = Math.min(imgBottom - borderTop, 330 - borderTop);
            }
            
            if (imgLeft < 0) {
              // 图片左侧超出容器，蓝色框从容器左侧开始
              borderLeft = 0;
              borderWidth = Math.min(imgRight, 480);
            } else {
              // 图片左侧在容器内
              borderLeft = Math.max(0, imgLeft);
              borderWidth = Math.min(imgRight - borderLeft, 480 - borderLeft);
            }
            
            // 3. 确保蓝色框尺寸与图片完全一致
            // 如果图片完全在容器内，蓝色框应该与图片大小完全一致
            if (imgTop >= 0 && imgLeft >= 0 && imgBottom <= 330 && imgRight <= 480) {
              borderLeft = imgLeft;
              borderTop = imgTop;
              borderWidth = width;
              borderHeight = height;
            }
            
            // 3. 应用位置和尺寸
            this.borderPosition = { 
              x: borderLeft, 
              y: borderTop
            };
            this.borderSize = { 
              width: borderWidth, 
              height: borderHeight
            };
            
                                                     // 保存精确计算的蓝色框位置到缓存
               this.cachedBorderPosition = { ...this.borderPosition };
               this.cachedBorderSize = { ...this.cachedBorderSize };
           }
         });
      },

            // 裁剪图片：根据蓝色框位置和尺寸裁剪用户图片
      cropImage() {
        if (!this.uploadedImage) return null;
        
        try {
          // 创建临时Canvas进行裁剪
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          
          // 创建图片对象
          const img = new Image();
          img.src = this.uploadedImage;
          
          // 等待图片加载完成
          return new Promise((resolve) => {
            img.onload = () => {
              // 设置Canvas尺寸为蓝色框的尺寸
              tempCanvas.width = this.borderSize.width;
              tempCanvas.height = this.borderSize.height;
              
              // 获取容器信息
              const container = this.$el.querySelector('.cropper-container');
              const containerRect = container.getBoundingClientRect();
              
              // 计算图片在容器中的实际显示区域
              const imgElement = this.$el.querySelector('.uploaded-image');
              const imgRect = imgElement.getBoundingClientRect();
              
              // 计算图片相对于容器的位置
              const imgContainerX = imgRect.left - containerRect.left;
              const imgContainerY = imgRect.top - containerRect.top;
              
              // 计算图片的实际显示尺寸（考虑缩放）
              const imgDisplayWidth = imgRect.width;
              const imgDisplayHeight = imgRect.height;
              
              // 计算图片原始尺寸与显示尺寸的比例
              const scaleX = img.naturalWidth / imgDisplayWidth;
              const scaleY = img.naturalHeight / imgDisplayHeight;
              
              // 计算蓝色框相对于图片的实际位置（像素坐标）
              const cropX = (this.borderPosition.x - imgContainerX) * scaleX;
              const cropY = (this.borderPosition.y - imgContainerY) * scaleY;
              const cropWidth = this.borderSize.width * scaleX;
              const cropHeight = this.borderSize.height * scaleY;
              
              
              
              // 执行裁剪
              tempCtx.drawImage(
                img,
                cropX, cropY, cropWidth, cropHeight,  // 源图片裁剪区域（像素坐标）
                0, 0, this.borderSize.width, this.borderSize.height  // 目标Canvas区域
              );
              
              // 将裁剪后的图片转换为base64
              const croppedImageDataUrl = tempCanvas.toDataURL('image/png');
              resolve(croppedImageDataUrl);
            };
          });
        } catch (error) {
          console.error('图片裁剪失败:', error);
          return null;
        }
      }
  }
};
</script>

<style scoped>
/* 弹窗位置和样式优化 */
.image-upload-modal {
  margin-top: 0 !important;
}

.image-upload-modal .el-dialog {
  margin-top: 5vh !important;
  max-height: 90vh;
  overflow: hidden;
}

.image-upload-modal .el-dialog__body {
  max-height: calc(90vh - 120px);
  overflow-y: auto;
}
.cropper-container {
  width: 80%;
  height: 330px;
  margin-bottom: 1rem;
  background-color: #505050;
  background-image: 
    linear-gradient(45deg, #707070 25%, transparent 25%), 
    linear-gradient(-45deg, #707070 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #707070 75%), 
    linear-gradient(-45deg, transparent 75%, #707070 75%);
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.25);
}

.image-preview-area {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.default-cover {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.default-cover-img {
  max-width: 60%;
  max-height: 60%;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.placeholder-text {
  font-size: 18px;
  font-weight: bold;
  color: #d4b895;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.15s ease;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.dimensions {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.cropper-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.zoom-control {
  display: flex;
  align-items: center;
  width: 200px;
}

.zoom-control i {
  cursor: pointer;
  font-size: 1.2rem;
  color: #606266;
  transition: color 0.2s;
}

.zoom-control i:hover {
  color: #409eff;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.dialog-footer .el-button {
  border-radius: 6px;
  padding: 10px 20px;
}

.dialog-footer .el-button--primary {
  background-color: #ff4081;
  border-color: #ff4081;
}

.dialog-footer .el-button--primary:hover {
  background-color: #ff66a1;
  border-color: #ff66a1;
}

/* 蓝色选择边框样式 */
.selection-border {
  position: absolute;
  border: 2px solid #409eff;
  background: rgba(64, 158, 255, 0.1);
  cursor: move;
  user-select: none;
  pointer-events: auto;
}

.resize-handle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #409eff;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #fff;
}

.resize-handle.top-left {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.resize-handle.top-right {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.resize-handle.bottom-left {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}

.resize-handle.bottom-right {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}
</style>

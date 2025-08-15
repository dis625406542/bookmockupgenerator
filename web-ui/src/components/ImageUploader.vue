<template>
  <el-dialog
    title="Upload and Crop Image"
    :visible.sync="dialogVisible"
    width="600px"
    @close="onClose"
    :close-on-click-modal="false"
  >
    <div class="cropper-container">
      <vue-cropper
        ref="cropper"
        :img="cropperOptions.img"
        :output-size="cropperOptions.size"
        :output-type="cropperOptions.outputType"
        :auto-crop="cropperOptions.autoCrop"
        :fixed-box="cropperOptions.fixedBox"
        :center-box="cropperOptions.centerBox"
        :auto-crop-width="445"
        :auto-crop-height="445"
      ></vue-cropper>
    </div>
    
    <div class="cropper-actions">
      <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" accept="image/*" />
      <el-button @click="triggerFileUpload" icon="el-icon-upload2">Upload Your Image</el-button>
      <div class="zoom-control">
        <i class="el-icon-zoom-out" @click="zoom(-0.2)"></i>
        <el-slider v-model="zoomValue" :min="0.1" :max="2" :step="0.1" @input="onZoomSliderChange" style="flex-grow: 1; margin: 0 10px;"></el-slider>
        <i class="el-icon-zoom-in" @click="zoom(0.2)"></i>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">Cancel</el-button>
      <el-button type="primary" @click="cropImage">Crop & Use Image</el-button>
    </span>
  </el-dialog>
</template>

<script>
// 引入 vue-cropper
import { VueCropper } from 'vue-cropper';

export default {
  name: 'ImageUploader',
  components: {
    VueCropper,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: this.visible,
      cropperOptions: {
        img: '', // 图片地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        autoCrop: true, // 是否默认生成截图框
        fixedBox: true, // 固定截图框大小
        centerBox: true, // 截图框是否被限制在图片里面
      },
      zoomValue: 1,
    };
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal;
      if (!newVal) {
        // 重置图片状态
        this.cropperOptions.img = '';
      }
    },
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false);
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        this.cropperOptions.img = event.target.result;
        this.$refs.fileInput.value = ''; // 清空，以便可以再次选择同一张图片
      };
      reader.readAsDataURL(file);
    },
    zoom(percent) {
        this.$refs.cropper.changeScale(percent)
    },
    onZoomSliderChange(val) {
        // vue-cropper没有直接设置缩放比例的方法，我们通过changeScale来模拟
        // 这个实现比较tricky，因为我们不知道当前scale，这里仅作演示
        // 更好的方法是fork vue-cropper或寻找其他库
        console.log("Zoom slider not directly supported by vue-cropper's API in this way, using buttons instead.", val)
    },
    cropImage() {
      // 获取裁剪后的图片数据
      this.$refs.cropper.getCropData((data) => {
        // 将裁剪结果发送给父组件
        this.$emit('image-cropped', data);
      });
    },
  },
};
</script>

<style scoped>
.cropper-container {
  width: 100%;
  height: 350px;
  margin-bottom: 1rem;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
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
}
</style>
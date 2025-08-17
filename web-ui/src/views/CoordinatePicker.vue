<template>
  <div class="coordinate-picker">
    <h2>第一步：上传底片模板图片</h2>
    <input type="file" @change="handleImageUpload" accept="image/*" />

    <div v-if="imageUrl" class="image-container">
      <h2>第二步：请依次点击封面的左上、右上、右下、左下四个顶点</h2>
      <img
          ref="imageRef"
          :src="imageUrl"
          @click="handleImageClick"
          draggable="false"
      />
      <div
          v-for="(point, index) in points"
          :key="index"
          class="point-marker"
          :style="{ left: point.x + 'px', top: point.y + 'px' }"
      >
        {{ index + 1 }}
      </div>
    </div>

    <div v-if="points.length > 0" class="results-container">
      <h3>坐标结果 (已点击 {{ points.length }} / 4 点):</h3>
      <pre>{{ formattedPoints }}</pre>
      <button v-if="points.length === 4" @click="copyCoordinates">
        复制坐标
      </button>
      <button @click="resetPoints">重置</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoordinatePicker',
  data() {
    return {
      imageUrl: null,
      points: [], // 存储点击的坐标 {x, y}
    };
  },
  computed: {
    formattedPoints() {
      if (this.points.length === 0) return '请在图片上点击...';
      let output = '[\n';
      this.points.forEach(p => {
        output += `  { x: ${p.x}, y: ${p.y} },\n`;
      });
      if (this.points.length === 4) {
        output = output.slice(0,-2) + '\n'; // 去掉最后一个逗号和换行
      }
      output += ']';
      return output;
    },
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
        this.resetPoints();
      }
    },
    handleImageClick(event) {
      if (this.points.length >= 4) {
        alert('已经采集了4个点，请重置后再操作。');
        return;
      }

      const imageElement = this.$refs.imageRef;
      // getBoundingClientRect 会考虑图片的实际显示尺寸，而我们需要的是在原图上的坐标
      // 所以这里假设图片是按原尺寸显示的。如果图片被缩放，需要进行比例换算。
      const rect = imageElement.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);

      this.points.push({ x, y });
    },
    resetPoints() {
      this.points = [];
    },
    copyCoordinates() {
      navigator.clipboard.writeText(this.formattedPoints).then(() => {
        alert('坐标已复制到剪贴板！');
      }).catch(err => {
        alert('复制失败: ', err);
      });
    },
  },
};
</script>

<style scoped>
.coordinate-picker {
  padding: 2rem;
  font-family: sans-serif;
}
.image-container {
  position: relative;
  display: inline-block;
  margin-top: 2rem;
  border: 2px dashed #ccc;
  cursor: crosshair;
}
.point-marker {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  transform: translate(-50%, -50%);
  pointer-events: none; /* 让标记点不影响点击图片 */
}
.results-container {
  margin-top: 2rem;
}
pre {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  display: inline-block;
}
</style>
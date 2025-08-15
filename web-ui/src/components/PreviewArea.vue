<template>
  <div class="preview-area">
    <div class="scene">
      <div class="book">
        <div class="book-cover" :style="{ backgroundImage: `url(${coverImageUrl})` }">
          <!-- 这里可以放置一些水印或默认文字，就像截图中的 'YOUR IMAGE HERE' -->
        </div>
        <div class="book-spine"></div>
        <div class="book-back"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewArea',
  props: {
    coverImageUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.preview-area {
  width: 100%;
  aspect-ratio: 1 / 1; /* 保持正方形 */
  background-color: #e0f7fa; /* 灵感来自截图的背景色 */
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
}

.scene {
  perspective: 1500px;
}

.book {
  width: 250px;
  height: 350px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-30deg) rotateX(10deg);
  transition: transform 0.5s ease;
}

.book:hover {
  transform: rotateY(-20deg) rotateX(5deg);
}

.book-cover, .book-spine, .book-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
}

.book-cover {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 模拟书本封面质感 */
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
}

.book-spine {
  width: 30px;
  height: 100%;
  background: #eee;
  transform: rotateY(90deg) translateZ(-15px);
  transform-origin: center left;
}

.book-back {
  background: #fdfdfd;
  transform: translateZ(-30px) rotateY(180deg);
}
</style>
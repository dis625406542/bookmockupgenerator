<template>
  <div class="preview-container" ref="containerRef"></div>
</template>

<script>
import * as THREE from 'three';
// 我们需要从 three.js 的附加组件中导入模型加载器和轨道控制器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default {
  name: 'PreviewArea',
  props: {
    coverImageUrl: {
      type: String,
      // 暂时先不强制要求，因为我们先加载默认模型
      // required: true,
    },
  },
  data() {
    return {
      // 将 Three.js 的核心对象保存在 data 中，以便在整个组件中访问
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      animationFrameId: null,
    };
  },
  mounted() {
    this.initThreeScene();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // 组件销毁前，清理资源，防止内存泄漏
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
  methods: {
    initThreeScene() {
      const container = this.$refs.containerRef;
      if (!container) return;

      // 1. 场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf0f5f7); // 一个更柔和的背景色

      // 2. 相机
      this.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.camera.position.set(0, 1.5, 4); // 调整相机位置，更适合观察书本

      // 3. 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio); // 适配高分屏
      this.renderer.shadowMap.enabled = true; // 开启阴影
      container.appendChild(this.renderer.domElement);

      // 4. 控制器 (让我们可以用鼠标旋转)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true; // 启用阻尼效果，旋转更平滑
      this.controls.target.set(0, 0.5, 0); // 将控制器焦点设置在书本中心

      // 5. 光照
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // 环境光
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // 平行光
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true; // 让光线产生阴影
      this.scene.add(directionalLight);

      // 6. 加载模型 ✨
      const loader = new GLTFLoader();
      // 这里的路径是相对于 public 文件夹的
      loader.load('/models/book/scene.gltf', (gltf) => {
        const bookModel = gltf.scene;

        // 遍历模型，让所有部分都产生和接收阴影
        bookModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // 调整模型初始位置和大小（根据实际模型可能需要微调）
        bookModel.scale.set(10, 10, 10);
        bookModel.position.y = -0.5; // 让书本底部接触地面

        this.scene.add(bookModel);
        console.log('书本模型加载成功!');
      }, undefined, (error) => {
        console.error('加载模型时出错:', error);
      });

      // 添加一个接收阴影的地面
      const groundGeometry = new THREE.PlaneGeometry(20, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f5f7 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      this.scene.add(ground);

      this.animate();
    },
    animate() {
      this.animationFrameId = requestAnimationFrame(this.animate);
      this.controls.update(); // 更新控制器
      this.renderer.render(this.scene, this.camera);
    },
    handleResize() {
      if (this.camera && this.renderer) {
        const container = this.$refs.containerRef;
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
      }
    },
  },
};
</script>

<style scoped>
.preview-container {
  width: 100%;
  height: 520px; /* 给一个固定的高度 */
  border-radius: var(--border-radius);
  overflow: hidden;
}
</style>
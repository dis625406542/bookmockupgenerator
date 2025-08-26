<template>
  <div id="app">
    <!-- 如果您使用Vue Router，这里是路由出口 -->
    <router-view />
    
    <!-- 如果暂时不用路由，直接使用Home组件 -->
    <!-- <Home /> -->
  </div>
</template>

<script>
// import Home from './views/Home.vue';

export default {
  name: 'App',
  // components: {
  //   Home
  // }
};
</script>

<style>
:root {
  --primary-color: #409eff;
  --background-color: #f8f9fa;
  --card-background-color: #ffffff;
  --text-color-primary: #2c3e50;
  --text-color-secondary: #6c757d;
  --border-radius: 8px;
  --box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* App.vue可以有一些全局的布局样式 */
#app {
  display: block; /* 改为block布局，移除居中 */
  justify-content: initial; /* 移除居中 */
  padding: 0; /* 移除padding */
  box-sizing: border-box;
  background-color: var(--background-color);
  min-height: 100vh;
  width: 100%; /* 确保app容器也是全屏 */
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
}
</style>
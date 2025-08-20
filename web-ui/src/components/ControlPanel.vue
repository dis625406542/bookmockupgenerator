<template>
    <el-card class="control-panel">
      <div slot="header" class="clearfix">
        <span>Edit this template</span>
        <el-button style="float: right; padding: 3px 0" type="text">Download PSD</el-button>
      </div>
  
      <div class="control-group">
        <div class="format-selector">
          <el-radio-group v-model="format" size="small">
            <el-radio-button label="JPEG"></el-radio-button>
            <el-radio-button label="PNG"></el-radio-button>
          </el-radio-group>
        </div>
        <el-button type="primary" class="upgrade-btn">Upgrade to Download</el-button>
      </div>
  
      <el-divider></el-divider>
  
      <div class="control-item">
        <span class="label">Highlights</span>
        <el-switch v-model="highlights" active-color="#13ce66"></el-switch>
      </div>
  
      <div class="control-item">
        <span class="label">Shadows</span>
        <el-switch v-model="shadows" active-color="#13ce66"></el-switch>
      </div>
  
      <el-divider></el-divider>
  
      <div class="image-control">
         <div class="control-item">
          <span class="label">Cover Book Image</span>
          <el-switch v-model="coverEnabled" active-color="#13ce66"></el-switch>
        </div>
        <span class="image-size">445x445px</span>
        <el-button @click="editCover" class="upload-action-btn" type="danger" icon="el-icon-picture-outline">
          Add image/design
        </el-button>
        <el-button @click="testHandMask" class="test-btn" type="info" size="small" style="margin-top: 10px;">
          Test Hand Mask
        </el-button>
      </div>
  
      <div class="image-control">
        <div class="control-item">
          <span class="label">Spine Book Image</span>
          <el-switch v-model="spineEnabled" active-color="#13ce66"></el-switch>
        </div>
        <span class="image-size">60x445px</span>
         <el-button @click="editSpine" class="upload-action-btn" type="danger" icon="el-icon-picture-outline" disabled>
          Add image/design
        </el-button>
      </div>
    </el-card>
  </template>
  
  <script>
  export default {
    name: 'ControlPanel',
    data() {
      return {
        format: 'PNG',
        highlights: true,
        shadows: true,
        coverEnabled: true,
        spineEnabled: false,
      };
    },
    methods: {
      editCover() {
        // 向父组件发送事件，请求上传封面
        this.$emit('request-upload', 'cover');
      },
      editSpine() {
        // 向父组件发送事件，请求上传书脊（当前禁用）
        this.$emit('request-upload', 'spine');
      },
      testHandMask() {
        // 向父组件发送事件，请求测试手部遮罩
        this.$emit('test-hand-mask');
      },
    },
  };
  </script>
  
  <style scoped>
  .control-panel {
  width: 100%;
  max-width: 480px;
}
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  
  .control-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .upgrade-btn {
    width: 100%;
    font-weight: bold;
  }
  
  .control-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .control-item .label {
    font-weight: 500;
  }
  
  .image-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
  
  .image-control .image-size {
    font-size: 0.8rem;
    color: var(--text-color-secondary);
    margin-bottom: 0.75rem;
  }
  
  .upload-action-btn {
    width: 100%;
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
  }
  
  .upload-action-btn:hover {
    background-color: var(--primary-color-dark) !important;
    border-color: var(--primary-color-dark) !important;
  }
  </style>
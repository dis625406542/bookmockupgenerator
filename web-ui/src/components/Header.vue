<template>
  <div class="header">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-m left-m">m</div>
        <div class="logo-m right-m">m</div>
      </div>
      
      <!-- Navigation Links -->
      <nav class="nav-links">
        <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <a href="#" class="nav-link">Dashboard</a>
        <div class="nav-dropdown">
          <a href="#" class="nav-link">Mockups <span class="dropdown-arrow">▼</span></a>
        </div>
        <div class="nav-dropdown">
          <a href="#" class="nav-link">Designs <span class="dropdown-arrow">▼</span></a>
        </div>
        <a href="#" class="nav-link">Pricing</a>
        <div class="nav-dropdown">
          <a href="#" class="nav-link">Blog <span class="dropdown-arrow">▼</span></a>
        </div>
      </nav>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="upgrade-btn">Upgrade</button>
        <button class="profile-btn">G</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: none; /* 移除底部边框，避免重复的分隔线 */
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.header-content {
  /* 移除max-width限制，让Header真正覆盖全屏 */
  width: 100%;
  margin: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  text-align: left; /* 确保内容左对齐 */
}

.logo {
  display: flex;
  align-items: center;
  gap: 2px;
}

.logo-m {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
}

.left-m {
  background: #3b82f6;
}

.right-m {
  background: #ef4444;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.search-icon {
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;
}

.search-icon:hover {
  color: #374151;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #1f2937;
}

.nav-dropdown {
  position: relative;
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 4px;
  color: #9ca3af;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.upgrade-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upgrade-btn:hover {
  background: #dc2626;
}

.profile-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-btn:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 20px;
  }
  
  .nav-link {
    font-size: 13px;
  }
}
</style>

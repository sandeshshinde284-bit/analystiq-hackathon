<!-- File: src/components/Organisms/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">
        <i class="ri-line-chart-fill logo-icon"></i>
        <span>AnalystIQ</span>
      </router-link>
      <nav>
        <router-link to="/app/new-analysis" class="nav-button">
          + New Analysis
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// Using your global SCSS variables from `src/styles/global.scss`
@import "@/styles/global.scss";

.app-header {
  background-color: rgba($color-background, 0.8);
  border-bottom: 1px solid $color-border;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  color: $color-text-primary;
  i {
    color: $color-accent;
    font-size: 36px;
    margin-right: 12px;
  }
}
.nav-button {
  background: rgba($color-accent, 0.1);
  color: $color-accent;
  border: 1px solid $color-accent;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    background: rgba($color-accent, 0.2);
    box-shadow: 0 0 15px rgba($color-accent, 0.3);
  }
}
</style>

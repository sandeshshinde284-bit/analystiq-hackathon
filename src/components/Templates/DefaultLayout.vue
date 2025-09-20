<!-- File: src/components/Templates/DefaultLayout.vue -->
<template>
  <div>
    <AppNavbar />
    <main>
      <router-view />
    </main>
    <footer class="app-footer">
      <p>
        &copy; 2025 AnalystIQ. Built for the Google GenAI Exchange Hackathon.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Your existing navbar component for the marketing page
import AppNavbar from "@/components/Organisms/Navbar.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.app-footer {
  background-color: $color-background;
  border-top: 1px solid $color-border;
  padding: 30px 0;
  text-align: center;
  color: $color-text-secondary;
  font-size: 14px;
}
</style>

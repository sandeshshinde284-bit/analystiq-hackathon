<!-- File: src/components/Templates/AppLayout.vue -->
<template>
  <div class="app-layout">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// The new, simpler header for the app itself
import AppHeader from "@/components/Organisms/AppHeader.vue";
</script>

<!-- File: src/components/Navbar.vue -->
<template>
  <header>
    <div class="container">
      <div class="logo">
        <i class="ri-line-chart-fill logo-icon"></i>
        Analyst<span>IQ</span>
      </div>
      <nav>
        <ul>
          <li><a href="#">Features</a></li>
          <li><a href="#">How It Works</a></li>
          <li><a href="#">Pricing</a></li>
          <li><button class="login-btn" @click="goToLogin">Log In</button></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "AppNavbar",
};
</script>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function goToLogin() {
  router.push("/login");
}
</script>

<style lang="scss" scoped>
header {
  // The header itself spans the full width
  width: 100%;
  border-bottom: 1px solid $color-border;
}

.container {
  // The container inside holds the content and centers it
  width: 100%;
  max-width: 1400px; // Set the max-width for the content
  margin: 0 auto; // Center the container
  padding: 0 30px; // Add padding to the sides

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px; // Give the header a fixed height
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
}
.logo-icon {
  color: $color-accent;
  margin-right: 8px;
  font-size: 32px;
}
.logo span {
  background: linear-gradient(90deg, $color-text-primary, $color-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

nav ul {
  display: flex;
  list-style: none;
}
nav ul li {
  margin-left: 40px;
}
nav ul li a,
nav ul li button {
  color: $color-text-primary;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
  &:hover {
    color: $color-accent;
  }
}

.login-btn {
  background-color: rgba($color-accent, 0.1);
  color: $color-accent;
  border: 1px solid $color-accent;
  border-radius: 6px;
  padding: 10px 20px;
  font-family: "AlibabaSans", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba($color-accent, 0.2);
  }
}
</style>

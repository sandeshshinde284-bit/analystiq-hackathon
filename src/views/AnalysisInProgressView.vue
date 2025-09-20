<!-- File: src/views/AnalysisInProgressView.vue -->
<template>
  <div class="page-wrapper">
    <div class="progress-container">
      <div class="spinner"></div>
      <h1 class="progress-title">{{ currentStatus }}</h1>
      <p class="progress-subtitle">
        Hang tight, our AI is working its magic on the document...
      </p>
      <div class="progress-bar-wrapper">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAnalysisStore } from "@/store/analysisStore"; // 1. Store ko import karein

const router = useRouter();
const analysisStore = useAnalysisStore(); // 2. Store ko initialize karein

const currentStatus = ref("Analyzing Pitch Deck...");
const progress = ref(0);

const statusMessages = [
  "Extracting key metrics...",
  "Benchmarking against market data...",
  "Evaluating team strength...",
  "Generating deal memo...",
  "Finalizing recommendations...",
];

let statusInterval: any = null;
let progressInterval: any = null;

// 3. 'watch' karein jab store ki loading state badalti hai
watch(
  () => analysisStore.isLoading,
  (isLoading) => {
    // Jab loading false ho jaye (matlab analysis complete ho gaya)
    if (!isLoading) {
      // UI animations ko rok dein
      clearInterval(statusInterval);
      clearInterval(progressInterval);
      progress.value = 100;

      // Check karein ki result aaya ya error
      if (analysisStore.analysisResult) {
        console.log("Analysis complete, redirecting to results page.");
        // Result page par bhej dein
        router.push("/analysis-results");
      } else {
        console.error("Analysis failed:", analysisStore.error);
        // Error ke case mein user ko wapas bhej dein (optional)
        alert("Analysis failed. Please try again.");
        router.push("/");
      }
    }
  }
);

onMounted(() => {
  // --- Simulate Progress Bar (yeh sirf UI ke liye hai) ---
  progressInterval = setInterval(() => {
    // 95% par rok dein, 100% redirect hone par hoga
    if (progress.value < 95) {
      progress.value += 2;
    }
  }, 100);

  // --- Simulate Changing Status Text (yeh bhi sirf UI ke liye hai) ---
  let messageIndex = 0;
  statusInterval = setInterval(() => {
    if (messageIndex < statusMessages.length) {
      currentStatus.value = statusMessages[messageIndex];
      messageIndex++;
    } else {
      // Agar saare messages dikh gaye, to pehla wala phir se dikhayein
      messageIndex = 0;
    }
  }, 1500);

  // Agar user direct is page par aa jaye, check karo ki analysis chal raha hai ya nahi
  if (!analysisStore.isLoading && !analysisStore.analysisResult) {
    console.warn("No analysis in progress. Redirecting home.");
    router.push("/");
  }
});

// Component hatne par intervals clear kar dein
onUnmounted(() => {
  clearInterval(statusInterval);
  clearInterval(progressInterval);
});
</script>

<style lang="scss" scoped>
// STYLES aage ki tarah same rahenge, koi change nahi
$color-accent: #00d4ff;

@font-face {
  font-family: "AlibabaSans";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Regular.otf")
    format("opentype");
  font-weight: normal;
}
@font-face {
  font-family: "AlibabaSans";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/Alibaba-PuHuiTi-Bold.otf")
    format("opentype");
  font-weight: bold;
}

.page-wrapper {
  font-family: "AlibabaSans", sans-serif;
  background: linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 100%);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 90px);
  padding: 40px 20px;
  text-align: center;
}

.progress-container {
  max-width: 600px;
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-left-color: $color-accent;
  margin: 0 auto 40px auto;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.progress-title {
  font-size: 36px;
  font-weight: bold;
  background: linear-gradient(90deg, #ffffff, $color-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
  min-height: 44px;
  transition: all 0.3s ease-in-out;
}

.progress-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
}

.progress-bar-wrapper {
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: $color-accent;
  border-radius: 4px;
  transition: width 0.2s linear;
  box-shadow: 0 0 10px $color-accent, 0 0 20px $color-accent;
}
</style>

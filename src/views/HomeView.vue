<!-- File: src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Go from Pitch Deck to Deal Memo in Minutes, Not Days</h1>
          <p>
            AI-powered analysis that reads, benchmarks, and flags risks in
            startup documents, delivering investor-ready insights.
          </p>
          <button class="cta-btn" @click="goToNewAnalysis">
            Get Started Free
          </button>
        </div>
      </div>
      <!-- The dashboard mockup is positioned relative to the hero section -->
      <div class="dashboard-mockup">
        <div class="dashboard-grid"></div>
        <div class="dashboard-elements">
          <div class="dashboard-card"></div>
          <div class="dashboard-chart"><div class="chart-line"></div></div>
          <div class="dashboard-card"></div>
          <div class="dashboard-card"></div>
          <div class="dashboard-chart"><div class="chart-line"></div></div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2>Powerful Features for Smart Investors</h2>
        <p class="subtitle">
          Our AI-powered platform streamlines your investment analysis workflow
        </p>
        <div class="features-grid">
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import FeatureCard from "@/components/Molecules/FeatureCard.vue";
const features = [
  {
    icon: "ri-file-text-line",
    title: "Automated Deal Memo",
    description:
      "Our AI reads pitch decks and transcripts to generate a structured, comprehensive investment memo.",
  },
  {
    icon: "ri-bar-chart-2-line",
    title: "Intelligent Benchmarking",
    description:
      "Instantly see how a startup stacks up against its peers using our BigQuery-powered market data.",
  },
  {
    icon: "ri-alert-line",
    title: "Risk Assessment",
    description:
      "Identify potential red flags like inconsistent metrics, inflated market size, or unusual churn patterns.",
  },
  {
    icon: "ri-settings-3-line",
    title: "Customizable Analysis",
    description:
      "Tailor the AI's recommendation to your unique investment thesis by adjusting the weights of different factors.",
  },
];
const router = useRouter();
function goToNewAnalysis() {
  router.push("/new-analysis");
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}

.hero {
  position: relative; // This is the anchor for the absolute positioned mockup
  padding: 120px 0;
  text-align: center;
  overflow: hidden;

  // The radial glow effect
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba($color-accent, 0.1) 0%,
      rgba($color-background, 0) 70%
    );
    z-index: 1; // Put the glow above the mockup
  }
}
.hero-content {
  position: relative;
  z-index: 2; // Put the text content above the glow
  max-width: 800px;
  margin: 0 auto; // Center the content
}
.hero h1 {
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 24px;
  line-height: 1.2;
  background: linear-gradient(
    90deg,
    $color-text-primary 0%,
    $color-accent 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero p {
  font-size: 20px;
  color: $color-text-secondary;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.cta-btn {
  background: linear-gradient(
    90deg,
    $color-accent 0%,
    $color-accent-darker 100%
  );
  color: $color-text-primary;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba($color-accent, 0.3);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba($color-accent, 0.5);
  }
}

// MOCKUP STYLES (now correctly positioned)
.dashboard-mockup {
  position: absolute;
  left: 50%;
  transform: translateX(-50%); // Center the mockup
  width: 1000px;
  height: 600px;
  bottom: -300px;
  background: linear-gradient(
    180deg,
    rgba($color-accent, 0.1) 0%,
    rgba($color-accent-darker, 0.05) 100%
  );
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: 1px solid $color-border;
  box-shadow: 0 20px 80px rgba($color-accent, 0.2);
  z-index: 0; // Put the mockup in the very back
}
.dashboard-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
.dashboard-elements,
.dashboard-card,
.dashboard-chart,
.chart-line {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid $color-border;
}
.dashboard-elements {
  top: 40px;
  left: 40px;
  right: 40px;
  border: none;
  background: transparent;
}
.dashboard-card {
  position: static;
  width: 280px;
  height: 160px;
} // Use position static for grid items
.dashboard-chart {
  position: static;
  width: 580px;
  height: 160px;
  overflow: hidden;
}
.chart-line {
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba($color-accent, 0) 0%,
    $color-accent 20%,
    rgba($color-accent, 0.8) 40%,
    $color-accent 60%,
    rgba($color-accent, 0.6) 80%,
    rgba($color-accent, 0) 100%
  );
}

// --- FEATURES SECTION ---
.features-section {
  padding: 150px 0 100px 0;
  background-color: lighten(
    $color-background,
    2%
  ); // Give it a slightly different background
}
.features-section h2 {
  font-size: 2.8em;
  font-weight: 500;
  margin-bottom: 15px;
  text-align: center;
}
.subtitle {
  font-size: 1.2em;
  color: $color-text-secondary;
  margin-bottom: 60px;
  text-align: center;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
</style>

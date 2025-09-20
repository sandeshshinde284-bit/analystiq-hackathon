<template>
  <div
    class="metric-card"
    :class="{ 'cross-validated': isValidated, animated: animate }"
  >
    <!-- Header with Mini Chart -->
    <div class="metric-header">
      <div class="metric-info">
        <div class="metric-label">{{ label }}</div>
        <div class="metric-badges">
          <div v-if="isValidated" class="validation-badge">
            <i class="ri-links-line"></i>
            Cross-Verified
          </div>
          <div class="confidence-badge" :class="confidenceClass">
            {{ confidence }} Confidence
          </div>
        </div>
      </div>
      <div class="metric-chart">
        <MiniChart
          :type="chartType"
          :value="chartValue"
          :max="chartMax"
          :data="trendData"
          :color="chartColor"
        />
      </div>
    </div>

    <!-- Main Value -->
    <div class="metric-value-section">
      <div class="metric-value">{{ displayValue }}</div>
      <div v-if="change" class="metric-change" :class="changeClass">
        <i :class="changeIcon"></i>
        {{ change }}
      </div>
    </div>

    <!-- Source Verification -->
    <div class="metric-footer">
      <div class="source-info">
        <i class="ri-file-text-line"></i>
        <span>{{ sourceLocation }}</span>
      </div>
      <button
        class="verify-btn"
        @click="$emit('verify', sourceData)"
        :title="`Verify source (${confidence} confidence)`"
      >
        <i class="ri-search-eye-line"></i>
        <span>Verify</span>
      </button>
    </div>

    <!-- Glow Effect -->
    <div class="glow-effect" :style="{ '--glow-color': chartColor }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MiniChart from "@/components/Atoms/MiniChart.vue";

interface Props {
  label: string;
  value: string | number;
  sourceData: any;
  confidence: string;
  sourceLocation: string;
  isValidated?: boolean;
  chartType?: "progress" | "trend" | "gauge";
  chartValue?: number;
  chartMax?: number;
  trendData?: number[];
  change?: string;
  animate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isValidated: false,
  chartType: "progress",
  chartValue: 75,
  chartMax: 100,
  animate: true,
});

defineEmits<{
  verify: [sourceData: any];
}>();

const displayValue = computed(() => {
  if (typeof props.value === "number") {
    return props.value.toLocaleString();
  }
  return props.value;
});

const confidenceClass = computed(() => {
  switch (props.confidence.toLowerCase()) {
    case "high":
      return "high";
    case "medium":
      return "medium";
    case "low":
      return "low";
    default:
      return "medium";
  }
});

const chartColor = computed(() => {
  if (props.isValidated) return "#22c55e";
  switch (props.confidence.toLowerCase()) {
    case "high":
      return "#00d4ff";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#ef4444";
    default:
      return "#00d4ff";
  }
});

const changeClass = computed(() => {
  if (!props.change) return "";
  return props.change.includes("+") || props.change.includes("↗")
    ? "positive"
    : "negative";
});

const changeIcon = computed(() => {
  if (!props.change) return "";
  return changeClass.value === "positive"
    ? "ri-arrow-up-line"
    : "ri-arrow-down-line";
});
</script>

<style lang="scss" scoped>
$color-accent: #00d4ff;
$color-success: #22c55e;
$color-warning: #f59e0b;
$color-error: #ef4444;

.metric-card {
  animation-delay: var(--animation-delay);
  background: linear-gradient(
    145deg,
    rgba(28, 36, 54, 0.4),
    rgba(20, 26, 40, 0.5)
  );
  border-radius: 16px;
  padding: 24px;
  position: relative;
  border: 1px solid rgba($color-accent, 0.2);
  box-shadow: 0 0 20px rgba($color-accent, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba($color-accent, 0),
      rgba($color-accent, 0.5),
      rgba($color-accent, 0)
    );
    opacity: 0.7;
  }

  &.animated {
    animation: cardSlideIn 0.6s ease-out;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba($color-accent, 0.25),
      0 0 30px rgba($color-accent, 0.1);
    border-color: rgba($color-accent, 0.6);

    .glow-effect {
      opacity: 1;
    }
  }

  &.cross-validated {
    border-color: rgba($color-success, 0.4);

    &:hover {
      box-shadow: 0 15px 35px rgba($color-success, 0.25),
        0 0 30px rgba($color-success, 0.1);
      border-color: rgba($color-success, 0.6);
    }
  }
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.metric-info {
  flex: 1;
}

.metric-label {
  font-family: "AlibabaSans-Medium", sans-serif;
  font-size: 14px;
  color: #8b93a7;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-badges {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.validation-badge,
.confidence-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
}

.validation-badge {
  background: rgba($color-success, 0.1);
  color: $color-success;
  border: 1px solid rgba($color-success, 0.3);
}

.confidence-badge {
  &.high {
    background: rgba($color-accent, 0.1);
    color: $color-accent;
    border: 1px solid rgba($color-accent, 0.3);
  }

  &.medium {
    background: rgba($color-warning, 0.1);
    color: $color-warning;
    border: 1px solid rgba($color-warning, 0.3);
  }

  &.low {
    background: rgba($color-error, 0.1);
    color: $color-error;
    border: 1px solid rgba($color-error, 0.3);
  }
}

.metric-chart {
  opacity: 0.8;
  transition: all 0.3s ease;

  .metric-card:hover & {
    opacity: 1;
    transform: scale(1.05);
  }
}

.metric-value-section {
  margin-bottom: 20px;
}

.metric-value {
  font-family: "AlibabaSans-Bold", sans-serif;
  font-size: 32px;
  color: #ffffff;
  margin-bottom: 4px;
  animation: valueCountUp 1.5s ease-out;
}

@keyframes valueCountUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;

  &.positive {
    color: $color-success;
  }

  &.negative {
    color: $color-error;
  }
}

.metric-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.source-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);

  i {
    color: $color-accent;
    font-size: 12px;
  }
}

.verify-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: rgba($color-accent, 0.1);
  color: $color-accent;
  border: 1px solid rgba($color-accent, 0.2);
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba($color-accent, 0.2);
    border-color: rgba($color-accent, 0.4);
    box-shadow: 0 0 10px rgba($color-accent, 0.3);
    transform: translateY(-1px);
  }
}

.glow-effect {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    var(--glow-color),
    transparent,
    var(--glow-color)
  );
  border-radius: 18px;
  opacity: 0;
  z-index: -1;
  filter: blur(8px);
  transition: opacity 0.3s ease;
}
</style>

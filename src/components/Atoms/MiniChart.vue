<template>
  <div class="mini-chart-container">
    <canvas ref="miniChartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Chart as ChartJS } from "chart.js/auto";

interface Props {
  type: "progress" | "trend" | "gauge";
  value: number;
  max?: number;
  data?: number[];
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  color: "#00d4ff",
});

const miniChartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

onMounted(() => {
  if (miniChartCanvas.value) {
    const ctx = miniChartCanvas.value.getContext("2d");
    if (ctx) {
      createChart(ctx);
    }
  }
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

function createChart(ctx: CanvasRenderingContext2D) {
  switch (props.type) {
    case "progress":
      createProgressChart(ctx);
      break;
    case "trend":
      createTrendChart(ctx);
      break;
    case "gauge":
      createGaugeChart(ctx);
      break;
  }
}

function createProgressChart(ctx: CanvasRenderingContext2D) {
  const percentage = (props.value / props.max) * 100;

  chartInstance = new ChartJS(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [props.color, "rgba(255, 255, 255, 0.1)"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  });
}

function createTrendChart(ctx: CanvasRenderingContext2D) {
  const trendData = props.data || [10, 25, 15, 35, 28, 42, 38, 50];

  chartInstance = new ChartJS(ctx, {
    type: "line",
    data: {
      labels: Array(trendData.length).fill(""),
      datasets: [
        {
          data: trendData,
          borderColor: props.color,
          backgroundColor: `${props.color}20`,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { display: false },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      elements: {
        point: { radius: 0 },
      },
    },
  });
}

function createGaugeChart(ctx: CanvasRenderingContext2D) {
  const percentage = (props.value / props.max) * 100;

  chartInstance = new ChartJS(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [
            `linear-gradient(90deg, ${props.color}, ${props.color}aa)`,
            "rgba(255, 255, 255, 0.05)",
          ],
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "80%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  });
}
</script>

<style lang="scss" scoped>
.mini-chart-container {
  width: 60px;
  height: 60px;
  position: relative;
}
</style>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Chart as ChartJS } from "chart.js/auto";

interface Props {
  type: "bar" | "line" | "radar" | "doughnut";
  data: any;
  options?: any;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 300,
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",
        font: {
          family: "AlibabaSans",
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#00d4ff",
      bodyColor: "#ffffff",
      borderColor: "#00d4ff",
      borderWidth: 1,
    },
  },
};

// ✅ Add conditional scales for different chart types
const getScalesConfig = () => {
  if (props.type === "radar") {
    return {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: "#8b93a7",
          backdropColor: "transparent",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
    };
  }

  return {
    x: {
      ticks: {
        color: "#8b93a7",
        font: {
          family: "AlibabaSans",
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
    y: {
      ticks: {
        color: "#8b93a7",
        font: {
          family: "AlibabaSans",
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
  };
};

onMounted(() => {
  console.log("BaseChart mounted, creating chart..."); // ✅ Debug log
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");
    if (ctx) {
      const finalOptions = {
        ...defaultOptions,
        scales: getScalesConfig(),
        ...props.options,
      };

      console.log("Chart config:", {
        type: props.type,
        data: props.data,
        options: finalOptions,
      }); // ✅ Debug log

      chartInstance = new ChartJS(ctx, {
        type: props.type,
        data: props.data,
        options: finalOptions,
      });

      console.log("Chart created successfully!"); // ✅ Debug log
    }
  }
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

watch(
  () => props.data,
  (newData) => {
    if (chartInstance) {
      chartInstance.data = newData;
      chartInstance.update();
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  min-height: 200px;

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

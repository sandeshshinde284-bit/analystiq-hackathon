<template>
  <div class="benchmark-charts">
    <div class="chart-section">
      <h4><i class="ri-bar-chart-line"></i> Competitive Analysis</h4>
      <div class="chart-wrapper">
        <BaseChart
          type="bar"
          :data="competitorData"
          :options="barChartOptions"
          :height="250"
        />
      </div>
    </div>

    <div class="chart-section">
      <h4><i class="ri-line-chart-line"></i> Market Growth Trajectory</h4>
      <div class="chart-wrapper">
        <BaseChart
          type="line"
          :data="marketGrowthData"
          :options="lineChartOptions"
          :height="250"
        />
      </div>
    </div>

    <div class="chart-section">
      <h4><i class="ri-radar-chart-line"></i> Performance Radar</h4>
      <div class="chart-wrapper">
        <BaseChart
          type="radar"
          :data="radarData"
          :options="radarChartOptions"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseChart from "@/components/Atoms/BaseChart.vue";

interface Props {
  startupName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  startupName: "Your Startup",
});

console.log("MarketBenchmarkChart loaded with startup:", props.startupName); // ✅ Debug log

// ✅ Simple static data first
const competitorData = ref({
  labels: [
    props.startupName,
    "Competitor A",
    "Competitor B",
    "Competitor C",
    "Market Leader",
  ],
  datasets: [
    {
      label: "Revenue ($M)",
      data: [1.2, 0.8, 2.1, 1.5, 5.2],
      backgroundColor: [
        "rgba(0, 212, 255, 0.8)",
        "rgba(255, 255, 255, 0.2)",
        "rgba(255, 255, 255, 0.2)",
        "rgba(255, 255, 255, 0.2)",
        "rgba(255, 255, 255, 0.2)",
      ],
      borderColor: [
        "#00d4ff",
        "rgba(255, 255, 255, 0.5)",
        "rgba(255, 255, 255, 0.5)",
        "rgba(255, 255, 255, 0.5)",
        "rgba(255, 255, 255, 0.5)",
      ],
      borderWidth: 2,
    },
  ],
});

const marketGrowthData = ref({
  labels: ["2020", "2021", "2022", "2023", "2024", "2025E", "2026E", "2027E"],
  datasets: [
    {
      label: "Total Addressable Market ($B)",
      data: [1.2, 1.5, 1.9, 2.1, 2.5, 3.2, 4.1, 5.2],
      borderColor: "#00d4ff",
      backgroundColor: "rgba(0, 212, 255, 0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#00d4ff",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
    },
  ],
});

const radarData = ref({
  labels: [
    "Team Experience",
    "Product Innovation",
    "Market Opportunity",
    "Traction",
    "Financial Health",
    "Competitive Position",
  ],
  datasets: [
    {
      label: props.startupName,
      data: [9, 8, 7, 6, 8, 7],
      backgroundColor: "rgba(0, 212, 255, 0.2)",
      borderColor: "#00d4ff",
      borderWidth: 3,
      pointBackgroundColor: "#00d4ff",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
    },
    {
      label: "Industry Average",
      data: [6, 6, 6, 6, 6, 6],
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(255, 255, 255, 0.3)",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 1,
      pointRadius: 4,
    },
  ],
});

// ✅ Simplified options
const barChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#8b93a7",
        callback: function (value: any) {
          return "$" + value + "M";
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
    x: {
      ticks: {
        color: "#8b93a7",
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff",
        usePointStyle: true,
        padding: 20,
      },
    },
  },
});

const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#8b93a7",
        callback: function (value: any) {
          return "$" + value + "B";
        },
      },
    },
    x: {
      ticks: {
        color: "#8b93a7",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff",
        usePointStyle: true,
        padding: 20,
      },
    },
  },
});

const radarChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff",
        usePointStyle: true,
        padding: 20,
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.benchmark-charts {
  display: grid;
  gap: 30px;
}

.chart-section {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 25px;
  border: 1px solid rgba(0, 212, 255, 0.1);

  h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;

    i {
      color: #00d4ff;
      font-size: 18px;
    }
  }
}

.chart-wrapper {
  width: 100%;
  height: 300px; /* ✅ Fixed height */
  position: relative;
  background: rgba(
    0,
    0,
    0,
    0.1
  ); /* ✅ Temporary background to see if container is there */
  border-radius: 8px;
}
</style>

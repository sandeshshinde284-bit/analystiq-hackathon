<template>
  <div class="page-wrapper">
    <div class="progress-container">
      <!-- Enhanced Header -->
      <div class="analysis-header">
        <div class="company-logo">
          <i class="ri-line-chart-line"></i>
        </div>
        <h1 class="progress-title">{{ currentStatus }}</h1>
        <p class="progress-subtitle">
          {{ getSubtitle() }}
        </p>
      </div>

      <!-- Document Processing Grid -->
      <div v-if="documentsBeingProcessed.length" class="documents-grid">
        <div
          v-for="doc in documentsBeingProcessed"
          :key="doc.type"
          class="document-card"
          :class="{
            processing: doc.status === 'processing',
            completed: doc.status === 'completed',
          }"
        >
          <div class="doc-icon">
            <i :class="getDocumentIcon(doc.type)"></i>
          </div>
          <div class="doc-info">
            <h4>{{ getDocumentName(doc.type) }}</h4>
            <p>{{ getDocumentDescription(doc.type) }}</p>
          </div>
          <div class="doc-status">
            <div
              v-if="doc.status === 'processing'"
              class="processing-spinner"
            ></div>
            <i
              v-else-if="doc.status === 'completed'"
              class="ri-check-line completed-icon"
            ></i>
            <i v-else class="ri-time-line pending-icon"></i>
          </div>
        </div>
      </div>

      <!-- Enhanced Progress Section -->
      <div class="progress-section">
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-value">{{ actualCompletedSteps }}</span>
            <span class="stat-label">Steps Completed</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ actualTotalSteps }}</span>
            <span class="stat-label">Total Steps</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ Math.round(actualProgress) }}%</span>
            <span class="stat-label">Progress</span>
          </div>
        </div>

        <div class="progress-bar-wrapper">
          <div
            class="progress-bar"
            :style="{ width: actualProgress + '%' }"
          ></div>
          <div
            class="progress-glow"
            :style="{ width: actualProgress + '%' }"
          ></div>
        </div>

        <div class="progress-text">
          {{ getProgressDescription() }}
        </div>
      </div>

      <!-- Analysis Steps Timeline -->
      <div class="steps-timeline">
        <div
          v-for="(step, index) in analysisSteps"
          :key="step.id"
          class="step-item"
          :class="{
            active: index === currentStepIndex,
            completed: step.status === 'completed',
            error: step.status === 'error',
          }"
        >
          <div class="step-icon">
            <div v-if="step.status === 'processing'" class="step-spinner"></div>
            <i
              v-else-if="step.status === 'completed'"
              class="ri-check-line"
            ></i>
            <i
              v-else-if="step.status === 'error'"
              class="ri-error-warning-line"
            ></i>
            <span v-else class="step-number">{{ index + 1 }}</span>
          </div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p v-if="step.status === 'processing'">
              {{ getStepDescription(step.id) }}
            </p>
            <p v-else-if="step.status === 'completed'" class="completed-text">
              ✓ Completed
            </p>
            <p v-else-if="step.status === 'error'" class="error-text">
              ⚠ Error occurred
            </p>
          </div>
        </div>
      </div>

      <!-- Investment Analysis Insights -->
      <div class="insights-preview">
        <h3>
          <i class="ri-lightbulb-line"></i> Investment Analysis in Progress
        </h3>
        <div class="insights-grid">
          <div class="insight-item">
            <i class="ri-funds-line"></i>
            <span>Evaluating financial projections & unit economics</span>
          </div>
          <div class="insight-item">
            <i class="ri-team-line"></i>
            <span>Assessing founder-market fit & team strength</span>
          </div>
          <div class="insight-item">
            <i class="ri-line-chart-line"></i>
            <span>Analyzing market opportunity & competitive positioning</span>
          </div>
          <div class="insight-item">
            <i class="ri-rocket-line"></i>
            <span>Reviewing traction metrics & growth potential</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAnalysisStore } from "@/store/analysisStore";

const router = useRouter();
const analysisStore = useAnalysisStore();

const currentStatus = ref("Initializing Investment Analysis...");

// ✅ FIXED: Use local progress tracking instead of relying on store
const actualProgress = ref(0);
const currentStepIndex = ref(0);

// ✅ FIXED: Create our own steps tracking
const analysisSteps = ref([
  {
    id: "document-extraction",
    title: "Extracting text from documents",
    status: "processing",
  },
  {
    id: "pitch-analysis",
    title: "Analyzing pitch deck content",
    status: "pending",
  },
  {
    id: "cross-validation",
    title: "Cross-validating data sources",
    status: "pending",
  },
  {
    id: "market-benchmarking",
    title: "Benchmarking against market data",
    status: "pending",
  },
  {
    id: "risk-assessment",
    title: "Performing risk assessment",
    status: "pending",
  },
  { id: "report-generation", title: "Generating deal memo", status: "pending" },
]);

// ✅ FIXED: Proper computed properties for steps
const actualCompletedSteps = computed(() => {
  return analysisSteps.value.filter((step) => step.status === "completed")
    .length;
});

const actualTotalSteps = computed(() => {
  return analysisSteps.value.length;
});

// Enhanced status messages for investment analysis
const investmentStatusMessages = [
  "Extracting financial metrics and projections...",
  "Analyzing founder backgrounds and team composition...",
  "Processing market research and competitive landscape...",
  "Cross-validating data across documents...",
  "Benchmarking against industry standards...",
  "Performing comprehensive risk assessment...",
  "Generating investment recommendation...",
  "Finalizing deal memo and analysis report...",
];

// ✅ FIXED: Simplified documents tracking
const documentsBeingProcessed = ref([
  { type: "pitchDeck", status: "processing" },
  { type: "financialModel", status: "pending" },
  { type: "founderProfiles", status: "pending" },
  { type: "marketResearch", status: "pending" },
  { type: "tractionData", status: "pending" },
]);

let statusInterval: any = null;
let progressInterval: any = null;
let stepInterval: any = null;

// Watch for analysis completion
watch(
  () => analysisStore.isLoading,
  (isLoading) => {
    if (!isLoading) {
      clearAllIntervals();
      actualProgress.value = 100;
      currentStatus.value = "Investment Analysis Complete!";

      // Mark all steps as completed
      analysisSteps.value.forEach((step) => {
        step.status = "completed";
      });

      if (analysisStore.analysisResult) {
        console.log("Analysis complete, redirecting to results page.");
        setTimeout(() => {
          router.push("/analysis-results");
        }, 1500);
      } else {
        console.error("Analysis failed:", analysisStore.error);
        alert("Analysis failed. Please try again.");
        router.push("/");
      }
    }
  }
);

onMounted(() => {
  // ✅ FIXED: Better step progression
  stepInterval = setInterval(() => {
    if (
      currentStepIndex.value < analysisSteps.value.length - 1 &&
      actualProgress.value < 90
    ) {
      // Complete current step
      analysisSteps.value[currentStepIndex.value].status = "completed";

      // Move to next step
      currentStepIndex.value++;
      if (currentStepIndex.value < analysisSteps.value.length) {
        analysisSteps.value[currentStepIndex.value].status = "processing";
      }
    }
  }, 3000);

  // Document processing simulation
  let docIndex = 0;
  const docInterval = setInterval(() => {
    if (docIndex < documentsBeingProcessed.value.length) {
      if (docIndex > 0) {
        documentsBeingProcessed.value[docIndex - 1].status = "completed";
      }
      if (docIndex < documentsBeingProcessed.value.length) {
        documentsBeingProcessed.value[docIndex].status = "processing";
      }
      docIndex++;
    } else {
      clearInterval(docInterval);
      // Mark last document as completed
      if (documentsBeingProcessed.value.length > 0) {
        documentsBeingProcessed.value[
          documentsBeingProcessed.value.length - 1
        ].status = "completed";
      }
    }
  }, 2500);

  // ✅ FIXED: Smooth progress animation
  progressInterval = setInterval(() => {
    if (actualProgress.value < 95) {
      actualProgress.value += Math.random() * 2 + 0.5;
    }
  }, 150);

  // Status message rotation
  let messageIndex = 0;
  statusInterval = setInterval(() => {
    if (messageIndex < investmentStatusMessages.length) {
      currentStatus.value = investmentStatusMessages[messageIndex];
      messageIndex++;
    } else {
      messageIndex = 0;
    }
  }, 2500);

  // Check if analysis is actually running
  if (!analysisStore.isLoading && !analysisStore.analysisResult) {
    console.warn("No analysis in progress. Redirecting home.");
    router.push("/");
  }
});

onUnmounted(() => {
  clearAllIntervals();
});

function clearAllIntervals() {
  clearInterval(statusInterval);
  clearInterval(progressInterval);
  clearInterval(stepInterval);
}

// Helper functions
function getSubtitle(): string {
  const completedCount = documentsBeingProcessed.value.filter(
    (doc) => doc.status === "completed"
  ).length;
  const totalCount = documentsBeingProcessed.value.length;

  if (completedCount === totalCount) {
    return "Finalizing comprehensive investment analysis and recommendations";
  } else {
    return `Processing ${totalCount} documents for comprehensive due diligence analysis`;
  }
}

function getDocumentIcon(type: string): string {
  const icons = {
    pitchDeck: "ri-presentation-fill",
    financialModel: "ri-line-chart-fill",
    founderProfiles: "ri-team-fill",
    marketResearch: "ri-bar-chart-box-fill",
    tractionData: "ri-rocket-fill",
  };
  return icons[type as keyof typeof icons] || "ri-file-fill";
}

function getDocumentName(type: string): string {
  const names = {
    pitchDeck: "Pitch Deck",
    financialModel: "Financial Projections",
    founderProfiles: "Founder Profiles",
    marketResearch: "Market Research",
    tractionData: "Traction Data",
  };
  return names[type as keyof typeof names] || type;
}

function getDocumentDescription(type: string): string {
  const descriptions = {
    pitchDeck: "Extracting business model, vision, and key metrics",
    financialModel: "Analyzing revenue projections and unit economics",
    founderProfiles: "Evaluating team experience and founder-market fit",
    marketResearch: "Processing competitive landscape and market size",
    tractionData: "Reviewing growth metrics and user acquisition data",
  };
  return (
    descriptions[type as keyof typeof descriptions] || "Processing document..."
  );
}

function getProgressDescription(): string {
  const progressValue = Math.round(actualProgress.value);

  if (progressValue < 20) {
    return "Initializing analysis engine and document processing pipeline";
  } else if (progressValue < 40) {
    return "Extracting and structuring data from uploaded documents";
  } else if (progressValue < 60) {
    return "Cross-validating information and identifying key insights";
  } else if (progressValue < 80) {
    return "Benchmarking against market data and industry standards";
  } else if (progressValue < 95) {
    return "Generating investment recommendation and risk assessment";
  } else {
    return "Finalizing comprehensive analysis report";
  }
}

function getStepDescription(stepId: string): string {
  const descriptions = {
    "document-extraction": "Using OCR and NLP to extract structured data",
    "pitch-analysis": "Analyzing business model and value proposition",
    "financial-analysis": "Processing revenue model and financial projections",
    "founder-analysis": "Evaluating team background and experience",
    "market-analysis": "Assessing market size and competitive landscape",
    "traction-analysis": "Reviewing growth metrics and user data",
    "cross-validation": "Verifying data consistency across documents",
    "market-benchmarking": "Comparing against industry benchmarks",
    "risk-assessment": "Identifying potential risks and mitigation strategies",
    "report-generation": "Compiling comprehensive investment analysis",
  };
  return descriptions[stepId as keyof typeof descriptions] || "Processing...";
}
</script>

<style lang="scss" scoped>
$color-accent: #00d4ff;
$color-success: #22c55e;
$color-warning: #f59e0b;
$color-error: #ef4444;

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
  min-height: 100vh;
  padding: 40px 20px;
  overflow-y: auto;
}

.progress-container {
  max-width: 1000px;
  margin: 0 auto;
}

// Enhanced header
.analysis-header {
  text-align: center;
  margin-bottom: 40px;

  .company-logo {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, $color-accent, #0099cc);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px auto;
    box-shadow: 0 10px 30px rgba($color-accent, 0.3);

    i {
      font-size: 36px;
      color: #ffffff;
    }
  }

  .progress-title {
    font-size: 36px;
    font-weight: bold;
    background: linear-gradient(90deg, #ffffff, $color-accent);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 12px;
    min-height: 44px;
    transition: all 0.3s ease-in-out;
  }

  .progress-subtitle {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
  }
}

// ✅ FIXED: Enhanced doc-icon visibility
.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.document-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;

  &.processing {
    border-color: rgba($color-accent, 0.5);
    background: rgba($color-accent, 0.08);
    box-shadow: 0 0 20px rgba($color-accent, 0.2);
  }

  &.completed {
    border-color: rgba($color-success, 0.5);
    background: rgba($color-success, 0.08);
  }

  .doc-icon {
    width: 48px;
    height: 48px;
    background: rgba($color-accent, 0.15);
    border: 1px solid rgba($color-accent, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 24px;
      color: $color-accent;
      font-weight: bold;
    }
  }

  .doc-info {
    flex: 1;

    h4 {
      font-size: 16px;
      color: #ffffff;
      margin-bottom: 4px;
      font-weight: 600;
    }

    p {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.4;
    }
  }

  .doc-status {
    .processing-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba($color-accent, 0.3);
      border-top: 2px solid $color-accent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .completed-icon {
      font-size: 20px;
      color: $color-success;
    }

    .pending-icon {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.3);
    }
  }
}

// Enhanced progress section
.progress-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;

  .stat-item {
    text-align: center;

    .stat-value {
      display: block;
      font-size: 32px;
      font-weight: bold;
      color: $color-accent;
      line-height: 1;
    }

    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
  }
}

.progress-bar-wrapper {
  position: relative;
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, $color-accent, #0099cc);
  border-radius: 4px;
  transition: width 0.3s ease-out;
  position: relative;
}

.progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba($color-accent, 0.6),
    transparent
  );
  border-radius: 4px;
  animation: glow 2s ease-in-out infinite;
}

.progress-text {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

// Steps timeline
.steps-timeline {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  margin-left: 20px;
  padding-left: 24px;
  position: relative;

  &.active {
    border-left-color: $color-accent;

    .step-icon {
      background: $color-accent;
      color: #ffffff;
      box-shadow: 0 0 20px rgba($color-accent, 0.4);
    }
  }

  &.completed {
    border-left-color: $color-success;

    .step-icon {
      background: $color-success;
      color: #ffffff;
    }
  }

  &.error {
    border-left-color: $color-error;

    .step-icon {
      background: $color-error;
      color: #ffffff;
    }
  }

  .step-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -44px;
    flex-shrink: 0;
    transition: all 0.3s ease;

    .step-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .step-number {
      font-size: 14px;
      font-weight: bold;
    }

    i {
      font-size: 18px;
    }
  }

  .step-content {
    flex: 1;

    h4 {
      font-size: 16px;
      color: #ffffff;
      margin-bottom: 4px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.4;

      &.completed-text {
        color: $color-success;
      }

      &.error-text {
        color: $color-error;
      }
    }
  }
}

// Investment insights preview
.insights-preview {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 20px;

    i {
      color: $color-accent;
      font-size: 24px;
    }
  }
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  i {
    font-size: 20px;
    color: $color-accent;
    flex-shrink: 0;
  }

  span {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.4;
  }
}

// Animations
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes glow {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

// Responsive design
@media (max-width: 768px) {
  .progress-container {
    padding: 0 10px;
  }

  .analysis-header .progress-title {
    font-size: 28px;
  }

  .documents-grid {
    grid-template-columns: 1fr;
  }

  .progress-stats {
    flex-direction: column;
    gap: 20px;

    .stat-divider {
      width: 40px;
      height: 1px;
    }
  }

  .insights-grid {
    grid-template-columns: 1fr;
  }
}
</style>

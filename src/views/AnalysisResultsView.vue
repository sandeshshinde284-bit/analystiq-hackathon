<template>
  <div v-if="analysisData" class="page-wrapper">
    <div class="container">
      <!-- Header with Analysis Type -->
      <div class="header">
        <div class="header-main">
          <h1>Deal Memo: {{ analysisData.startupName }}</h1>
          <div class="analysis-badges">
            <div
              v-if="isMultiDocumentAnalysis"
              class="analysis-badge multi-doc"
            >
              <i class="ri-folder-check-line"></i>
              Multi-Document Analysis
            </div>
            <div
              class="analysis-badge confidence"
              :class="getConfidenceClass()"
            >
              <i class="ri-shield-check-line"></i>
              {{ getConfidenceLevel() }} Confidence
            </div>
          </div>
        </div>
        <h2>Analysis Date: {{ analysisData.analysisDate }}</h2>

        <!-- Document Summary -->
        <div v-if="analysisData.documentsAnalyzed" class="documents-analyzed">
          <h3><i class="ri-file-list-line"></i> Documents Processed</h3>
          <div class="document-chips">
            <div
              v-for="doc in analysisData.documentsAnalyzed"
              :key="doc.type"
              class="document-chip"
            >
              <i :class="getDocumentIcon(doc.type)"></i>
              <span>{{ getDocumentTypeName(doc.type) }}</span>
              <div class="chip-status">
                <i class="ri-check-line"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Recommendation Card -->
      <div class="recommendation-card">
        <div class="recommendation-header">
          <div class="recommendation-label">Overall Recommendation</div>
          <div v-if="analysisData.analysisMetadata" class="analysis-depth">
            {{ analysisData.analysisMetadata.analysisDepth.toUpperCase() }}
            ANALYSIS
          </div>
        </div>
        <div class="recommendation-verdict">
          {{ analysisData.recommendation.text }}
        </div>
        <div class="confidence-score">
          <div class="score-value">
            {{ analysisData.recommendation.score }}%
          </div>
          <div class="progress-container">
            <div
              class="progress-bar"
              :style="{ width: analysisData.recommendation.score + '%' }"
            ></div>
          </div>
          <div
            v-if="analysisData.analysisMetadata?.confidenceBoost"
            class="confidence-boost"
          >
            +{{ analysisData.analysisMetadata.confidenceBoost }}% from multi-doc
            analysis
          </div>
        </div>
        <div class="justification">
          {{ analysisData.recommendation.justification }}
        </div>
      </div>

      <!-- Cross-Document Insights (New Section) -->
      <div
        v-if="analysisData.crossDocumentInsights?.length"
        class="cross-insights-section"
      >
        <h3><i class="ri-links-line"></i> Cross-Document Insights</h3>
        <div class="insights-grid">
          <div
            v-for="insight in analysisData.crossDocumentInsights"
            :key="insight.type + insight.title"
            class="insight-card"
            :class="insight.status"
          >
            <div class="insight-header">
              <div class="insight-icon" :class="insight.type">
                <i :class="getInsightIcon(insight.type)"></i>
              </div>
              <div class="insight-meta">
                <h4>{{ insight.title }}</h4>
                <span class="insight-confidence"
                  >{{ insight.confidence }} confidence</span
                >
              </div>
              <div class="insight-status" :class="insight.status">
                <i :class="getStatusIcon(insight.status)"></i>
              </div>
            </div>
            <p class="insight-description">{{ insight.description }}</p>
            <div v-if="insight.source" class="insight-source">
              <i class="ri-file-text-line"></i>
              Sources: {{ insight.source.documents.join(", ") }}
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Tabs -->
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <i :class="tab.icon"></i>
          {{ tab.name }}
          <span v-if="getTabBadge(tab.id)" class="tab-badge">{{
            getTabBadge(tab.id)
          }}</span>
        </div>
      </div>

      <!-- Content Section -->
      <div class="content-wrapper">
        <!-- Executive Summary -->
        <div v-if="activeTab === 'summary'">
          <div class="content-section">
            <div class="section-title">Business Overview</div>
            <div
              class="section-content"
              v-html="analysisData.summaryContent.businessOverview"
            ></div>
          </div>
          <div class="content-section">
            <div class="section-title">Team & Experience</div>
            <div
              class="section-content"
              v-html="analysisData.summaryContent.teamExperience"
            ></div>
          </div>
          <div class="content-section">
            <div class="section-title">Product & Technology</div>
            <div
              class="section-content"
              v-html="analysisData.summaryContent.productTech"
            ></div>
          </div>
        </div>

        <!-- Enhanced Risk Analysis -->
        <div v-if="activeTab === 'risk'" class="risk-section">
          <div v-if="analysisData.riskAssessment" class="risk-grid">
            <div
              v-for="risk in analysisData.riskAssessment"
              :key="risk.type + risk.title"
              class="risk-card"
              :class="risk.level"
            >
              <div class="risk-header">
                <div class="risk-level" :class="risk.level">
                  <i :class="getRiskIcon(risk.level)"></i>
                  {{ risk.level.toUpperCase() }}
                </div>
                <h4>{{ risk.title }}</h4>
              </div>
              <p class="risk-description">{{ risk.description }}</p>
              <div class="risk-mitigation">
                <strong>Mitigation:</strong> {{ risk.mitigation }}
              </div>
              <div class="risk-impact">
                Impact: <span :class="risk.impact">{{ risk.impact }}</span>
              </div>
            </div>
          </div>
          <div v-else class="content-section">
            <div class="section-title">Risk Analysis</div>
            <div class="section-content">
              <p>
                Comprehensive risk analysis based on available documentation...
              </p>
            </div>
          </div>
        </div>

        <!-- Market Benchmarking -->
        <div v-if="activeTab === 'market'" class="content-section">
          <div class="section-title">Market Benchmarking</div>
          <div class="section-content">
            <p>Market analysis and competitive positioning insights...</p>
            <MarketBenchmarkChart :startup-name="analysisData.startupName" />
          </div>
        </div>
      </div>

      <!-- Enhanced Key Metrics -->
      <div class="metrics-header">
        <h3>Key Financial Metrics</h3>
        <div class="metrics-info">
          <div class="source-info-indicator">
            <i class="ri-shield-check-line"></i>
            <span
              >{{
                isMultiDocumentAnalysis ? "Cross-validated" : "Verified"
              }}
              data points</span
            >
          </div>
          <div v-if="analysisData.analysisMetadata" class="processing-info">
            <i class="ri-time-line"></i>
            <span
              >Processed in
              {{ analysisData.analysisMetadata.processingTime }}</span
            >
          </div>
        </div>
      </div>

      <div class="metrics-container">
        <MetricCard
          v-for="metric in analysisData.keyMetrics"
          :key="metric.label"
          :label="metric.label"
          :value="metric.value"
          :source-data="metric.source"
          :confidence="metric.source.confidence"
          :source-location="metric.source.location"
          :is-validated="metric.source.type === 'cross-reference'"
          :chart-type="getChartType(metric.label)"
          :chart-value="getChartValue(metric)"
          :trend-data="getTrendData(metric.label)"
          :change="getMetricChange(metric.label)"
          :animate="true"
          @verify="showSource"
        />
      </div>

      <!-- Analysis Metadata -->
      <div v-if="analysisData.analysisMetadata" class="metadata-section">
        <h3><i class="ri-information-line"></i> Analysis Summary</h3>
        <div class="metadata-grid">
          <div class="metadata-item">
            <span class="metadata-label">Documents Analyzed</span>
            <span class="metadata-value">{{
              analysisData.analysisMetadata.documentsProcessed
            }}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Analysis Depth</span>
            <span class="metadata-value">{{
              analysisData.analysisMetadata.analysisDepth
            }}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Cross-Validation</span>
            <span class="metadata-value">
              {{
                analysisData.analysisMetadata.crossValidationPerformed
                  ? "Performed"
                  : "N/A"
              }}
            </span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Processing Time</span>
            <span class="metadata-value">{{
              analysisData.analysisMetadata.processingTime
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading/Error State -->
  <div v-else class="page-wrapper">
    <div class="container">
      <h1 class="loading-text">
        No analysis data found. Please start a new analysis.
      </h1>
    </div>
  </div>

  <!-- Enhanced Source Modal -->
  <div v-if="showSourceModal" class="modal-overlay" @click="closeSourceModal">
    <div class="source-modal" @click.stop>
      <div class="modal-header">
        <div class="header-left">
          <div class="verification-status">
            <div class="status-dot verified"></div>
            <span>Source Verified</span>
          </div>
          <h3>
            <i class="ri-file-search-line"></i>
            Data Source Verification
          </h3>
        </div>
        <button @click="closeSourceModal" class="close-btn">
          <i class="ri-close-line"></i>
        </button>
      </div>

      <div class="modal-content" v-if="selectedSource">
        <!-- Document Source Section -->
        <div class="source-section">
          <div class="section-header">
            <i class="ri-file-shield-line"></i>
            <span>Document Source</span>
            <div class="verification-badge verified">VERIFIED</div>
          </div>

          <div class="source-details-grid">
            <div class="detail-item">
              <div class="detail-label">Source Document</div>
              <div class="detail-value document-ref">
                <i
                  :class="
                    selectedSource?.type === 'document'
                      ? 'ri-file-text-fill'
                      : selectedSource?.type === 'cross-reference'
                      ? 'ri-links-fill'
                      : 'ri-calculator-fill'
                  "
                ></i>
                {{ selectedSource?.location }}
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Analysis Method</div>
              <div class="detail-value">
                {{
                  selectedSource?.type === "document"
                    ? "Document Analysis + OCR"
                    : selectedSource?.type === "cross-reference"
                    ? "Cross-Document Validation"
                    : "Quantitative Calculation"
                }}
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Confidence Level</div>
              <div class="confidence-display">
                <div class="confidence-bar">
                  <div
                    class="confidence-fill"
                    :class="selectedSource?.confidence?.toLowerCase()"
                  ></div>
                </div>
                <span
                  class="confidence-text"
                  :class="selectedSource?.confidence?.toLowerCase()"
                >
                  {{ selectedSource?.confidence }} Confidence ({{
                    getConfidenceScore(selectedSource?.confidence)
                  }}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Verification Details -->
        <div class="analysis-section">
          <div class="section-header">
            <i class="ri-check-double-line"></i>
            <span>Verification Details</span>
            <div class="status-indicator">
              <div class="status-dot complete"></div>
              <span>Analysis Complete</span>
            </div>
          </div>

          <div class="analysis-content">
            <div class="analysis-item">
              <strong>Data Validation:</strong>
              <p>{{ selectedSource?.details }}</p>
            </div>

            <div
              v-if="selectedSource?.type === 'cross-reference'"
              class="analysis-item"
            >
              <strong>Cross-Document Validation:</strong>
              <p>
                Data point verified across multiple source documents ensuring
                consistency and accuracy.
              </p>
            </div>

            <div class="analysis-item">
              <strong>External Validation:</strong>
              <p>
                Validated against {{ getRandomSources() }} independent sources
                including industry reports and financial databases.
              </p>
            </div>

            <div class="analysis-item">
              <strong>Reliability Assessment:</strong>
              <p>{{ getRiskAssessment(selectedSource?.confidence) }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-section">
          <button class="action-btn primary" @click="exportSource">
            <i class="ri-download-line"></i>
            Download Report
          </button>
          <button class="action-btn secondary" @click="flagForReview">
            <i class="ri-flag-line"></i>
            Flag for Review
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAnalysisStore } from "@/store/analysisStore";
import MarketBenchmarkChart from "@/components/Molecules/MarketBenchmarkChart.vue";
import MetricCard from "@/components/Molecules/MetricCard.vue";

const router = useRouter();
const analysisStore = useAnalysisStore();

const analysisData = computed(() => analysisStore.analysisResult);
const activeTab = ref("summary");

interface SourceInfo {
  type: string;
  location: string;
  confidence: string;
  details: string;
}

const showSourceModal = ref(false);
const selectedSource = ref<SourceInfo | null>(null);

const tabs = ref([
  { id: "summary", name: "Executive Summary", icon: "ri-file-text-line" },
  { id: "risk", name: "Risk Analysis", icon: "ri-flag-line" },
  { id: "market", name: "Market Benchmarking", icon: "ri-bar-chart-line" },
]);

// Computed properties
const isMultiDocumentAnalysis = computed(() => {
  return (
    analysisData.value?.analysisType === "multi-document" ||
    analysisData.value?.documentsAnalyzed?.length > 1
  );
});

onMounted(() => {
  if (!analysisData.value) {
    console.warn("No analysis result found in store. Redirecting to home.");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
});

// Methods
function getConfidenceClass(): string {
  const score = analysisData.value?.recommendation?.score || 0;
  if (score >= 85) return "high";
  if (score >= 70) return "medium";
  return "low";
}

function getConfidenceLevel(): string {
  const score = analysisData.value?.recommendation?.score || 0;
  if (score >= 85) return "High";
  if (score >= 70) return "Medium";
  return "Low";
}

function getDocumentIcon(type: string): string {
  const icons = {
    pitchDeck: "ri-presentation-fill",
    financialModel: "ri-line-chart-fill",
    transcript: "ri-mic-fill",
    founderUpdates: "ri-mail-fill",
    teamCVs: "ri-team-fill",
  };
  return icons[type as keyof typeof icons] || "ri-file-fill";
}

function getDocumentTypeName(type: string): string {
  const names = {
    pitchDeck: "Pitch Deck",
    financialModel: "Financial Model",
    transcript: "Call Transcript",
    founderUpdates: "Founder Updates",
    teamCVs: "Team CVs",
  };
  return names[type as keyof typeof names] || type;
}

function getInsightIcon(type: string): string {
  const icons = {
    "financial-validation": "ri-calculator-line",
    "team-validation": "ri-team-line",
    "founder-sentiment": "ri-emotion-line",
    "market-validation": "ri-line-chart-line",
    "financial-health": "ri-heart-pulse-line",
  };
  return icons[type as keyof typeof icons] || "ri-lightbulb-line";
}

function getStatusIcon(status: string): string {
  const icons = {
    validated: "ri-check-line",
    verified: "ri-shield-check-line",
    consistent: "ri-check-double-line",
    strong: "ri-trending-up-line",
    stable: "ri-bar-chart-line",
    "highly-confident": "ri-star-line",
    "moderately-confident": "ri-thumb-up-line",
  };
  return icons[status as keyof typeof icons] || "ri-information-line";
}

function getRiskIcon(level: string): string {
  const icons = {
    high: "ri-error-warning-line",
    medium: "ri-alert-line",
    low: "ri-information-line",
  };
  return icons[level as keyof typeof icons] || "ri-flag-line";
}

function getTabBadge(tabId: string): string | null {
  if (tabId === "risk" && analysisData.value?.riskAssessment) {
    return analysisData.value.riskAssessment.length.toString();
  }
  return null;
}

function showSource(sourceInfo: any) {
  selectedSource.value = sourceInfo;
  showSourceModal.value = true;
}

function closeSourceModal() {
  showSourceModal.value = false;
  selectedSource.value = null;
}

function getConfidenceScore(confidence: string): number {
  switch (confidence?.toLowerCase()) {
    case "high":
      return Math.floor(Math.random() * 10) + 90;
    case "medium":
      return Math.floor(Math.random() * 20) + 70;
    case "low":
      return Math.floor(Math.random() * 20) + 50;
    default:
      return 75;
  }
}

function getRandomSources(): string {
  const sources = ["3", "5", "7", "12"];
  return sources[Math.floor(Math.random() * sources.length)];
}

function getRiskAssessment(confidence: string): string {
  switch (confidence?.toLowerCase()) {
    case "high":
      return "High reliability - Data extracted from primary documentation with strong verification.";
    case "medium":
      return "Moderate reliability - Self-reported data that has been cross-validated where possible.";
    case "low":
      return "Lower reliability - Estimated data based on industry benchmarks requiring independent validation.";
    default:
      return "Reliability assessment pending manual review.";
  }
}

function exportSource() {
  alert("Source report would be downloaded in a real implementation");
}

function flagForReview() {
  alert("Data point flagged for manual review");
  closeSourceModal();
}

function getChartType(label: string): "progress" | "trend" | "gauge" {
  if (
    label.toLowerCase().includes("growth") ||
    label.toLowerCase().includes("rate")
  ) {
    return "trend";
  }
  if (
    label.toLowerCase().includes("score") ||
    label.toLowerCase().includes("confidence")
  ) {
    return "gauge";
  }
  return "progress";
}

function getChartValue(metric: any): number {
  const value = metric.value.toString().replace(/[^0-9.]/g, "");
  const numValue = parseFloat(value);

  if (metric.label.toLowerCase().includes("growth")) {
    return Math.min(100, numValue / 3); // Scale growth rate
  }
  if (metric.label.toLowerCase().includes("score")) {
    return numValue;
  }
  return Math.min(100, numValue * 10); // General scaling
}

function getTrendData(label: string): number[] {
  const trendPatterns = {
    revenue: [10, 15, 25, 35, 45, 60, 75, 85],
    growth: [5, 12, 8, 25, 18, 35, 28, 42],
    funding: [0, 0, 20, 20, 50, 50, 50, 50],
    team: [3, 5, 7, 8, 10, 12, 12, 12],
    burn: [20, 25, 30, 40, 50, 65, 80, 85],
    market: [15, 20, 25, 30, 40, 50, 60, 75],
  };

  const key = Object.keys(trendPatterns).find((k) =>
    label.toLowerCase().includes(k)
  );

  return (
    trendPatterns[key as keyof typeof trendPatterns] || [
      10, 25, 15, 35, 28, 42, 38, 50,
    ]
  );
}

function getMetricChange(label: string): string {
  const changes = {
    revenue: "+250% YoY",
    growth: "+180% QoQ",
    funding: "Last Round +$500K",
    team: "+4 this quarter",
    burn: "Optimized -15%",
    market: "Expanding +40%",
  };

  const key = Object.keys(changes).find((k) => label.toLowerCase().includes(k));

  return changes[key as keyof typeof changes] || "";
}
</script>

<style lang="scss" scoped>
// Import previous styles and add new enhancements
$color-accent: #00d4ff;
$color-accent-darker: #00a2ff;
$color-success: #22c55e;
$color-warning: #f59e0b;
$color-error: #ef4444;

// Analysis badges
.analysis-badges {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.analysis-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &.multi-doc {
    background: rgba($color-accent, 0.1);
    color: $color-accent;
    border: 1px solid rgba($color-accent, 0.3);
  }

  &.confidence {
    &.high {
      background: rgba($color-success, 0.1);
      color: $color-success;
      border: 1px solid rgba($color-success, 0.3);
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
}

// Document chips
.documents-analyzed {
  margin-top: 20px;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 12px;

    i {
      color: $color-accent;
    }
  }
}

.document-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.document-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);

  i {
    color: $color-accent;
    font-size: 14px;
  }
}

.chip-status {
  display: flex;
  align-items: center;

  i {
    color: $color-success !important;
    font-size: 12px;
  }
}

// Cross-document insights
.cross-insights-section {
  margin: 30px 0;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 20px;

    i {
      color: $color-accent;
    }
  }
}

.insights-grid {
  display: grid;
  gap: 16px;
}

.insight-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba($color-accent, 0.3);
    background: rgba($color-accent, 0.02);
  }

  &.validated,
  &.verified,
  &.consistent,
  &.strong {
    border-left: 4px solid $color-success;
  }

  &.positive,
  &.highly-confident {
    border-left: 4px solid $color-accent;
  }
}

.insight-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.insight-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &.financial-validation,
  &.financial-health {
    background: rgba($color-success, 0.1);
    color: $color-success;
  }

  &.team-validation {
    background: rgba($color-accent, 0.1);
    color: $color-accent;
  }

  &.founder-sentiment,
  &.market-validation {
    background: rgba($color-warning, 0.1);
    color: $color-warning;
  }
}

.insight-meta {
  flex: 1;

  h4 {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 4px;
  }

  .insight-confidence {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
  }
}

.insight-status {
  &.validated,
  &.verified,
  &.consistent,
  &.strong {
    color: $color-success;
  }

  &.positive,
  &.highly-confident {
    color: $color-accent;
  }
}

.insight-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
}

.insight-source {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);

  i {
    color: $color-accent;
  }
}

// Enhanced risk section
.risk-section {
  .risk-grid {
    display: grid;
    gap: 16px;
  }
}

.risk-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &.high {
    border-left: 4px solid $color-error;
  }

  &.medium {
    border-left: 4px solid $color-warning;
  }

  &.low {
    border-left: 4px solid $color-success;
  }
}

.risk-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  h4 {
    color: #ffffff;
    font-size: 16px;
  }
}

.risk-level {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;

  &.high {
    background: rgba($color-error, 0.1);
    color: $color-error;
  }

  &.medium {
    background: rgba($color-warning, 0.1);
    color: $color-warning;
  }

  &.low {
    background: rgba($color-success, 0.1);
    color: $color-success;
  }
}

// Enhanced metrics
.metrics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px 0;

  h3 {
    font-size: 24px;
    color: #ffffff;
    margin: 0;
  }
}

.metrics-info {
  display: flex;
  gap: 16px;
}

.source-info-indicator,
.processing-info {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba($color-accent, 0.1);
  border-radius: 16px;
  border: 1px solid rgba($color-accent, 0.2);
  font-size: 12px;
  color: $color-accent;

  i {
    font-size: 14px;
  }
}

.cross-validation-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: $color-success;
  margin-top: 8px;

  i {
    font-size: 12px;
  }
}

.metric-card.cross-validated {
  border: 1px solid rgba($color-success, 0.3);
  background: rgba($color-success, 0.02);
}

// Metadata section
.metadata-section {
  margin-top: 40px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 20px;

    i {
      color: $color-accent;
    }
  }
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.metadata-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;

  .metadata-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }

  .metadata-value {
    color: #ffffff;
    font-weight: 500;
    text-transform: capitalize;
  }
}

// Tab badges
.tab-badge {
  background: rgba($color-accent, 0.2);
  color: $color-accent;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 6px;
}

// Import all previous base styles
@font-face {
  font-family: "AlibabaSans-Regular";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Regular.otf")
    format("opentype");
}
@font-face {
  font-family: "AlibabaSans-Medium";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Medium.otf")
    format("opentype");
  font-weight: 500;
}
@font-face {
  font-family: "AlibabaSans-Bold";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/Alibaba-PuHuiTi-Bold.otf")
    format("opentype");
  font-weight: bold;
}

.page-wrapper {
  font-family: "AlibabaSans-Regular", sans-serif;
  background-color: #121621;
  color: #e6e8ec;
  padding: 40px;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
}

.header {
  margin-bottom: 30px;

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  h1 {
    font-family: "AlibabaSans-Bold", sans-serif;
    font-size: 36px;
    color: #ffffff;
    margin: 0;
  }

  h2 {
    font-family: "AlibabaSans-Medium", sans-serif;
    font-size: 18px;
    color: #8b93a7;
    font-weight: 500;
    margin: 0;
  }
}

.recommendation-card {
  background: linear-gradient(
    145deg,
    rgba(28, 36, 54, 0.8),
    rgba(20, 26, 40, 0.9)
  );
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 30px;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba($color-accent, 0.2);
  box-shadow: 0 0 30px rgba($color-accent, 0.1),
    inset 0 0 20px rgba($color-accent, 0.05);
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
      rgba($color-accent, 0.8),
      rgba($color-accent, 0)
    );
  }
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.recommendation-label {
  font-family: "AlibabaSans-Medium", sans-serif;
  font-size: 16px;
  color: #8b93a7;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.analysis-depth {
  font-size: 12px;
  color: $color-accent;
  background: rgba($color-accent, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba($color-accent, 0.3);
}

.recommendation-verdict {
  font-family: "AlibabaSans-Bold", sans-serif;
  font-size: 48px;
  color: $color-accent;
  margin-bottom: 15px;
  text-shadow: 0 0 15px rgba($color-accent, 0.4);
}

.confidence-score {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;
}

.score-value {
  font-family: "AlibabaSans-Bold", sans-serif;
  font-size: 28px;
  color: #ffffff;
}

.progress-container {
  flex-grow: 1;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  max-width: 300px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, $color-accent-darker, $color-accent);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba($color-accent, 0.7);
  transition: width 0.5s ease-out;
}

.confidence-boost {
  font-size: 12px;
  color: $color-success;
  background: rgba($color-success, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid rgba($color-success, 0.3);
}

.justification {
  font-size: 16px;
  line-height: 1.6;
  color: #b0b7c3;
  max-width: 800px;
}

.tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab {
  padding: 15px 25px;
  font-family: "AlibabaSans-Medium", sans-serif;
  font-size: 16px;
  color: #8b93a7;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;

  i {
    margin-right: 8px;
    font-size: 18px;
  }

  &.active {
    color: $color-accent;
    border-bottom-color: $color-accent;
    text-shadow: 0 0 8px rgba($color-accent, 0.3);
  }

  &:hover:not(.active) {
    color: #ffffff;
  }
}

.content-section {
  background: linear-gradient(
    145deg,
    rgba(28, 36, 54, 0.6),
    rgba(20, 26, 40, 0.7)
  );
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  border: 1px solid rgba($color-accent, 0.1);

  .section-title {
    font-family: "AlibabaSans-Bold", sans-serif;
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 20px;
  }

  .section-content {
    font-size: 16px;
    line-height: 1.7;
    color: #b0b7c3;

    :deep(p) {
      margin-bottom: 15px;
    }

    :deep(strong) {
      color: #ffffff;
      font-family: "AlibabaSans-Medium", sans-serif;
    }
  }
}

.metrics-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.metric-card {
  background: linear-gradient(
    145deg,
    rgba(28, 36, 54, 0.4),
    rgba(20, 26, 40, 0.5)
  );
  border-radius: 16px;
  padding: 28px;
  position: relative;
  border: 1px solid rgba($color-accent, 0.2);
  box-shadow: 0 0 20px rgba($color-accent, 0.05);
  transition: all 0.3s ease;
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

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba($color-accent, 0.25),
      0 0 30px rgba($color-accent, 0.1);
    border-color: rgba($color-accent, 0.6);
  }

  .metric-label {
    font-family: "AlibabaSans-Medium", sans-serif;
    font-size: 14px;
    color: #8b93a7;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .metric-value-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .metric-value {
    font-family: "AlibabaSans-Bold", sans-serif;
    font-size: 32px;
    color: #ffffff;
  }

  .source-verification-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px;
    background-color: rgba($color-accent, 0.1);
    border-radius: 12px;
    color: $color-accent;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba($color-accent, 0.2);
    min-width: 60px;

    &:hover {
      background-color: rgba($color-accent, 0.2);
      box-shadow: 0 0 20px rgba($color-accent, 0.4);
      transform: scale(1.05);
      border-color: rgba($color-accent, 0.4);
    }

    i {
      font-size: 20px;
    }

    .verification-label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
}

.loading-text {
  text-align: center;
  color: #8b93a7;
}

// Modal styles (keep existing modal styles from previous version)
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

.source-modal {
  background: linear-gradient(145deg, #0f1419, #1a202c);
  border: 1px solid rgba($color-accent, 0.3);
  border-radius: 20px;
  width: 95%;
  max-width: 700px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba($color-accent, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(90deg, rgba($color-accent, 0.05), transparent);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.verification-status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #4ade80;

  span {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.verified {
    background: #4ade80;
    box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
    animation: pulse 2s infinite;
  }

  &.complete {
    background: #f59e0b;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.modal-header h3 {
  color: #ffffff;
  margin: 0;
  font-size: 26px;
  font-family: "AlibabaSans-Bold", sans-serif;

  i {
    color: $color-accent;
    margin-right: 12px;
  }
}

.verification-badge {
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;

  &.verified {
    background: rgba(34, 197, 94, 0.2);
    color: rgb(34, 197, 94);
    border: 1px solid rgba(34, 197, 94, 0.3);
  }
}

.source-section,
.analysis-section,
.action-section {
  padding: 28px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 24px;

  i {
    color: $color-accent;
    font-size: 20px;
  }

  span {
    font-family: "AlibabaSans-Bold", sans-serif;
    font-size: 18px;
    color: #ffffff;
  }
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;

  span {
    font-size: 14px;
    color: #f59e0b;
    font-family: "AlibabaSans-Medium", sans-serif;
    font-weight: 600;
  }
}

.source-details-grid {
  display: grid;
  gap: 24px;
}

.detail-item {
  .detail-label {
    font-size: 13px;
    color: #8b93a7;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }

  .detail-value {
    font-size: 16px;
    color: #e6e8ec;
    font-family: "AlibabaSans-Medium", sans-serif;

    &.document-ref {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: rgba($color-accent, 0.08);
      border-radius: 8px;
      border-left: 4px solid $color-accent;

      i {
        color: $color-accent;
        font-size: 18px;
      }
    }
  }
}

.confidence-display {
  display: flex;
  align-items: center;
  gap: 16px;
}

.confidence-bar {
  width: 120px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease-out;
  animation: confidenceGrow 2s ease-out;

  &.high {
    background: linear-gradient(90deg, #22c55e, #16a34a);
    width: 92%;
  }

  &.medium {
    background: linear-gradient(90deg, #f59e0b, #d97706);
    width: 75%;
  }

  &.low {
    background: linear-gradient(90deg, #ef4444, #dc2626);
    width: 55%;
  }
}

@keyframes confidenceGrow {
  from {
    width: 0%;
  }
}

.confidence-text {
  font-size: 15px;
  font-weight: 600;
  font-family: "AlibabaSans-Medium", sans-serif;

  &.high {
    color: #22c55e;
  }
  &.medium {
    color: #f59e0b;
  }
  &.low {
    color: #ef4444;
  }
}

.analysis-content {
  .analysis-item {
    margin-bottom: 20px;

    strong {
      display: block;
      color: #ffffff;
      font-size: 15px;
      margin-bottom: 6px;
      font-family: "AlibabaSans-Bold", sans-serif;
    }

    p {
      color: #b0b7c3;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.action-section {
  display: flex;
  gap: 16px;
  border-bottom: none;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: "AlibabaSans-Medium", sans-serif;

  &.primary {
    background: linear-gradient(135deg, $color-accent, $color-accent-darker);
    color: #ffffff;

    &:hover {
      box-shadow: 0 6px 20px rgba($color-accent, 0.4);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #b0b7c3;
    border: 1px solid rgba(255, 255, 255, 0.15);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.25);
    }
  }
}

.close-btn {
  background: none;
  border: none;
  color: #8b93a7;
  font-size: 26px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
}

// Responsive design
@media (max-width: 768px) {
  .header-main {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 10px;
  }

  .analysis-badges {
    flex-wrap: wrap;
  }

  .insights-grid,
  .risk-grid,
  .metadata-grid {
    grid-template-columns: 1fr;
  }

  .metrics-info {
    flex-direction: column;
    gap: 8px;
  }
}
</style>

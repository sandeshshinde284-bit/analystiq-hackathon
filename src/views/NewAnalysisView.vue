<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>AI Startup Investment Analysis</h1>
      <p class="subtitle">
        Upload startup documents for comprehensive investment analysis and due
        diligence
      </p>

      <form @submit.prevent="handleAnalysis">
        <!-- Enhanced Category Dropdown -->
        <div class="form-group">
          <label for="category">
            Startup Sector <span class="mandatory">*</span>
          </label>
          <div class="dropdown-wrapper glassmorphism glow-effect">
            <select
              id="category"
              v-model="selectedCategory"
              class="enhanced-select"
            >
              <option value="" selected disabled>
                🚀 Choose startup sector for evaluation
              </option>
              <option value="saas">💻 SaaS & Enterprise Software</option>
              <option value="fintech">💰 FinTech & Financial Services</option>
              <option value="healthtech">
                🏥 HealthTech & Medical Devices
              </option>
              <option value="edtech">📚 EdTech & Learning Platforms</option>
              <option value="ai">🤖 AI/ML & Deep Tech</option>
              <option value="ecommerce">🛒 E-Commerce & D2C Brands</option>
              <option value="mobility">🚗 Mobility & Transportation</option>
              <option value="climate">🌱 Climate Tech & Sustainability</option>
              <option value="consumer">🛍️ Consumer Apps & Services</option>
              <option value="other">🔧 Other Technology</option>
            </select>
            <i class="dropdown-icon ri-arrow-down-s-line"></i>
          </div>
        </div>

        <!-- Primary Upload: Pitch Deck -->
        <div class="form-group">
          <label class="upload-section-title">
            <i class="ri-presentation-line"></i>
            Startup Pitch Deck <span class="mandatory">*</span>
          </label>
          <div class="upload-wrapper">
            <FileUploadZone
              :file="uploadedFiles.pitchDeck"
              :is-uploading="uploadStates.pitchDeck"
              accept=".pdf,.ppt,.pptx"
              placeholder="Drag and drop startup pitch deck here"
              @file-selected="(file) => handleFileUpload('pitchDeck', file)"
              @change-file="() => changeFile('pitchDeck')"
              :max-size="15"
              file-type="Pitch Deck"
            />
            <!-- Inline validation error -->
            <div v-if="validationErrors.pitchDeck" class="field-error">
              <i class="ri-error-warning-line"></i>
              {{ validationErrors.pitchDeck }}
            </div>
          </div>
        </div>

        <!-- Due Diligence Documents Section -->
        <div class="additional-documents">
          <h3 class="section-title">
            <i class="ri-folder-add-line"></i>
            Due Diligence Documents
            <span class="optional"
              >(Optional - but recommended for comprehensive evaluation)</span
            >
          </h3>
          <p class="section-subtitle">
            Upload supporting documents for founder analysis, market validation,
            and traction assessment
          </p>

          <div class="upload-grid">
            <!-- Financial Projections & Business Model -->
            <div class="upload-item">
              <label class="upload-label">
                <i class="ri-line-chart-line"></i>
                Financial Projections
              </label>
              <FileUploadZone
                :file="uploadedFiles.financialModel"
                :is-uploading="uploadStates.financialModel"
                accept=".xlsx,.xls,.csv,.pdf"
                placeholder="Financial models & projections"
                @file-selected="
                  (file) => handleFileUpload('financialModel', file)
                "
                @change-file="() => changeFile('financialModel')"
                :max-size="10"
                file-type="Financial Projections"
                compact
              />
              <div
                v-if="validationErrors.financialModel"
                class="field-error compact"
              >
                <i class="ri-error-warning-line"></i>
                {{ validationErrors.financialModel }}
              </div>
            </div>

            <!-- Founder & Team Profiles -->
            <div class="upload-item">
              <label class="upload-label">
                <i class="ri-team-line"></i>
                Founder & Team Profiles
              </label>
              <FileUploadZone
                :file="uploadedFiles.founderProfiles"
                :is-uploading="uploadStates.founderProfiles"
                accept=".pdf,.doc,.docx"
                placeholder="Founder CVs & team backgrounds"
                @file-selected="
                  (file) => handleFileUpload('founderProfiles', file)
                "
                @change-file="() => changeFile('founderProfiles')"
                :max-size="8"
                file-type="Founder Profiles"
                compact
              />
              <div
                v-if="validationErrors.founderProfiles"
                class="field-error compact"
              >
                <i class="ri-error-warning-line"></i>
                {{ validationErrors.founderProfiles }}
              </div>
            </div>

            <!-- Market Research & Competitive Analysis -->
            <div class="upload-item">
              <label class="upload-label">
                <i class="ri-bar-chart-box-line"></i>
                Market Research & Competition
              </label>
              <FileUploadZone
                :file="uploadedFiles.marketResearch"
                :is-uploading="uploadStates.marketResearch"
                accept=".pdf,.doc,.docx,.xlsx"
                placeholder="Market analysis & competitive landscape"
                @file-selected="
                  (file) => handleFileUpload('marketResearch', file)
                "
                @change-file="() => changeFile('marketResearch')"
                :max-size="10"
                file-type="Market Research"
                compact
              />
              <div
                v-if="validationErrors.marketResearch"
                class="field-error compact"
              >
                <i class="ri-error-warning-line"></i>
                {{ validationErrors.marketResearch }}
              </div>
            </div>

            <!-- Traction & Metrics Data -->
            <div class="upload-item">
              <label class="upload-label">
                <i class="ri-trending-up-line"></i>
                Traction & Metrics Data
              </label>
              <FileUploadZone
                :file="uploadedFiles.tractionData"
                :is-uploading="uploadStates.tractionData"
                accept=".pdf,.xlsx,.csv,.png,.jpg"
                placeholder="Growth metrics, user data, revenue"
                @file-selected="
                  (file) => handleFileUpload('tractionData', file)
                "
                @change-file="() => changeFile('tractionData')"
                :max-size="5"
                file-type="Traction Data"
                compact
              />
              <div
                v-if="validationErrors.tractionData"
                class="field-error compact"
              >
                <i class="ri-error-warning-line"></i>
                {{ validationErrors.tractionData }}
              </div>
            </div>
          </div>
        </div>

        <!-- Manual Notes Input - Only show if no supporting docs uploaded -->
        <div v-if="!hasAnySupportingDocs" class="form-group transcript-input">
          <label for="transcript">
            <i class="ri-chat-3-line"></i>
            Additional Investment Notes
            <span class="optional">(Optional)</span>
          </label>
          <p class="input-description">
            Add any additional notes about the startup, founder conversations,
            or market insights
          </p>
          <div class="glassmorphism glow-effect">
            <textarea
              id="transcript"
              v-model="transcriptText"
              placeholder="Add notes about founder conversations, market insights, competitive advantages, or any other relevant investment considerations..."
              rows="5"
            ></textarea>
            <div class="char-counter">
              {{ transcriptText.length }}/5000 characters
            </div>
          </div>
        </div>

        <!-- Show message when supporting docs are uploaded -->
        <div v-if="hasAnySupportingDocs" class="transcript-file-notice">
          <div class="notice-content">
            <i class="ri-check-double-line"></i>
            <span
              >Excellent! We'll analyze your uploaded documents for
              comprehensive startup evaluation.</span
            >
          </div>
        </div>

        <!-- Document Summary -->
        <div v-if="hasAnyFiles" class="document-summary">
          <h4>
            <i class="ri-file-list-line"></i> Ready for Investment Analysis
          </h4>
          <div class="summary-grid">
            <template v-for="(file, key) in uploadedFiles" :key="key">
              <div v-if="file" class="summary-item">
                <i :class="getFileIcon(key)"></i>
                <div class="summary-info">
                  <span class="doc-type">{{ getDocumentType(key) }}</span>
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-size">{{ formatFileSize(file.size) }}</span>
                </div>
                <div class="doc-status verified">
                  <i class="ri-check-line"></i>
                  Ready
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Enhanced Analyze Button -->
        <button
          type="submit"
          class="analyze-btn glassmorphism"
          :class="{ active: isFormReady }"
          :disabled="!isFormReady"
        >
          <div class="btn-content">
            <i class="ri-brain-line"></i>
            <div class="btn-text">
              <span v-if="!isFormReady" class="main-text"
                >Upload Startup Documents to Begin</span
              >
              <span v-else class="main-text">Generate Investment Analysis</span>
              <span v-if="isFormReady" class="sub-text"
                >AI-powered startup evaluation & due diligence</span
              >
            </div>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAnalysisStore } from "@/store/analysisStore";
import FileUploadZone from "@/components/Molecules/FileUploadZone.vue";

const router = useRouter();
const analysisStore = useAnalysisStore();

// Form state
const selectedCategory = ref("");
const transcriptText = ref("");

// ✅ NEW PROFESSIONAL FILE STRUCTURE
const uploadedFiles = ref({
  pitchDeck: null as File | null,
  financialModel: null as File | null,
  founderProfiles: null as File | null,
  marketResearch: null as File | null,
  tractionData: null as File | null,
});

const uploadStates = ref({
  pitchDeck: false,
  financialModel: false,
  founderProfiles: false,
  marketResearch: false,
  tractionData: false,
});

// ✅ VALIDATION ERRORS FOR NEW STRUCTURE
const validationErrors = ref({
  pitchDeck: "",
  financialModel: "",
  founderProfiles: "",
  marketResearch: "",
  tractionData: "",
});

// ✅ VALIDATION RULES FOR INVESTMENT DOCUMENTS
const fileValidation = {
  pitchDeck: {
    types: [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    maxSize: 15 * 1024 * 1024,
    extensions: [".pdf", ".ppt", ".pptx"],
  },
  financialModel: {
    types: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/pdf",
    ],
    maxSize: 10 * 1024 * 1024,
    extensions: [".xlsx", ".xls", ".csv", ".pdf"],
  },
  founderProfiles: {
    types: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSize: 8 * 1024 * 1024,
    extensions: [".pdf", ".doc", ".docx"],
  },
  marketResearch: {
    types: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    maxSize: 10 * 1024 * 1024,
    extensions: [".pdf", ".doc", ".docx", ".xlsx", ".xls"],
  },
  tractionData: {
    types: [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "image/png",
      "image/jpeg",
    ],
    maxSize: 5 * 1024 * 1024,
    extensions: [".pdf", ".xlsx", ".csv", ".png", ".jpg", ".jpeg"],
  },
};

// Computed properties
const isFormReady = computed(() => {
  return (
    uploadedFiles.value.pitchDeck &&
    selectedCategory.value &&
    !Object.values(uploadStates.value).some((state) => state)
  );
});

const hasAnyFiles = computed(() => {
  return Object.values(uploadedFiles.value).some((file) => file !== null);
});

const hasAnySupportingDocs = computed(() => {
  const { pitchDeck, ...supportingDocs } = uploadedFiles.value;
  return Object.values(supportingDocs).some((file) => file !== null);
});

const uploadedFileCount = computed(() => {
  return Object.values(uploadedFiles.value).filter((file) => file !== null)
    .length;
});

// Enhanced file validation with individual error tracking
function validateFile(
  file: File,
  documentType: keyof typeof fileValidation
): boolean {
  const rules = fileValidation[documentType];

  // Clear previous error
  validationErrors.value[documentType] = "";

  // Check file size
  if (file.size > rules.maxSize) {
    const maxSizeMB = rules.maxSize / (1024 * 1024);
    validationErrors.value[
      documentType
    ] = `File too large. Maximum size is ${maxSizeMB}MB`;
    return false;
  }

  // Check file type
  const fileName = file.name.toLowerCase();
  const hasValidExtension = rules.extensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    validationErrors.value[
      documentType
    ] = `Invalid file type. Supported: ${rules.extensions.join(", ")}`;
    return false;
  }

  return true;
}

// File upload handler
function handleFileUpload(
  documentType: keyof typeof uploadedFiles.value,
  file: File
) {
  if (!validateFile(file, documentType)) {
    return;
  }

  uploadStates.value[documentType] = true;
  uploadedFiles.value[documentType] = null;

  // Simulate upload delay
  setTimeout(() => {
    uploadedFiles.value[documentType] = file;
    uploadStates.value[documentType] = false;
    validationErrors.value[documentType] = ""; // Clear any validation errors
  }, 1500);
}

// Change file handler
function changeFile(documentType: keyof typeof uploadedFiles.value) {
  uploadedFiles.value[documentType] = null;
  uploadStates.value[documentType] = false;
  validationErrors.value[documentType] = "";
}

// Analysis handler
async function handleAnalysis() {
  if (!isFormReady.value) return;

  const analysisData = {
    category: selectedCategory.value,
    files: uploadedFiles.value,
    transcriptText: transcriptText.value,
    uploadedFileCount: uploadedFileCount.value,
  };

  analysisStore.runEnhancedAnalysis(analysisData);
  router.push("/analysis-in-progress");
}

// ✅ HELPER FUNCTIONS - UPDATED FOR NEW STRUCTURE
function getDocumentType(key: string): string {
  const types = {
    pitchDeck: "Pitch Deck",
    financialModel: "Financial Projections",
    founderProfiles: "Founder & Team Profiles",
    marketResearch: "Market Research & Analysis",
    tractionData: "Traction & Growth Metrics",
  };
  return types[key as keyof typeof types] || key;
}

function getFileIcon(key: string): string {
  const icons = {
    pitchDeck: "ri-presentation-fill",
    financialModel: "ri-line-chart-fill",
    founderProfiles: "ri-team-fill",
    marketResearch: "ri-bar-chart-box-fill",
    tractionData: "ri-trending-up-fill",
  };
  return icons[key as keyof typeof icons] || "ri-file-fill";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
</script>

<style lang="scss" scoped>
$color-accent: #00d4ff;

// Enhanced typography with bigger fonts
.subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  margin-bottom: 50px;
  line-height: 1.4;
}

// Enhanced dropdown styling
.dropdown-wrapper {
  position: relative;

  .enhanced-select {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    padding: 20px 50px 20px 20px;

    option {
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 12px;
      font-size: 16px;

      &:hover {
        background-color: #2a2a2a;
      }
    }
  }

  .dropdown-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: $color-accent;
    font-size: 24px;
    pointer-events: none;
    transition: transform 0.3s ease;
  }

  &:hover .dropdown-icon {
    transform: translateY(-50%) rotate(180deg);
  }
}

// Field-specific error styling
.field-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;

  &.compact {
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 8px;
  }

  i {
    font-size: 16px;
    flex-shrink: 0;
  }
}

// Transcript input section
.transcript-input {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.input-description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
  margin-bottom: 16px;
  line-height: 1.4;
}

.char-counter {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 6px;
}

// Transcript file notice
.transcript-file-notice {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  padding: 16px 20px;
  margin: 20px 0;

  .notice-content {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #22c55e;
    font-size: 15px;
    font-weight: 500;

    i {
      font-size: 20px;
    }
  }
}

// Enhanced button styling
.analyze-btn {
  width: 100%;
  padding: 24px;
  border-radius: 16px;

  .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    i {
      font-size: 28px;
    }

    .btn-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .main-text {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .sub-text {
        font-size: 14px;
        opacity: 0.8;
        margin-top: 2px;
      }
    }
  }
}

// Enhanced section titles
.section-title {
  font-size: 24px;

  .optional {
    font-size: 16px;
  }
}

.section-subtitle {
  font-size: 17px;
}

.upload-section-title {
  font-size: 20px;
}

.upload-label {
  font-size: 16px;
}

label {
  font-size: 20px;
}

// Base styles
.mandatory {
  color: #ff4d4d;
  font-weight: bold;
  margin-left: 4px;
}

.optional {
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
}

.upload-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);

  i {
    color: $color-accent;
    font-size: 22px;
  }
}

.additional-documents {
  margin: 40px 0;
  padding: 30px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;

  i {
    color: $color-accent;
    font-size: 26px;
  }
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 25px;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.upload-item {
  .upload-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.8);

    i {
      color: $color-accent;
      font-size: 18px;
    }
  }
}

.document-summary {
  margin: 30px 0;
  padding: 25px;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.05) 0%,
    rgba(0, 212, 255, 0.01) 100%
  );
  border-radius: 12px;
  border: 1px solid rgba($color-accent, 0.2);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    margin-bottom: 15px;
    font-size: 18px;

    i {
      color: $color-accent;
    }
  }
}

.summary-grid {
  display: grid;
  gap: 12px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  > i {
    color: $color-accent;
    font-size: 20px;
    min-width: 20px;
  }
}

.summary-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .doc-type {
    color: #ffffff;
    font-weight: 500;
    font-size: 15px;
  }

  .file-name {
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    word-break: break-all;
  }

  .file-size {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}

.doc-status {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;

  &.verified {
    background: rgba(34, 197, 94, 0.2);
    color: rgb(34, 197, 94);
    border: 1px solid rgba(34, 197, 94, 0.3);
  }
}

// Keep all your existing base styles...
@font-face {
  font-family: "AlibabaSans";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Regular.otf")
    format("opentype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "AlibabaSans";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/AlibabaSans-Medium.otf")
    format("opentype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "AlibabaSans";
  src: url("https://assets-persist.lovart.ai/agent-static-assets/Alibaba-PuHuiTi-Bold.otf")
    format("opentype");
  font-weight: bold;
  font-style: normal;
}

.page-wrapper {
  font-family: "AlibabaSans", sans-serif;
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 90px);
  padding: 40px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 100%);
}

.container {
  width: 100%;
  max-width: 1100px;
  padding: 40px;
  position: relative;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.05) 0%,
    rgba(0, 212, 255, 0.01) 100%
  );
  border-radius: 24px;
  z-index: 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(90deg, #ffffff, $color-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 212, 255, 0.1),
    inset 0 0 8px rgba(0, 212, 255, 0.05);
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
}

.glassmorphism:hover,
.glassmorphism:focus-within {
  border-color: rgba(0, 212, 255, 0.6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 212, 255, 0.2),
    inset 0 0 12px rgba(0, 212, 255, 0.1), 0 0 15px rgba(0, 212, 255, 0.1);
}

select,
textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.9);
  font-family: "AlibabaSans", sans-serif;
  font-size: 16px;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

textarea {
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;
  position: relative;
}

.analyze-btn {
  width: 100%;
  font-weight: 600;
  background: rgba(0, 212, 255, 0.1);
  color: rgba(0, 212, 255, 0.5);
  border: 1px solid rgba(0, 212, 255, 0.3);
  cursor: not-allowed;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(90deg, $color-accent 0%, #00a2ff 100%);
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);

    &:hover {
      box-shadow: 0 6px 25px rgba(0, 212, 255, 0.4);
      transform: translateY(-2px);
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  h1 {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
  }

  .upload-grid {
    grid-template-columns: 1fr;
  }

  .analyze-btn .btn-content {
    flex-direction: column;
    gap: 12px;

    .btn-text {
      align-items: center;
    }
  }
}
</style>

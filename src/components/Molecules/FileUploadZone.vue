<template>
  <div class="file-upload-zone">
    <!-- File Successfully Uploaded State -->
    <div
      v-if="props.file && !props.isUploading"
      class="file-uploaded-view"
      :class="{ compact: props.compact }"
    >
      <i :class="getFileIcon()" class="upload-icon"></i>
      <div class="file-info">
        <p class="file-name">{{ props.file.name }}</p>
        <p v-if="!props.compact" class="file-size">
          {{ formatFileSize(props.file.size) }}
        </p>
      </div>
      <button type="button" @click="handleChangeFile" class="change-file-btn">
        <i class="ri-close-line"></i>
        <span v-if="!props.compact">Change</span>
      </button>
    </div>

    <!-- Uploading State -->
    <div
      v-else-if="props.isUploading"
      class="uploading-view"
      :class="{ compact: props.compact }"
    >
      <div class="spinner"></div>
      <p class="upload-text">Uploading {{ props.fileType }}...</p>
    </div>

    <!-- Default Upload State -->
    <div
      v-else
      class="upload-area"
      :class="{ compact: props.compact, 'drag-over': isDragOver }"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <i class="ri-upload-cloud-line upload-icon-default"></i>
      <p class="upload-text">{{ props.placeholder }}</p>
      <p v-if="!props.compact" class="upload-hint">
        {{ props.fileType }} • Max {{ props.maxSize }}MB
      </p>
      <button
        v-if="!props.compact"
        type="button"
        class="browse-btn"
        @click.stop="triggerFileInput"
      >
        Browse Files
      </button>
    </div>

    <!-- Hidden File Input -->
    <input
      type="file"
      ref="fileInput"
      class="hidden-input"
      :accept="props.accept"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from "vue";

// Props interface
interface Props {
  file?: File | null;
  isUploading?: boolean;
  accept?: string;
  placeholder?: string;
  maxSize?: number;
  fileType?: string;
  compact?: boolean;
}

// ✅ Method 1: Using withDefaults (Recommended)
const props = withDefaults(defineProps<Props>(), {
  file: null,
  isUploading: false,
  accept: "*/*",
  placeholder: "Drag and drop file here",
  maxSize: 10,
  fileType: "File",
  compact: false,
});

// ✅ Method 2: Alternative - No destructuring, use props directly
// const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  fileSelected: [file: File];
  changeFile: [];
}>();

// State
const fileInput = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);

// Methods
function triggerFileInput() {
  if (props.isUploading) return; // ✅ Use props.isUploading
  fileInput.value?.click();
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    processFile(target.files[0]);
  }
}

function handleDrop(event: DragEvent) {
  isDragOver.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0]);
  }
}

function handleDragOver() {
  isDragOver.value = true;
}

function handleDragLeave() {
  isDragOver.value = false;
}

function processFile(file: File) {
  if (!file || props.isUploading) return; // ✅ Use props.isUploading

  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = "";
  }

  // Emit file selected event
  emit("fileSelected", file);
}

function handleChangeFile() {
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  emit("changeFile");
}

function getFileIcon(): string {
  if (!props.file) return "ri-file-line"; // ✅ Use props.file

  const fileName = props.file.name.toLowerCase();

  if (
    fileName.includes("pitch") ||
    fileName.endsWith(".ppt") ||
    fileName.endsWith(".pptx")
  ) {
    return "ri-presentation-fill";
  }
  if (fileName.endsWith(".pdf")) {
    return "ri-file-pdf-fill";
  }
  if (
    fileName.endsWith(".xlsx") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".csv")
  ) {
    return "ri-file-excel-fill";
  }
  if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
    return "ri-file-word-fill";
  }
  if (fileName.endsWith(".txt")) {
    return "ri-file-text-fill";
  }

  return "ri-file-fill";
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
// ... (keep all your existing styles - no changes needed)
$color-accent: #00d4ff;

.file-upload-zone {
  width: 100%;
  position: relative;
}

// Default Upload Area
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.compact {
    min-height: 100px;
    padding: 15px;
  }

  &:hover,
  &.drag-over {
    border-color: rgba(0, 212, 255, 0.6);
    background: rgba(0, 212, 255, 0.05);

    .upload-icon-default {
      color: rgba(0, 212, 255, 0.9);
      transform: scale(1.1);
    }
  }

  &.drag-over::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 212, 255, 0.1);
    border-radius: 10px;
  }
}

.upload-icon-default {
  font-size: 32px;
  color: rgba(0, 212, 255, 0.7);
  margin-bottom: 12px;
  transition: all 0.3s ease;

  .compact & {
    font-size: 24px;
    margin-bottom: 8px;
  }
}

.upload-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
  pointer-events: none;

  .compact & {
    font-size: 12px;
    margin-bottom: 4px;
  }
}

.upload-hint {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-bottom: 15px;
  text-align: center;
}

.browse-btn {
  background: rgba(0, 212, 255, 0.1);
  color: $color-accent;
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: rgba(0, 212, 255, 0.6);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
    transform: translateY(-1px);
  }
}

// Uploading State
.uploading-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  padding: 20px;
  background: rgba(0, 212, 255, 0.05);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;

  &.compact {
    min-height: 100px;
    padding: 15px;
    flex-direction: row;
    gap: 12px;
  }

  .upload-text {
    margin-bottom: 0;
    color: rgba(0, 212, 255, 0.9);
    font-weight: 500;
  }
}

.spinner {
  border: 3px solid rgba(255, 255, 255, 0.1);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border-left-color: $color-accent;
  margin-bottom: 12px;
  animation: spin 1s ease infinite;

  .compact & {
    width: 20px;
    height: 20px;
    border-width: 2px;
    margin-bottom: 0;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// File Uploaded State
.file-uploaded-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 140px;
  padding: 20px;
  background: rgba(34, 197, 94, 0.05);
  border: 2px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  transition: all 0.3s ease;

  &.compact {
    min-height: 80px;
    padding: 12px 16px;
  }

  &:hover {
    border-color: rgba(34, 197, 94, 0.5);
    background: rgba(34, 197, 94, 0.08);
  }
}

.upload-icon {
  font-size: 32px;
  color: #22c55e;
  margin-right: 16px;
  flex-shrink: 0;

  .compact & {
    font-size: 24px;
    margin-right: 12px;
  }
}

.file-info {
  flex: 1;
  min-width: 0;

  .file-name {
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 4px;
    word-break: break-all;
    line-height: 1.3;

    .compact & {
      font-size: 13px;
      margin-bottom: 0;
    }
  }

  .file-size {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    margin: 0;
  }
}

.change-file-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  font-weight: 500;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.6);
    transform: translateY(-1px);
  }

  i {
    font-size: 14px;
  }

  .compact & {
    padding: 6px 8px;

    span {
      display: none;
    }
  }
}

.hidden-input {
  display: none;
}
</style>

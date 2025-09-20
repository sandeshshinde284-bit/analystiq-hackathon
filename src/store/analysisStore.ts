import { defineStore } from "pinia";
import { performEnhancedAiAnalysis } from "@/api/fake-ai";

interface AnalysisData {
  category: string;
  files: {
    pitchDeck: File | null;
    financialModel: File | null;
    founderProfiles: File | null;
    marketResearch: File | null;
    tractionData: File | null;
  };
  transcriptText: string;
  uploadedFileCount: number;
}
interface ProcessingStep {
  id: string;
  title: string;
  status: "pending" | "processing" | "completed" | "error";
  duration?: number;
}

export const useAnalysisStore = defineStore("analysis", {
  state: () => ({
    analysisResult: null as any | null,
    isLoading: false,
    error: null as string | null,
    processingSteps: [] as ProcessingStep[],
    currentStep: 0,
    analysisProgress: 0,
    documentsProcessed: [] as string[],
    crossDocumentInsights: [] as any[],
    evaluationVectors: {
      founderMarketFit: 25,
      marketOpportunity: 35,
      differentiation: 20,
      teamTraction: 25,
    } as any,
  }),

  getters: {
    getCurrentProcessingStep: (state) => {
      return state.processingSteps[state.currentStep] || null;
    },

    getCompletedSteps: (state) => {
      return state.processingSteps.filter((step) => step.status === "completed")
        .length;
    },

    getTotalSteps: (state) => {
      return state.processingSteps.length;
    },

    hasMultipleDocuments: (state) => {
      return state.documentsProcessed.length > 1;
    },

    getOverallInvestmentScore: (state) => {
      return state.analysisResult?.recommendation?.score || 25;
    },
  },

  actions: {
    // Legacy method for single file analysis
    async runAnalysis(file: File) {
      this.isLoading = true;
      this.error = null;
      this.analysisResult = null;

      try {
        const result = await performEnhancedAiAnalysis(file.name);
        this.analysisResult = result;
      } catch (e: any) {
        this.error = e.message || "An unknown error occurred.";
      } finally {
        this.isLoading = false;
      }
    },

    // Enhanced method for multiple documents
    async runEnhancedAnalysis(analysisData: AnalysisData) {
      this.isLoading = true;
      this.error = null;
      this.analysisResult = null;
      this.analysisProgress = 0;
      this.currentStep = 0;
      this.documentsProcessed = [];
      this.crossDocumentInsights = [];

      // Initialize processing steps based on uploaded files
      this.setupProcessingSteps(analysisData);

      try {
        // Start step-by-step processing
        await this.processDocuments(analysisData);

        // Perform cross-document analysis
        await this.performCrossDocumentAnalysis(analysisData);

        // Generate final analysis
        const result = await performEnhancedAiAnalysis(
          analysisData.files.pitchDeck?.name || "multiple_documents",
          analysisData
        );

        // Add cross-document insights to result
        result.crossDocumentInsights = this.crossDocumentInsights;
        result.documentsAnalyzed = this.documentsProcessed;
        result.analysisType = "multi-document";

        this.analysisResult = result;
        this.analysisProgress = 100;
      } catch (e: any) {
        this.error = e.message || "Analysis failed. Please try again.";
        this.markCurrentStepAsError();
      } finally {
        this.isLoading = false;
      }
    },

    setupProcessingSteps(analysisData: AnalysisData) {
      const steps: ProcessingStep[] = [
        {
          id: "document-extraction",
          title: "Extracting text from documents",
          status: "pending",
        },
      ];

      // Add steps based on uploaded files
      if (analysisData.files.pitchDeck) {
        steps.push({
          id: "pitch-analysis",
          title: "Analyzing pitch deck content",
          status: "pending",
        });
      }

      if (analysisData.files.financialModel) {
        steps.push({
          id: "financial-analysis",
          title: "Processing financial projections",
          status: "pending",
        });
      }

      if (analysisData.files.founderProfiles) {
        steps.push({
          id: "founder-analysis",
          title: "Analyzing founder & team profiles",
          status: "pending",
        });
      }

      if (analysisData.files.marketResearch) {
        steps.push({
          id: "market-analysis",
          title: "Processing market research data",
          status: "pending",
        });
      }

      if (analysisData.files.tractionData) {
        steps.push({
          id: "traction-analysis",
          title: "Analyzing traction & growth metrics",
          status: "pending",
        });
      }

      // Always add these final steps
      steps.push(
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
        {
          id: "report-generation",
          title: "Generating deal memo",
          status: "pending",
        }
      );

      this.processingSteps = steps;
    },

    async processDocuments(analysisData: AnalysisData) {
      // Process each document type
      for (const [fileType, file] of Object.entries(analysisData.files)) {
        if (file) {
          await this.processDocument(fileType, file);
          this.documentsProcessed.push(fileType);
        }
      }
    },

    async processDocument(fileType: string, file: File) {
      const stepId = `${fileType}-analysis`;
      await this.executeStep(stepId, async () => {
        // Simulate document processing
        await this.simulateProcessing(1000);
        return { fileType, fileName: file.name, size: file.size };
      });
    },

    async performCrossDocumentAnalysis(analysisData: AnalysisData) {
      await this.executeStep("cross-validation", async () => {
        // Simulate cross-document validation
        await this.simulateProcessing(1500);

        // Generate insights based on multiple documents
        if (analysisData.files.pitchDeck && analysisData.files.financialModel) {
          this.crossDocumentInsights.push({
            type: "financial-validation",
            title: "Revenue Consistency Verification",
            status: "validated",
            description:
              "Revenue projections in pitch deck align with detailed financial model",
            confidence: "high",
            source: {
              documents: ["Pitch Deck", "Financial Projections"],
            },
          });
        }
        if (
          analysisData.files.founderProfiles &&
          analysisData.files.pitchDeck
        ) {
          this.crossDocumentInsights.push({
            type: "team-validation",
            title: "Founder-Market Fit Assessment",
            status: "verified",
            description:
              "Founder background demonstrates relevant domain expertise and market understanding",
            confidence: "high",
            source: {
              documents: ["Pitch Deck", "Founder Profiles"],
            },
          });
        }

        // if (analysisData.files.teamCVs && analysisData.files.pitchDeck) {
        //   this.crossDocumentInsights.push({
        //     type: "team",
        //     title: "Team Credentials Verification",
        //     status: "verified",
        //     description:
        //       "All team members mentioned in pitch have verified credentials",
        //     confidence: "high",
        //   });
        // }

        return this.crossDocumentInsights;
      });
    },

    async executeStep(stepId: string, processFunction: () => Promise<any>) {
      const stepIndex = this.processingSteps.findIndex(
        (step) => step.id === stepId
      );
      if (stepIndex === -1) return;

      this.currentStep = stepIndex;
      this.processingSteps[stepIndex].status = "processing";

      try {
        const result = await processFunction();
        this.processingSteps[stepIndex].status = "completed";
        this.updateProgress();
        return result;
      } catch (error) {
        this.processingSteps[stepIndex].status = "error";
        throw error;
      }
    },

    async simulateProcessing(duration: number) {
      return new Promise((resolve) => setTimeout(resolve, duration));
    },

    updateProgress() {
      const completed = this.getCompletedSteps;
      const total = this.getTotalSteps;
      this.analysisProgress = Math.round((completed / total) * 90); // Keep 10% for final generation
    },

    markCurrentStepAsError() {
      if (this.currentStep < this.processingSteps.length) {
        this.processingSteps[this.currentStep].status = "error";
      }
    },

    // Reset store state
    resetAnalysis() {
      this.analysisResult = null;
      this.isLoading = false;
      this.error = null;
      this.processingSteps = [];
      this.currentStep = 0;
      this.analysisProgress = 0;
      this.documentsProcessed = [];
      this.crossDocumentInsights = [];
    },
  },
});

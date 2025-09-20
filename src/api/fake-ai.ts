// Enhanced multi-document analysis results with cross-document insights
const enhancedAnalysisResults = {
  "AirGen_Pitch_Deck.pdf": {
    startupName: "AirGen",
    analysisDate: "December 19, 2024",
    recommendation: {
      text: "STRONG BUY",
      score: 87,
      justification:
        "AirGen demonstrates exceptional market fit with its innovative AI-powered air purification technology. The team's strong technical background, combined with a clear go-to-market strategy and impressive early traction, positions this venture for significant growth. While some scaling challenges exist, the overall risk-to-reward profile is highly favorable.",
    },
    summaryContent: {
      businessOverview: `<p><strong>AirGen</strong> is revolutionizing indoor air quality through AI-powered filtration systems that adapt in real-time to environmental conditions.</p><p>The company has developed proprietary technology that combines <strong>multi-stage filtration</strong> with machine learning to optimize air purification efficiency while reducing energy consumption by up to 40%.</p>`,
      teamExperience: `<p>Led by <strong>Sarah Chen</strong> (Former Tesla Air Systems Lead) and <strong>David Park</strong> (Ex-Nest IoT Engineer), the team brings 25+ combined years of experience in cleantech and smart home systems.</p><p>The founding team previously scaled two IoT startups, with one successful exit to <strong>Honeywell</strong> in 2019.</p>`,
      productTech: `<p>AirGen's core technology platform consists of three integrated components:</p><p><strong>1. Advanced Hardware:</strong> Multi-stage filtration system...</p><p><strong>2. AI Engine:</strong> Proprietary algorithms that predict air quality changes...</p><p><strong>3. IoT Integration:</strong> Seamless connection with existing smart home ecosystems...</p>`,
    },
    keyMetrics: [
      {
        label: "Market Size",
        value: "$2.5B",
        source: {
          type: "document",
          location: "Slide 3: Market Analysis",
          confidence: "High",
          details:
            "Based on TAM calculation from pitch deck combining air filtration market ($1.2B) and smart home systems ($1.3B). Data sourced from IBISWorld and Statista reports cited in presentation.",
        },
      },
      {
        label: "Current Revenue",
        value: "$1.2M",
        source: {
          type: "document",
          location: "Slide 7: Financial Projections",
          confidence: "Medium",
          details:
            "Self-reported ARR as of Q3 2024. Figure includes both B2B enterprise contracts ($800K) and direct consumer sales ($400K). No third-party financial verification available.",
        },
      },
      {
        label: "Growth Rate",
        value: "250%",
        source: {
          type: "calculation",
          location: "Derived from Revenue Data",
          confidence: "Medium",
          details:
            "Year-over-year growth calculated from Q3 2023 ($400K) to Q3 2024 ($1.2M). Formula: ((1,200,000 - 400,000) / 400,000) × 100 = 200%. Rounded to 250% based on projected Q4 performance.",
        },
      },
      {
        label: "Team Size",
        value: "12",
        source: {
          type: "document",
          location: "Slide 12: Team Overview",
          confidence: "High",
          details:
            "Current team composition: 4 engineers, 2 data scientists, 3 sales/marketing, 2 operations, 1 CEO. All team members listed with photos, LinkedIn profiles, and previous experience.",
        },
      },
      {
        label: "Total Funding",
        value: "$500K",
        source: {
          type: "document",
          location: "Slide 9: Funding History",
          confidence: "High",
          details:
            "Pre-seed round of $500K led by TechStars with participation from two angel investors. Round closed March 2024. Documentation includes term sheet summary and investor deck.",
        },
      },
      {
        label: "Burn Rate",
        value: "$85K/month",
        source: {
          type: "calculation",
          location: "Derived from Financial Data",
          confidence: "Low",
          details:
            "Estimated based on team size (12 × $7K avg monthly cost) plus operational expenses. Not explicitly provided in pitch materials. Industry benchmark comparison used for validation.",
        },
      },
    ],
  },

  "ConnectSphere_Deck.pdf": {
    startupName: "ConnectSphere",
    analysisDate: "December 19, 2024",
    recommendation: {
      text: "MODERATE POTENTIAL",
      score: 68,
      justification:
        "ConnectSphere has a solid concept for decentralized social media, but faces intense competition and significant user adoption hurdles. The market is crowded, and their go-to-market strategy needs more refinement. Technical execution appears strong, but monetization strategy requires validation.",
    },
    summaryContent: {
      businessOverview: `<p><strong>ConnectSphere</strong> is building a decentralized social media platform that gives users complete control over their data and content monetization.</p><p>The platform leverages blockchain technology to eliminate central authorities while maintaining <strong>user-friendly interfaces</strong> comparable to traditional social networks.</p>`,
      teamExperience: `<p>Founded by <strong>Alex Rivera</strong> (Former Instagram Product Manager) and <strong>Kumar Patel</strong> (Ex-Coinbase Blockchain Engineer).</p><p>While the team is relatively young, they bring valuable experience from <strong>major tech companies</strong> and have demonstrated strong execution in their previous roles.</p>`,
      productTech: `<p>ConnectSphere's technical architecture includes:</p><p><strong>1. Custom Blockchain:</strong> Built on Ethereum with Layer 2 scaling solutions...</p><p><strong>2. IPFS Integration:</strong> Decentralized content storage and distribution...</p><p><strong>3. Smart Contracts:</strong> Automated creator monetization and content verification...</p>`,
    },
    keyMetrics: [
      {
        label: "Market Size",
        value: "$150B",
        source: {
          type: "document",
          location: "Slide 4: Market Opportunity",
          confidence: "Medium",
          details:
            "Global social media market size. However, unclear how much of this TAM is addressable by a decentralized platform. Market size appears optimistic without supporting segmentation analysis.",
        },
      },
      {
        label: "User Base",
        value: "50K",
        source: {
          type: "document",
          location: "Slide 8: Traction Metrics",
          confidence: "High",
          details:
            "Beta user signups as of November 2024. Includes both active and inactive users. 15% monthly active user rate reported separately.",
        },
      },
      {
        label: "Token Price",
        value: "$0.12",
        source: {
          type: "calculation",
          location: "Derived from Token Economics",
          confidence: "Low",
          details:
            "Projected token price based on platform utility model. Highly speculative as token has not launched. Price based on network effect assumptions that may not materialize.",
        },
      },
      {
        label: "Burn Rate",
        value: "$180K/month",
        source: {
          type: "document",
          location: "Slide 16: Financials",
          confidence: "High",
          details:
            "Current monthly operational expenses including team salaries ($120K), infrastructure costs ($35K), and marketing spend ($25K). Documented with detailed expense breakdown.",
        },
      },
      {
        label: "Funding Target",
        value: "$2.5M",
        source: {
          type: "document",
          location: "Slide 18: Investment Ask",
          confidence: "High",
          details:
            "Series A funding target to scale platform and team. Allocation: 60% team expansion, 25% marketing, 15% infrastructure. 18-month runway projected based on current burn rate.",
        },
      },
      {
        label: "Revenue Model",
        value: "Unproven",
        source: {
          type: "calculation",
          location: "Analysis of Business Model",
          confidence: "Low",
          details:
            "Revenue strategy relies on token appreciation and transaction fees. No demonstrated revenue to date. Creator monetization model exists in theory but lacks market validation.",
        },
      },
    ],
  },

  // Default multi-document analysis for demo purposes
  multiple_documents: {
    startupName: "TechFlow Innovations",
    analysisDate: "December 19, 2024",
    recommendation: {
      text: "STRONG POTENTIAL",
      score: 82,
      justification:
        "TechFlow demonstrates solid execution across multiple validation points. Cross-document analysis reveals consistent messaging, realistic financial projections, and strong team credentials. The comprehensive documentation package suggests mature startup practices and transparency.",
    },
    summaryContent: {
      businessOverview: `<p><strong>TechFlow Innovations</strong> is developing next-generation workflow automation tools for enterprise teams, combining AI-powered task optimization with intuitive user interfaces.</p><p>The comprehensive document analysis reveals a <strong>well-structured business model</strong> with clear value propositions and validated market demand across multiple customer segments.</p>`,
      teamExperience: `<p>Leadership team combines <strong>15+ years</strong> of enterprise software experience with strong technical backgrounds from Google, Microsoft, and Salesforce.</p><p>Cross-validation between pitch materials and team CVs confirms all stated credentials and experience claims.</p>`,
      productTech: `<p>Multi-document analysis reveals consistent technical architecture across all materials:</p><p><strong>1. AI Core:</strong> Machine learning models for workflow optimization</p><p><strong>2. Integration Layer:</strong> APIs for popular business tools</p><p><strong>3. Analytics Engine:</strong> Real-time performance monitoring and insights</p>`,
    },
    keyMetrics: [
      {
        label: "Market Size",
        value: "$12.5B",
        source: {
          type: "cross-reference",
          location: "Validated across multiple documents",
          confidence: "High",
          details:
            "Market size figure consistent across pitch deck, financial model, and founder updates. Supported by third-party research citations from Gartner and McKinsey.",
        },
      },
      {
        label: "Monthly Revenue",
        value: "$485K",
        source: {
          type: "financial-model",
          location: "P&L Statement - Current Month",
          confidence: "High",
          details:
            "Real-time revenue figure extracted from uploaded financial model. Matches revenue trajectory discussed in call transcript and founder updates.",
        },
      },
      {
        label: "Customer Growth",
        value: "340%",
        source: {
          type: "cross-reference",
          location: "Multiple document validation",
          confidence: "High",
          details:
            "Growth rate verified across pitch deck (Q3 metrics), financial model (detailed cohort analysis), and founder updates (recent customer wins).",
        },
      },
      {
        label: "Team Retention",
        value: "96%",
        source: {
          type: "team-analysis",
          location: "HR Data from Team CVs",
          confidence: "Medium",
          details:
            "Calculated from team CV analysis showing average tenure and role progression. High retention suggests strong company culture and growth opportunities.",
        },
      },
      {
        label: "Runway",
        value: "18 months",
        source: {
          type: "financial-model",
          location: "Cash Flow Projections",
          confidence: "High",
          details:
            "Calculated from current cash position ($2.1M) and projected burn rate ($115K/month) in financial model. Conservative estimates include 15% buffer for market volatility.",
        },
      },
      {
        label: "Product-Market Fit",
        value: "Strong",
        source: {
          type: "sentiment-analysis",
          location: "Call Transcript Analysis",
          confidence: "Medium",
          details:
            "NLP analysis of founder call transcript reveals high confidence when discussing customer feedback, pricing power, and expansion opportunities. 8/10 confidence score on PMF indicators.",
        },
      },
    ],
  },
};

// Cross-document insight generators
function generateCrossDocumentInsights(analysisData: any): any[] {
  const insights: any[] = [];
  const files = analysisData.files;

  // Financial consistency check
  if (files.pitchDeck && files.financialModel) {
    insights.push({
      type: "financial-validation",
      title: "Revenue Projections Alignment",
      status: Math.random() > 0.3 ? "validated" : "discrepancy-found",
      confidence: "high",
      description:
        Math.random() > 0.3
          ? "Revenue figures in pitch deck align with detailed financial model projections"
          : "Minor discrepancy found: Pitch deck shows $1.2M ARR, financial model shows $1.15M",
      impact: "medium",
      source: {
        documents: ["Pitch Deck Slide 7", "Financial Model P&L"],
        analysisMethod: "Cross-reference validation",
      },
    });
  }

  // Team credibility check
  if (files.pitchDeck && files.teamCVs) {
    insights.push({
      type: "team-validation",
      title: "Leadership Credentials Verification",
      status: "verified",
      confidence: "high",
      description:
        "All leadership team credentials mentioned in pitch deck verified against individual CVs",
      impact: "high",
      source: {
        documents: ["Pitch Deck Team Section", "Individual Team CVs"],
        analysisMethod: "Credential cross-verification",
      },
    });
  }

  // Founder sentiment analysis
  if (files.transcript && files.pitchDeck) {
    const sentimentScore = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
    insights.push({
      type: "founder-sentiment",
      title: "Founder Confidence Analysis",
      status:
        sentimentScore > 0.85 ? "highly-confident" : "moderately-confident",
      confidence: "medium",
      description: `Founder shows ${
        sentimentScore > 0.85 ? "exceptional" : "solid"
      } confidence levels across pitch materials and call discussion. Consistent messaging on market opportunity and execution capability.`,
      impact: "medium",
      sentimentScore: Math.round(sentimentScore * 100),
      source: {
        documents: ["Call Transcript", "Pitch Deck"],
        analysisMethod: "NLP sentiment analysis + message consistency check",
      },
    });
  }

  // Market opportunity validation
  if (files.pitchDeck && files.founderUpdates) {
    insights.push({
      type: "market-validation",
      title: "Market Opportunity Consistency",
      status: "consistent",
      confidence: "high",
      description:
        "Market size and opportunity assessments remain consistent across pitch materials and recent founder communications",
      impact: "medium",
      source: {
        documents: ["Pitch Deck Market Analysis", "Recent Founder Updates"],
        analysisMethod: "Timeline consistency analysis",
      },
    });
  }

  // Financial health indicators
  if (files.financialModel && files.founderUpdates) {
    const healthScore = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
    insights.push({
      type: "financial-health",
      title: "Financial Trajectory Assessment",
      status: healthScore > 0.8 ? "strong" : "stable",
      confidence: "high",
      description: `Financial model projections align with recent performance updates. ${
        healthScore > 0.8 ? "Exceeding" : "Meeting"
      } planned milestones with healthy burn rate management.`,
      impact: "high",
      healthScore: Math.round(healthScore * 100),
      source: {
        documents: ["Financial Model", "Founder Updates"],
        analysisMethod: "Performance vs projection analysis",
      },
    });
  }

  return insights;
}

// Risk assessment generator
function generateRiskAssessment(analysisData: any): any[] {
  const risks: any[] = [];
  const files = analysisData.files;
  const documentCount = Object.values(files).filter((f) => f !== null).length;

  // Documentation completeness risk
  if (documentCount < 3) {
    risks.push({
      type: "documentation",
      level: "medium",
      title: "Limited Documentation Provided",
      description:
        "Analysis based on limited document set. Additional financial models and team information would improve assessment accuracy.",
      mitigation:
        "Request comprehensive financial projections and detailed team backgrounds",
      impact: "medium",
    });
  }

  // Market validation risk
  if (!files.transcript && !files.founderUpdates) {
    risks.push({
      type: "market-validation",
      level: "medium",
      title: "Limited Customer Validation Evidence",
      description:
        "No call transcripts or recent updates provided to validate customer feedback and market reception.",
      mitigation:
        "Conduct customer reference calls and review recent customer feedback",
      impact: "high",
    });
  }

  // Financial transparency risk
  if (!files.financialModel) {
    risks.push({
      type: "financial",
      level: "high",
      title: "No Detailed Financial Model Provided",
      description:
        "Investment decision limited by lack of detailed financial projections and unit economics.",
      mitigation:
        "Request comprehensive 3-year financial model with assumptions",
      impact: "high",
    });
  }

  // Always add some baseline risks
  risks.push(
    {
      type: "market",
      level: "low",
      title: "Market Competition Intensity",
      description:
        "Competitive landscape analysis suggests moderate competition with potential for new entrants.",
      mitigation: "Monitor competitor moves and maintain differentiation focus",
      impact: "medium",
    },
    {
      type: "execution",
      level: "low",
      title: "Scaling Team Challenges",
      description:
        "Rapid growth may require significant team expansion and process optimization.",
      mitigation: "Develop structured hiring plan and operational frameworks",
      impact: "medium",
    }
  );

  return risks;
}

// Enhanced analysis function
export const performEnhancedAiAnalysis = (
  fileName: string,
  analysisData?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(
      `🤖 Enhanced AI: Analyzing "${fileName}" with ${
        analysisData?.uploadedFileCount || 1
      } documents...`
    );

    // Simulate realistic analysis time based on document count
    const baseTime = 2000;
    const additionalTime = (analysisData?.uploadedFileCount || 1) * 800;
    const totalTime = baseTime + additionalTime;

    setTimeout(() => {
      try {
        let result;

        // Get base analysis result
        if (fileName in enhancedAnalysisResults) {
          result = JSON.parse(
            JSON.stringify(
              enhancedAnalysisResults[
                fileName as keyof typeof enhancedAnalysisResults
              ]
            )
          );
        } else if (analysisData && analysisData.uploadedFileCount > 1) {
          result = JSON.parse(
            JSON.stringify(enhancedAnalysisResults.multiple_documents)
          );
        } else {
          // Default to AirGen for unknown files
          result = JSON.parse(
            JSON.stringify(enhancedAnalysisResults["AirGen_Pitch_Deck.pdf"])
          );
        }

        // Enhance result with multi-document analysis if applicable
        if (analysisData) {
          // Add document summary
          result.documentsAnalyzed = Object.entries(analysisData.files)
            .filter(([_, file]) => file !== null)
            .map(([type, file]: [string, any]) => ({
              type,
              name: file.name,
              size: file.size,
              processed: true,
            }));

          // Add cross-document insights
          if (analysisData.uploadedFileCount > 1) {
            result.crossDocumentInsights =
              generateCrossDocumentInsights(analysisData);
            result.analysisType = "multi-document";

            // Boost confidence score for multi-document analysis
            result.recommendation.score = Math.min(
              95,
              result.recommendation.score + 5
            );
            result.recommendation.justification +=
              " Multi-document analysis provides higher confidence in this assessment due to comprehensive data validation.";
          }

          // Add enhanced risk assessment
          result.riskAssessment = generateRiskAssessment(analysisData);

          // Add processing metadata
          result.analysisMetadata = {
            documentsProcessed: analysisData.uploadedFileCount,
            processingTime: `${(totalTime / 1000).toFixed(1)} seconds`,
            analysisDepth:
              analysisData.uploadedFileCount > 2 ? "comprehensive" : "standard",
            crossValidationPerformed: analysisData.uploadedFileCount > 1,
            confidenceBoost: analysisData.uploadedFileCount > 1 ? 5 : 0,
          };

          // Enhance existing metrics with cross-document sources
          if (analysisData.uploadedFileCount > 1 && result.keyMetrics) {
            result.keyMetrics = result.keyMetrics.map((metric: any) => {
              // Randomly enhance some metrics with cross-document validation
              if (Math.random() > 0.4) {
                metric.source.confidence = "High";
                metric.source.details =
                  `Cross-validated across ${analysisData.uploadedFileCount} documents. ` +
                  metric.source.details;
                metric.source.type = "cross-reference";
              }
              return metric;
            });
          }
        }

        console.log("✅ Enhanced AI: Multi-document analysis complete.");
        resolve(result);
      } catch (error) {
        console.error("❌ Enhanced AI: Analysis failed:", error);
        reject(new Error("Analysis processing failed. Please try again."));
      }
    }, totalTime);
  });
};

// Legacy function for backward compatibility
export const performAiAnalysis = (fileName: string): Promise<any> => {
  return performEnhancedAiAnalysis(fileName);
};

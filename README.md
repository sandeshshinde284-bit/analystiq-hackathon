# Project AnalystIQ: Foundational Document

---

## 1. Problem Statement

*Early-stage investors often drown in unstructured startup data — pitch decks, founder calls, emails, and scattered news reports. Traditional analysis is time-consuming, inconsistent, and prone to missing red flags. What’s needed is an AI analyst that can cut through the noise, evaluate startups like a trained associate, and generate investor-ready insights at scale.*

## 2. Objective

*Build an AI-powered analyst that reviews founder material and public data to create concise, actionable deal notes with clear benchmarks and risk assessments across sectors and geographies.*

## 3. Target User

*   Venture Capital (VC) Associates
*   Angel Investors
*   Investment Analysts

## 4. Core Functionalities (For MVP)

1.  **Data Ingestion Hub:** Allow users to upload pitch decks (PDF) and paste call transcripts (text).
2.  **AI-Powered Memo Generation:** Automatically generate a structured deal memo dashboard that includes:
    *   Concise Deal Notes (Summary).
    *   Risk Assessment (Red flags).
    *   Sector Benchmarking (Comparison charts).
    *   A final Investment Recommendation.
3.  **Customizable Analysis Weights:** Allow users to adjust the importance of factors like 'Team', 'Market', and 'Traction' to tailor the recommendation.

## 4.1. Detailed Functionality Breakdown

### Functionality 1: Data Ingestion Hub

*   **Goal:** To provide a simple, centralized interface for the user (investor) to input all relevant startup data.
*   **UI Components (What the user will see):**
    *   A large, clearly marked **drag-and-drop area** or a button labeled **"Upload Pitch Deck (.pdf)"**.
    *   A multi-line **text box** with a label **"Paste Call Transcript or Founder Updates"**.
    *   A primary call-to-action button, **"Analyze Startup"**. This button should be disabled by default and only become active after at least one piece of data (either a file or text) has been provided.
*   **User Experience (UX) Flow:**
    1.  User lands on the page.
    2.  User either drags a PDF file into the upload area or clicks to open a file browser.
    3.  Upon successful upload, a success message appears (e.g., "PitchDeck_v3.pdf uploaded").
    4.  User can optionally paste text into the text area.
    5.  The "Analyze Startup" button becomes clickable.
    6.  User clicks "Analyze Startup" and is taken to the "Analyzing..." screen.

### Functionality 2: AI-Powered Deal Memo Dashboard

*   **Goal:** To present the AI's findings in a professional, easy-to-digest dashboard that looks like a high-quality analyst report.
*   **UI Components (The different "widgets" on the dashboard):**
    *   **Header:** Shows the Startup's Name (extracted from the data) and the date of analysis.
    *   **Executive Summary Card:** A concise, paragraph-form summary of the business, its mission, and its core product.
    *   **Risk Assessment Card:** A list of potential red flags, each with an icon (e.g., a red flag 🚩 or a warning sign ⚠️) and a brief explanation (e.g., "Inconsistent user metrics found between pitch deck and transcript.").
    *   **Sector Benchmarking Card:** A section with 2-3 simple charts (e.g., bar charts) comparing the startup to its industry peers on key metrics like "Team Experience" or "Market Size". (For the prototype, this will be static image charts).
    *   **Overall Recommendation Card:** A highly visible card that gives a final verdict (e.g., "Strong Potential", "Needs Further Review") and a "Confidence Score" (e.g., 85%).
*   **User Experience (UX) Flow:**
    1.  After the "Analyzing..." screen, the user lands on this dashboard.
    2.  All information is presented at once for a comprehensive overview.
    3.  The user can hover over chart elements or risk flags to see a tooltip with more details.

### Functionality 3: Customizable Analysis Weights

*   **Goal:** To give the user a feeling of control and allow them to tailor the AI's analysis to their specific investment thesis.
*   **UI Components:**
    *   A "Settings" or "Customize" icon (e.g., a gear ⚙️) on the Deal Memo Dashboard.
    *   Clicking this icon opens a **modal (pop-up window)**.
    *   Inside the modal, there will be several **sliders**, each labeled with a key investment factor:
        *   Team
        *   Product / Technology
        *   Market Size
        *   Traction / Financials
*   **User Experience (UX) Flow:**
    1.  On the dashboard, the user clicks the "Settings" icon.
    2.  The modal opens.
    3.  The user adjusts the sliders. For example, they might move "Team" to 80% and "Market Size" to 20%.
    4.  As the user adjusts the sliders, the "Overall Recommendation" and "Confidence Score" on the main dashboard (visible behind the modal) **update in real-time**. This provides immediate feedback and is a powerful "wow" factor for a prototype.
    5.  User closes the modal.
## 5. Proposed Tech Stack (For Final Submission)

*   **Google Gemini / Vertex AI:** For core analysis, summarization, and risk flagging.
*   **Google Cloud Vision API:** To extract text and data from uploaded pitch decks (PDFs).
*   **Google BigQuery:** To store and query benchmark data for peer comparison.
*   **Google Firebase (Firestore & Cloud Storage):** To store user data, uploaded files, and generated reports.
*   **Google Agent Builder / Cloud Functions:** To orchestrate the entire workflow.
## 6. Assumptions & Out of Scope (for Prototype)

### Assumptions
*   All uploaded documents and text will be in English.
*   Pitch decks will be in a standard, text-readable PDF format (not scanned images).
*   The user has a basic understanding of investment terms.

### Out of Scope for MVP Prototype
*   User accounts, login, or saving multiple analyses.
*   Real-time data integration from news sources or APIs.
*   Processing video or audio files directly.
*   Collaboration features for multiple team members.

## 7. Prototype Development Plan (12-Day Schedule)

---

### **Phase 1: Foundation & Blueprint (Day 1 - 2)**

*   **Day 1:** Create the Foundational Document.
    *   **Goal:** Define the project problem statement, objectives, functionalities, deliverables, and the full 12-day plan.
    *   **Status:** [x] DONE

*   **Day 2:** User Flow & Wireframing.
    *   **Goal:** Create a visual, step-by-step map of the user’s journey. Draw very basic, low-fidelity layouts (wireframes) for each screen on paper or a simple digital tool.
    *   **Status:** [ ] To-Do

### **Phase 2: High-Fidelity Design in Figma (Day 3 - 9)**

*   **Day 3:** Setup Figma project & Design Screen 1.
    *   **Goal:** Set up the shared Figma file and complete the high-fidelity design for the "New Analysis" Hub.
    *   **Status:** [ ] To-Do

*   **Day 4:** Design Screens 2 & 4.
    *   **Goal:** Design the "Analyzing..." animation screen and the "Customization Modal".
    *   **Status:** [ ] To-Do

*   **Day 5 - 6:** Design Screen 3: The "Deal Memo" Dashboard.
    *   **Goal:** Design the most complex screen, including the layout, summary cards, risk flags, and benchmarking charts. (This gets two full days).
    *   **Status:** [ ] To-Do

*   **Day 7:** Diagrams, UI Kit & Polish.
    *   **Goal:** Create the required Architecture and Process Flow diagrams for the presentation deck. Finalize the project's color palette, fonts, and icons.
    *   **Status:** [ ] To-Do

*   **Day 8:** Design a simple Landing Page.
    *   **Goal:** Create an attractive landing page that explains what AnalystIQ does for potential users.
    *   **Status:** [ ] To-Do

*   **Day 9:** Full Design Review.
    *   **Goal:** Review all screens together to ensure consistency. Prepare all design assets needed for the presentation deck.
    *   **Status:** [ ] To-Do

### **Phase 3: Prototyping & Submission (Day 10 - 12)**

*   **Day 10:** Create the Clickable Prototype.
    *   **Goal:** Link all screens together in Figma’s prototype mode to create a realistic, clickable simulation of the app.
    *   **Status:** [ ] To-Do

*   **Day 11:** Assemble Presentation & Record Video.
    *   **Goal:** Fill out the official PPTX template with all our content. Record a 3-minute video walkthrough of the clickable prototype.
    *   **Status:** [ ] To-Do

*   **Day 12:** Buffer & Submission Day.
    *   **Goal:** Perform final checks on all deliverables, make any last-minute fixes, and officially submit the project.
    *   **Status:** [ ] To-Do



## 8. Project Assets & Links

*   **GitHub Repository:** https://github.com/sandeshshinde284-bit/analystiq-hackathon
*   **Google Cloud Project Name:** AnalystIQ Hackathon
*   **Google Cloud Project ID:** analystiq-hackathon
*   **Figma Prototype Link:** [To be added once created]

## 9. Submission Deliverables Checklist & Content

### Form Fields Content:
*   **Brief about your solution:** [Copy the "Brief" text from above here]
*   **USP of the solution:** [Copy the "USP" text from above here]

### Deliverables Checklist:
1.  **Project Deck (PDF):** A presentation created from the official PPTX template.
2.  **Prototype Link:** The public link to our clickable Figma prototype.
3.  **3-Minute Explainer Video:** A screen recording of us walking through the Figma prototype.
4.  **GitHub Repository Link:** The link listed in Project Assets.


---
## 10. User Flow

This document outlines the primary user journey for the AnalystIQ prototype, from initial interaction to the final analysis report.

*   **Step 1: Landing & Input**
    *   The user lands on the "New Analysis" Hub page. They are presented with a clear interface to upload a pitch deck and an optional text area for call transcripts. The "Analyze Startup" button is initially disabled.

*   **Step 2: Data Upload**
    *   The user clicks to upload their pitch deck (PDF). Upon successful selection, the UI updates to confirm the upload by showing the file name and providing an 'x' icon to remove it.

*   **Step 3: Activating Analysis**
    *   Once a file is successfully uploaded, the "Analyze Startup" button becomes active and clickable, indicating the user can proceed. The user may optionally paste text into the transcript field at this stage.

*   **Step 4: Initiating Analysis**
    *   The user clicks the "Analyze Startup" button.

*   **Step 5: The "Thinking" Phase**
    *   The user is navigated to an "Analysis in Progress" screen. This screen provides feedback that a complex process is underway, displaying dynamic text messages like "Extracting key metrics...", "Benchmarking against peers...", etc.

*   **Step 6: The Deal Memo**
    *   After the analysis simulation is complete, the user automatically lands on the "Deal Memo Dashboard." This screen presents the full, structured report, including the Executive Summary, Risk Assessment, Benchmarking Charts, and the Overall Recommendation.

*   **Step 7 (Interaction): Customizing the Analysis**
    *   The user can click a "Settings" icon on the dashboard to open a modal with sliders. By adjusting the weights for factors like "Team" or "Market," the user can see the "Overall Recommendation" on the main dashboard update in real-time, simulating a tailored analysis.
    
---
## 11. Future Features (Post-Prototype Vision)

While the initial prototype focuses on the core MVP, the long-term vision for AnalystIQ includes a suite of powerful features to create a comprehensive investment analysis platform.

1.  **Multi-File Ingestion:**
    *   The ability for users to upload multiple documents for a single startup analysis, including pitch decks (PDF), financial models (Excel), team biographies (Word), and legal documents. The AI will synthesize information from *all* these sources simultaneously.

2.  **Public Data Integration:**
    *   Automatically connect to public data sources and news APIs (like Crunchbase, TechCrunch) to pull in real-time information about the startup, its founders, and market trends, enriching the analysis with external context.

3.  **Direct Email Integration:**
    *   Allow users to connect their email accounts (e.g., Gmail, Outlook). The platform will automatically identify and ingest "founder update" emails, ensuring the analysis is always based on the latest information.

4.  **Team Collaboration:**
    *   Features for investment teams to share, comment on, and collaboratively edit deal memos within the platform, creating a single source of truth for the entire firm.

5.  **Historical Analysis & Trend Tracking:**
    *   Save all analyses for a particular startup over time, allowing investors to track its progress, metric improvements, and how its story has evolved from one funding round to the next.

---

## 12. Screen Designs & Wireframes

### Screen 1: Landing-Page

![Landing Page Hero Section](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/Landing-Page-1.png)

---

### Screen 2: Landing-Page-Features
![Landing Page Features Section](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/Landing-Page-2.png)

---

### Screen 2: New Analysis Hub
![New Analysis Hub Mockup](https://github.com/sandeshshinde284-bit/analystiq-hackathon/blob/main/images/New%20Analysis%20Hub.png?raw=true)

---

### Screen 3: Uploaded Pitch

![Uploaded Pitch Mockup](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/File-Uploaded.jpeg)

---

### Screen 4: AI Thinking

![AI Thinking Mockup](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/Thinking_Generating_AI.png)

---
### Screen 5: Deal Memo Dashboard
![Deal Memo Dashboard Mockup](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/The%20Deal%20Memo%20Dashboard.png)

---
## 12. Process Flow Diagram and Architectural Diagram

#### Diagram Description: Process Flow

![Process Flow Diagram](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/FlowChart-AnalystIQ.gif)

This diagram illustrates the end-to-end user journey within the AnalystIQ platform. It outlines the step-by-step process a user follows, from initial data input to interacting with the final analysis. The flow is broken down into three logical phases:

*   **Phase 1: Data Input:** This phase covers the initial actions of the user, including selecting a startup category, uploading the primary document (pitch deck), and providing optional context (transcript). It concludes when the user initiates the analysis.

*   **Phase 2: AI Analysis:** This is an intermediate step that communicates to the user that the system's AI is actively processing their data. It simulates complex backend operations to build user trust and manage expectations.

*   **Phase 3: Insights & Interaction:** This is the core value phase where the final "Deal Memo" dashboard is presented to the user. It also includes an interactive loop, showing how a user can customize the analysis weights to receive a tailored recommendation in real-time, demonstrating the platform's dynamic capabilities.

#### Diagram Description: System Architecture

![Architecture Diagram](https://raw.githubusercontent.com/sandeshshinde284-bit/analystiq-hackathon/main/images/Architecture-diagram.gif)

This diagram details the technical architecture of the AnalystIQ platform, built entirely on Google Cloud Platform to ensure scalability, security, and intelligence. It shows the flow of data through our serverless, event-driven system.

*   **The Journey Begins:** The process starts when the user uploads a pitch deck from their **Browser** directly to **Cloud Storage**. This is a secure and robust method for handling file uploads.

*   **The Orchestrator:** The file upload triggers our central controller, a **Cloud Function**. This function orchestrates the entire analysis workflow by calling other services.

*   **Data Extraction & Analysis:**
    1.  The Cloud Function first sends the file to the **Cloud Vision API** to extract text from the PDF.
    2.  The extracted text is then sent to the **Vertex AI (Gemini)** model.
    3.  As part of its analysis, Gemini is prompted to query our **BigQuery** database to fetch benchmarking data on peer startups.

*   **Storing & Displaying Results:**
    1.  Once Gemini completes its analysis, it returns a structured JSON report to the Cloud Function.
    2.  The Function saves this final report into our **Firestore** database.
    3.  Finally, the User's **Browser** reads the report directly from Firestore in real-time to display the interactive dashboard.

This serverless architecture ensures that our platform is cost-effective, highly scalable, and can handle complex AI workloads efficiently.

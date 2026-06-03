import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    id: 'airline-revenue',
    title: 'Airline Revenue Analysis',
    tagline: 'Transforming synthetic airline data into actionable revenue intelligence',
    problem:
      'Airlines face high variability in operational costs with limited tools for real-time revenue pattern exploration across routes, seat classes, and time periods.',
    solution:
      'Built an end-to-end analytics pipeline: synthetic data generation via Mockaroo → structured schema in MS Access → Power BI dashboards with 15+ DAX measures covering route profitability, seat-class revenue, tax analysis, and seasonal performance trends.',
    impact:
      'Delivered interactive dashboards enabling instant drill-down into flight performance. Visualized revenue, operational costs, and profit before/after tax — replacing hours of manual Excel analysis.',
    stack: ['Power BI', 'DAX', 'MS Access', 'Mockaroo', 'Python'],
    category: 'Data Analytics',
    color: 'blue',
    demoUrl: 'https://drive.google.com/file/d/1_bz2fplXZv5co1C-fCiwCXv-hA6akwn3/view?usp=sharing',
    featured: false,
  },
  {
    id: 'invoice-extraction',
    title: 'Handwritten Invoice Extraction',
    tagline: 'Multi-modal RAG pipeline for intelligent document processing',
    problem:
      'Manual extraction of data from scanned, partially handwritten invoices is error-prone and inconsistent — especially when document layouts vary between suppliers.',
    solution:
      'Built a multi-modal RAG pipeline using Ollama-hosted Vision Language Models (Qwen VLM) for OCR, LangChain for orchestration and prompt template matching, and Llama for structured key-value extraction and document QA.',
    impact:
      'Achieved 80%+ key-value pair extraction accuracy on mixed handwritten/printed invoices. Eliminated manual re-keying and reduced extraction time significantly with reliable information retrieval.',
    stack: ['Python', 'LangChain', 'RAG', 'Ollama', 'Qwen VLM', 'Llama', 'Prompt Templates'],
    category: 'AI / LLM',
    color: 'purple',
    demoUrl: 'https://drive.google.com/file/d/17z43vwsMC-vfE2_TFHZ-iH6Z8j_2wnop/view?usp=sharing',
    featured: true,
  },
  {
    id: 'excel-automation',
    title: 'Excel Entry Automation',
    tagline: 'n8n workflow automating PO data entry via Microsoft Graph API',
    problem:
      'TechSlice Solutions manually entered purchase order data from emails into Excel — a 3+ hour weekly process prone to typos and inconsistencies.',
    solution:
      'Designed an n8n automation workflow triggered by incoming POs. Azure Entra ID OAuth2 authentication calls the Microsoft Graph API to programmatically write structured data into SharePoint-hosted Excel files — zero human intervention.',
    impact:
      'Reduced data entry time by 70%, eliminated typo errors entirely, and delivered consistent formatting across all PO records. Workflow completes in under 30 seconds per order.',
    stack: ['n8n', 'Azure Entra ID', 'OAuth2', 'Microsoft Graph API', 'SharePoint', 'Excel'],
    category: 'Automation',
    color: 'cyan',
    demoUrl: 'https://docs.google.com/presentation/d/1bd9PDBveMiXOqp0BNOQiwbEimkrDylf9/edit?usp=sharing&ouid=116519409516266634130&rtpof=true&sd=true',
    featured: true,
    freelance: true,
  },
  {
    id: 'cutting-tools-lead-gen',
    title: 'Cutting Tools Lead Generator & Email Promoter',
    tagline: 'AI-powered B2B outreach automation for Tamil Nadu manufacturing clusters',
    problem:
      'TechSlice Solutions had no structured way to identify the right buyer contacts within manufacturing companies. Manually scouting cutting tool customers across Tamil Nadu districts, verifying procurement contacts, and drafting personalised outreach emails was consuming several hours per campaign with no tooling support.',
    solution:
      'Built a 5-step intelligent AI workflow using Claude Sonnet 4 + live web search: (1) Smart lead discovery across all 35 Tamil Nadu districts with multi-select tool type filters; (2) LinkedIn contact finder targeting purchase and procurement decision-makers with tier-aware role prioritisation; (3) AI-personalised email drafting with tone control (Formal / Friendly / Aggressive Sales), custom offer injection, and saved sender signatures; (4) Dashboard tracking drafted and bookmarked companies; (5) Microsoft 365 MCP integration for direct Outlook dispatch.',
    impact:
      'Covers all 35 Tamil Nadu districts and 7 cutting tool categories (Milling, Turning, Drilling, Boring, Threading, Grooving, Indexable Inserts). Delivers 12–15 deduplicated leads per search with smart query rotation, identifies up to 6 LinkedIn contacts per company, and collapses a multi-hour manual outreach cycle into a fully automated pipeline.',
    stack: ['Claude AI (Sonnet 4)', 'Anthropic API', 'Web Search Tool', 'React Artifact', 'Microsoft 365 MCP', 'localStorage'],
    category: 'AI / Automation',
    color: 'green',
    demoUrl: 'https://docs.google.com/presentation/d/1_32BugOlQPLR7AMq-W9btUn54_fDmnyw/edit?usp=sharing&ouid=116519409516266634130&rtpof=true&sd=true',
    featured: true,
    freelance: true,
  },
]

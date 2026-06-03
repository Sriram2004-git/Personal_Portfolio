import type { Skill, RadarDataPoint } from '@/types'

export const SKILLS: Skill[] = [
  // AI/LLM
  { name: 'LangChain', category: 'AI/LLM', level: 88 },
  { name: 'RAG Systems', category: 'AI/LLM', level: 85 },
  { name: 'Prompt Engineering', category: 'AI/LLM', level: 90 },
  { name: 'AI Agents', category: 'AI/LLM', level: 82 },
  { name: 'LLM Orchestration', category: 'AI/LLM', level: 85 },
  { name: 'Ollama / VLM', category: 'AI/LLM', level: 78 },
  { name: 'Claude (Skills/Artifacts)', category: 'AI/LLM', level: 88 },
  // Data
  { name: 'Python', category: 'Data', level: 92 },
  { name: 'Pandas / NumPy', category: 'Data', level: 90 },
  { name: 'Scikit-learn', category: 'Data', level: 82 },
  { name: 'SciPy', category: 'Data', level: 75 },
  { name: 'SQL / MySQL', category: 'Data', level: 85 },
  { name: 'Vector Databases', category: 'Data', level: 78 },
  // Tools
  { name: 'GitHub / GitFlow', category: 'Tools', level: 83 },
  { name: 'n8n Automation', category: 'Tools', level: 78 },
  { name: 'Azure Entra ID', category: 'Tools', level: 72 },
  { name: 'Mockaroo', category: 'Tools', level: 68 },
  // Visualization
  { name: 'Power BI', category: 'Visualization', level: 85 },
  { name: 'DAX', category: 'Visualization', level: 80 },
  { name: 'Matplotlib', category: 'Visualization', level: 80 },
]

export const RADAR_DATA: RadarDataPoint[] = [
  { axis: 'Python / ML', value: 88 },
  { axis: 'LLM / AI', value: 87 },
  { axis: 'Analysis', value: 85 },
  { axis: 'Visualization', value: 82 },
  { axis: 'Automation', value: 76 },
  { axis: 'Databases', value: 80 },
]

export const SKILL_CATEGORIES = {
  'AI/LLM': {
    label: 'AI / LLM',
    color: 'ai-purple',
    tailwind: 'bg-ai-purple/10 text-ai-purple-300 border border-ai-purple/20',
  },
  Data: {
    label: 'Data & ML',
    color: 'electric-blue',
    tailwind: 'bg-electric-blue/10 text-electric-blue-300 border border-electric-blue/20',
  },
  Tools: {
    label: 'Tools & DevOps',
    color: 'neon-cyan',
    tailwind: 'bg-neon-cyan/10 text-neon-cyan-300 border border-neon-cyan/20',
  },
  Visualization: {
    label: 'Visualization',
    color: 'matrix-green',
    tailwind: 'bg-matrix-green/10 text-matrix-green-300 border border-matrix-green/20',
  },
} as const

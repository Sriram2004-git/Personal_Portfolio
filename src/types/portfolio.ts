export interface Project {
  id: string
  title: string
  tagline: string
  problem: string
  solution: string
  impact: string
  stack: string[]
  category: string
  color: 'blue' | 'purple' | 'cyan' | 'green'
  demoUrl?: string
  featured: boolean
  freelance?: boolean
}

export type SkillCategory = 'AI/LLM' | 'Data' | 'Tools' | 'Visualization'

export interface Skill {
  name: string
  category: SkillCategory
  level: number
}

export interface RadarDataPoint {
  axis: string
  value: number
}

export interface TimelineEntry {
  id: string
  type: 'internship' | 'education' | 'certification' | 'freelance'
  title: string
  organization: string
  period: string
  location: string
  mode?: string
  isPresent?: boolean
  websiteUrl?: string
  description: string[]
  skills: string[]
  certificateUrl?: string
  color: 'blue' | 'purple' | 'green' | 'cyan'
}

export interface MetricItem {
  label: string
  value: number
  suffix: string
  icon: string
  color: 'blue' | 'purple' | 'cyan' | 'green'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

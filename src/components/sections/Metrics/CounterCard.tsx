'use client'

import { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { FolderKanban, Cpu, Briefcase, Brain } from 'lucide-react'
import type { MetricItem } from '@/types'

const ICON_MAP = {
  FolderKanban,
  Cpu,
  Briefcase,
  Brain,
}

const COLOR_MAP = {
  blue: { border: 'border-electric-blue/20', glow: 'bg-electric-blue/5', text: 'text-electric-blue', icon: 'bg-electric-blue/15 border-electric-blue/30' },
  purple: { border: 'border-ai-purple/20', glow: 'bg-ai-purple/5', text: 'text-ai-purple-400', icon: 'bg-ai-purple/15 border-ai-purple/30' },
  cyan: { border: 'border-neon-cyan/20', glow: 'bg-neon-cyan/5', text: 'text-neon-cyan-400', icon: 'bg-neon-cyan/15 border-neon-cyan/30' },
  green: { border: 'border-matrix-green/20', glow: 'bg-matrix-green/5', text: 'text-matrix-green', icon: 'bg-matrix-green/15 border-matrix-green/30' },
}

export function CounterCard({ metric }: { metric: MetricItem }) {
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const colors = COLOR_MAP[metric.color]
  const Icon = ICON_MAP[metric.icon as keyof typeof ICON_MAP] ?? Cpu

  useEffect(() => setMounted(true), [])

  return (
    <div
      ref={ref}
      className={`glass-card p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center gap-3 ${colors.glow}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors.icon}`}>
        <Icon size={22} className={colors.text} />
      </div>

      <div className={`text-4xl font-display font-black ${colors.text}`}>
        {mounted && inView ? (
          <CountUp end={metric.value} duration={2} suffix={metric.suffix} />
        ) : (
          <span>0{metric.suffix}</span>
        )}
      </div>

      <p className="text-text-secondary text-sm font-medium">{metric.label}</p>
    </div>
  )
}

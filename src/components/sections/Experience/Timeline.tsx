'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, ExternalLink, Zap } from 'lucide-react'
import { TIMELINE } from '@/data/experience'

export function Timeline() {
  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue via-ai-purple to-matrix-green opacity-30" />

      <div className="flex flex-col gap-8">
        {TIMELINE.map((entry, idx) => {
          const isLeft = idx % 2 === 0
          return (
            <TimelineEntry key={entry.id} entry={entry} idx={idx} isLeft={isLeft} />
          )
        })}
      </div>
    </div>
  )
}

function TimelineEntry({
  entry,
  idx,
  isLeft,
}: {
  entry: typeof TIMELINE[number]
  idx: number
  isLeft: boolean
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const colorClass = {
    blue:   { dot: 'bg-electric-blue',  border: 'border-electric-blue/30',  text: 'text-electric-blue',  icon: 'text-electric-blue'  },
    purple: { dot: 'bg-ai-purple',      border: 'border-ai-purple/30',      text: 'text-ai-purple-400',  icon: 'text-ai-purple-400'  },
    green:  { dot: 'bg-matrix-green',   border: 'border-matrix-green/30',   text: 'text-matrix-green',   icon: 'text-matrix-green'   },
    cyan:   { dot: 'bg-neon-cyan',      border: 'border-neon-cyan/40',      text: 'text-neon-cyan-400',  icon: 'text-neon-cyan-400'  },
  }[entry.color]

  const Icon = entry.type === 'freelance' ? Zap : entry.type === 'internship' ? Briefcase : GraduationCap

  return (
    <div ref={ref} className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pl-10 md:pl-0`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-5/12 glass-card p-5 rounded-xl border ${colorClass.border}`}
      >
        {/* Period badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${colorClass.text} tracking-wider`}>{entry.period}</span>
            {entry.isPresent && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                PRESENT
              </span>
            )}
          </div>
          {entry.mode && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-bg-elevated border border-white/10 text-text-muted">
              {entry.mode}
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-text-primary text-base mb-1">{entry.title}</h3>
        <p className={`text-sm font-medium mb-3 ${colorClass.text}`}>{entry.organization}</p>

        <ul className="flex flex-col gap-1.5 mb-4">
          {entry.description.map((d, i) => (
            <li key={i} className="text-text-muted text-xs leading-relaxed flex gap-2">
              <span className={colorClass.text + ' mt-1 flex-shrink-0'}>›</span>
              {d}
            </li>
          ))}
        </ul>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {entry.skills.map((skill) => (
            <span key={skill} className="text-xs px-2 py-0.5 rounded-md bg-bg-elevated border border-white/8 text-text-muted">
              {skill}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className="flex items-center gap-4 flex-wrap">
        {entry.websiteUrl && (
          <a
            href={entry.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs ${colorClass.text} hover:opacity-80 transition-opacity`}
          >
            <ExternalLink size={11} />
            {entry.organization}
          </a>
        )}

        {/* Certificate link */}
        {entry.certificateUrl && (
          <a
            href={entry.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs ${colorClass.text} hover:opacity-80 transition-opacity`}
          >
            <ExternalLink size={11} />
            View Certificate
          </a>
        )}
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full ${colorClass.dot} bg-opacity-20 border-2 border-current ${colorClass.icon} flex items-center justify-center animate-pulse-glow`}>
          <Icon size={14} />
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12" />
    </div>
  )
}

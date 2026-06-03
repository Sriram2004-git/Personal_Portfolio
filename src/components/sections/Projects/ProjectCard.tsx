'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  onClick: () => void
}

const COLOR_MAP = {
  blue: {
    border: 'border-electric-blue/20 hover:border-electric-blue/50',
    gradient: 'from-electric-blue to-ai-purple',
    badge: 'bg-electric-blue/10 text-electric-blue border-electric-blue/20',
    glow: 'hover:shadow-glow-blue',
    tag: 'text-electric-blue',
  },
  purple: {
    border: 'border-ai-purple/20 hover:border-ai-purple/50',
    gradient: 'from-ai-purple to-neon-cyan',
    badge: 'bg-ai-purple/10 text-ai-purple-400 border-ai-purple/20',
    glow: 'hover:shadow-glow-purple',
    tag: 'text-ai-purple-400',
  },
  cyan: {
    border: 'border-neon-cyan/20 hover:border-neon-cyan/50',
    gradient: 'from-neon-cyan to-electric-blue',
    badge: 'bg-neon-cyan/10 text-neon-cyan-400 border-neon-cyan/20',
    glow: 'hover:shadow-glow-cyan',
    tag: 'text-neon-cyan-400',
  },
  green: {
    border: 'border-matrix-green/20 hover:border-matrix-green/50',
    gradient: 'from-matrix-green to-neon-cyan',
    badge: 'bg-matrix-green/10 text-matrix-green border-matrix-green/20',
    glow: 'hover:shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(16,185,129,0.2)]',
    tag: 'text-matrix-green',
  },
}

export function ProjectCard({ project, featured, onClick }: ProjectCardProps) {
  const colors = COLOR_MAP[project.color]

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClick}
      className={`relative glass-card rounded-2xl p-6 cursor-pointer border ${colors.border} ${colors.glow}
        transition-all duration-300 flex flex-col gap-5
        ${featured ? 'md:col-span-2' : ''}`}
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${colors.gradient} rounded-full`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs font-mono ${colors.tag} tracking-widest uppercase`}>
              {project.category}
            </span>
            {project.freelance && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-ai-purple/15 text-ai-purple-400 border border-ai-purple/25 font-mono">
                Freelance
              </span>
            )}
          </div>
          <h3 className="text-text-primary font-display font-bold text-lg leading-tight">
            {project.title}
          </h3>
        </div>
        <div className={`w-9 h-9 rounded-xl border flex-shrink-0 flex items-center justify-center ${colors.badge} transition-transform group-hover:rotate-12`}>
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-text-secondary text-sm leading-relaxed">{project.tagline}</p>

      {/* Impact highlight */}
      <div className={`p-3 rounded-xl border ${colors.badge} bg-opacity-5`}>
        <p className="text-xs font-mono text-text-muted mb-1">IMPACT</p>
        <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">{project.impact}</p>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className={`px-2 py-0.5 rounded-md text-xs border ${colors.badge}`}>
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="px-2 py-0.5 rounded-md text-xs border border-white/10 text-text-muted">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
        <span className="text-text-muted text-xs">Click for case study →</span>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center gap-1.5 text-xs ${colors.tag} hover:opacity-80 transition-opacity`}
          >
            <ExternalLink size={11} />
            View
          </a>
        )}
      </div>
    </motion.div>
  )
}

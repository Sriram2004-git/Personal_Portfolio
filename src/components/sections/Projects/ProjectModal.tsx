'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, AlertCircle, Lightbulb, TrendingUp, Wrench } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const colorMap = {
    blue:   { border: 'border-electric-blue/30', text: 'text-electric-blue',  bg: 'bg-electric-blue/10' },
    purple: { border: 'border-ai-purple/30',     text: 'text-ai-purple-400',  bg: 'bg-ai-purple/10'    },
    cyan:   { border: 'border-neon-cyan/30',     text: 'text-neon-cyan-400',  bg: 'bg-neon-cyan/10'    },
    green:  { border: 'border-matrix-green/30',  text: 'text-matrix-green',   bg: 'bg-matrix-green/10' },
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal — data-lenis-prevent stops Lenis hijacking wheel inside the modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-y-auto"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
          >
            <div className={`glass-card rounded-2xl border ${colorMap[project.color].border} p-6 md:p-8`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className={`text-xs font-mono ${colorMap[project.color].text} tracking-widest uppercase`}>
                    {project.category}
                  </span>
                  <h2 className="text-2xl font-display font-bold text-text-primary mt-1">{project.title}</h2>
                  <p className="text-text-secondary text-sm mt-1">{project.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg border border-electric-blue/20 flex items-center justify-center
                    hover:bg-electric-blue/10 transition-colors flex-shrink-0 ml-4"
                >
                  <X size={16} className="text-text-secondary" />
                </button>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: AlertCircle, label: 'Problem', content: project.problem, color: 'red' },
                  { icon: Lightbulb, label: 'Solution', content: project.solution, color: 'yellow' },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} className="p-4 bg-bg-elevated/50 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={14} className={colorMap[project.color].text} />
                      <span className="text-text-secondary text-xs font-mono uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>

              {/* Impact */}
              <div className="mt-4 p-4 bg-bg-elevated/50 rounded-xl border border-matrix-green/15">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-matrix-green" />
                  <span className="text-text-secondary text-xs font-mono uppercase tracking-wider">Impact</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{project.impact}</p>
              </div>

              {/* Tech stack */}
              <div className="mt-4 p-4 bg-bg-elevated/50 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench size={14} className={colorMap[project.color].text} />
                  <span className="text-text-secondary text-xs font-mono uppercase tracking-wider">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${colorMap[project.color].bg} ${colorMap[project.color].text} border ${colorMap[project.color].border}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View project link */}
              {project.demoUrl && (
                <div className="mt-6 flex justify-end">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium ${colorMap[project.color].bg} ${colorMap[project.color].text} border ${colorMap[project.color].border} hover:opacity-80 transition-opacity`}
                  >
                    <ExternalLink size={14} />
                    View Project
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

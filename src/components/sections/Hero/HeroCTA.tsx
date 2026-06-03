'use client'

import { motion } from 'framer-motion'
import { Download, ArrowRight, Github, Linkedin } from 'lucide-react'
import { PROFILE } from '@/data/profile'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function HeroCTA() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center md:items-start gap-6 mt-8"
    >
      {/* Buttons row */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
        <a
          href="#projects"
          className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm
            bg-gradient-to-r from-electric-blue to-ai-purple text-white
            hover:opacity-90 transition-all duration-200 shadow-glow-blue"
        >
          View Projects
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href={PROFILE.resumePdf}
          download
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm
            border border-electric-blue/30 text-text-primary
            hover:bg-electric-blue/10 hover:border-electric-blue/60
            backdrop-blur-sm transition-all duration-200"
        >
          <Download size={16} />
          Resume
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div variants={fadeInUp} className="flex items-center gap-4">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors text-sm"
        >
          <Github size={16} />
          GitHub
        </a>
        <span className="text-text-muted">·</span>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-secondary hover:text-electric-blue transition-colors text-sm"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
      </motion.div>

      {/* Stat chips */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
        {[
          { label: '2 Internships', color: 'blue' },
          { label: '3 Major Projects', color: 'purple' },
          { label: 'B.Tech 2026', color: 'cyan' },
        ].map(({ label, color }) => (
          <span
            key={label}
            className={`px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm border ${
              color === 'blue'
                ? 'bg-electric-blue/10 border-electric-blue/20 text-electric-blue-300'
                : color === 'purple'
                ? 'bg-ai-purple/10 border-ai-purple/20 text-ai-purple-300'
                : 'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan-300'
            }`}
          >
            {label}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

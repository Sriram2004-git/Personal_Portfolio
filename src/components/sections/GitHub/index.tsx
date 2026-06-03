'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Loader2 } from 'lucide-react'
import { RepoCard } from './RepoCard'
import { useGitHub } from '@/hooks/useGitHub'
import { PROFILE } from '@/data/profile'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export function GitHubSection() {
  const { repos, loading, error } = useGitHub()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="github" ref={ref} className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-matrix-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <p className="font-mono text-sm text-matrix-green tracking-widest uppercase mb-3">Open Source</p>
              <h2 className="section-heading text-text-primary">
                GitHub{' '}
                <span className="gradient-text">Activity</span>
              </h2>
            </div>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-electric-blue/25
                text-sm text-text-secondary hover:text-electric-blue hover:border-electric-blue/50
                transition-all duration-200"
            >
              <Github size={16} />
              View Profile
              <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Content */}
          {loading && (
            <div className="flex items-center justify-center py-20 gap-3 text-text-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm font-mono">Fetching repositories...</span>
            </div>
          )}

          {error && (
            <div className="glass-card p-6 rounded-xl border border-red-500/20 text-center">
              <p className="text-red-400 text-sm">{error}</p>
              <p className="text-text-muted text-xs mt-2">Check your GitHub token in .env.local</p>
            </div>
          )}

          {!loading && !error && (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {repos.map((repo) => (
                <motion.div key={repo.id} variants={fadeInUp}>
                  <RepoCard repo={repo} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Mobile profile link */}
          <motion.div variants={fadeInUp} className="flex justify-center md:hidden">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-electric-blue/25 text-sm text-text-secondary"
            >
              <Github size={16} />
              View GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

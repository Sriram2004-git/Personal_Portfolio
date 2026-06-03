'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { PROJECTS } from '@/data/projects'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { Project } from '@/types'

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="projects" ref={ref} className="section-padding bg-bg-void relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-mono text-sm text-electric-blue tracking-widest uppercase mb-3">Portfolio</p>
            <h2 className="section-heading text-text-primary">
              Featured{' '}
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              Production-grade systems built to solve real business problems with measurable outcomes.
            </p>
          </motion.div>

          {/* Project grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PROJECTS.map((project, idx) => (
              <motion.div key={project.id} variants={fadeInUp} custom={idx}>
                <ProjectCard
                  project={project}
                  featured={project.featured}
                  onClick={() => setActiveProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}

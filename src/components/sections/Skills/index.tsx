'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SkillGrid } from './SkillGrid'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const SkillRadar = dynamic(() => import('./RadarChart').then((m) => ({ default: m.SkillRadar })), {
  ssr: false,
  loading: () => <div className="glass-card rounded-xl h-80 animate-pulse" />,
})

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" ref={ref} className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-mono text-sm text-neon-cyan-400 tracking-widest uppercase mb-3">Expertise</p>
            <h2 className="section-heading text-text-primary">
              Skills &{' '}
              <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              From LLM orchestration to interactive dashboards — a diverse toolkit built through real-world projects.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Radar chart */}
            <motion.div variants={fadeInUp}>
              <SkillRadar />
            </motion.div>

            {/* Skill grid */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <SkillGrid />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

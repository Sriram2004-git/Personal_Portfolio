'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Timeline } from './Timeline'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" ref={ref} className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-ai-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-mono text-sm text-ai-purple-400 tracking-widest uppercase mb-3">Journey</p>
            <h2 className="section-heading text-text-primary">
              Experience &{' '}
              <span className="gradient-text-purple">Education</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              Two enterprise internships and four years of specialized AI & Data Science education.
            </p>
          </motion.div>

          <Timeline />
        </motion.div>
      </div>
    </section>
  )
}

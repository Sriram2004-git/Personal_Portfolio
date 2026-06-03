'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CounterCard } from './CounterCard'
import { METRICS } from '@/data/metrics'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export function MetricsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 px-6 bg-bg-void relative overflow-hidden">
      {/* Background gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-ai-purple/5 to-neon-cyan/5" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-2xl font-display font-bold text-text-primary">
              By the <span className="gradient-text">Numbers</span>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {METRICS.map((metric) => (
              <motion.div key={metric.label} variants={fadeInUp}>
                <CounterCard metric={metric} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Workflow, Globe } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const SERVICES = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    border: 'border-neon-cyan/20',
    glow: 'bg-neon-cyan/5',
    iconColor: 'text-neon-cyan-400',
    iconBg: 'bg-neon-cyan/15 border-neon-cyan/30',
  },
  {
    icon: Globe,
    title: 'Web Development',
    border: 'border-electric-blue/20',
    glow: 'bg-electric-blue/5',
    iconColor: 'text-electric-blue',
    iconBg: 'bg-electric-blue/15 border-electric-blue/30',
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false })

  return (
    <section id="services" ref={ref} className="section-padding bg-bg-void relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-mono text-sm text-neon-cyan-400 tracking-widest uppercase mb-3">What I Offer</p>
            <h2 className="section-heading text-text-primary">
              Services
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              Practical AI-powered solutions tailored to real business needs.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className={`glass-card p-8 rounded-2xl border ${service.border} ${service.glow} flex flex-col gap-5`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${service.iconBg}`}>
                    <Icon size={26} className={service.iconColor} />
                  </div>

                  <h3 className="font-display font-bold text-text-primary text-xl">{service.title}</h3>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

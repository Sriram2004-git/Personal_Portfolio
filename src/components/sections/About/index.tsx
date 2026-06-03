'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { GraduationCap, MapPin, Mail, Zap } from 'lucide-react'
import { PROFILE } from '@/data/profile'
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from '@/lib/animations'

const HIGHLIGHTS = [
  { icon: GraduationCap, label: 'B.Tech AI & DS', sub: 'RIT Chennai, 2026' },
  { icon: MapPin, label: 'Chennai, India', sub: 'Open to remote' },
  { icon: Mail, label: PROFILE.email, sub: 'Available now' },
  { icon: Zap, label: 'L&T + Energica', sub: '2 internships' },
]

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" ref={ref} className="section-padding bg-bg-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left: Photo + badges */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-electric-blue/10 to-ai-purple/10 rounded-2xl blur-xl" />
            <div className="relative w-72 h-80 rounded-2xl overflow-hidden glass-card">
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-bg-elevated">
                <span className="text-7xl font-display font-black gradient-text">SN</span>
              </div>
              <Image
                src={PROFILE.photo}
                alt={PROFILE.name}
                fill
                className="object-cover object-top z-10"
              />
            </div>

            {/* Info cards */}
            <div className="absolute -right-6 top-6 glass-card px-4 py-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
              <span className="text-xs font-mono text-matrix-green-400">Open to work</span>
            </div>
            <div className="absolute -left-6 bottom-8 glass-card px-4 py-3 text-center">
              <p className="text-lg font-display font-bold text-electric-blue">2</p>
              <p className="text-xs text-text-muted">Enterprise<br />Internships</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeInUp}>
            <p className="font-mono text-sm text-electric-blue tracking-widest uppercase mb-3">About Me</p>
            <h2 className="section-heading text-text-primary mb-4">
              Building the{' '}
              <span className="gradient-text">Future of AI</span>
              <br />One system at a time.
            </h2>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-text-secondary leading-relaxed">
            I&apos;m a final-year <span className="text-text-primary">B.Tech AI & Data Science</span> student
            at Rajalakshmi Institute of Technology, Chennai — graduating April 2026. I specialize in
            building production-grade AI systems: multi-modal RAG pipelines, LLM orchestration
            architectures, and intelligent automation workflows.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-text-secondary leading-relaxed">
            My experience at <span className="text-text-primary">Larsen & Toubro ISD</span> (AIML) and{' '}
            <span className="text-text-primary">Energica Advisory Services</span> (Data Analytics) has given
            me enterprise-level exposure — from deploying intelligent document processing pipelines
            to engineering enterprise-grade workflow automation solutions.
          </motion.p>

          {/* Highlights grid */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3 mt-2">
            {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 glass-card rounded-lg hover:border-electric-blue/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-electric-blue" />
                </div>
                <div>
                  <p className="text-text-primary text-xs font-medium">{label}</p>
                  <p className="text-text-muted text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

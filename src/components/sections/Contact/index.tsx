'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ContactForm } from './ContactForm'
import { SocialLinks } from './SocialLinks'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="contact" ref={ref} className="section-padding bg-bg-dark relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-ai-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-mono text-sm text-electric-blue tracking-widest uppercase mb-3">Get in Touch</p>
            <h2 className="section-heading text-text-primary">
              Let&apos;s{' '}
              <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              Open to full-time AI/ML and Data roles from April 2026. Reach out for opportunities, collaborations, or just to talk AI.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInLeft}>
              <h3 className="font-display font-semibold text-text-primary mb-6">Send a Message</h3>
              <ContactForm />
            </motion.div>

            <motion.div variants={fadeInRight}>
              <h3 className="font-display font-semibold text-text-primary mb-6">Find Me Online</h3>
              <SocialLinks />

              {/* Availability card */}
              <div className="mt-6 p-5 glass-card rounded-xl border border-matrix-green/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
                  <span className="text-matrix-green text-sm font-medium">Available for Opportunities</span>
                </div>
                <p className="text-text-muted text-sm">
                  Open to full-time roles relevant to AI Engineer, ML Engineer, or Automation Engineer — both Chennai and remote.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bot, Sparkles } from 'lucide-react'
import { ChatWindow } from './ChatWindow'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function AIAssistantSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="ai-assistant" ref={ref} className="section-padding bg-bg-void relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Info */}
          <div className="flex flex-col gap-6">
            <motion.div variants={fadeInUp}>
              <p className="font-mono text-sm text-ai-purple-400 tracking-widest uppercase mb-3">AI Assistant</p>
              <h2 className="section-heading text-text-primary mb-4">
                Chat with my{' '}
                <span className="gradient-text-purple">AI</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Powered by <span className="text-text-primary font-mono">gemini-3-flash-preview</span> via Google AI Studio,
                this assistant knows everything about my skills, projects, and experience.
                Ask it anything a recruiter or engineer would want to know.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              {[
                { icon: Bot, title: 'Real AI Responses', desc: 'Streaming LLM output — not canned text' },
                { icon: Sparkles, title: 'Fully Informed', desc: 'Knows all my projects, skills & internships' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 glass-card rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-ai-purple/15 border border-ai-purple/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-ai-purple-400" />
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Chat */}
          <motion.div variants={fadeInUp}>
            <ChatWindow />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

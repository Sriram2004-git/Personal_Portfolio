'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { PROFILE } from '@/data/profile'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function ResumeSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [pdfSupported, setPdfSupported] = useState(true)

  useEffect(() => {
    const ua = navigator.userAgent
    const isFirefox = ua.includes('Firefox')
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
    if (isFirefox || isSafari) setPdfSupported(false)
  }, [])

  return (
    <section id="resume" ref={ref} className="section-padding bg-bg-void relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-purple/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-10"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="font-mono text-sm text-ai-purple-400 tracking-widest uppercase mb-3">Documents</p>
            <h2 className="section-heading text-text-primary">
              My <span className="gradient-text-purple">Resume</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto">
              Download or preview my latest resume. Updated June 2026.
            </p>
          </motion.div>

          {/* PDF preview */}
          <motion.div variants={fadeInUp} className="w-full max-w-3xl">
            <div className="glass-card rounded-2xl overflow-hidden border border-ai-purple/20">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-ai-purple/10 bg-bg-elevated">
                <div className="flex items-center gap-2">
                  <FileText size={15} className="text-ai-purple-400" />
                  <span className="text-text-secondary text-sm font-mono">sriraam_resume.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/api/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-ai-purple-400 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Open
                  </a>
                  <a
                    href={PROFILE.resumePdf}
                    download="Sriraam_N_Resume.pdf"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-ai-purple text-white text-xs hover:bg-ai-purple-600 transition-colors"
                  >
                    <Download size={12} />
                    Download
                  </a>
                </div>
              </div>

              {/* PDF Embed or fallback */}
              {pdfSupported ? (
                <iframe
                  src="/api/resume"
                  className="w-full h-[600px] bg-white"
                  title="Sriraam N Resume"
                />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center gap-4 bg-bg-elevated">
                  <FileText size={40} className="text-ai-purple/40" />
                  <p className="text-text-muted text-sm">PDF preview not supported in this browser.</p>
                  <a
                    href="/api/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-ai-purple text-white text-sm"
                  >
                    <ExternalLink size={14} />
                    Open Resume
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Download CTA */}
          <motion.div variants={fadeInUp}>
            <a
              href={PROFILE.resumePdf}
              download="Sriraam_N_Resume.pdf"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-medium
                bg-gradient-to-r from-ai-purple to-electric-blue text-white
                hover:opacity-90 transition-opacity shadow-glow-purple"
            >
              <Download size={18} />
              Download Resume PDF
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

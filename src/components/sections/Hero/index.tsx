'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from './Typewriter'
import { HeroCTA } from './HeroCTA'
import { PROFILE } from '@/data/profile'
import { fadeInLeft, fadeInRight } from '@/lib/animations'

const NeuralNetwork = dynamic(() => import('./NeuralNetwork').then((m) => ({ default: m.NeuralNetwork })), {
  ssr: false,
})

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-void"
    >
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0 opacity-60 md:opacity-80">
        <Suspense fallback={null}>
          <NeuralNetwork />
        </Suspense>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

      {/* Scan line effect */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent"
        style={{ animation: 'scanLine 4s linear infinite', top: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center w-full">

        {/* Left: Text */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-matrix-green/30 bg-matrix-green/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
            <span className="text-xs font-mono text-matrix-green-400">Available for roles</span>
          </div>

          <p className="font-mono text-sm text-electric-blue mb-3 tracking-widest uppercase">
            Hello, I&apos;m
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-4">
            <span className="text-text-primary">{PROFILE.firstName}</span>
            <span className="text-text-muted/30"> N</span>
            <span className="text-electric-blue">.</span>
          </h1>

          <div className="text-2xl md:text-3xl font-display font-semibold text-text-secondary mb-2 min-h-[2.5rem]">
            <Typewriter />
          </div>

          <p className="text-text-secondary text-sm md:text-base max-w-lg mt-4 leading-relaxed">
            Building production-grade AI systems — RAG pipelines, LLM orchestration, and intelligent automation.
            {' '}<span className="text-electric-blue">B.Tech AI & DS</span> graduate from RIT Chennai.
          </p>

          <HeroCTA />
        </motion.div>

        {/* Right: Profile photo */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-electric-blue/20 via-ai-purple/20 to-neon-cyan/20 blur-xl animate-pulse-glow" />

            {/* Spinning border */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-electric-blue via-ai-purple to-neon-cyan animate-border-spin opacity-70" style={{ padding: '2px' }}>
              <div className="w-full h-full rounded-full bg-bg-void" />
            </div>

            {/* Photo container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-electric-blue/30">
              {/* Fallback — rendered first so Image sits on top when it loads */}
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-bg-elevated">
                <span className="text-6xl font-display font-black gradient-text">SN</span>
              </div>
              <Image
                src={PROFILE.photo}
                alt={PROFILE.name}
                fill
                className="object-cover object-top z-10"
                priority
              />
            </div>

            {/* Orbiting badges — revolve along the circular border */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {([
                { label: 'RAG Engineer', color: 'text-electric-blue', delay: '0s' },
                { label: 'LLM Dev', color: 'text-ai-purple-400', delay: '-30s' },
                { label: 'Automation', color: 'text-neon-cyan-400', delay: '-60s' },
              ] as const).map(({ label, color, delay }) => (
                <div key={label} className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute"
                    style={{ animation: 'orbitOuter 90s linear infinite', animationDelay: delay }}
                  >
                    <div style={{ animation: 'orbitCounter 90s linear infinite', animationDelay: delay }}>
                      <span className={`px-3 py-1.5 glass-card text-xs font-mono ${color} whitespace-nowrap block`}>
                        {label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs font-mono">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-electric-blue/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}

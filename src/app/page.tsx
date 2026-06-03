'use client'

import { useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/Hero'
import { AboutSection } from '@/components/sections/About'
import { AIAssistantSection } from '@/components/sections/AIAssistant'
import { SkillsSection } from '@/components/sections/Skills'
import { ProjectsSection } from '@/components/sections/Projects'
import { MetricsSection } from '@/components/sections/Metrics'
import { ExperienceSection } from '@/components/sections/Experience'
import { GitHubSection } from '@/components/sections/GitHub'
import { ResumeSection } from '@/components/sections/Resume'
import { ContactSection } from '@/components/sections/Contact'

export default function HomePage() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    let rafId: number
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({ lerp: 0.08, prevent: (node: Element) => node.closest('[data-lenis-prevent]') !== null })

        function raf(time: number) {
          lenis!.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch {
        // Lenis failed — native scroll works fine
      }
    }

    initLenis()
    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="relative" style={{ backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)' }}>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MetricsSection />
        <AIAssistantSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <GitHubSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

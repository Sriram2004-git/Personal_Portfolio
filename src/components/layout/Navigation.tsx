'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const progress = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-md bg-bg-dark/80 border-b border-electric-blue/10 shadow-lg'
            : 'bg-transparent'
        )}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-electric-blue via-ai-purple to-neon-cyan transition-all duration-100"
          style={{ width: `${progress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-ai-purple flex items-center justify-center text-white font-bold font-mono text-sm">
              S
            </div>
            <span className="font-display font-bold text-text-primary group-hover:text-electric-blue transition-colors">
              Sriraam
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                  activeSection === href
                    ? 'text-electric-blue'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {activeSection === href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-electric-blue/10 rounded-lg border border-electric-blue/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-medium
                bg-electric-blue text-white rounded-lg hover:bg-electric-blue-600
                transition-colors shadow-glow-blue"
            >
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-electric-blue/20"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-md bg-bg-dark/95 border-b border-electric-blue/10 md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 rounded-lg text-text-secondary hover:text-text-primary hover:bg-electric-blue/5 transition-all"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 py-3 text-center bg-electric-blue text-white rounded-lg font-medium"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

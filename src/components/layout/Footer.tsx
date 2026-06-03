import { Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-electric-blue/10 bg-bg-void py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-ai-purple flex items-center justify-center text-white font-bold font-mono text-sm">
            S
          </div>
          <div>
            <p className="font-display font-bold text-text-primary text-sm">Sriraam N</p>
            <p className="text-text-muted text-xs">AI & Data Science Engineer</p>
          </div>
        </div>

        <p className="text-text-muted text-sm text-center">
          © {new Date().getFullYear()} Sriraam N. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {[
            { href: PROFILE.github, icon: Github, label: 'GitHub' },
            { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-electric-blue/20 flex items-center justify-center
                text-text-secondary hover:text-electric-blue hover:border-electric-blue/50
                hover:bg-electric-blue/10 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

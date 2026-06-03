import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { PROFILE } from '@/data/profile'

const LINKS = [
  {
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
    label: PROFILE.email,
    sub: 'Email',
    color: 'electric-blue',
  },
  {
    href: PROFILE.github,
    icon: Github,
    label: 'Sriram2004-git',
    sub: 'GitHub',
    color: 'ai-purple',
    external: true,
  },
  {
    href: PROFILE.linkedin,
    icon: Linkedin,
    label: 'LinkedIn Profile',
    sub: 'LinkedIn',
    color: 'neon-cyan',
    external: true,
  },
  {
    href: `tel:${PROFILE.phone.replace(/\s/g, '')}`,
    icon: Phone,
    label: PROFILE.phone,
    sub: 'Phone',
    color: 'matrix-green',
  },
]

const colorMap: Record<string, string> = {
  'electric-blue': 'border-electric-blue/25 hover:border-electric-blue/60 bg-electric-blue/5 hover:bg-electric-blue/10 text-electric-blue',
  'ai-purple': 'border-ai-purple/25 hover:border-ai-purple/60 bg-ai-purple/5 hover:bg-ai-purple/10 text-ai-purple-400',
  'neon-cyan': 'border-neon-cyan/25 hover:border-neon-cyan/60 bg-neon-cyan/5 hover:bg-neon-cyan/10 text-neon-cyan-400',
  'matrix-green': 'border-matrix-green/25 hover:border-matrix-green/60 bg-matrix-green/5 hover:bg-matrix-green/10 text-matrix-green',
}

export function SocialLinks() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-text-muted text-xs font-mono mb-2">
        <MapPin size={12} />
        {PROFILE.location}
      </div>
      {LINKS.map(({ href, icon: Icon, label, sub, color, external }) => (
        <a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`flex items-center gap-3 p-4 rounded-xl border ${colorMap[color]} transition-all duration-200`}
        >
          <Icon size={18} />
          <div>
            <p className="text-text-primary text-sm font-medium">{label}</p>
            <p className="text-text-muted text-xs">{sub}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

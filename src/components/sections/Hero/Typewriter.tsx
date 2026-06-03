'use client'

import { useTypewriter } from '@/hooks/useTypewriter'
import { PROFILE } from '@/data/profile'

export function Typewriter() {
  const text = useTypewriter(PROFILE.roles, 80, 50, 2200)

  return (
    <span className="gradient-text font-display font-bold cursor-blink">
      {text}
    </span>
  )
}

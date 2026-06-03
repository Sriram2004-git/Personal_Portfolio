'use client'

import { AI_QUICK_QUESTIONS } from '@/data/aiQA'
import { Sparkles } from 'lucide-react'

interface QACardsProps {
  onSelect: (question: string) => void
  disabled?: boolean
}

export function QACards({ onSelect, disabled }: QACardsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Sparkles size={12} className="text-electric-blue" />
        Quick questions
      </div>
      <div className="flex flex-wrap gap-2">
        {AI_QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-lg text-xs border border-electric-blue/20
              bg-electric-blue/5 text-text-secondary
              hover:bg-electric-blue/15 hover:border-electric-blue/40 hover:text-text-primary
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}

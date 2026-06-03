'use client'

import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/types'

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
          isUser
            ? 'bg-ai-purple/20 border border-ai-purple/30'
            : 'bg-electric-blue/20 border border-electric-blue/30'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-ai-purple-400" />
        ) : (
          <Bot size={14} className="text-electric-blue" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
          isUser
            ? 'bg-ai-purple/15 border border-ai-purple/20 text-text-primary rounded-tr-none'
            : 'bg-bg-elevated border border-electric-blue/15 text-text-secondary rounded-tl-none'
        }`}
      >
        {message.content || (
          <span className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-electric-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-electric-blue/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-electric-blue/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </div>
    </motion.div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { QACards } from './QACards'
import type { ChatMessage as ChatMessageType } from '@/types'

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Sriraam's AI assistant. Ask me anything about his skills, projects, internships, or availability.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    const assistantMsg: ChatMessageType = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setIsStreaming(true)

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: text }] }),
      })

      if (!res.ok || !res.body) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: 'Sorry, the AI service is currently unavailable. Please try again later.' }
              : m
          )
        )
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: m.content + chunk } : m))
        )
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, content: 'Connection error. Please check your AI service configuration.' }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="flex flex-col h-[480px] glass-card rounded-2xl overflow-hidden">
      {/* Chat messages */}
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div className="border-t border-electric-blue/10 p-4">
        <QACards onSelect={sendMessage} disabled={isStreaming} />
      </div>

      {/* Input row */}
      <div className="border-t border-electric-blue/10 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask anything about Sriraam..."
          disabled={isStreaming}
          className="flex-1 bg-bg-elevated border border-electric-blue/15 rounded-lg px-3 py-2 text-sm
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20
            disabled:opacity-50 transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={isStreaming || !input.trim()}
          className="w-9 h-9 rounded-lg bg-electric-blue flex items-center justify-center
            hover:bg-electric-blue-600 disabled:opacity-40 disabled:cursor-not-allowed
            transition-all"
        >
          <Send size={15} className="text-white" />
        </button>
      </div>
    </div>
  )
}

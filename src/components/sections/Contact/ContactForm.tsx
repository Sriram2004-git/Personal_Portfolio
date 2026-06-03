'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { PROFILE } from '@/data/profile'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs: Partial<typeof form> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4 text-center">
        <CheckCircle size={40} className="text-matrix-green" />
        <h3 className="font-display font-bold text-text-primary">Email client opened!</h3>
        <p className="text-text-secondary text-sm">If it didn&apos;t open, email me directly at{' '}
          <a href={`mailto:${PROFILE.email}`} className="text-electric-blue hover:underline">{PROFILE.email}</a>
        </p>
        <button onClick={() => setSubmitted(false)} className="text-xs text-text-muted hover:text-text-primary transition-colors">
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
      {[
        { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
        { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com' },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">{label}</label>
          <input
            type={type}
            value={form[key as keyof typeof form]}
            onChange={(e) => {
              setForm((p) => ({ ...p, [key]: e.target.value }))
              setErrors((p) => ({ ...p, [key]: undefined }))
            }}
            placeholder={placeholder}
            className="bg-bg-elevated border border-electric-blue/15 rounded-lg px-3 py-2.5 text-sm
              text-text-primary placeholder:text-text-muted
              focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20
              transition-colors"
          />
          {errors[key as keyof typeof errors] && (
            <span className="text-red-400 text-xs">{errors[key as keyof typeof errors]}</span>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-xs font-medium">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => {
            setForm((p) => ({ ...p, message: e.target.value }))
            setErrors((p) => ({ ...p, message: undefined }))
          }}
          placeholder="Tell me about the role or project..."
          rows={4}
          className="bg-bg-elevated border border-electric-blue/15 rounded-lg px-3 py-2.5 text-sm
            text-text-primary placeholder:text-text-muted resize-none
            focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20
            transition-colors"
        />
        {errors.message && <span className="text-red-400 text-xs">{errors.message}</span>}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium
          bg-gradient-to-r from-electric-blue to-ai-purple text-white
          hover:opacity-90 transition-opacity"
      >
        <Send size={15} />
        Send Message
      </button>
    </form>
  )
}

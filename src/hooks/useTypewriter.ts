'use client'

import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words: readonly string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
        if (displayText.length + 1 === currentWord.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs)
          return
        }
        timeoutRef.current = setTimeout(tick, typingSpeed)
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
        if (displayText.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
          return
        }
        timeoutRef.current = setTimeout(tick, deletingSpeed)
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  return displayText
}

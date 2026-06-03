'use client'

import { useState, useEffect } from 'react'
import type { GitHubRepo } from '@/types'

interface UseGitHubReturn {
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

export function useGitHub(): UseGitHubReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('/api/github')
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const data: GitHubRepo[] = await res.json()
        const HIDDEN = ['personal_portfolio', 'personal-portfolio']
        setRepos(
          data
            .filter((r) => !r.fork && !HIDDEN.includes(r.name.toLowerCase()))
            .slice(0, 9)
        )
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repositories')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return { repos, loading, error }
}

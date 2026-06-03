'use client'

import { Star, GitFork, ExternalLink, Circle } from 'lucide-react'
import { formatRelativeDate } from '@/lib/utils'
import type { GitHubRepo } from '@/types'

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  Shell: '#89e051',
}

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#6b7280') : null

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-4 rounded-xl border border-electric-blue/15 hover:border-electric-blue/40
        flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono text-sm font-medium text-text-primary group-hover:text-electric-blue transition-colors truncate">
          {repo.name}
        </h3>
        <ExternalLink size={12} className="text-text-muted group-hover:text-electric-blue transition-colors flex-shrink-0 mt-0.5" />
      </div>

      {repo.description && (
        <p className="text-text-muted text-xs leading-relaxed line-clamp-2">{repo.description}</p>
      )}

      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/5">
        {langColor && (
          <div className="flex items-center gap-1.5">
            <Circle size={10} fill={langColor} color={langColor} />
            <span className="text-text-muted text-xs">{repo.language}</span>
          </div>
        )}
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1">
            <Star size={11} className="text-amber-400" />
            <span className="text-text-muted text-xs">{repo.stargazers_count}</span>
          </div>
        )}
        {repo.forks_count > 0 && (
          <div className="flex items-center gap-1">
            <GitFork size={11} className="text-text-muted" />
            <span className="text-text-muted text-xs">{repo.forks_count}</span>
          </div>
        )}
        {(Date.now() - new Date(repo.pushed_at).getTime()) > 30 * 24 * 60 * 60 * 1000 && (
          <span className="ml-auto text-text-muted text-xs">{formatRelativeDate(repo.pushed_at)}</span>
        )}
      </div>
    </a>
  )
}

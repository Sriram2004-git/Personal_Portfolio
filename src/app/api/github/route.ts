import { NextResponse } from 'next/server'

export async function GET() {
  const username = process.env.GITHUB_USERNAME ?? 'Sriram2004-git'
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'sriraam-portfolio',
  }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=12`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!res.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}

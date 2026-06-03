import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400', '500', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'Sriraam N — AI & Data Science Engineer',
  description:
    'Portfolio of Sriraam N — B.Tech AI & Data Science student building production-grade RAG pipelines, LLM systems, and intelligent automation. Available for full-time roles from April 2026.',
  keywords: [
    'Sriraam N', 'AI Engineer', 'Data Scientist', 'LLM', 'RAG', 'LangChain',
    'Power BI', 'Python', 'Machine Learning', 'Chennai', 'Data Analyst',
  ],
  authors: [{ name: 'Sriraam N', url: 'https://github.com/Sriram2004-git' }],
  openGraph: {
    type: 'website',
    title: 'Sriraam N — AI & Data Science Engineer',
    description: 'Building production-grade AI systems — RAG pipelines, LLM orchestration, and intelligent automation.',
    siteName: 'Sriraam N Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sriraam N — AI & Data Science Engineer',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

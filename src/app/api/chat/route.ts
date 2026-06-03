import { SRIRAAM_SYSTEM_PROMPT } from '@/data/aiQA'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const apiKey = process.env.GOOGLE_AI_API_KEY
  const model = process.env.GOOGLE_AI_MODEL ?? 'gemini-2.0-flash'

  if (!apiKey) {
    return new Response('AI service is not configured. GOOGLE_AI_API_KEY is missing.', { status: 503 })
  }

  const fullMessages: Message[] = [
    { role: 'system', content: SRIRAAM_SYSTEM_PROMPT },
    ...messages,
  ]

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: fullMessages,
          stream: true,
        }),
        signal: AbortSignal.timeout(30000),
      }
    )

    if (!response.ok || !response.body) {
      const err = await response.text()
      console.error('Google AI error:', err)
      return new Response('AI service unavailable', { status: 503 })
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader()
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n').filter(Boolean)
            for (const line of lines) {
              if (!line.startsWith('data: ')) continue
              const data = line.slice(6).trim()
              if (data === '[DONE]') { controller.close(); return }
              try {
                const parsed = JSON.parse(data)
                const token = parsed?.choices?.[0]?.delta?.content ?? ''
                if (token) controller.enqueue(encoder.encode(token))
              } catch {
                // skip malformed SSE lines
              }
            }
          }
          controller.close()
        } catch {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new Response('Failed to connect to AI service', { status: 503 })
  }
}

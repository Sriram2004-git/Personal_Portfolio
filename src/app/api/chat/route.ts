import { SRIRAAM_SYSTEM_PROMPT } from '@/data/aiQA'

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const ollamaUrl = process.env.OLLAMA_API_URL ?? 'http://localhost:11434'
  const model = process.env.OLLAMA_MODEL ?? 'gpt-oss:120b-cloud'
  const apiKey = process.env.OLLAMA_API_KEY

  const fullMessages: OllamaMessage[] = [
    { role: 'system', content: SRIRAAM_SYSTEM_PROMPT },
    ...messages,
  ]

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`

  try {
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: fullMessages,
        stream: true,
      }),
    })

    if (!response.ok || !response.body) {
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
              try {
                const parsed = JSON.parse(line)
                const token = parsed?.message?.content ?? ''
                if (token) controller.enqueue(encoder.encode(token))
                if (parsed?.done) {
                  controller.close()
                  return
                }
              } catch {
                // skip malformed JSON lines
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

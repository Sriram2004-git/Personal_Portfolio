import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'resume.pdf')
    const file = await readFile(filePath)

    return new Response(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Sriraam_N_Resume.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return new Response('Resume not found', { status: 404 })
  }
}

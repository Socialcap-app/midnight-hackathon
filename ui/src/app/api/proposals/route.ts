import { createHelia } from 'helia'
import { strings } from '@helia/strings'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const helia = await createHelia()
    const s = strings(helia)
    const proposalDocumentAddress = await s.add(body.richTextContent)

    // const richText = await s.get(proposalDocumentAddress)

    return Response.json(
      { success: true, cid: proposalDocumentAddress },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error'

    return Response.json({ message, success: false }, { status: 500 })
  }
}

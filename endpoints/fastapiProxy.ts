// endpoints/fastapiProxy.ts
import type { PayloadRequest } from 'payload'
import type { Response } from 'express'
import type { CollectionConfig } from 'payload/types'

// We export an “endpoint” object that Payload will pick up
const fastapiProxy: CollectionConfig['endpoints'][0] = {
  path: '/api/proxy/image-upload',
  method: 'post',
  handler: async (req: PayloadRequest, res: Response) => {
    try {
      // Grab the uploaded file from Payload’s multipart parser
      const file = req.files?.file?.[0]  // adjust if your field is named differently
      if (!file) {
        return res.status(400).json({ error: 'No file provided' })
      }

      // Rebuild a FormData to send to FastAPI
      const form = new FormData()
      form.append('file', Buffer.from(file.buffer), file.originalname)

      // Forward to your FastAPI
      const fastapiRes = await fetch(
        `${process.env.API_BASE_URL}/image-upload/`,
        {
          method: 'POST',
          headers: {
            'X-API-KEY': process.env.FASTAPI_API_KEY,
          },
          body: form as any, // Node’s global FormData
        }
      )
      const json = await fastapiRes.json()
      return res.status(fastapiRes.status).json(json)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Proxy error' })
    }
  },
}

export default fastapiProxy

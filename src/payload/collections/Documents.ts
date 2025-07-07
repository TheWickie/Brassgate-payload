// collections/Documents.ts

import { CollectionConfig } from 'payload/types'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',    // your media slug
      required: true,
      admin: {
        description: 'Upload the PDF or txt document here.',
      },
    },
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
    {
      name: 'chunkCount',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'source',
      type: 'select',
      options: ['Uploaded', 'Manual', 'Merged'],
      defaultValue: 'Uploaded',
      required: true,
    },
    {
      name: 'approved',
      type: 'checkbox',
      label: 'Approved for Use',
      defaultValue: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'usedInPosts',
      type: 'relationship',
      relationTo: 'generated-posts',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'textarea',
      admin: {
        readOnly: true,
        rows: 12,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-fill the filename text field from the uploaded file
        if (data.file?.filename) {
          data.filename = data.file.filename
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        if (!doc.file?.url) return
        // Fetch the file binary from Payload, then forward it to FastAPI
        const response = await fetch(doc.file.url)
        const blob = await response.blob()
        const form = new FormData()
        form.append('file', blob, doc.file.filename)
        await fetch(`${process.env.API_BASE_URL}/upload/`, {
          method: 'POST',
          headers: {
            'X-API-KEY': process.env.FASTAPI_API_KEY,
          },
          body: form,
        })
      },
    ],
  },
}

export default Documents

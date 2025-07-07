import { CollectionConfig } from 'payload/types'
import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'uploads',
    // … any other upload config you had …
  },
  access: {
    create: () => true,
    update: () => true,
    delete: () => true,
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        // Only process images
        if (!doc.url || !doc.mimeType?.startsWith('image/')) {
          return
        }
        await fetch(`${process.env.API_BASE_URL}/image-upload-webhook/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.FASTAPI_API_KEY,
          },
          body: JSON.stringify({
            filename: doc.url,
            caption: '',
          }),
        })
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          LinkFeature({}),
        ],
      }),
    },
  ],
}

export default Media

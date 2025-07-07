import type { CollectionConfig } from 'payload/types'
import path from 'path'
import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '/mnt/data/media', // works with Render persistent disk
    staticURL: '/media',
    mimeTypes: ['image/*'],
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

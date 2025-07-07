import { CollectionConfig } from 'payload/types'

export const GeneratedPosts: CollectionConfig = {
  slug: 'generated-posts',
  admin: {
    useAsTitle: 'platform',
    defaultColumns: ['platform', 'theme', 'approved'],
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      options: [
        'Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'Discord',
        'Bluesky', 'TikTok', 'YouTube', 'Email', 'Blog', 'Article'
      ],
      required: true,
    },
    {
      name: 'theme',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
      admin: {
        rows: 10,
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sentToN8n',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default GeneratedPosts

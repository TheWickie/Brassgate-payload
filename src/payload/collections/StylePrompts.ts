import { CollectionConfig } from 'payload/types'

const StylePrompts: CollectionConfig = {
  slug: 'style-prompts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default StylePrompts

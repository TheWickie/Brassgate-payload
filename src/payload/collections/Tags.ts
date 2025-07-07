import { CollectionConfig } from 'payload/types'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}

export default Tags

import { CollectionConfig } from 'payload/types'

export const PostPlans: CollectionConfig = {
  slug: 'post-plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'frequency', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'theme',
      type: 'text',
      required: true,
    },
    {
      name: 'frequency',
      type: 'select',
      options: ['daily', 'weekly', 'monthly'],
      defaultValue: 'daily',
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default PostPlans

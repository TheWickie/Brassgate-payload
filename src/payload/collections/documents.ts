import { CollectionConfig } from 'payload/types'

const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'approved', 'chunkCount'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
      name: 'content',
      type: 'textarea',
      admin: {
        readOnly: true,
        rows: 12,
      },
    },
  ],
}

export default Documents

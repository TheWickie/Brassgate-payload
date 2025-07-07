import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import type { GenerateTitle } from '@payloadcms/plugin-seo/types';

import { payloadCloud } from '@payloadcms/plugin-cloud';
// import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs';
import redirects from '@payloadcms/plugin-redirects';
import seo from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload/config';

// 🧩 Admin UI components
import BeforeDashboard from './components/BeforeDashboard';
import BulkImageUploader from './components/BulkImageUploader';
import BeforeLogin from './components/BeforeLogin';

// 📦 Collections
import Categories from './collections/Categories';
import Comments from './collections/Comments';
import { Documents } from './collections/Documents';
import { GeneratedPosts } from './collections/GeneratedPosts';
import { PostPlans } from './collections/PostPlans';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Projects } from './collections/Projects';
import { StylePrompts } from './collections/StylePrompts';
import { Media } from './collections/Media';
import { Tags } from './collections/Tags';
import { Users } from './collections/Users';

// 🌐 Globals
// import { clearDBEndpoint, resetDBEndpoint, seedDBEndpoint } from './endpoints/resetDB'
import { Footer } from './globals/Footer';
import { Header } from './globals/Header';
import { Settings } from './globals/Settings';

const generateTitle: GenerateTitle = () => {
  return 'Payload Public Demo';
};

const m = path.resolve(__dirname, './emptyModuleMock.js');

export default buildConfig({
  admin: {
    autoLogin: {
      email: 'demo@payloadcms.com',
      password: 'demo',
      prefillOnly: true,
    },
    bundler: webpackBundler(),
    components: {
      beforeDashboard: [BeforeDashboard, BulkImageUploader],
      beforeLogin: [BeforeLogin],
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375,
        },
      ],
    },
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          express: m,
          [path.resolve(__dirname, './cron/reset')]: m,
        },
      },
    }),
  },
  collections: [
    Pages,
    Posts,
    Projects,
    Media,
    Documents,
    StylePrompts,
    PostPlans,
    GeneratedPosts,
    Tags,
    Categories,
    Users,
    Comments,
  ],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  editor: lexicalEditor({}),
  // endpoints: [resetDBEndpoint, seedDBEndpoint, clearDBEndpoint],
  globals: [Settings, Header, Footer],
  graphQL: {
    disablePlaygroundInProduction: false,
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  rateLimit: {
    max: 10000,
    trustProxy: true,
    window: 2 * 60 * 1000,
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  plugins: [
    redirects({
      collections: ['pages', 'posts'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'posts', 'projects'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
  ],
});

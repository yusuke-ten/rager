import type { WeaviateClient } from 'weaviate-ts-client'

import weaviate from 'weaviate-ts-client'

export const weaviateClient: WeaviateClient = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEME || 'http',
  host: process.env.WEAVIATE_HOST || 'localhost:8080',
})

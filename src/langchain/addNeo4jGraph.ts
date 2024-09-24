import type { Document } from '@langchain/core/documents'

import 'neo4j-driver'
import { Neo4jGraph } from '@langchain/community/graphs/neo4j_graph'
import { LLMGraphTransformer } from '@langchain/community/experimental/graph_transformers/llm'

import { chatOpenAI } from '../../src/lib/models'

const url = `bolt://localhost:${process.env.EXPOSE_NEO4J_BOLT_PORT}`
const username = 'neo4j'
const password = 'password'

const llmGraphTransformer = new LLMGraphTransformer({
  llm: chatOpenAI,
})

export const addNeo4jGraph = async (chunkedDocs: Document[]) => {
  const graph = await Neo4jGraph.initialize({ url, username, password })
  const graphDocuments = await llmGraphTransformer.convertToGraphDocuments(chunkedDocs)

  await graph.addGraphDocuments(graphDocuments, {
    baseEntityLabel: true,
    includeSource: true,
  })
}

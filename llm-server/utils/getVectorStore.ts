import { StoreOptions } from '@/interfaces/storeOptions.interface';
import { StoreType } from './store.enum';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { QdrantVectorStore } from 'langchain/vectorstores/qdrant';
import { VectorStore } from 'langchain/dist/vectorstores/base';
import { PINECONE_TEXT_KEY } from '@/config/pinecone';
import { getEmbeddings } from './getEmbedding';

export async function getVectorStore(
  options: StoreOptions,
): Promise<VectorStore> {
  let vectorStore: VectorStore;

  const embeddings = getEmbeddings();
  switch (process.env.STORE) {
    case StoreType.PINECONE:
      const pineconeIndex = options.index!;

      vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
          pineconeIndex,
          namespace: options.namespace,
          textKey: PINECONE_TEXT_KEY,
        },
      );
      break;

    case StoreType.QDRANT:
      vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          collectionName: options.namespace,
          url: process.env.QDRANT_URL,
        },
      );
      break;

    default:
      throw new Error('Invalid STORE environment variable value');
  }

  return vectorStore;
}

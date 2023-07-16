import {OpenAIEmbeddings} from 'langchain/embeddings/openai';
import {CohereEmbeddings} from 'langchain/embeddings/cohere';
import { Embeddings } from 'langchain/dist/embeddings/base';

export function getEmbeddings(): Embeddings {
  const embeddingsEnv = process.env.EMBEDDINGS;

  if (embeddingsEnv === 'openai') {
    return new OpenAIEmbeddings();
  } else if (embeddingsEnv === 'cohere') {
    return new CohereEmbeddings({apiKey: process.env.COHERE_EMBEDDINGS_API_KEY});
  } else {
    throw new Error('Invalid EMBEDDINGS environment variable');
  }
}

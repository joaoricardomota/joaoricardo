import { Redis } from '@upstash/redis'

// Cria conexão com Upstash Redis usando variáveis de ambiente
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default redis

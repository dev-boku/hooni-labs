import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

// Get DB instance from Cloudflare Workers env
// Usage in server functions: const db = getDb(env.DB)
export function getDb(d1: D1Database) {
  return drizzle(d1, { schema })
}

// Export type for use in server functions
export type Database = ReturnType<typeof getDb>

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '#/lib/db/schema'

export function createAuth(d1: D1Database) {
  const db = drizzle(d1, { schema, logger: false })

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema,
    }),
    plugins: [tanstackStartCookies()],
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      },
      kakao: {
        clientId: process.env.KAKAO_CLIENT_ID ?? '',
        clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
      },
    },
  })
}

export type Auth = ReturnType<typeof createAuth>

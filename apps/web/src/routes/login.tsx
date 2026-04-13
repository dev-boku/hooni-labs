import { createFileRoute } from '@tanstack/react-router'
import SocialLoginButtons from '../components/SocialLoginButtons'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  return (
    <main className="page-wrap flex min-h-[80vh] items-center justify-center px-4 pb-8">
      <section className="island-shell rise-in w-full max-w-md rounded-[2rem] px-8 py-10 sm:px-10">
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.24),transparent_66%)]" />

        <div className="mb-8 text-center">
          <p className="island-kicker mb-3">Welcome</p>
          <h1 className="display-title text-2xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-3xl">
            Sign in to Hooni Labs
          </h1>
          <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
            Choose a provider to get started
          </p>
        </div>

        <SocialLoginButtons />

        <p className="mt-8 text-center text-xs text-[var(--sea-ink-soft)]">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
    </main>
  )
}

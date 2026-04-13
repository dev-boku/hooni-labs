# Hooni Labs

A modern web application template built with TanStack Start + React 19, designed for rapid development of production-ready applications.

## Tech Stack

- **Frontend Framework**: TanStack Start + React 19
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand + TanStack Query
- **Authentication**: Auth.js v5 (social login ready)
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: pnpm
- **Monorepo Tool**: Turborepo
- **Testing**: Vitest
- **Linting**: oxlint + oxfmt
- **CI/CD**: GitHub Actions + Vercel

## Project Structure

```
.
├── apps/
│   └── web/                 # Main TanStack Start application
│       ├── src/
│       │   ├── app/         # App components
│       │   ├── components/  # React components
│       │   ├── lib/         # Utilities (api, db, auth)
│       │   ├── store/       # Zustand stores
│       │   └── routes/      # TanStack Router file-based routes
│       └── package.json
├── packages/                # Shared packages
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── typescript-config/  # Shared TypeScript configuration
│   ├── prettier-config/    # Shared Prettier configuration
│   ├── utils/              # Shared utility functions
│   ├── constants/          # Shared constants
│   └── logger/             # Shared logger
└── .claude/
    └── commands/           # Custom Claude Code commands
        ├── 1-plan.md       # Feature planning
        ├── 2-test.md       # Test planning
        ├── 3-dev.md        # Development checklist
        └── 4-verify.md     # Pre-commit verification
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Start specific app
pnpm --filter @hooni-labs/web dev
```

### Building

```bash
# Build all packages
pnpm build

# Build specific app
pnpm --filter @hooni-labs/web build
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm format` - Format code with oxfmt
- `pnpm clean` - Clean build artifacts

## Claude Code Commands

This template includes custom commands to streamline your development workflow:

### `/1-plan`
Create comprehensive feature plans with requirements, technical approach, and implementation steps.

### `/2-test`
Generate test specifications including unit, integration, and E2E test cases.

### `/3-dev`
Follow a structured development checklist to implement features systematically.

### `/4-verify`
Run all quality checks (typecheck, lint, test, build) before committing.

## Environment Variables

Copy `.env.example` to `.env.local` and configure your environment variables:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Required environment variables:
- `NEXT_PUBLIC_APP_URL` - Your application URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `AUTH_SECRET` - Auth.js secret key
- Social provider credentials (Google, GitHub, etc.)

## Deployment

This template is configured for Vercel deployment:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy

The `vercel.json` configuration is already set up for optimal deployment.

## Contributing

1. Use the `/1-plan` command to plan your feature
2. Use `/2-test` to create test specifications
3. Use `/3-dev` to implement the feature
4. Use `/4-verify` to run quality checks
5. Create a pull request

## License

MIT

## Support

For issues and questions, please use the GitHub issue tracker.
# hooni-labs

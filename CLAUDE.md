# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a **Turborepo monorepo** using **TanStack Start** (built on Vinxi) with React 19. The architecture follows a modular design with shared packages and a main web application.

### Tech Stack
- **Framework**: TanStack Start (Vinxi-based SSR framework) + React 19
- **Router**: TanStack Router with file-based routing in `apps/web/src/app/routes/`
- **State Management**: Zustand (client state) + TanStack Query (server state)
- **UI**: shadcn/ui components + Tailwind CSS
- **Database**: Supabase (PostgreSQL) with typed schemas
- **Auth**: Auth.js v5 (configured but providers need setup)
- **Testing**: Vitest
- **Linting/Formatting**: oxlint + oxfmt

### Monorepo Structure
```
apps/web/              # Main TanStack Start application
├── src/
│   ├── app/routes/   # File-based routes (auto-generated routeTree.gen)
│   ├── components/   # React components (ui/ for shadcn components)
│   ├── lib/          # Core utilities (api, auth, db, utils)
│   ├── store/        # Zustand stores (auth, UI state)
│   └── main.tsx      # App entry point with router + QueryClient
└── vite.config.ts    # Vinxi config with TanStack Router plugin

packages/              # Shared workspace packages
├── eslint-config/    # Shared ESLint configuration
├── typescript-config/# Shared TypeScript configuration
├── prettier-config/  # Shared Prettier configuration
├── utils/            # Shared utility functions
├── constants/        # Shared constants
└── logger/           # Shared logger
```

## Development Commands

### Core Commands
```bash
pnpm dev              # Start development server (runs on port 3000)
pnpm build            # Build all packages and apps
pnpm typecheck        # TypeScript type checking
pnpm lint             # Run ESLint
pnpm test             # Run Vitest tests
pnpm format           # Format code with oxfmt
pnpm clean            # Clean build artifacts
```

### Package-Specific Commands
```bash
# Run commands for specific packages
pnpm --filter @hooni-labs/web dev
pnpm --filter @hooni-labs/utils test
```

### Running Single Tests
```bash
# Run tests for a specific package
pnpm --filter <package-name> test

# Run tests in watch mode
pnpm --filter <package-name> test --watch
```

## Key Architectural Patterns

### Routing (TanStack Start)
- Routes are defined in `apps/web/src/app/routes/`
- TanStack Router generates `routeTree.gen` automatically
- Use `createRootRoute`, `createRoute` from `@tanstack/react-router`
- Routes are file-based but configured programmatically

### State Management
- **Zustand stores** in `apps/web/src/store/` for client-side state (auth, UI)
- **TanStack Query** for server state (configured in `main.tsx`)
- Auth state: `useAuthStore` (user, loading, error)
- UI state: `useUIStore` (sidebar, theme)

### API Layer
- Centralized API client in `apps/web/src/lib/api/client.ts`
- Provides typed `get`, `post`, `put`, `delete` methods
- Error handling built-in with `ApiResponse<T>` wrapper

### Database Integration
- Supabase client in `apps/web/src/lib/db/supabase.ts`
- TypeScript types for database schema in `Database` type
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Authentication
- Auth.js v5 config in `apps/web/src/lib/auth/config.ts`
- Social providers ready but need credentials setup
- Session strategy: JWT
- Auth pages: `/auth/signin`, `/auth/signout`, `/auth/error`

## Custom Claude Code Commands

The repository includes a comprehensive AI agent system with specialized commands in `.claude/commands/`:

### AI-Powered Workflow Commands

#### `/0-auto` (Auto-Pilot Mode)
Fully automated development workflow. Runs the complete cycle from planning to verification without human intervention.
- Automatically executes `/1-plan` → `/2-test` → `/3-impl` → `/4-verify`
- Best for well-defined features with clear requirements
- Includes built-in conflict resolution and failure handling

#### `/1-plan` (PM Agent)
Create comprehensive feature plans with requirements, technical approach, and implementation steps.
- **Agent**: PM Agent (Product Manager)
- **Creates**: PRD (`.context/prd.md`) and Task List (`.context/tasks.json`)
- **Consults**: TPM Agent for technical feasibility
- **Output**: Detailed project plan with task breakdown

#### `/2-test` (Test Expert Agent)
Generate comprehensive test specifications including unit, integration, and E2E test cases.
- **Agent**: Test Expert Agent
- **Creates**: Test plans in `.context/test-plans/{task-id}.md`
- **Defines**: Coverage requirements, test cases, success criteria
- **Output**: Detailed test specifications for each task

#### `/3-impl` (Web Dev & Server Dev Agents)
Implement features systematically with specialized development agents.
- **Agents**: Web Dev Agent + Server Dev Agent (work separately or together)
- **Web Dev**: Frontend implementation (React, TanStack, UI components)
- **Server Dev**: Backend implementation (Supabase, PostgreSQL, RLS)
- **Collaboration**: TPM Agent mediates technical conflicts
- **Output**: Fully implemented feature with tests

#### `/4-verify` (QA Agent)
Run comprehensive quality checks and validate implementation quality.
- **Agent**: QA Agent
- **Executes**: All tests (unit, integration, E2E, typecheck, lint, build)
- **Analyzes**: Test results, identifies bugs, creates failure reports
- **Iterates**: Works with Dev Agents until quality gates pass
- **Output**: Quality verification and failure analysis (`.context/failure-analysis.md`)

### AI Agent System

The repository includes 6 specialized AI agents:

1. **PM Agent** (`.claude/agents/pm-agent.md`)
   - Product planning and task management
   - PRD creation and maintenance
   - Timeline and risk management

2. **TPM Agent** (`.claude/agents/tpm-agent.md`)
   - Technical architecture and guidance
   - Conflict resolution between Web and Server Dev
   - Technical feasibility analysis

3. **Test Expert Agent** (`.claude/agents/test-expert-agent.md`)
   - Test strategy and design
   - Test planning and specification
   - Coverage requirements and quality benchmarks

4. **Web Dev Agent** (`.claude/agents/web-dev-agent.md`)
   - Frontend development (React 19, TanStack Start)
   - Component architecture and state management
   - UI/UX implementation and accessibility

5. **Server Dev Agent** (`.claude/agents/server-dev-agent.md`)
   - Backend development (Supabase, PostgreSQL)
   - Database design and RLS policies
   - API development and performance optimization

6. **QA Agent** (`.claude/agents/qa-agent.md`)
   - Test execution and quality verification
   - Bug detection and failure analysis
   - Quality gate enforcement and regression prevention

## Development Workflow

### Manual Workflow (Step-by-Step)
1. **Plan**: `/1-plan` - PM Agent creates PRD and task list
2. **Test**: `/2-test` - Test Expert creates test specifications
3. **Implement**: `/3-impl` - Dev Agents implement features
4. **Verify**: `/4-verify` - QA Agent validates quality

### Auto-Pilot Workflow (Fully Automated)
1. **Start**: `/0-auto "Feature description"`
2. **Auto-execute**: Runs all phases automatically
3. **Monitor**: Progress updates and decision points
4. **Complete**: Review artifacts and deploy

### Context Management

All project context is stored in `.context/`:
- `prd.md` - Product Requirements Document
- `tasks.json` - Task list with status tracking
- `progress.json` - Overall project progress and metrics
- `failure-analysis.md` - Failure log and lessons learned
- `test-plans/` - Test specifications for each task

## Skills and Rules

### Specialized Skills (`.claude/skills/`)
- **Planning**: Requirements analysis, task breakdown
- **Testing**: Test strategy, coverage planning
- **Web Development**: React patterns, performance optimization
- **Database**: Schema design, RLS policies, query optimization
- **QA**: Test execution, failure analysis, quality gates

### Development Rules (`.claude/rules/`)
- **Development Rules**: Code quality standards, testing requirements, documentation guidelines
- All agents must follow these rules during implementation

## Environment Setup

Required environment variables in `apps/web/.env.local`:
- `NEXT_PUBLIC_APP_URL` - Application URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `AUTH_SECRET` - Auth.js secret key
- Social provider credentials (Google, GitHub, etc.)

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- `ci.yml` - Runs typecheck, lint, test, and build in parallel
- `format.yml` - Checks code formatting

All checks must pass before merging.

## Code Conventions

- **Import alias**: `@/` maps to `apps/web/src/`
- **Component structure**: shadcn/ui components in `components/ui/`
- **Utilities**: Shared functions in `apps/web/src/lib/utils.ts`
- **Shared packages**: Import from `@hooni-labs/*` packages
- **Conventional commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

## Important Notes

- Routes must be configured in `apps/web/src/app/routes/` to be picked up by TanStack Router
- The route tree is auto-generated - don't manually edit `routeTree.gen`
- Zustand stores are used for global state, prefer TanStack Query for server data
- All shared code should go in `packages/` to maintain modularity
- Always run `pnpm typecheck` before committing to catch type errors early

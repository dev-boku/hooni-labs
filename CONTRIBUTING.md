# Contributing to Hooni Labs

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Workflow

We use a structured workflow to ensure code quality:

### 1. Plan Your Feature

Use the `/1-plan` command to create a comprehensive plan:
- Define requirements
- Outline technical approach
- Break down implementation steps

### 2. Create Tests

Use the `/2-test` command to plan your tests:
- Unit tests
- Integration tests
- E2E tests (if applicable)

### 3. Implement

Use the `/3-dev` command to follow the development checklist:
- Create/update components
- Implement business logic
- Add error handling
- Test frequently

### 4. Verify

Use the `/4-verify` command before committing:
- Run typecheck: `pnpm typecheck`
- Run lint: `pnpm lint`
- Run tests: `pnpm test`
- Build: `pnpm build`

## Code Style

We use **oxlint** and **oxfmt** for consistent code style:

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check
```

## Commit Messages

Follow conventional commit format:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes following the workflow above
4. Ensure all checks pass
5. Submit a pull request with a clear description

## Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

## Questions?

Feel free to open an issue for discussion before starting work on large features.

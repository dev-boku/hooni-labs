# @hooni-labs/typescript-config

Shared TypeScript configuration for Hooni Labs projects.

## Available Configs

- `base.json` - Base TypeScript configuration
- `nextjs.json` - Next.js/TanStack Start configuration
- `react-library.json` - React library configuration

## Usage

In your `tsconfig.json`:

```json
{
  "extends": "@hooni-labs/typescript-config/nextjs.json"
}
```

## Features

- Strict mode enabled
- Path aliases
- Module resolution
- TypeScript 5+ features

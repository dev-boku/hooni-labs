# @hooni-labs/utils

Shared utility functions for Hooni Labs projects.

## Utilities

### `formatRelativeTime(date: Date): string`
Format date to relative time string (e.g., "2h ago", "3d ago")

### `debounce(fn: Function, delay: number): Function`
Debounce function execution

### `throttle(fn: Function, limit: number): Function`
Throttle function execution

### `generateId(): string`
Generate unique ID

### `safeJsonParse<T>(json: string, fallback: T): T`
Safely parse JSON with fallback

### `clamp(num: number, min: number, max: number): number`
Clamp number between min and max

### `formatNumber(num: number): string`
Format number with suffixes (K, M, B)

## Usage

```typescript
import { formatRelativeTime, debounce } from '@hooni-labs/utils'

const time = formatRelativeTime(new Date())
const debouncedFn = debounce(myFunction, 300)
```

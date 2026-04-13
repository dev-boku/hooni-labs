# @hooni-labs/logger

Shared logger for Hooni Labs projects.

## Features

- Multiple log levels (info, warn, error, debug)
- Development mode detection
- Contextual logging
- Timestamp formatting

## Usage

```typescript
import { logger } from '@hooni-labs/logger'

logger.info('User logged in', { userId: '123' })
logger.warn('API rate limit approaching', { remaining: 10 })
logger.error('Database connection failed', { error: err })
logger.debug('Cache hit', { key: 'user:123' })
```

## Log Levels

- `info` - General information
- `warn` - Warning messages
- `error` - Error messages (always logged)
- `debug` - Debug messages (development only)

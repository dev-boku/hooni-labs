# @hooni-labs/constants

Shared constants for Hooni Labs projects.

## Constants

### Application
- `APP_NAME` - Application name
- `APP_URL` - Application URL
- `API_BASE_URL` - API base URL

### Environment
- `IS_DEV` - Development mode check
- `IS_PROD` - Production mode check

### Configuration
- `DEFAULT_PAGINATION` - Default pagination settings
- `MAX_FILE_SIZE` - Maximum file upload size
- `ALLOWED_IMAGE_TYPES` - Allowed image MIME types
- `DATE_FORMAT` - Date format strings

## Usage

```typescript
import { APP_NAME, API_BASE_URL } from '@hooni-labs/constants'

console.log(`Welcome to ${APP_NAME}`)
fetch(`${API_BASE_URL}/users`)
```

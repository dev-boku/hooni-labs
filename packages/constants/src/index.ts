/**
 * Application-wide constants
 */

export const APP_NAME = 'Hooni Labs'

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const IS_PROD = process.env.NODE_ENV === 'production'

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

export const DATE_FORMAT = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM',
}

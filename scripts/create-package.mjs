#!/usr/bin/env node

/**
 * Turborepo Package Generator
 *
 * Creates a new package in the packages/ directory from templates.
 *
 * Usage:
 *   node scripts/create-package.mjs <package-name>
 *
 * Examples:
 *   node scripts/create-package.mjs validators
 *   # Creates packages/validators/ with @hooni-labs/validators
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const templateDir = resolve(rootDir, 'templates', 'package')

const packageName = process.argv[2]

if (!packageName) {
  console.error('Usage: node scripts/create-package.mjs <package-name>')
  console.error('Example: node scripts/create-package.mjs validators')
  process.exit(1)
}

// Validate package name (lowercase, hyphens, alphanumeric)
if (!/^[a-z][a-z0-9-]*$/.test(packageName)) {
  console.error(
    `Invalid package name "${packageName}". Use lowercase letters, numbers, and hyphens.`,
  )
  process.exit(1)
}

const targetDir = resolve(rootDir, 'packages', packageName)

if (existsSync(targetDir)) {
  console.error(`Package "${packageName}" already exists at ${targetDir}`)
  process.exit(1)
}

// Create target directories
mkdirSync(resolve(targetDir, 'src'), { recursive: true })

// Process template files
const templateFiles = ['package.json', 'tsconfig.json', 'src/index.ts']

for (const file of templateFiles) {
  const templatePath = resolve(templateDir, file)
  const targetPath = resolve(targetDir, file)

  if (!existsSync(templatePath)) {
    console.warn(`Template file not found: ${templatePath}, skipping`)
    continue
  }

  const content = readFileSync(templatePath, 'utf-8')
  const processed = content.replaceAll('{{PACKAGE_NAME}}', packageName)

  writeFileSync(targetPath, processed)
  console.log(`  Created: packages/${packageName}/${file}`)
}

console.log(
  `\nPackage "@hooni-labs/${packageName}" created successfully!`,
)
console.log('\nNext steps:')
console.log(`  1. cd packages/${packageName}`)
console.log('  2. pnpm install')
console.log(`  3. Edit src/index.ts to add your exports`)

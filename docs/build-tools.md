# Build Tools and Scripts Documentation

This document provides a comprehensive overview of the build tools and scripts used in both the headless package and web app as part of Task 1.13 in the package merge process.

## Current Build Tools Overview

| Build Tool | Used By | Purpose | Configuration File |
|------------|---------|---------|-------------------|
| Next.js | Web App | Web application build and deployment | next.config.js |
| tsup | Headless | TypeScript library bundling | tsup.config.ts |
| TypeScript | Both | Type checking and compilation | tsconfig.json |
| Turborepo | Root | Monorepo build orchestration | turbo.json |
| Biome | Both | Linting and formatting | biome.json |

## Build Scripts Comparison

### Headless Package Scripts

```json
{
  "scripts": {
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "build": "tsup",
    "lint": "biome lint ./src",
    "format": "biome format ./src "
  }
}
```

### Web App Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome lint .",
    "format": "biome format . ",
    "typecheck": "tsc --noEmit"
  }
}
```

### Root Project Scripts

```json
{
  "scripts": {
    "changeset": "changeset",
    "publish:packages": "changeset publish",
    "version:packages": "turbo build && changeset version",
    "build": "turbo build",
    "dev": "turbo dev",
    "format": "turbo format --continue --",
    "format:fix": "turbo format --continue -- --write",
    "lint": "turbo lint --continue --",
    "lint:fix": "turbo lint --continue -- --apply",
    "clean": "turbo clean",
    "release": "turbo run release",
    "prepare": "husky install",
    "typecheck": "turbo typecheck"
  }
}
```

## Build Configuration Details

### 1. tsup Configuration (Headless Package)

**File**: `packages/headless/tsup.config.ts`

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
```

This configuration:
- Builds from the `src/index.ts` entry point
- Creates both ESM and CommonJS output formats
- Generates TypeScript declaration files (`.d.ts`)
- Disables code splitting
- Includes sourcemaps
- Cleans the output directory before building

### 2. Next.js Configuration (Web App)

**File**: `apps/web/next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["mindcraft-editor"],
  // ... other Next.js configuration
};

module.exports = nextConfig;
```

Key features:
- Enables React Strict Mode
- Transpiles the `mindcraft-editor` package to ensure compatibility
- May include additional Next.js specific configuration

### 3. TypeScript Configuration

#### Headless Package
**File**: `packages/headless/tsconfig.json`

```json
{
  "extends": "tsconfig/base.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### Web App
**File**: `apps/web/tsconfig.json`

```json
{
  "extends": "tsconfig/next.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. Turborepo Configuration

**File**: `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {},
    "format": {},
    "clean": {
      "cache": false
    }
  }
}
```

This configuration:
- Defines build pipelines and dependencies
- Specifies which outputs should be cached
- Configures various development commands

## Build Process Analysis

### Headless Package Build Process

1. **Development Mode**: `tsup --watch`
   - Watches source files for changes
   - Rebuilds automatically on change
   - Outputs to `dist/` directory

2. **Production Build**: `tsup`
   - Compiles TypeScript to JavaScript
   - Generates type definitions
   - Creates both ESM and CommonJS bundles
   - Output is optimized for distribution

3. **Type Checking**: `tsc --noEmit`
   - Verifies TypeScript types
   - Does not output any files
   - Used in CI/CD to ensure type safety

### Web App Build Process

1. **Development Mode**: `next dev`
   - Starts Next.js development server
   - Enables hot module replacement
   - Automatically transpiles imported packages (including mindcraft-editor)

2. **Production Build**: `next build`
   - Creates optimized production build
   - Performs code splitting
   - Generates static assets
   - Prepares for deployment

3. **Start Production**: `next start`
   - Starts the production server
   - Serves the optimized build

## Merged Build Process Recommendations

Based on the analysis of both build processes, here are the recommended changes for the merged codebase:

### 1. New Build Scripts for Web App package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:editor": "tsup lib/editor/index.ts --dts --format esm,cjs --outDir lib/editor/dist",
    "dev:editor": "tsup lib/editor/index.ts --dts --format esm,cjs --outDir lib/editor/dist --watch",
    "start": "next start",
    "lint": "biome lint .",
    "format": "biome format .",
    "typecheck": "tsc --noEmit"
  }
}
```

### 2. New tsup Configuration

Create a new file `apps/web/tsup.config.ts`:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/editor/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "lib/editor/dist",
});
```

### 3. Updated Next.js Configuration

Update `apps/web/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove transpilePackages since the editor code is now part of the web app
  // transpilePackages: ["mindcraft-editor"],
  // ... other Next.js configuration
};

module.exports = nextConfig;
```

### 4. Updated Turborepo Configuration

Update `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "build:editor": {
      "outputs": ["apps/web/lib/editor/dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "dev:editor": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {},
    "format": {},
    "clean": {
      "cache": false
    }
  }
}
```

## Build Process Integration Plan

To integrate the build processes, follow these steps:

### 1. Update Package Scripts

1. Add the new editor-specific build scripts to the web app package.json
2. Create the tsup configuration file for the editor code
3. Update the turborepo configuration to include the new build tasks

### 2. Ensure TypeScript Configuration Is Compatible

1. Move the shared tsconfig files from the tsconfig package to the web app
2. Update the paths in the web app's tsconfig.json to include the editor code
3. Ensure proper path aliases are set up for editor imports

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/editor/*": ["./lib/editor/*"],
      "@/editor": ["./lib/editor"],
      "@/editor-components/*": ["./components/editor/*"],
      "@/editor-components": ["./components/editor"]
    }
  }
}
```

### 3. Optimize Development Workflow

1. Modify the dev workflow to run both Next.js and the editor watcher simultaneously
2. Use a tool like `concurrently` to run multiple scripts in parallel

```json
{
  "scripts": {
    "dev:all": "concurrently \"npm run dev\" \"npm run dev:editor\""
  },
  "devDependencies": {
    "concurrently": "^7.0.0"
  }
}
```

### 4. Simplify CI/CD Pipeline

1. Update GitHub Actions or other CI/CD workflows to use the new build scripts
2. Ensure that the editor build runs before the Next.js build in the pipeline

## Conclusion

The merged build process will preserve the strengths of both existing systems:

1. **Next.js for Web Application**
   - Handles routing, server-side rendering, and web app optimization
   - Manages client-side code and UI components

2. **tsup for Editor Library**
   - Provides optimized bundling for the editor code
   - Generates type definitions for better developer experience
   - Enables future extraction into a separate package if needed

3. **Unified Development Experience**
   - Single repository with coordinated build processes
   - Simplified dependency management
   - Consistent tooling across all code

This approach provides the best of both worlds: the web app benefits from Next.js's optimizations, while the editor code maintains its library-like structure, making the codebase both maintainable and flexible for future changes.

**Next Steps:** With the analysis phase (Tasks 1.1-1.13) now complete, proceed to Phase 2: Environment Setup and Preparation. 
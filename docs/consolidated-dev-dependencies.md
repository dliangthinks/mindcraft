# Development Dependencies Consolidation

This document outlines the development dependencies that can be consolidated between the headless package and web app as part of Task 1.12 in the package merge process.

## Overview of Development Dependencies

| Dependency | Headless | Web App | Root | Consolidation Plan |
|------------|----------|---------|------|-------------------|
| @biomejs/biome | ✅ | ✅ | ✅ | Consolidate to root only |
| @types/katex | ✅ | ❌ | ❌ | Move to web app |
| @types/node | ✅ | ✅ | ❌ | Consolidate to web app |
| @types/react | ✅ | ✅ | ❌ | Consolidate to web app |
| @types/react-dom | ✅ | ✅ | ❌ | Consolidate to web app |
| tailwindcss | ❌ | ✅ | ❌ | Keep in web app |
| tsconfig | ✅ | ✅ | ❌ | Move configs to web app directly |
| tsup | ✅ | ❌ | ❌ | Keep in web app for build script |
| typescript | ✅ | ✅ | ❌ | Consolidate to web app |
| postcss | ❌ | ❌ | ✅ | Keep at root |
| husky | ❌ | ❌ | ✅ | Keep at root |
| @commitlint/* | ❌ | ❌ | ✅ | Keep at root |
| turbo | ❌ | ❌ | ✅ | Keep at root |
| @changesets/* | ❌ | ❌ | ✅ | Keep at root |

## Consolidation Recommendations

### 1. Linting and Formatting Tools

**Current Situation:**
- @biomejs/biome is installed in both packages and at the root
- Configuration files exist in multiple places

**Recommendation:**
- **Consolidate to root only**
- Keep a single biome.json configuration at the root
- Remove package-specific biome.json files
- Update scripts in package.json to use the root biome installation

**Implementation:**
```json
// Root package.json (unchanged)
{
  "devDependencies": {
    "@biomejs/biome": "^1.9.4"
  }
}

// Web app package.json (remove biome)
{
  "devDependencies": {
    // Remove @biomejs/biome
  },
  "scripts": {
    "lint": "biome lint .",
    "format": "biome format ."
  }
}
```

### 2. TypeScript and Type Definitions

**Current Situation:**
- TypeScript and type definitions are installed in both packages
- Version conflicts exist (see Task 1.11)
- The tsconfig package contains shared configurations

**Recommendation:**
- **Consolidate all type definitions to web app**
- Use the newer versions as identified in Task 1.11
- Move the shared TypeScript configurations into the web app directly
- Add any missing type definitions to the web app (e.g., @types/katex)

**Implementation:**
```json
// Web app package.json (updated)
{
  "devDependencies": {
    "@types/katex": "^0.16.7",
    "@types/node": "^22.10.6",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "typescript": "^5.7.3"
  }
}
```

### 3. Build Tools

**Current Situation:**
- tsup is used in the headless package for building
- The web app uses Next.js build process

**Recommendation:**
- **Keep tsup in the web app**
- tsup will be useful for building the editor code within the web app
- This maintains the ability to potentially extract the editor as a package later

**Implementation:**
```json
// Web app package.json (updated)
{
  "devDependencies": {
    "tsup": "^8.3.5"
  },
  "scripts": {
    "build:editor": "tsup lib/editor/index.ts --dts --format esm,cjs"
  }
}
```

### 4. Monorepo Tools

**Current Situation:**
- Monorepo tools (turbo, changesets, husky) are at the root
- They manage the overall repository workflow

**Recommendation:**
- **Keep monorepo tools at the root**
- No changes needed to these dependencies
- Update turbo.json to reflect the new project structure

**Implementation:**
```json
// turbo.json (updated excerpt)
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "build:editor": {
      "outputs": ["apps/web/lib/editor/dist/**"]
    }
  }
}
```

## Consolidated Development Dependencies

After merging, the simplified development dependencies will be:

### Root package.json
```json
{
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@changesets/changelog-github": "^0.5.0",
    "@changesets/cli": "^2.27.1",
    "@commitlint/cli": "^19.2.1",
    "@commitlint/config-conventional": "^19.1.0",
    "husky": "^9.0.11",
    "postcss": "^8.4.38",
    "turbo": "^2.3.3"
  }
}
```

### Web App package.json
```json
{
  "devDependencies": {
    "@types/katex": "^0.16.7",
    "@types/node": "^22.10.6",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "tailwindcss": "^3.4.1",
    "tsup": "^8.3.5",
    "typescript": "^5.7.3"
  }
}
```

## Benefits of Consolidation

1. **Simplified Dependency Management**
   - Fewer places to update dependencies
   - Reduced duplication of packages
   - Clear separation between project-level and app-level tools

2. **Consistent Tooling**
   - Single source of truth for linting and formatting
   - Unified TypeScript configuration
   - Standardized build process

3. **Reduced Disk Space and Install Time**
   - Fewer duplicate dependencies
   - Faster CI/CD pipelines
   - More efficient node_modules

4. **Easier Maintenance**
   - Clearer ownership of dependencies
   - Simpler upgrade path for tools
   - Less configuration to maintain

## Implementation Steps

1. **Update Web App package.json**
   - Add missing dependencies (@types/katex, tsup)
   - Update versions as recommended in Task 1.11
   - Add new build scripts for the editor

2. **Move TypeScript Configurations**
   - Copy configurations from packages/tsconfig to apps/web/tsconfig
   - Update references in tsconfig.json files

3. **Update Root Configuration**
   - Update turbo.json to reflect new structure
   - Ensure biome.json covers the entire project

4. **Clean Up**
   - Remove unnecessary configuration files
   - Verify that scripts still work as expected

**Next Steps:** Continue with Task 1.13 to document build tools and scripts from both packages. 
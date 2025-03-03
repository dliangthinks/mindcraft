# TypeScript Path Aliases for the New Structure

This document outlines the TypeScript path aliases plan for the merged codebase as part of Task 1.9 in the package merge process.

## Current Path Setup

Currently, the project uses the following path setup:

1. **Web App (`apps/web`)**:
   - Uses `@/` to refer to the root of the web app
   - Imports the headless package via `mindcraft-editor`

2. **Headless Package (`packages/headless`)**:
   - Uses relative imports within the package
   - No path aliases defined

## Proposed Path Aliases

The merged codebase will use the following TypeScript path aliases:

### 1. Base Path Alias

```json
"@/*": ["./*"]
```

This is the existing alias used in the Next.js project, allowing imports from the project root:

```typescript
// Example
import { Button } from '@/components/tailwind/ui/button';
```

### 2. Editor-specific Path Aliases

```json
"@/editor/*": ["./lib/editor/*"]
```

This alias provides direct access to the editor library:

```typescript
// Example
import { handleImageDrop } from '@/editor/utils';
import { AIHighlight } from '@/editor/extensions';
```

### 3. Editor API Alias

```json
"@/editor": ["./lib/editor"]
```

This alias provides access to the main editor API (without the /* so it maps directly to the index file):

```typescript
// Example
import { useEditor, EditorRoot } from '@/editor';
```

### 4. Editor Components Path Aliases

```json
"@/editor-components/*": ["./components/editor/*"]
```

This alias provides direct access to editor UI components:

```typescript
// Example
import { EditorCommandList } from '@/editor-components/core/command';
```

### 5. Editor Components API Alias

```json
"@/editor-components": ["./components/editor"]
```

This alias provides access to the main editor components API:

```typescript
// Example
import { EditorBubble } from '@/editor-components';
```

## Implementation in tsconfig.json

To implement these path aliases, the following configuration should be added to the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
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

## Import Resolution Strategy

### 1. Main Editor API Imports

For the majority of cases, web app components should import from the main editor API:

```typescript
import { useEditor, EditorRoot, EditorContent } from '@/editor';
```

This provides access to the entire public API with a single import.

### 2. Direct Component Imports

For cases where specific editor components need to be customized or extended:

```typescript
import { EditorBubble } from '@/editor-components';
```

### 3. Internal Development Imports

For editor development and internal use, more specific imports can be used:

```typescript
import { handleImageDrop } from '@/editor/utils';
import { AIHighlight } from '@/editor/extensions';
```

## Import Migration Strategy

When migrating from the current package structure to the new unified structure:

### Step 1: Identify Current Imports

Find all imports from the headless package:

```typescript
import { EditorRoot } from 'mindcraft-editor';
```

### Step 2: Replace with Path Alias

Replace with the appropriate path alias:

```typescript
import { EditorRoot } from '@/editor';
```

### Step 3: Handle Sub-module Imports

For specific sub-module imports, use the appropriate alias:

```typescript
// Before
import { addAIHighlight } from 'mindcraft-editor';

// After
import { addAIHighlight } from '@/editor';
// Or if needed directly:
import { addAIHighlight } from '@/editor/extensions/ai-highlight';
```

## Next.js Configuration

For Next.js to correctly resolve these path aliases:

1. **Next.js Config**:
   - No changes needed as Next.js automatically supports TypeScript path aliases

2. **ESLint Config**: Add this to enable ESLint to recognize the path aliases:
   ```json
   {
     "settings": {
       "import/resolver": {
         "typescript": {} // This enables ESLint to understand the path aliases
       }
     }
   }
   ```

## IDE Support

To ensure proper IDE support:

1. **VSCode**: The path aliases should work automatically with TypeScript's language service

2. **JetBrains IDEs**: May require configuring the webpack configuration in the IDE settings

## Testing Path Aliases

Once configured, path aliases should be tested in:

1. **Development environment**: Ensure hot reloading works correctly
2. **Build process**: Ensure Next.js can correctly resolve all paths
3. **Tests**: Ensure test files can correctly resolve imports

## Barrel Files Strategy

To further simplify imports, barrel files (index.ts) should be used to re-export components from each directory:

```typescript
// components/editor/index.ts
export * from './core/editor';
export * from './core/bubble';
export * from './core/command';
```

This allows for concise imports:

```typescript
import { EditorRoot, EditorBubble } from '@/editor-components';
```

## Absolute vs. Relative Imports

### Guidelines for when to use each:

1. **Use Path Aliases (Absolute Imports) when**:
   - Importing across different directories
   - Importing from core modules
   - When the import path would be more than two levels deep

2. **Use Relative Imports when**:
   - Importing within the same directory
   - Importing between closely related files
   - For local component imports that don't need to be exposed to the rest of the application

## Common Import Patterns

For consistency, here are the recommended import patterns for common scenarios:

### Main Editor Components

```typescript
// Recommended
import { EditorRoot, EditorContent } from '@/editor';

// Also acceptable for direct access
import { EditorRoot, EditorContent } from '@/editor-components';
```

### Editor Extensions

```typescript
// Recommended
import { AIHighlight, StarterKit } from '@/editor';

// For internal development
import { AIHighlight } from '@/editor/extensions';
```

### Editor Utilities

```typescript
// Recommended
import { handleImageDrop, addAIHighlight } from '@/editor';

// For internal development
import { handleImageDrop } from '@/editor/utils';
```

## Migration Checklist

When implementing the path aliases:

1. ✅ Update `tsconfig.json` with the path aliases
2. ✅ Update ESLint configuration if needed
3. ✅ Create barrel files (index.ts) in each directory to simplify imports
4. ✅ Test the configuration in the development environment
5. ✅ Update all imports in the codebase to use the new path aliases
6. ✅ Test the build process to ensure correct resolution

**Next Steps:** Continue with Task 1.10 to create a consolidated list of all dependencies from both packages. 
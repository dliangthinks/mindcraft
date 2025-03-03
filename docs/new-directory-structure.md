# Proposed Directory Structure for Unified Codebase

This document outlines the proposed directory structure for the merged codebase as part of Task 1.6 in the package merge process.

## Current Structure

Before the merge, the project has this structure:

```
mindcraft/
├── apps/
│   └── web/                      # Web application
│       ├── app/                  # Next.js app directory
│       ├── components/           # Web app components
│       │   └── tailwind/         # Tailwind components including editor customizations
│       ├── lib/                  # Web app utilities
│       │   └── editor-wrapper.ts # Adapter for headless package
│       └── ...
├── packages/
│   ├── headless/                 # Editor headless package
│   │   ├── src/
│   │   │   ├── components/       # Editor components
│   │   │   ├── extensions/       # Editor extensions
│   │   │   ├── plugins/          # Editor plugins
│   │   │   ├── utils/            # Shared utilities
│   │   │   └── index.ts          # Package entry point
│   │   └── ...
│   └── tsconfig/                 # Shared TypeScript configurations
└── ...
```

## Proposed Unified Structure

After the merge, the project would have this structure:

```
mindcraft/
├── apps/
│   └── web/                        # Web application (now containing all editor code)
│       ├── app/                    # Next.js app directory
│       ├── components/             # Web app components
│       │   ├── tailwind/           # Tailwind UI components
│       │   │   └── ...             # (Unchanged)
│       │   └── editor/             # Editor components moved from headless package
│       │       ├── core/           # Core editor components
│       │       │   ├── editor.tsx  # Main editor component
│       │       │   ├── bubble.tsx  # Editor bubble component
│       │       │   └── command.tsx # Command component
│       │       └── ui/             # UI components for the editor
│       ├── lib/                    # Web app utilities
│       │   ├── editor/             # Editor functionality (moved from headless)
│       │   │   ├── extensions/     # Editor extensions
│       │   │   │   ├── ai-highlight.ts
│       │   │   │   ├── mathematics.ts
│       │   │   │   └── ...
│       │   │   ├── plugins/        # Editor plugins
│       │   │   │   └── upload-images.tsx
│       │   │   ├── utils/          # Editor utilities
│       │   │   │   ├── editor-utils.ts
│       │   │   │   ├── store.ts    # State management
│       │   │   │   └── ...
│       │   │   └── index.ts        # Main export file (preserving API)
│       │   └── ...                 # Other utilities
│       ├── tsconfig/               # TypeScript configurations (incorporated from packages/tsconfig)
│       │   ├── base.json           # Base configuration
│       │   └── ...                 # Other specialized configurations
│       └── ...
└── ...
```

## Key Structure Changes

1. **Relocation of Editor Components**
   - Move from `packages/headless/src/components` to `apps/web/components/editor/core`
   - Preserves component organization while integrating with web app

2. **Extension and Plugin Integration**
   - Move from `packages/headless/src/extensions` and `plugins` to `apps/web/lib/editor/extensions` and `plugins` 
   - Maintains separation of extensions while integrating with web app

3. **Utility Functions**
   - Move from `packages/headless/src/utils` to `apps/web/lib/editor/utils`
   - Preserves utility organization

4. **Export Structure**
   - Maintain the same export structure in `apps/web/lib/editor/index.ts`
   - Ensures backward compatibility for imports

5. **TypeScript Configuration Integration**
   - Move the contents of `packages/tsconfig` into `apps/web/tsconfig`
   - Incorporate base configs directly into the web app's TypeScript setup
   - Simplify by eliminating the need for a separate package

## TypeScript Configuration Changes

Since we're no longer sharing configs across multiple packages, the tsconfig directory is moved directly into the web app. The main tsconfig.json would be updated to reference these local configurations:

**Before:**
```json
{
  "extends": "tsconfig/next.json",
  // ...
}
```

**After:**
```json
{
  "extends": "./tsconfig/next.json",
  // ...
}
```

## Import Path Changes

With this new structure, imports in the web app would change:

**Before:**
```typescript
import { EditorRoot, EditorContent } from "mindcraft-editor";
```

**After:**
```typescript
import { EditorRoot, EditorContent } from "@/lib/editor";
```

## Path Alias Configuration

To make imports cleaner, add these path aliases to the web app's `tsconfig.json`:

```json
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

## Module Boundaries

The new structure maintains clear module boundaries through explicit exports:

1. **Core API** (`apps/web/lib/editor/index.ts`)
   - Exports all editor functionality (components, extensions, utilities)
   - Maintains the same API as the original headless package

2. **Component Library** (`apps/web/components/editor/index.ts`)
   - Exports editor UI components
   - Can be imported directly if needed

## Migration Benefit

This structure:

1. **Simplifies Development**
   - No need to rebuild a separate package during development
   - Direct access to editor code for debugging and modification

2. **Maintains Organization**
   - Preserves logical separation of components, extensions, and utilities
   - Clear directory structure makes it easy to find code

3. **Supports Future Extraction**
   - If needed later, the editor code could be extracted back into a package
   - Maintains clean boundaries for possible future separation

4. **Reduces Duplication**
   - Eliminates duplicate configurations (package.json, tsconfig, etc.) 
   - Single source of dependencies

5. **Simplifies Project Structure**
   - Removes unnecessary indirection through shared packages
   - All TypeScript configurations are directly in the web app where they're used

## Considerations for Implementation

1. **Preserve File Names**
   - Keep the same file names where possible to minimize import changes
   - Use index files to maintain export structure

2. **Update Path References**
   - Update all internal import paths within moved files
   - Use path aliases for cleaner imports

3. **Component Integration**
   - Ensure components work with the web app's styling system (Tailwind)
   - Maintain proper React context providers

4. **State Management Integration**
   - Ensure jotai state management integrates with any existing state in the web app
   - Consider consolidating state management if there's overlap

**Next Steps:** Continue with Task 1.7 to define naming conventions for the merged codebase. 
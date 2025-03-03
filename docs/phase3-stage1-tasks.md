# Phase 3 - Stage 1: Initial Migration Tasks

This document outlines the specific tasks for Stage 1 of Phase 3, which focuses on initial file migration and directory structure setup.

## Task 3.1.1: Create Directory Structure

Create the necessary directories in the web app to house the migrated editor code:

```bash
# Create main directories
mkdir -p apps/web/components/editor/core
mkdir -p apps/web/components/editor/ui
mkdir -p apps/web/lib/editor/extensions
mkdir -p apps/web/lib/editor/plugins
mkdir -p apps/web/lib/editor/utils
mkdir -p apps/web/lib/editor/types
mkdir -p apps/web/lib/editor/hooks
mkdir -p apps/web/tsconfig
```

## Task 3.1.2: Update TypeScript Configuration

1. Move the shared TypeScript configurations from the tsconfig package to the web app:

```bash
# Copy tsconfig files to web app
cp packages/tsconfig/*.json apps/web/tsconfig/
```

2. Update the web app's main tsconfig.json to include the new path aliases:

```json
{
  "extends": "./tsconfig/next.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/editor/*": ["./lib/editor/*"],
      "@/editor": ["./lib/editor"],
      "@/editor-components/*": ["./components/editor/*"],
      "@/editor-components": ["./components/editor"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Task 3.1.3: Migrate Core Components

Move core editor components from the headless package to the web app:

1. Move Editor Components:

```bash
# Copy editor components
cp packages/headless/src/components/editor.tsx apps/web/components/editor/core/
cp packages/headless/src/components/bubble.tsx apps/web/components/editor/core/
cp packages/headless/src/components/command.tsx apps/web/components/editor/core/
cp packages/headless/src/components/image-resizer.tsx apps/web/components/editor/core/
```

2. Create the component barrel file (index.ts):

```typescript
// apps/web/components/editor/index.ts
export { EditorRoot, EditorContent } from './core/editor';
export { EditorBubble, EditorBubbleItem } from './core/bubble';
export { 
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList
} from './core/command';
export { ImageResizer } from './core/image-resizer';
```

## Task 3.1.4: Migrate Extensions

Move extension files from the headless package to the web app:

```bash
# Copy extensions
cp packages/headless/src/extensions/*.ts apps/web/lib/editor/extensions/
```

Create the extensions barrel file:

```typescript
// apps/web/lib/editor/extensions/index.ts
export { AIHighlight, addAIHighlight, removeAIHighlight } from './ai-highlight';
export { Mathematics } from './mathematics';
export { Twitter } from './twitter';
export { SlashCommand, Command, renderItems, createSuggestionItems } from './slash-command';
export { StarterKit } from './starter-kit';
export { TiptapImage, UpdatedImage } from './image';
export { TiptapLink } from './link';
export { TiptapUnderline } from './underline';
export { Youtube } from './youtube';
export { TaskList, TaskItem } from './task-list';
export { HorizontalRule } from './horizontal-rule';
export { CharacterCount } from './character-count';
export { CustomKeymap } from './custom-keymap';
export { Placeholder } from './placeholder';
export { TextStyle, Color } from './text-style';
export { HighlightExtension } from './highlight';
export { MarkdownExtension } from './markdown';
export { CodeBlockLowlight } from './code-block';
export { GlobalDragHandle } from './drag-handle';
```

## Task 3.1.5: Migrate Plugins

Move plugin files from the headless package to the web app:

```bash
# Copy plugins
cp packages/headless/src/plugins/*.ts apps/web/lib/editor/plugins/
```

Create the plugins barrel file:

```typescript
// apps/web/lib/editor/plugins/index.ts
export { 
  UploadImagesPlugin,
  createImageUpload,
  handleImageDrop,
  handleImagePaste
} from './upload-images';
```

## Task 3.1.6: Migrate Utilities

Move utility files from the headless package to the web app:

```bash
# Copy utilities
cp packages/headless/src/utils/*.ts apps/web/lib/editor/utils/
```

Create the utilities barrel file:

```typescript
// apps/web/lib/editor/utils/index.ts
export { 
  handleCommandNavigation,
  getPrevText
} from './editor-utils';

export { 
  // Editor commands
} from './editor-commands';

// Re-export store and atoms
export { novelStore } from './store';
export { queryAtom, rangeAtom } from './atoms';
```

## Task 3.1.7: Migrate Hooks

Move hook files from the headless package to the web app:

```bash
# Copy hooks
cp packages/headless/src/hooks/*.ts apps/web/lib/editor/hooks/
```

Create the hooks barrel file:

```typescript
// apps/web/lib/editor/hooks/index.ts
export { useEditor } from './use-editor';
```

## Task 3.1.8: Migrate Types

Move type definition files from the headless package to the web app:

```bash
# Copy types
cp packages/headless/src/types/*.ts apps/web/lib/editor/types/
```

Create the types barrel file:

```typescript
// apps/web/lib/editor/types/index.ts
export type { EditorInstance, JSONContent } from './editor-types';
```

## Task 3.1.9: Create Main Editor API

Create the main entry point for the editor API:

```typescript
// apps/web/lib/editor/index.ts
// Re-export components
export { 
  EditorRoot, 
  EditorContent,
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandItem,
  EditorCommandList,
  EditorCommandEmpty,
  ImageResizer
} from '@/components/editor';

// Re-export hooks
export { useEditor } from './hooks';

// Re-export types
export type { EditorInstance, JSONContent } from './types';

// Re-export extensions
export * from './extensions';

// Re-export plugins
export * from './plugins';

// Re-export utilities
export {
  handleCommandNavigation,
  getPrevText,
  novelStore,
  queryAtom,
  rangeAtom,
  // Additional utils as needed
} from './utils';
```

## Task 3.1.10: Update Package.json

Update the web app's package.json to include the necessary dependencies from the headless package:

```json
{
  "dependencies": {
    // Add the following dependencies
    "@tiptap/core": "^2.11.2",
    "@tiptap/extension-character-count": "^2.11.2",
    "@tiptap/extension-code-block-lowlight": "^2.11.2",
    "@tiptap/extension-color": "^2.11.2",
    "@tiptap/extension-highlight": "^2.11.2",
    "@tiptap/extension-horizontal-rule": "^2.11.2",
    "@tiptap/extension-image": "^2.11.2",
    "@tiptap/extension-link": "^2.11.2",
    "@tiptap/extension-placeholder": "^2.11.2",
    "@tiptap/extension-task-item": "^2.11.2",
    "@tiptap/extension-task-list": "^2.11.2",
    "@tiptap/extension-text-style": "^2.11.2",
    "@tiptap/extension-underline": "^2.11.2",
    "@tiptap/extension-youtube": "^2.11.2",
    "@tiptap/pm": "^2.11.2",
    "@tiptap/react": "^2.11.2",
    "@tiptap/starter-kit": "^2.11.2",
    "@tiptap/suggestion": "^2.11.2",
    "jotai": "^2.11.0",
    "katex": "^0.16.20",
    "react-moveable": "^0.56.0",
    "react-tweet": "^3.2.1",
    "tiptap-extension-global-drag-handle": "^0.1.16",
    "tiptap-markdown": "^0.8.10",
    "tunnel-rat": "^0.1.2"
  },
  "devDependencies": {
    // Add the following dev dependencies
    "@types/katex": "^0.16.7",
    "tsup": "^8.3.5",
    // Update these to the newer versions
    "@types/node": "^22.10.6",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "typescript": "^5.7.3"
  },
  "scripts": {
    // Add these scripts
    "build:editor": "tsup lib/editor/index.ts --dts --format esm,cjs --outDir lib/editor/dist",
    "dev:editor": "tsup lib/editor/index.ts --dts --format esm,cjs --outDir lib/editor/dist --watch",
    "dev:all": "concurrently \"npm run dev\" \"npm run dev:editor\""
  }
}
```

## Task 3.1.11: Create tsup Configuration

Create a tsup configuration file for building the editor code:

```typescript
// apps/web/tsup.config.ts
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

## Task 3.1.12: Update Next.js Configuration

Update the Next.js configuration to remove the transpilePackages setting:

```javascript
// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove the transpilePackages setting since the editor code is now part of the web app
  // transpilePackages: ["mindcraft-editor"],
};

module.exports = nextConfig;
```

## Task 3.1.13: Initial Import Path Fixes

Run a basic search and replace to update the most common import paths:

```bash
# Find all files with imports from mindcraft-editor
grep -r "from 'mindcraft-editor'" apps/web --include="*.tsx" --include="*.ts"
grep -r "from \"mindcraft-editor\"" apps/web --include="*.tsx" --include="*.ts"

# Update them to use the new path aliases
find apps/web -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/from "mindcraft-editor"/from "@\/lib\/editor"/g'
find apps/web -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/from 'mindcraft-editor'/from '@\/lib\/editor'/g"
```

## Task 3.1.14: Initial Test of Structure

Run an initial build to verify the directory structure and basic imports:

```bash
# Run type checking
npm run typecheck

# Try building the editor code
npm run build:editor

# Try building the Next.js app
npm run build
```

## Next Steps

After completing these initial migration tasks, the next stages will involve:

1. **Stage 2**: Fixing import paths and resolving basic issues
2. **Stage 3**: Resolving TypeScript errors and component integration issues
3. **Stage 4**: Testing and validating the migrated editor functionality

Each of these stages will be outlined in detail in separate task documents. 
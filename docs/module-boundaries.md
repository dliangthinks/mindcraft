# Module Boundaries for the Merged Codebase

This document defines the module boundaries in the merged codebase as part of Task 1.8 in the package merge process. It outlines what functionality will be exposed where and how different modules will interact.

## Core Module Structure

The merged codebase will be organized into the following core modules:

```
apps/web/
├── lib/
│   └── editor/        # Main Editor API Module
├── components/
│   └── editor/        # Editor UI Components
└── ...
```

## Module Definitions and Boundaries

### 1. Main Editor API Module (`@/lib/editor`)

**Purpose:** Primary entry point for editor functionality

**Public Exports:**
- Editor hooks (`useEditor`)
- Editor extensions
- Editor utilities
- Editor state management

**Implementation:**
```typescript
// lib/editor/index.ts
// Core functionality
export { useEditor } from './hooks/use-editor';
export type { EditorInstance } from './types/editor-types';

// Components (re-exported from components/editor)
export { 
  EditorRoot, 
  EditorContent,
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandItem,
  EditorCommandList,
  EditorCommandEmpty
} from '@/components/editor';

// Extensions
export { 
  AIHighlight,
  StarterKit,
  // All extensions...
} from './extensions';

// Utilities
export {
  addAIHighlight,
  removeAIHighlight,
  handleImageDrop,
  handleImagePaste,
  // All utilities...
} from './utils';

// Plugins
export {
  UploadImagesPlugin,
  createImageUpload,
} from './plugins';
```

### 2. Editor Components Module (`@/components/editor`)

**Purpose:** UI components for the editor

**Public Exports:**
- Editor root component
- Editor content component
- Editor UI components (bubble menu, command menu, etc.)

**Implementation:**
```typescript
// components/editor/index.ts
export { EditorRoot } from './core/editor';
export { EditorContent } from './core/editor';
export { EditorBubble, EditorBubbleItem } from './core/bubble';
export { 
  EditorCommand, 
  EditorCommandList, 
  EditorCommandItem, 
  EditorCommandEmpty 
} from './core/command';
export { ImageResizer } from './core/image-resizer';
```

### 3. Editor Extensions Module (`@/lib/editor/extensions`)

**Purpose:** Editor extensions and plugins

**Public Exports:**
- All TipTap extensions
- Custom extensions

**Implementation:**
```typescript
// lib/editor/extensions/index.ts
export { AIHighlight, addAIHighlight, removeAIHighlight } from './ai-highlight';
export { Mathematics } from './mathematics';
export { Twitter } from './twitter';
export { SlashCommand, Command, renderItems, createSuggestionItems } from './slash-command';
// All other extensions...
```

### 4. Editor Utilities Module (`@/lib/editor/utils`)

**Purpose:** Helper functions and utilities

**Public Exports:**
- Editor utility functions
- Type helpers

**Implementation:**
```typescript
// lib/editor/utils/index.ts
export { 
  handleCommandNavigation,
  getPrevText,
  // All utils...
} from './editor-utils';

export { 
  // Editor commands
} from './editor-commands';

// Re-export store and atoms
export { novelStore } from './store';
export { queryAtom, rangeAtom } from './atoms';
```

### 5. Editor Plugins Module (`@/lib/editor/plugins`)

**Purpose:** Editor plugins for file handling, etc.

**Public Exports:**
- Upload plugins
- Other plugins

**Implementation:**
```typescript
// lib/editor/plugins/index.ts
export { 
  UploadImagesPlugin,
  createImageUpload,
  handleImageDrop,
  handleImagePaste
} from './upload-images';
```

## Module Access Control

### Internal vs. Public API

1. **Public API:**
   - Exported from main module entry points (`index.ts` files)
   - Well-documented with JSDoc comments
   - Designed for stability and backward compatibility

2. **Internal API:**
   - Not exported from main entry points
   - Used only within the module
   - Subject to change without notice
   - May use underscore prefix (`_internalFunction`) for clarity

### Module Access Patterns

| Consumer | Access Pattern |
|----------|----------------|
| Web App UI | Imports from `@/lib/editor` |
| Custom Components | Imports from `@/components/editor` |
| Extension Development | Imports from `@/lib/editor/extensions` |
| Utility Development | Imports from `@/lib/editor/utils` |

## Module Dependencies

```
Web App UI → @/lib/editor → @/components/editor
                         → @/lib/editor/extensions
                         → @/lib/editor/utils
                         → @/lib/editor/plugins

@/components/editor → @/lib/editor/utils (for state management)
                   → External Libraries (TipTap, etc.)

@/lib/editor/extensions → @/lib/editor/utils (for helpers)
                       → External Libraries (TipTap, etc.)
```

## Extension Points

The architecture provides several extension points for future functionality:

1. **New Extensions**
   - Create new files in `@/lib/editor/extensions`
   - Export from the extensions index

2. **New UI Components**
   - Create new files in `@/components/editor/core` or `@/components/editor/ui`
   - Export from the components index

3. **New Utilities**
   - Create new files in `@/lib/editor/utils`
   - Export from the utils index

## API Stability Guarantees

To ensure a stable API during and after the migration:

1. **Stable Public API**
   - All current public exports will be maintained
   - No breaking changes to public function signatures
   - Deprecated functions will be marked but still exported

2. **Internal Refactoring**
   - Internal implementation details can be refactored
   - Non-exported functions can be changed or removed

## Module Initialization and Lifecycle

1. **Editor Initialization**
   - The editor is initialized through the `EditorRoot` and `EditorContent` components
   - State is managed through Jotai stores
   - Extensions are passed to `EditorContent`

2. **Lifecycle Management**
   - Editor cleanup is handled by React's useEffect cleanup function
   - State is managed through the editor instance and Jotai atoms

## Migration Strategy for Module Boundaries

When migrating from the current structure:

1. **Preserve API Signatures**
   - Maintain the same function signatures and component props
   - Use adapter patterns where necessary to maintain backward compatibility

2. **Staged Module Migration**
   - Move one module at a time
   - Test each module after migration
   - Update imports as modules are moved

3. **Documentation Updates**
   - Update docs to reflect new module locations
   - Document any changes to internal implementations

## Example Usage After Migration

```tsx
// Before (importing from package)
import { 
  EditorRoot, 
  EditorContent, 
  AIHighlight, 
  StarterKit 
} from 'mindcraft-editor';

// After (importing from local modules)
import { 
  EditorRoot, 
  EditorContent, 
  AIHighlight, 
  StarterKit 
} from '@/lib/editor';

// Direct component import (if needed)
import { EditorBubble } from '@/components/editor';
```

**Next Steps:** Continue with Task 1.9 to plan TypeScript path aliases for the new structure. 
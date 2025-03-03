# Naming Conventions for the Merged Codebase

This document defines the naming conventions to be used in the merged codebase as part of Task 1.7 in the package merge process.

## File and Directory Naming

### 1. General File Naming

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase.tsx | `Editor.tsx`, `EditorBubble.tsx` |
| Utility Functions | kebab-case.ts | `editor-utils.ts`, `type-helpers.ts` |
| Type Definitions | kebab-case-types.ts | `editor-types.ts`, `component-types.ts` |
| Configuration Files | kebab-case.config.ts | `tsup.config.ts` |
| Constants | kebab-case-constants.ts | `editor-constants.ts` |
| Hooks | use-kebab-case.ts | `use-editor.ts`, `use-commands.ts` |
| Context Providers | kebab-case-context.tsx | `editor-context.tsx` |
| Test Files | *.test.ts, *.spec.ts | `editor.test.ts`, `utils.spec.ts` |

### 2. Directory Naming

| Type | Convention | Example |
|------|------------|---------|
| Component Directories | kebab-case | `components/editor/core/` |
| Feature Directories | kebab-case | `lib/editor/extensions/` |
| Utility Directories | kebab-case | `lib/editor/utils/` |
| Configuration Directories | kebab-case | `tsconfig/` |

### 3. Index Files

- Each directory should include an `index.ts` file that exports the public API
- Barrel exports should be used to simplify imports
- Example:
  ```typescript
  // lib/editor/extensions/index.ts
  export * from './ai-highlight';
  export * from './mathematics';
  // etc.
  ```

## Code Naming Conventions

### 1. Component Naming

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `EditorRoot`, `EditorContent` |
| Component Props | PascalCase + Props | `EditorProps`, `EditorContentProps` |
| Component States | PascalCase + State | `EditorState`, `CommandState` |
| Event Handlers | handle + EventName | `handleChange`, `handleKeyDown` |
| Ref Objects | ref + PascalCase | `refEditor`, `refContent` |

### 2. Function Naming

| Type | Convention | Example |
|------|------------|---------|
| Utility Functions | camelCase | `createEditor`, `formatText` |
| Helper Functions | camelCase | `parseMarkdown`, `sanitizeHtml` |
| TipTap Extensions | PascalCase | `AIHighlight`, `Mathematics` |
| Factory Functions | create + PascalCase | `createImageUpload`, `createEditorConfig` |

### 3. Variable Naming

| Type | Convention | Example |
|------|------------|---------|
| Boolean Variables | is/has/should + PascalCase | `isActive`, `hasContent`, `shouldUpdate` |
| Constants | UPPER_SNAKE_CASE | `MAX_CONTENT_LENGTH`, `DEFAULT_EXTENSIONS` |
| Configurations | camelCase + Config | `editorConfig`, `uploadConfig` |
| Collections | plural camelCase | `extensions`, `commands` |

### 4. Type and Interface Naming

| Type | Convention | Example |
|------|------------|---------|
| Types | PascalCase | `EditorInstance`, `CommandItem` |
| Interfaces | PascalCase (I-prefix not used) | `EditorOptions`, `UploadOptions` |
| Enums | PascalCase | `EditorMode`, `CommandType` |
| Type Unions | PascalCase | `TextFormats`, `NodeTypes` |

## Import Conventions

### 1. Import Order

Imports should be organized in the following order:

1. React and core dependencies
2. External third-party packages
3. Internal modules (using path aliases)
4. Local modules (using relative paths)
5. Type imports
6. CSS/SCSS imports

Each group should be separated by a blank line.

Example:
```typescript
import React, { useState, useEffect } from 'react';

import { Editor } from '@tiptap/react';
import { Node } from '@tiptap/core';

import { useEditor } from '@/lib/editor';
import { Button } from '@/components/ui';

import { EditorControls } from './EditorControls';
import { extensions } from './extensions';

import type { EditorOptions } from '@/lib/editor';

import './Editor.css';
```

### 2. Path Aliases

Use the defined path aliases for imports:

```typescript
// Prefer
import { EditorRoot } from '@/lib/editor';

// Over
import { EditorRoot } from '../../../../lib/editor';
```

## API Naming Conventions

### 1. Public API

- Functions and components that are part of the public API should be documented with JSDoc comments
- Public API functions should have descriptive names that clearly indicate their purpose
- Avoid abbreviations or acronyms that are not widely understood

### 2. Internal API

- Functions and components that are only used internally can use more concise names
- Prefix private/internal utilities with underscore: `_internalFunction`
- Group internal utilities in dedicated files/directories

## State Management Naming

### 1. Jotai Atoms

| Type | Convention | Example |
|------|------------|---------|
| State Atoms | camelCaseAtom | `editorStateAtom`, `contentAtom` |
| Derived Atoms | camelCaseAtom | `formattedContentAtom` |
| Action Atoms | verbNounAtom | `updateContentAtom`, `resetEditorAtom` |

### 2. Context

| Type | Convention | Example |
|------|------------|---------|
| Context | PascalCaseContext | `EditorContext`, `CommandContext` |
| Context Providers | PascalCaseProvider | `EditorProvider`, `CommandProvider` |
| Context Consumers | usePascalCase | `useEditor`, `useCommand` |

## Comments and Documentation

### 1. Component Documentation

Each component should include:
- A brief description of its purpose
- Description of props with types
- Example usage

### 2. Function Documentation

Each public function should include:
- A brief description
- Parameter descriptions
- Return value description
- Example usage

### 3. Code Comments

- Use comments to explain "why" not "what"
- Complex logic should be documented with comments
- Use TODO comments for future improvements (include issue reference if available)

## Migration Guidelines

When migrating code from the headless package to the web app:

1. **Maintain Consistency**: Follow existing naming conventions where possible
2. **Preserve API Names**: Keep public API names unchanged to minimize refactoring
3. **Update Inconsistent Names**: Use the migration as an opportunity to fix inconsistent naming
4. **Document Changes**: Any renamed items should be documented with a mapping from old to new names

### Mapping Example (for renamed items):

```typescript
// Old name → New name
// slashCommandPluginFactory → createSlashCommand
// AIHighlightExtension → AIHighlight
```

## File Header Template

Each source file should include a standardized header:

```typescript
/**
 * @file [Brief description of the file]
 * @module lib/editor/[sub-module]
 * @description [Detailed description if needed]
 */
```

**Next Steps:** Continue with Task 1.8 to create module boundary documentation (what will be exposed where). 
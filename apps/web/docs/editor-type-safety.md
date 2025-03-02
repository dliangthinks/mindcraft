# Editor Type Safety Utilities

This document explains how to use the utility functions in `lib/editor-utils.ts` to fix type errors related to possibly null or undefined editor objects.

## The Problem

Many components in the codebase access the editor object directly, but TypeScript's strict null checking flags these as errors because the editor might be null or undefined. For example:

```typescript
const { editor } = useEditor();
editor.chain().focus().run(); // Error: 'editor' is possibly 'null'
```

## The Solution

We've created utility functions that safely handle editor operations when the editor might be null. These functions provide type safety and prevent runtime errors.

## Available Utilities

### `withEditor`

Safely execute a function that requires an editor instance:

```typescript
import { withEditor } from "@/lib/editor-utils";

// Before (unsafe)
editor.chain().focus().run();

// After (safe)
withEditor(editor, (editor) => {
  editor.chain().focus().run();
  return true;
}, false);
```

### `isEditorActive`

Safely check if an editor has a specific state:

```typescript
import { isEditorActive } from "@/lib/editor-utils";

// Before (unsafe)
editor.isActive("heading", { level: 1 });

// After (safe)
isEditorActive(editor, "heading", { level: 1 });
```

### `safeChain`

Safely start a command chain:

```typescript
import { safeChain } from "@/lib/editor-utils";

// Before (unsafe)
editor.chain().focus().run();

// After (safe)
const chain = safeChain(editor);
if (chain) {
  chain.focus().run();
}
```

### `safeEditorAccess`

Safely access editor properties:

```typescript
import { safeEditorAccess } from "@/lib/editor-utils";

// Before (unsafe)
const state = editor.state;

// After (safe)
const state = safeEditorAccess(editor, "state");
```

### `executeCommand`

Execute a command safely:

```typescript
import { executeCommand } from "@/lib/editor-utils";

// Before (unsafe)
editor.chain().focus().toggleBold().run();

// After (safe)
executeCommand(editor, (editor) => {
  editor.chain().focus().toggleBold().run();
  return true;
});
```

## Common Patterns to Fix

### 1. Direct Property Access

```typescript
// Before (unsafe)
const selection = editor.view.state.selection;

// After (safe)
withEditor(editor, (editor) => {
  const selection = editor.view.state.selection;
  // Use selection...
  return true;
}, false);
```

### 2. Command Chains

```typescript
// Before (unsafe)
editor.chain().focus().toggleBold().run();

// After (safe)
withEditor(editor, (editor) => {
  editor.chain().focus().toggleBold().run();
  return true;
}, false);
```

### 3. isActive Checks

```typescript
// Before (unsafe)
const isBold = editor.isActive("bold");

// After (safe)
const isBold = isEditorActive(editor, "bold");
```

## Best Practices

1. Always use the utility functions when accessing the editor
2. Return a value from the withEditor callback
3. Provide a fallback value for withEditor
4. Consider creating component-specific utility functions for repeated patterns 
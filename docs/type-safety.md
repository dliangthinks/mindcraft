# Type Safety in Mindcraft

This document provides guidance on how to maintain type safety in the Mindcraft codebase, using the built-in utility functions.

## Common Type Safety Issues

The Mindcraft codebase deals with several potential type safety issues:

1. **Nullable Editor Instances**: The `editor` object can be `null` or `undefined`, especially during initialization
2. **Component References**: Component refs may not have expected methods or properties
3. **External Library Typings**: Third-party libraries like tippy.js have typing issues
4. **Optional Values**: Many values in the codebase can be nullable or optional

## Utility Functions

### Editor Utilities

Located in `packages/headless/src/utils/editor-utils.ts`:

```typescript
// Execute operations safely on an editor that might be null
function withEditor<T>(
  editor: Editor | null | undefined, 
  operation: (editor: Editor) => T, 
  fallback?: T
): T | undefined;

// Get a chain safely from an editor that might be null
function safeChain(editor: Editor | null | undefined);

// Check if a node or mark is active, safely handling null editors
function isActive(
  editor: Editor | null | undefined, 
  type: string, 
  attrs?: Record<string, any>
): boolean;

// Create a safe command that handles null/undefined editors
function createSafeCommand(handler: EditorCommandHandler): SafeEditorCommandHandler;
```

### Component Type Utilities

Located in `packages/headless/src/utils/component-types.ts`:

```typescript
// Safely execute a command if it exists
function executeCommand(
  command?: ((val?: any) => void) | null, 
  value?: any
): void;

// Safely get a property from a reference that might not exist
function getRefProperty<T>(
  ref: any | null | undefined, 
  property: string
): T | undefined;

// Check if an object has a specific method
function hasMethod(obj: any, method: string): boolean;
```

### Editor Commands

Located in `packages/headless/src/utils/editor-commands.ts`:

```typescript
// Create a command that toggles a mark, safely handling null editors
function toggleMark(markName: string): EditorCommand;

// Create a command that clears nodes, safely handling null editors
function clearNodes(): EditorCommand;

// Create a command that toggles a node, safely handling null editors
function toggleNode(
  nodeName: string, 
  attrs?: Record<string, any>
): EditorCommand;

// Check if a mark is active, safely handling null editors
function isMarkActive(markName: string): IsActiveCheck;

// Check if a node is active, safely handling null editors
function isNodeActive(
  nodeName: string, 
  attrs?: Record<string, any>
): IsActiveCheck;
```

## Usage Examples

### Safe Editor Operations

```typescript
import { withEditor, safeChain, isActive } from "mindcraft-editor";

// Instead of:
editor?.chain().focus().toggleBold().run();

// Use:
safeChain(editor)?.focus().toggleBold().run();

// Or:
withEditor(editor, (e) => e.chain().focus().toggleBold().run());

// For checking active state:
const isBold = isActive(editor, 'bold');
```

### Safe Component References

```typescript
import { hasMethod, getRefProperty, executeCommand } from "mindcraft-editor";

// Instead of:
if (component?.ref?.onKeyDown) {
  component.ref.onKeyDown(props);
}

// Use:
if (hasMethod(component?.ref, 'onKeyDown')) {
  component.ref.onKeyDown(props);
}

// For commands:
executeCommand(item.command, value);
```

### Editor Commands

```typescript
import { 
  toggleMark, 
  clearNodes, 
  toggleNode, 
  isMarkActive, 
  isNodeActive 
} from "mindcraft-editor";

// Create reusable commands
const toggleBold = toggleMark('bold');
const toggleHeading1 = toggleNode('heading', { level: 1 });

// Use them safely with any editor, including null
toggleBold(editor);
toggleHeading1(editor);

// Check active state safely
const isBold = isMarkActive('bold')(editor);
const isHeading1 = isNodeActive('heading', { level: 1 })(editor);
```

## Best Practices

1. **Always use the utility functions** when dealing with potentially null values
2. **Avoid direct null checks** in component code and use the utilities instead
3. **Create reusable commands** using the command factory functions
4. **Use type annotations** to ensure type safety in function signatures

By following these guidelines, we can maintain type safety throughout the Mindcraft codebase and prevent runtime errors from null/undefined values. 
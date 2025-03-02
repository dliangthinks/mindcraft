# Mindcraft

Mindcraft is a next generation writing platform where human collaborate with AI. 
It's built on top of a Notion-style WYSIWYG editor with extended functionality to support sidebars and specialized content presentation.

## Project Overview

Mindcraft is a monorepo project built with:

- **Next.js**: For the web application frontend
- **TipTap**: For the rich text editor functionality
- **Radix UI**: For accessible UI components
- **Tailwind CSS**: For styling
- **TypeScript**: For type safety across the codebase
- **Turborepo**: For managing the monorepo structure
- **pnpm**: As the package manager

## Repository Structure

The repository is organized as a monorepo with the following structure:

```
mindcraft/
├── apps/
│   └── web/              # Next.js web application
│       ├── components/   # React components
│       ├── lib/          # Utility functions and hooks
│       └── public/       # Static assets
├── packages/
│   ├── headless/         # Core editor functionality (mindcraft-editor)
│   └── tsconfig/         # Shared TypeScript configuration
```

### Core Packages

1. **mindcraft-editor** (packages/headless): 
   - The core rich text editor package built on TipTap
   - Customizable editor with extensions for various content types
   - Slash commands for quick actions
   - Image handling and resizing
   - Code block syntax highlighting
   - AI integration for text generation and suggestions

2. **Web App** (apps/web):
   - Next.js application that implements the editor
   - Tailwind UI components
   - AI-powered text generation capabilities
   - Example implementation of the editor with additional features

## Key Features

- **Rich Text Editing**: Full-featured WYSIWYG editor with support for formatting, lists, code blocks, etc.
- **Sidebar Integration**: Custom support for a sidebar to enhance the editing experience
- **Slash Commands**: Quick access to formatting options and block insertions
- **Image Support**: Upload, resize, and manipulate images within the editor
- **Code Highlighting**: Syntax highlighting for code blocks
- **AI Integration**: Generate text, improve writing, and get suggestions
- **Responsive Design**: Works across different device sizes
- **TypeScript Support**: Full type safety across the codebase

## Editor Utilities and Type Safety

Mindcraft provides a comprehensive set of utility functions to ensure type safety when working with editors and components. These utilities are located in `apps/web/lib/editor-wrapper.ts`.

### Editor Utilities

```typescript
// Safely execute operations on an editor that might be null
withEditor(editor, 
  (editor) => editor.chain().focus().run(),
  fallbackValue
);

// Safely check if a node or mark is active
isEditorActive(editor, 'heading', { level: 1 });

// Safely create a command chain that handles null editors
safeChain(editor)?.focus().toggleBold().run();

// Safely add AI highlighting to editor content
addAIHighlight(editor);

// Safely remove AI highlighting from editor content
removeAIHighlight(editor);

// Safely execute a command on the editor
executeCommand(editor, (editor) => editor.chain().focus().run());

// Safely check if a ref is not null before accessing its value
const inputElement = safeRef(inputRef);

// Safely handle nullable values with a fallback
safeguard(value, 
  (value) => value.toString(), 
  'Default Value'
);
```

### How Type Safety is Implemented

Our approach to type safety follows several key principles:

1. **Null Checking**: All utilities perform null checks before accessing properties or methods
2. **Type Guards**: We use TypeScript type guards to ensure type safety at runtime
3. **Generic Types**: Utilities use generic types to preserve type information
4. **Fallback Values**: Optional fallback values can be provided for operations that might fail
5. **Chained API**: Safe methods that mirror the editor's chain API

### Component Integration

Components that use the editor are designed to be type-safe and handle cases where the editor might be null:

```tsx
// Example of a component using our utilities
const TextFormatButton = () => {
  const { editor } = useEditor();
  
  return (
    <Button 
      onClick={() => safeChain(editor)?.focus().toggleBold().run()}
      className={cn("text-xs", {
        "text-blue-500": isEditorActive(editor, "bold")
      })}
    >
      <BoldIcon className="h-4 w-4" />
    </Button>
  );
};
```

## Specialized Components

### AI Integration Components

- **AISelector**: Provides AI-powered completion and suggestions
- **AICompletionCommands**: Actions to apply AI-generated content
- **GenerativeMenuSwitch**: Toggle between editing and AI generation

### Editor Components

- **NodeSelector**: Select and apply different node types
- **TextButtons**: Format text with bold, italic, etc.
- **LinkSelector**: Insert and edit links
- **ColorSelector**: Apply text and background colors
- **MathSelector**: Insert and edit mathematical equations
- **SlashCommand**: Command palette for quick actions

### UI Components

- **Tooltip**: Enhanced tooltip using Radix UI
- **Button**: Base button component with variants
- **Popover**: Context menus and option selectors

## Hooks

Custom hooks provide reusable functionality:

- **useEditor**: Access the editor instance safely
- **useOnClickOutside**: Handle clicks outside a component

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/dliangthinks/mindcraft.git
cd mindcraft

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server will start at http://localhost:3000.

## Development

### Project Commands

- `pnpm dev`: Start the development server
- `pnpm build`: Build all packages and apps
- `pnpm lint`: Run linting
- `pnpm format`: Format code
- `pnpm typecheck`: Run type checking

### Type Checking

Ensure type safety by running:

```bash
pnpm typecheck
```

This command checks all packages for type errors.

## Best Practices

When working with this codebase, follow these guidelines:

1. **Always use provided utilities**: Use `withEditor`, `isEditorActive`, `safeChain`, etc. instead of direct editor access
2. **Handle null/undefined values**: Always account for the possibility of null values
3. **Test edge cases**: Verify that components work correctly when the editor is not available
4. **Maintain consistent patterns**: Follow established patterns for component structure

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.



##Changelog

Mar 2
Refactor: Migrate from Novel to Mindcraft, enhance type safety and editor utilities

This comprehensive refactoring includes:
- Renamed project from "Novel" to "Mindcraft"
- Introduced robust type-safe editor utilities in `lib/editor-wrapper.ts`
- Updated package configurations and dependencies
- Added type safety documentation
- Replaced direct editor access with safer wrapper functions
- Migrated components to use new type-safe utilities
- Added new tooltip and click-outside hook components

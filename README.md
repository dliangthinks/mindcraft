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
│   └── web/                  # Next.js web application
│       ├── components/       # React components
│       │   └── editor/       # Editor components
│       │       ├── core/     # Core editor components
│       │       └── ui/       # UI components for the editor
│       ├── lib/              # Utility functions and hooks
│       │   └── editor/       # Editor functionality
│       │       ├── extensions/  # TipTap extensions
│       │       ├── plugins/     # Editor plugins
│       │       ├── utils/       # Editor utilities
│       │       ├── hooks/       # Editor hooks
│       │       └── types/       # Editor type definitions
│       └── public/           # Static assets
└── packages/
    └── tsconfig/             # Shared TypeScript configuration
```

### Core Components

1. **Editor Core** (apps/web/components/editor/core): 
   - The core rich text editor components built on TipTap
   - EditorRoot, EditorContent, EditorBubble components
   - Command menu and bubble menu implementations
   - Fully integrated with the web application

2. **Editor Extensions** (apps/web/lib/editor/extensions):
   - Custom TipTap extensions for enhanced functionality
   - AI highlighting, slash commands, mathematics rendering
   - Twitter and YouTube embeds
   - Image resizing and handling

3. **Editor Plugins** (apps/web/lib/editor/plugins):
   - Image upload and handling
   - Drag and drop functionality

4. **Web App** (apps/web):
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



## Deployment

### Vercel Configuration

For successful deployment to Vercel, ensure:

1. **Proper Turborepo Configuration**: The `turbo.json` file should properly define dependencies between packages. In particular, the `typecheck` task must depend on `^build` to ensure workspace packages are built before they are imported.

2. **Environment Variables**: Set up the following environment variables in your Vercel project:
   - `OPENAI_API_KEY` - API key for OpenAI services

3. **Build Command**: Vercel should use `pnpm build` as the build command.

4. **Output Directory**: The output directory should be set to `apps/web/.next`.

### Troubleshooting Common Deployment Issues

- **Module Resolution Errors**: If you see errors like `Cannot find module 'mindcraft-editor'`, check that your Turborepo configuration ensures packages are built before they're imported.
  
- **Type Checking Errors**: Make sure local package dependencies use `workspace:*` or `workspace:^` in package.json and that build steps are properly ordered.

- **Build Cache Issues**: If changes aren't reflected after deployment, try clearing the Vercel build cache.

## Importing Editor Components

After the package restructuring, you can import editor components directly from the web app:

```tsx
// Import from the main editor entry point
import { 
  EditorRoot, 
  EditorContent, 
  EditorBubble,
  useEditor 
} from "@/lib/editor";

// Import specific extensions
import { 
  AIHighlight, 
  Mathematics, 
  Command 
} from "@/lib/editor";

// Import plugins
import { 
  UploadImagesPlugin, 
  handleImageDrop, 
  handleImagePaste 
} from "@/lib/editor";
```

## Changelog

Mar 3, 2024
Refactor: Merged headless package into web app

This major architectural change includes:
- Migrated all editor components from the headless package into the web app
- Restructured the codebase to use a more integrated approach
- Updated import paths across all components
- Improved TypeScript integration with better path aliases
- Removed the separate package dependency in favor of direct imports
- Enhanced maintainability by consolidating code into a single package
- Fixed circular dependencies and import issues
- Streamlined the build process

Mar 2, 2024
Refactor: Migrate from Novel to Mindcraft, enhance type safety and editor utilities

This comprehensive refactoring includes:
- Renamed project from "Novel" to "Mindcraft"
- Introduced robust type-safe editor utilities in `lib/editor-wrapper.ts`
- Updated package configurations and dependencies
- Added type safety documentation
- Replaced direct editor access with safer wrapper functions
- Migrated components to use new type-safe utilities
- Added new tooltip and click-outside hook components

Fix: Update Turborepo configuration for correct build order
- Updated `typecheck` task to depend on `^build` instead of `^topo`
- Ensures local packages are built before they are type-checked by dependents
- Added deployment documentation

Default page: layout.tsx, content.ts, page.tsx
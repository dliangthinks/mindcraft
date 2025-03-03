# Web App Dependencies on the Headless Package

This document identifies and analyzes the components in the web app that depend on the headless package (`mindcraft-editor`) as part of Task 1.4 in the package merge process.

## Key Integration Points

### Primary Components

1. **TailwindAdvancedEditor** (`apps/web/components/tailwind/advanced-editor.tsx`)
   - Main implementation of the editor in the web app
   - Imports multiple components from the headless package:
     - `EditorRoot`, `EditorContent`, `EditorCommand`, `EditorCommandEmpty`, `EditorCommandItem`, `EditorCommandList`
     - `ImageResizer`
     - `handleCommandNavigation`, `handleImageDrop`, `handleImagePaste`
   - Uses extensions from the headless package via the `extensions.ts` file

2. **Editor Wrapper** (`apps/web/lib/editor-wrapper.ts`)
   - Acts as an adapter layer between the headless package and the web app
   - Wraps and exports key functions from the headless package with safety checks
   - Imports: `useEditor`, `addAIHighlight`, `removeAIHighlight`
   - Provides utility functions like `withEditor`, `safeChain`, `executeCommand`

3. **Extensions Configuration** (`apps/web/components/tailwind/extensions.ts`)
   - Configures and customizes all extensions from the headless package
   - Imports almost all extensions:
     - `AIHighlight`, `CharacterCount`, `CodeBlockLowlight`, `Color`, etc.
   - Applies Tailwind CSS classes to the extensions
   - Exports `defaultExtensions` used by the advanced editor

### UI Components

1. **Selector Components**
   - **NodeSelector** (`apps/web/components/tailwind/selectors/node-selector.tsx`)
     - Imports `EditorBubbleItem` and `EditorInstance` types
   
   - **TextButtons** (`apps/web/components/tailwind/selectors/text-buttons.tsx`)
     - Imports `EditorBubbleItem`
   
   - **ColorSelector** (`apps/web/components/tailwind/selectors/color-selector.tsx`)
     - Imports `EditorBubbleItem`

2. **Generative Components**
   - **GenerativeMenuSwitch** (`apps/web/components/tailwind/generative/generative-menu-switch.tsx`)
     - Imports `EditorBubble`, `useEditor`
   
   - **AISelectorCommands** (`apps/web/components/tailwind/generative/ai-selector-commands.tsx`)
     - Imports `getPrevText` utility

3. **Utility Components**
   - **SlashCommand** (`apps/web/components/tailwind/slash-command.tsx`)
     - Imports `Command`, `createSuggestionItems`, `renderItems`
   
   - **ImageUpload** (`apps/web/components/tailwind/image-upload.ts`)
     - Imports `createImageUpload`

## Import Analysis

The web app imports the following items from the headless package:

### Components
- `EditorRoot`
- `EditorContent`
- `EditorBubble`
- `EditorBubbleItem`
- `EditorCommand`
- `EditorCommandEmpty`
- `EditorCommandItem`
- `EditorCommandList`
- `ImageResizer`

### Hooks
- `useEditor`

### Extensions
- `AIHighlight`
- `CharacterCount`
- `CodeBlockLowlight`
- `Color`
- `CustomKeymap`
- `GlobalDragHandle`
- `HighlightExtension`
- `HorizontalRule`
- `MarkdownExtension`
- `Mathematics`
- `Placeholder`
- `StarterKit`
- `TaskItem`
- `TaskList`
- `TextStyle`
- `TiptapImage`
- `TiptapLink`
- `TiptapUnderline`
- `Twitter`
- `UpdatedImage`
- `Youtube`

### Utilities
- `addAIHighlight`
- `removeAIHighlight`
- `getPrevText`
- `handleCommandNavigation`
- `handleImageDrop`
- `handleImagePaste`
- `createImageUpload`
- `Command` (suggestion)
- `createSuggestionItems`
- `renderItems`
- `UploadImagesPlugin`

### Types
- `EditorInstance`
- `JSONContent`

## Implementation Patterns

1. **Composition Pattern**: The web app composes UI using the headless package components as building blocks
2. **Adapter Pattern**: The editor-wrapper.ts file acts as an adapter, adding safety and convenience methods
3. **Strategy Pattern**: Extensions are configured and composed in a separate file to be injected into the editor
4. **Factory Pattern**: Functions like `createImageUpload` follow a factory pattern to create specialized objects

## Integration Touch Points

1. **State Management**: The web app interacts with the editor state through the `useEditor` hook
2. **Event Handling**: The editor handles image uploads, commands, and other interactions
3. **UI Rendering**: The editor components render the editor UI, with styling from the web app
4. **Extensions**: The web app configures and extends the behavior of the editor through extensions

## Migration Implications

1. **Dependency Tracking**: All imported items from the headless package need to be moved to the web app
2. **Path Updates**: All import paths will need to be updated to point to the new locations
3. **Style Integration**: The web app already applies Tailwind classes to the editor components
4. **Interface Preservation**: The public API used by the web app should be preserved in the merged code

**Next Steps:** Continue with Task 1.5 to create a visual dependency graph for better understanding. 
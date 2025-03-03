# Mindcraft Editor Component Inventory

This document provides an inventory of all components in the headless package (`mindcraft-editor`) as part of Task 1.1 in the package merge process.

## UI Components

| Component Name | File Path | Description | Dependencies |
|----------------|-----------|-------------|--------------|
| EditorRoot | packages/headless/src/components/editor.tsx | Root component that provides context for the editor | jotai, tunnel-rat |
| EditorContent | packages/headless/src/components/editor.tsx | Main editor content component | @tiptap/react |
| EditorBubble | packages/headless/src/components/editor-bubble.tsx | Floating bubble menu for formatting | @tiptap/react |
| EditorBubbleItem | packages/headless/src/components/editor-bubble-item.tsx | Item within the bubble menu | @radix-ui/react-slot |
| EditorCommand | packages/headless/src/components/editor-command.tsx | Command menu component | cmdk |
| EditorCommandItem | packages/headless/src/components/editor-command-item.tsx | Item within the command menu | cmdk |

## Extensions

| Extension Name | File Path | Description | Dependencies |
|----------------|-----------|-------------|--------------|
| AIHighlight | packages/headless/src/extensions/ai-highlight.ts | Adds AI highlighting functionality | @tiptap/core |
| CustomKeymap | packages/headless/src/extensions/custom-keymap.ts | Custom keyboard shortcuts | @tiptap/core, @tiptap/pm |
| ImageResizer | packages/headless/src/extensions/image-resizer.tsx | Resizable image component | react-moveable |
| Mathematics | packages/headless/src/extensions/mathematics.ts | Math equation support | katex |
| Twitter | packages/headless/src/extensions/twitter.tsx | Twitter/X embed support | react-tweet |
| UpdatedImage | packages/headless/src/extensions/updated-image.ts | Enhanced image extension | @tiptap/extension-image |
| SlashCommand | packages/headless/src/extensions/slash-command.tsx | Slash command menu for inserting content | @tiptap/suggestion |

## Plugins

| Plugin Name | File Path | Description | Dependencies |
|-------------|-----------|-------------|--------------|
| UploadImagesPlugin | packages/headless/src/plugins/upload-images.tsx | Handles image uploading | @tiptap/pm |

## Utilities

| Utility Name | File Path | Description | Dependencies |
|--------------|-----------|-------------|--------------|
| editor-commands | packages/headless/src/utils/editor-commands.ts | Editor command utilities | @tiptap/core |
| editor-utils | packages/headless/src/utils/editor-utils.ts | General editor utilities | @tiptap/core |
| component-types | packages/headless/src/utils/component-types.ts | TypeScript definitions | - |
| store | packages/headless/src/utils/store.ts | Jotai store for state management | jotai |
| atoms | packages/headless/src/utils/atoms.ts | Jotai atoms for state | jotai |

## External Dependencies

Key external dependencies used by the headless package:

1. @tiptap/* - Core editor functionality
2. jotai - State management
3. cmdk - Command menu
4. @radix-ui/react-slot - Component composition
5. react-moveable - For resizable elements
6. katex - Math rendering
7. react-tweet - Twitter embeds
8. tunnel-rat - Component tunneling

## Notes for Migration

1. The headless package uses a modular approach with clear separation between components, extensions, and utilities
2. The component architecture relies on React Context for sharing state and functionality
3. Many components use composition patterns (like EditorBubbleItem within EditorBubble)
4. Extensions are mostly wrappers around TipTap functionality with custom behavior
5. The editor uses Jotai for state management, which will need to be preserved in the migration

**Next Steps:** Continue with Task 1.2 to document all external dependencies in more detail. 
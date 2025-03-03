# Mindcraft Editor Dependency Inventory

This document provides a detailed inventory of all external dependencies in the headless package (`mindcraft-editor`) as part of Task 1.2 in the package merge process.

## Core Dependencies

| Dependency | Version | Purpose | Used In | Also in Web App? |
|------------|---------|---------|---------|------------------|
| @tiptap/core | ^2.11.2 | Core editor framework | Throughout | No |
| @tiptap/react | ^2.11.2 | React integration for TipTap | Throughout | No |
| @tiptap/pm | ^2.11.2 | ProseMirror integration | Extensions, utils | No |
| @tiptap/starter-kit | ^2.11.2 | Basic editor functionality | Extensions | No |
| @radix-ui/react-slot | ^1.1.1 | Component composition | UI components | Yes (^1.0.2) |
| jotai | ^2.11.0 | State management | Store, components | No |
| react | >=18 (peer) | UI framework | Throughout | Yes (^18.2.0) |
| cmdk | ^1.0.4 | Command palette | Command components | Yes (^1.0.4) |
| tunnel-rat | ^0.1.2 | Component tunneling | EditorRoot | No |

## Editor Extensions

| Dependency | Version | Purpose | Used In | Also in Web App? |
|------------|---------|---------|---------|------------------|
| @tiptap/extension-character-count | ^2.11.2 | Character counting | Extensions | No |
| @tiptap/extension-code-block-lowlight | ^2.11.2 | Code highlighting | Extensions | No |
| @tiptap/extension-color | ^2.11.2 | Text color formatting | Extensions | No |
| @tiptap/extension-highlight | ^2.11.2 | Text highlighting | Extensions | No |
| @tiptap/extension-horizontal-rule | ^2.11.2 | Horizontal rule | Extensions | No |
| @tiptap/extension-image | ^2.11.2 | Image support | Extensions | No |
| @tiptap/extension-link | ^2.11.2 | Link support | Extensions | No |
| @tiptap/extension-placeholder | ^2.11.2 | Placeholder text | Extensions | No |
| @tiptap/extension-task-item | ^2.11.2 | Task list items | Extensions | No |
| @tiptap/extension-task-list | ^2.11.2 | Task lists | Extensions | No |
| @tiptap/extension-text-style | ^2.11.2 | Text styling | Extensions | No |
| @tiptap/extension-underline | ^2.11.2 | Underline formatting | Extensions | No |
| @tiptap/extension-youtube | ^2.11.2 | YouTube embeds | Extensions | No |
| @tiptap/suggestion | ^2.11.2 | Autocomplete/suggestion | SlashCommand | No |
| tiptap-extension-global-drag-handle | ^0.1.16 | Drag handle | Extensions | No |
| tiptap-markdown | ^0.8.10 | Markdown support | Extensions | No |

## UI and Rendering

| Dependency | Version | Purpose | Used In | Also in Web App? |
|------------|---------|---------|---------|------------------|
| react-markdown | ^9.0.3 | Markdown rendering | Components | Yes (^9.0.1) |
| react-moveable | ^0.56.0 | Resizable components | ImageResizer | No |
| react-tweet | ^3.2.1 | Twitter embeds | Twitter extension | No |
| katex | ^0.16.20 | Math equation rendering | Mathematics | No |
| tippy.js | ^6.3.7 | Tooltips and popovers | UI components | Yes (^6.3.7) |

## Development Dependencies

| Dependency | Version | Purpose | Used In | Also in Web App? |
|------------|---------|---------|---------|------------------|
| @biomejs/biome | ^1.9.4 | Linting and formatting | Development | Yes (^1.9.4) |
| @types/katex | ^0.16.7 | TypeScript definitions | Development | No |
| @types/react | ^18.2.55 | TypeScript definitions | Development | Yes (^18.2.61) |
| @types/react-dom | 18.2.19 | TypeScript definitions | Development | Yes (^18.2.19) |
| tsconfig | workspace:* | TypeScript configuration | Development | Yes (workspace:*) |
| tsup | ^8.3.5 | Build tool | Development | No |
| typescript | ^5.7.3 | TypeScript compiler | Development | Yes (^5.4.2) |

## Version Conflicts

The following dependencies have version differences between the headless package and web app:

1. **@radix-ui/react-slot**: ^1.1.1 (headless) vs ^1.0.2 (web)
2. **react-markdown**: ^9.0.3 (headless) vs ^9.0.1 (web)
3. **typescript**: ^5.7.3 (headless) vs ^5.4.2 (web)

## Missing Dependencies in Web App

These dependencies are used in the headless package but not currently in the web app:

1. All TipTap-related packages
2. jotai
3. tunnel-rat
4. react-moveable
5. katex
6. tiptap-extension-global-drag-handle
7. tiptap-markdown

## Dependency Analysis

1. **TipTap Core**: The most critical dependency group is the TipTap editor framework. All of these will need to be moved to the web app.

2. **State Management**: The headless package uses jotai for state management, which will need to be added to the web app.

3. **UI Components**: Both packages use similar UI libraries (react-markdown, tippy.js), but some versions differ slightly.

4. **Build Tools**: The headless package uses tsup for building, which may not be needed after merging.

5. **Shared Development Tools**: Both packages use Biome for linting and the same workspace tsconfig.

## Recommendations for Merging

1. Use the newer dependency versions when conflicts exist
2. Consolidate development dependencies
3. Add all TipTap dependencies to the web app package.json
4. Ensure compatibility between jotai and any state management in the web app

**Next Steps:** Continue with Task 1.3 to document internal dependencies between components in the headless package. 
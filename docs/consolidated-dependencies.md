# Consolidated Dependencies List

This document provides a consolidated list of all dependencies from both the headless package and web app as part of Task 1.10 in the package merge process.

## Production Dependencies

| Dependency | Headless Version | Web App Version | Required By | Purpose |
|------------|------------------|-----------------|-------------|---------|
| @ai-sdk/openai | - | ^1.1.0 | Web App | AI integration |
| @radix-ui/react-dialog | - | ^1.0.5 | Web App | Dialog component |
| @radix-ui/react-popover | - | ^1.0.7 | Web App | Popover component |
| @radix-ui/react-scroll-area | - | ^1.0.5 | Web App | Scrollable area component |
| @radix-ui/react-select | - | ^2.0.0 | Web App | Select component |
| @radix-ui/react-separator | - | ^1.0.3 | Web App | Separator component |
| @radix-ui/react-slot | ^1.1.1 | ^1.0.2 | Both | Component composition |
| @radix-ui/react-tooltip | - | ^1.1.8 | Web App | Tooltip component |
| @tailwindcss/typography | - | ^0.5.10 | Web App | Typography styles for Tailwind |
| @tiptap/core | ^2.11.2 | - | Headless | Core editor framework |
| @tiptap/extension-character-count | ^2.11.2 | - | Headless | Character counting |
| @tiptap/extension-code-block-lowlight | ^2.11.2 | - | Headless | Code block with syntax highlighting |
| @tiptap/extension-color | ^2.11.2 | - | Headless | Text color |
| @tiptap/extension-highlight | ^2.11.2 | - | Headless | Text highlighting |
| @tiptap/extension-horizontal-rule | ^2.11.2 | - | Headless | Horizontal rule |
| @tiptap/extension-image | ^2.11.2 | - | Headless | Image support |
| @tiptap/extension-link | ^2.11.2 | - | Headless | Link support |
| @tiptap/extension-placeholder | ^2.11.2 | - | Headless | Placeholder text |
| @tiptap/extension-task-item | ^2.11.2 | - | Headless | Task list items |
| @tiptap/extension-task-list | ^2.11.2 | - | Headless | Task lists |
| @tiptap/extension-text-style | ^2.11.2 | - | Headless | Text styling |
| @tiptap/extension-underline | ^2.11.2 | - | Headless | Underline formatting |
| @tiptap/extension-youtube | ^2.11.2 | - | Headless | YouTube embeds |
| @tiptap/pm | ^2.11.2 | - | Headless | ProseMirror integration |
| @tiptap/react | ^2.11.2 | - | Headless | React integration for TipTap |
| @tiptap/starter-kit | ^2.11.2 | - | Headless | Basic editor functionality |
| @tiptap/suggestion | ^2.11.2 | - | Headless | Suggestion/autocomplete |
| @upstash/ratelimit | - | ^1.0.1 | Web App | Rate limiting |
| @vercel/analytics | - | ^1.2.2 | Web App | Vercel analytics |
| @vercel/blob | - | ^0.22.1 | Web App | Vercel blob storage |
| @vercel/kv | - | ^1.0.1 | Web App | Vercel KV storage |
| ai | - | ^3.0.12 | Web App | AI integration |
| autoprefixer | - | ^10.4.17 | Web App | CSS autoprefixing |
| class-variance-authority | - | ^0.7.0 | Web App | Conditional class composition |
| clsx | - | ^2.1.0 | Web App | CSS class merging |
| cmdk | ^1.0.4 | ^1.0.4 | Both | Command menu component |
| eventsource-parser | - | ^1.1.2 | Web App | SSE parsing |
| highlight.js | - | ^11.9.0 | Web App | Code syntax highlighting |
| jotai | ^2.11.0 | - | Headless | State management |
| katex | ^0.16.20 | - | Headless | Math equation rendering |
| lowlight | - | ^3.1.0 | Web App | Code highlighting |
| lucide-react | - | ^0.358.0 | Web App | Icon set |
| mindcraft-editor | - | workspace:^ | Web App | The headless editor (to be merged) |
| next | - | 15.1.4 | Web App | Next.js framework |
| next-themes | - | ^0.2.1 | Web App | Theme switching for Next.js |
| openai | - | ^4.28.4 | Web App | OpenAI API integration |
| react | >=18 (peer) | ^18.2.0 | Both | React library |
| react-dom | - | ^18.2.0 | Web App | React DOM |
| react-markdown | ^9.0.3 | ^9.0.1 | Both | Markdown rendering |
| react-moveable | ^0.56.0 | - | Headless | Resizable components |
| react-tweet | ^3.2.1 | - | Headless | Twitter embeds |
| sonner | - | ^1.4.3 | Web App | Toast notifications |
| tailwind-merge | - | ^2.2.1 | Web App | Tailwind class merging |
| tailwindcss-animate | - | ^1.0.7 | Web App | Tailwind animations |
| tiptap-extension-global-drag-handle | ^0.1.16 | - | Headless | Drag handle for editor |
| tiptap-markdown | ^0.8.10 | - | Headless | Markdown support for TipTap |
| tippy.js | ^6.3.7 | ^6.3.7 | Both | Tooltips and popovers |
| ts-pattern | - | ^5.0.8 | Web App | Pattern matching for TypeScript |
| tunnel-rat | ^0.1.2 | - | Headless | Component tunneling |
| use-debounce | - | ^10.0.0 | Web App | Debounce hook |

## Development Dependencies

| Dependency | Headless Version | Web App Version | Required By | Purpose |
|------------|------------------|-----------------|-------------|---------|
| @biomejs/biome | ^1.9.4 | ^1.9.4 | Both | Linting and formatting |
| @types/katex | ^0.16.7 | - | Headless | TypeScript definitions for katex |
| @types/node | ^22.10.6 | ^20.11.24 | Both | TypeScript definitions for Node.js |
| @types/react | ^18.2.55 | ^18.2.61 | Both | TypeScript definitions for React |
| @types/react-dom | 18.2.19 | ^18.2.19 | Both | TypeScript definitions for React DOM |
| tailwindcss | - | ^3.4.1 | Web App | Tailwind CSS framework |
| tsconfig | workspace:* | workspace:* | Both | Shared TypeScript configuration |
| tsup | ^8.3.5 | - | Headless | TypeScript bundler |
| typescript | ^5.7.3 | ^5.4.2 | Both | TypeScript compiler |

## Root Project Dependencies

These dependencies are installed at the root of the monorepo:

| Dependency | Version | Purpose |
|------------|---------|---------|
| @changesets/changelog-github | ^0.5.0 | Changelog generation for GitHub |
| @changesets/cli | ^2.27.1 | Version management and publishing |
| turbo | ^2.3.3 | Monorepo build tool |
| @biomejs/biome | ^1.9.4 | Linting and formatting |
| @commitlint/cli | ^19.2.1 | Commit message linting |
| @commitlint/config-conventional | ^19.1.0 | Conventional commit config |
| husky | ^9.0.11 | Git hooks |
| postcss | ^8.4.38 | CSS processing |

## Notes on Dependencies

1. **React Dependencies**: Both packages use React, with the headless package using it as a peer dependency.

2. **UI Component Libraries**: 
   - The web app uses various Radix UI components
   - The headless package uses a subset of these (@radix-ui/react-slot)
   - Both use cmdk for command menus

3. **Editor Dependencies**:
   - All TipTap-related dependencies are in the headless package
   - These will need to be moved to the web app

4. **State Management**:
   - The headless package uses jotai
   - This will need to be added to the web app

5. **Markdown and Rendering**:
   - Both use react-markdown but with slightly different versions
   - The headless package includes tiptap-markdown

6. **Styling**:
   - The web app uses Tailwind CSS
   - The headless package doesn't have explicit styling dependencies

**Next Steps:** Continue with Task 1.11 to identify and document version conflicts between dependencies. 
# Mindcraft Editor Internal Dependency Map

This document maps the internal dependencies between components in the headless package (`mindcraft-editor`) as part of Task 1.3 in the package merge process.

## Component Dependency Graph

Below is a visualization of how components depend on each other within the headless package. Arrows indicate dependencies (→ means "depends on").

```
EditorRoot → EditorCommandTunnelContext
           → novelStore (from utils/store)

EditorContent → EditorProvider (from @tiptap/react)

EditorBubble → useEditor (from @tiptap/react)
             → EditorBubbleItem

EditorCommand → cmdk
              → EditorCommandTunnelContext
              → EditorCommandEmpty
              → EditorCommandList 
              → EditorCommandItem
```

## Extension Dependencies

```
SlashCommand → renderItems (internal function)
             → createSuggestionItems (internal function)
             → handleCommandNavigation (internal function)
             → Command (from @tiptap/suggestion)

AIHighlight → Extension (from @tiptap/core)

CustomKeymap → Extension (from @tiptap/core)
             → keymap (from @tiptap/pm)

ImageResizer → NodeViewWrapper (from @tiptap/react)
             → Moveable (from react-moveable)

Mathematics → Extension (from @tiptap/core)
           → renderMath (internal function)
           → katex

Twitter → Node (from @tiptap/core)
        → NodeViewWrapper (from @tiptap/react)
        → Tweet (from react-tweet)

UpdatedImage → TiptapImage (from @tiptap/extension-image)
```

## Utility Dependencies

```
editor-commands → Editor (from @tiptap/core)
                → commands (from @tiptap/pm)

editor-utils → Editor (from @tiptap/core)
             → EditorState (from @tiptap/pm)

store → jotai

atoms → atom (from jotai)
```

## Module Export Dependencies

The main `index.ts` file exports components, extensions, plugins, and utilities, creating a public API for the package. All components and functionality must be properly exported here to be accessible to consuming applications.

## Key Dependency Chains

1. **Editor Component Chain**:
   ```
   EditorRoot → EditorCommandTunnelContext → tunnel-rat
   EditorContent → EditorProvider → @tiptap/react
   ```

2. **Command Menu Chain**:
   ```
   EditorCommand → cmdk + EditorCommandTunnelContext
   SlashCommand → @tiptap/suggestion
   ```

3. **Bubble Menu Chain**:
   ```
   EditorBubble → useEditor → @tiptap/react
   ```

4. **State Management Chain**:
   ```
   EditorRoot → novelStore → jotai
   atoms → jotai
   ```

## Component Coupling Analysis

### Tight Coupling

1. **EditorCommand and EditorCommandTunnelContext**:
   - These components are tightly coupled through the tunnel-rat mechanism
   - The command menu relies on this context for positioning and functionality

2. **SlashCommand and @tiptap/suggestion**:
   - The slash command functionality is deeply integrated with TipTap's suggestion API
   
3. **ImageResizer and react-moveable**:
   - The image resizing functionality directly depends on the react-moveable library

### Loose Coupling

1. **EditorRoot and EditorContent**:
   - These can function independently, with EditorRoot providing context
   
2. **Extensions and Core Editor**:
   - Most extensions are modular and can be added or removed independently

## Potential Refactoring Opportunities

1. **Consolidate Context Providers**:
   - The EditorRoot component could potentially be combined with other context providers in the web app

2. **Standardize State Management**:
   - If the web app uses a different state management solution, consider how to integrate with jotai

3. **Modularize Extensions**:
   - Keep extensions as separate modules for easier maintenance and optional inclusion

## Migration Considerations

1. **Preserve Tunnel Context**:
   - The tunnel-rat mechanism needs to be preserved for proper command menu functionality
   
2. **Maintain Extension Registry**:
   - Extensions need to be properly registered with the TipTap editor

3. **State Management Integration**:
   - Ensure jotai state atoms integrate well with the web app's state management

4. **Export/Import Structure**:
   - Carefully plan the new export structure to maintain proper imports within the web app

**Next Steps:** Continue with Task 1.4 to identify components in the web app that depend on the headless package. 
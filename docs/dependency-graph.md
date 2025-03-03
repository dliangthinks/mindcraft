# Mindcraft Editor Dependency Graph

This document provides a visual representation of dependencies between components in the Mindcraft Editor ecosystem as part of Task 1.5 in the package merge process.

## Overall Architecture

```
                                      +---------------------+
                                      |                     |
                                      |  Web Application    |
                                      |  (apps/web)         |
                                      |                     |
                                      +----------+----------+
                                                 |
                                                 | imports
                                                 v
+------------------------+              +--------+-----------+
|                        |              |                    |
| TypeScript Config      +------------->+  Headless Package  |
| (packages/tsconfig)    |  extends     |  (mindcraft-editor)|
|                        |              |                    |
+------------------------+              +--------------------+
```

## Web App Component Dependencies

```
                    +---------------------+
                    |                     |
                    | TailwindAdvanced    |
                    | Editor              |
                    |                     |
                    +---+------+------+---+
                        |      |      |
                        |      |      |
            +-----------+      |      +------------+
            |                  |                   |
            v                  v                   v
+----------------------+  +----+------+  +---------+--------+
|                      |  |           |  |                  |
| UI Components        |  | Extensions|  | Editor Components|
| (Selectors, etc.)    |  | Config    |  | (Root, Content)  |
|                      |  |           |  |                  |
+-------+--------------+  +----+------+  +--------+---------+
        |                      |                   |
        |                      |                   |
        |                      v                   |
        |              +-------+-------+           |
        |              |               |           |
        |              | Editor Wrapper|           |
        |              |               |           |
        |              +-------+-------+           |
        |                      |                   |
        +----------------------+-------------------+
                               |
                               | imports
                               v
                     +---------+---------+
                     |                   |
                     | Headless Package  |
                     | (mindcraft-editor)|
                     |                   |
                     +-------------------+
```

## Headless Package Internal Structure

```
                      +----------------+
                      |                |
                      | index.ts       |
                      | (Main Exports) |
                      |                |
                      +-------+--------+
                              |
                              | exports
                              v
      +---------------------+-+--+---------------------+
      |                     |    |                     |
+-----+------+       +------+----+----+        +------+-------+
|            |       |               |         |              |
| components |       | extensions    |         | plugins      |
|            |       |               |         |              |
+-----+------+       +------+--------+         +------+-------+
      |                     |                         |
      |                     |                         |
+-----+------+       +------+--------+         +------+-------+
|            |       |               |         |              |
| Editor     |       | AIHighlight   |         | UploadImages |
| Components |       | Slash Command |         | Plugin       |
|            |       | etc...        |         |              |
+-----+------+       +---------------+         +--------------+
      |
      |
      v
+---------------+
|               |
| utils         |
| (shared code) |
|               |
+---------------+
```

## Web App to Headless Package Import Graph

```
[TailwindAdvancedEditor] ────imports────> [EditorRoot, EditorContent, ImageResizer, etc.]

[EditorWrapper] ────imports────> [useEditor, addAIHighlight, removeAIHighlight]

[Extensions Config] ────imports────> [AIHighlight, StarterKit, etc.]

[Selector Components] ────imports────> [EditorBubbleItem, EditorInstance]

[GenerativeMenuSwitch] ────imports────> [EditorBubble, useEditor]

[SlashCommand] ────imports────> [Command, createSuggestionItems, renderItems]
```

## Key Dependency Chains (Detailed)

```
Page ──uses──> TailwindAdvancedEditor
                │
                ├──uses──> EditorRoot ──provides context for──> EditorContent
                │          (from mindcraft-editor)
                │
                ├──uses──> extensions ──configured in──> extensions.ts
                │          (from mindcraft-editor)    │
                │                                     └──imports──> AIHighlight, etc.
                │                                                  (from mindcraft-editor)
                │
                └──uses──> UI Components (NodeSelector, etc.)
                                         │
                                         └──import──> EditorBubbleItem, etc.
                                                     (from mindcraft-editor)
```

## State Management Flow

```
EditorRoot (Provider) ─────┐
                          │
                          │ provides store
                          │
                          ▼
EditorContent  ◄─────► Editor Instance ◄────► Extensions
                          │
                          │ accessed via
                          │
                          ▼
Web App Components ─────► useEditor() Hook
```

## Migration Considerations Based on Dependencies

1. **Critical Path Components**:
   - EditorRoot, EditorContent (core structure)
   - useEditor hook (state access)
   - Extensions (functionality)

2. **Adapter Interfaces**:
   - editor-wrapper.ts (can be preserved with updated imports)
   - extensions.ts (configuration can be preserved)

3. **UI Integration Points**:
   - EditorBubble, EditorBubbleItem (for formatting UI)
   - EditorCommand components (for slash commands)

4. **Utility Functions**:
   - Image handling (createImageUpload, handleImagePaste, etc.)
   - Command utilities (createSuggestionItems, renderItems)

## Conclusion

The dependency graph reveals a clean architecture with clear integration points between the web app and the headless package. During migration, maintaining these relationships while transitioning to a unified structure will be key to preserving functionality.

The web app extensively uses components and utilities from the headless package, but does so in an organized manner through adapter patterns (editor-wrapper.ts) and configuration files (extensions.ts).

**Next Steps:** Continue with Task 1.6 to create a directory structure diagram for the new unified structure. 
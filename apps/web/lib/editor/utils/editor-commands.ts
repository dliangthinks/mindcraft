import type { Editor } from "@tiptap/react";

/**
 * Type for editor command functions
 */
export type EditorCommand = (editor: Editor | null | undefined) => void;

/**
 * Type for editor active state checks
 */
export type IsActiveCheck = (editor: Editor | null | undefined) => boolean;

/**
 * Type for heading level
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Type for heading attributes
 */
export interface HeadingAttrs {
  level: HeadingLevel;
}

/**
 * Safely creates a command that toggles a mark
 * @param markName The name of the mark to toggle
 * @returns A command function that safely handles null/undefined editors
 */
export function toggleMark(markName: string): EditorCommand {
  return (editor) => {
    if (!editor) return;
    editor.chain().focus().toggleMark(markName).run();
  };
}

/**
 * Safely creates a command that clears nodes
 * @returns A command function that safely handles null/undefined editors
 */
export function clearNodes(): EditorCommand {
  return (editor) => {
    if (!editor) return;
    editor.chain().focus().clearNodes().run();
  };
}

/**
 * Safely creates a command that toggles a node
 * @param nodeName The name of the node to toggle
 * @param attrs Optional attributes for the node
 * @returns A command function that safely handles null/undefined editors
 */
export function toggleNode(nodeName: string, attrs?: Record<string, any>): EditorCommand {
  return (editor) => {
    if (!editor) return;
    if (nodeName === "heading" && attrs?.level) {
      editor.chain().focus().clearNodes().toggleHeading({ level: attrs.level as HeadingLevel }).run();
    } else if (nodeName === "bulletList") {
      editor.chain().focus().clearNodes().toggleBulletList().run();
    } else if (nodeName === "orderedList") {
      editor.chain().focus().clearNodes().toggleOrderedList().run();
    } else if (nodeName === "taskList") {
      editor.chain().focus().clearNodes().toggleTaskList().run();
    } else if (nodeName === "blockquote") {
      editor.chain().focus().clearNodes().toggleBlockquote().run();
    } else if (nodeName === "codeBlock") {
      editor.chain().focus().clearNodes().toggleCodeBlock().run();
    }
  };
}

/**
 * Creates a function to check if a mark is active
 * @param markName The name of the mark to check
 * @returns A function that checks if the mark is active
 */
export function isMarkActive(markName: string): IsActiveCheck {
  return (editor) => {
    if (!editor) return false;
    return editor.isActive(markName);
  };
}

/**
 * Creates a function to check if a node is active
 * @param nodeName The name of the node to check
 * @param attrs Optional attributes to check
 * @returns A function that checks if the node is active
 */
export function isNodeActive(nodeName: string, attrs?: Record<string, any>): IsActiveCheck {
  return (editor) => {
    if (!editor) return false;
    return editor.isActive(nodeName, attrs);
  };
} 
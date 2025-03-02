import { Editor } from "@tiptap/react";

/**
 * Safely executes an operation on an editor, handling null/undefined cases
 * @param editor The editor instance which might be null
 * @param operation Function that performs operations on the editor
 * @param fallback Optional fallback value if editor is null
 * @returns The result of the operation or the fallback value
 */
export function withEditor<T>(editor: Editor | null | undefined, operation: (editor: Editor) => T, fallback?: T): T | undefined {
  if (!editor) return fallback;
  return operation(editor);
}

/**
 * Safely get a chain from an editor, handling null/undefined cases
 * @param editor The editor instance which might be null
 * @returns A chainable editor command, or undefined if editor is null
 */
export function safeChain(editor: Editor | null | undefined) {
  if (!editor) return undefined;
  return editor.chain();
}

/**
 * Check if a value is active in the editor, safely handling null/undefined editors
 * @param editor The editor instance which might be null
 * @param type The node or mark type to check
 * @param attrs Optional attributes to check
 * @returns Whether the type is active, or false if editor is null
 */
export function isActive(editor: Editor | null | undefined, type: string, attrs?: Record<string, any>): boolean {
  if (!editor) return false;
  return editor.isActive(type, attrs);
}

/**
 * Types for editor command handlers
 */
export type EditorCommandHandler = (editor: Editor) => void;
export type SafeEditorCommandHandler = (editor: Editor | null | undefined) => void;

/**
 * Creates a safe command handler that checks for null/undefined editors
 * @param handler The command handler expecting a valid editor
 * @returns A wrapped handler that safely handles null/undefined editors
 */
export function createSafeCommand(handler: EditorCommandHandler): SafeEditorCommandHandler {
  return (editor) => {
    if (!editor) return;
    handler(editor);
  };
} 
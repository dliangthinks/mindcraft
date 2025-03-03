import { useEditor } from "@/lib/editor";
import { addAIHighlight as originalAddAIHighlight, removeAIHighlight as originalRemoveAIHighlight } from "@/lib/editor/extensions/ai-highlight";
export { useEditor };

// Define the Editor type based on how it's used in the components
type Editor = ReturnType<typeof useEditor>["editor"];

/**
 * Safely execute a function with an editor that might be null
 */
export function withEditor<T>(
  editor: Editor,
  callback: (editor: NonNullable<Editor>) => T,
  fallback?: T
): T | undefined {
  if (!editor) return fallback;
  return callback(editor);
}

/**
 * Safely check if a type is active in the editor
 */
export function isEditorActive(
  editor: Editor,
  type: string,
  attrs?: Record<string, any>
): boolean {
  if (!editor) return false;
  return editor.isActive(type, attrs);
}

/**
 * Safely create a command chain
 */
export function safeChain(editor: Editor) {
  if (!editor) return {
    focus: () => safeChain(editor),
    clearNodes: () => safeChain(editor),
    toggleHeading: () => safeChain(editor),
    toggleTaskList: () => safeChain(editor),
    toggleBulletList: () => safeChain(editor),
    toggleOrderedList: () => safeChain(editor),
    toggleBlockquote: () => safeChain(editor),
    toggleCodeBlock: () => safeChain(editor),
    toggleBold: () => safeChain(editor),
    toggleItalic: () => safeChain(editor),
    toggleUnderline: () => safeChain(editor),
    toggleStrike: () => safeChain(editor),
    toggleCode: () => safeChain(editor),
    unsetHighlight: () => safeChain(editor),
    setLink: () => safeChain(editor),
    unsetLink: () => safeChain(editor),
    setColor: () => safeChain(editor),
    setHighlight: () => safeChain(editor),
    setLatex: () => safeChain(editor),
    unsetLatex: () => safeChain(editor),
    run: () => undefined
  };
  return editor.chain();
}

/**
 * Safely add AI highlight to the editor
 */
export function addAIHighlight(editor: Editor): void {
  if (!editor) return;
  originalAddAIHighlight(editor);
}

/**
 * Safely remove AI highlight from the editor
 */
export function removeAIHighlight(editor: Editor): void {
  if (!editor) return;
  originalRemoveAIHighlight(editor);
}

/**
 * Safely execute a command on the editor
 */
export function executeCommand(
  editor: Editor,
  command: (editor: NonNullable<Editor>) => void
): void {
  if (!editor) return;
  command(editor);
}

/**
 * Safely check if a ref is not null before accessing its value
 */
export function safeRef<T>(ref: React.RefObject<T> | null | undefined): T | null {
  if (!ref || !ref.current) return null;
  return ref.current;
}

/**
 * Safely handle nullable values
 */
export function safeguard<T, R>(
  value: T | null | undefined,
  handler: (value: T) => R,
  fallback?: R
): R | undefined {
  if (value === null || value === undefined) return fallback;
  return handler(value);
} 
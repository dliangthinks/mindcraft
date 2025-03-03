import { Editor } from "@tiptap/react";
import type { KeyboardEvent, ReactNode } from "react";

/**
 * Common props interface for command components
 */
export interface CommandProps {
  editor: Editor | null;
  onClose?: () => void;
}

/**
 * Component reference interface with optional handler methods
 */
export interface ComponentRef {
  onKeyDown?: (props: { event: KeyboardEvent }) => boolean | void;
  [key: string]: any;
}

/**
 * Type-safe command item interface
 */
export interface CommandItem {
  title: string;
  description: string;
  icon: ReactNode;
  searchTerms?: string[];
  command?: ((val?: any) => void) | null | undefined;
}

/**
 * Safely executes a command if it exists
 * @param command The command function which might be undefined
 * @param value Optional value to pass to the command
 * @returns void
 */
export function executeCommand(command?: ((val?: any) => void) | null, value?: any): void {
  if (typeof command === 'function') {
    command(value);
  }
}

/**
 * Safely gets a property from a reference that might not exist
 * @param ref The reference object which might be null/undefined
 * @param property The property name to access
 * @returns The property value or undefined
 */
export function getRefProperty<T>(ref: any | null | undefined, property: string): T | undefined {
  if (!ref) return undefined;
  return ref[property] as T;
}

/**
 * Type guard to check if an object has a specific method
 * @param obj The object to check
 * @param method The method name to check for
 * @returns True if the object has the method
 */
export function hasMethod(obj: any, method: string): boolean {
  return obj && typeof obj[method] === 'function';
} 
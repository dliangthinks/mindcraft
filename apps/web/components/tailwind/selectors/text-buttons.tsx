import { Button } from "@/components/tailwind/ui/button";
import { cn } from "@/lib/utils";
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react";
import { EditorBubbleItem } from "mindcraft-editor";
import type { SelectorItem } from "./node-selector";
import { useEditor, isEditorActive, safeChain } from "@/lib/editor-wrapper";

export const TextButtons = () => {
  const { editor } = useEditor();
  
  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => isEditorActive(editor, "bold"),
      command: (editor) => safeChain(editor)?.focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => isEditorActive(editor, "italic"),
      command: (editor) => safeChain(editor)?.focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => isEditorActive(editor, "underline"),
      command: (editor) => safeChain(editor)?.focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => isEditorActive(editor, "strike"),
      command: (editor) => safeChain(editor)?.focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: (editor) => isEditorActive(editor, "code"),
      command: (editor) => safeChain(editor)?.focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];
  
  if (!editor) return null;
  
  return (
    <div className="flex">
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost" type="button">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};

import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import { Check, TextQuote, TrashIcon } from "lucide-react";
import { useEditor, withEditor } from "@/lib/editor-wrapper";

const AICompletionCommands = ({
  completion,
  onDiscard,
}: {
  completion: string;
  onDiscard: () => void;
}) => {
  const { editor } = useEditor();
  return (
    <>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            withEditor(editor, (editor) => {
              const selection = editor.view.state.selection;
              editor
                .chain()
                .focus()
                .insertContentAt(
                  {
                    from: selection.from,
                    to: selection.to,
                  },
                  completion,
                )
                .run();
              return true;
            }, false);
          }}
        >
          <Check className="h-4 w-4 text-muted-foreground" />
          Replace selection
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            withEditor(editor, (editor) => {
              const selection = editor.view.state.selection;
              editor
                .chain()
                .focus()
                .insertContentAt(selection.to + 1, completion)
                .run();
              return true;
            }, false);
          }}
        >
          <TextQuote className="h-4 w-4 text-muted-foreground" />
          Insert below
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <TrashIcon className="h-4 w-4 text-muted-foreground" />
          Discard
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AICompletionCommands;

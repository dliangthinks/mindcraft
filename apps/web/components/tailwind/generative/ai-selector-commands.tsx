import { ArrowDownWideNarrow, CheckCheck, RefreshCcwDot, StepForward, WrapText } from "lucide-react";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import { useEditor, withEditor } from "@/lib/editor-wrapper";
import { getPrevText } from "@/lib/editor";

const options = [
  {
    value: "improve",
    label: "Improve writing",
    icon: RefreshCcwDot,
  },
  {
    value: "fix",
    label: "Fix grammar",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Make shorter",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Make longer",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();

  return (
    <>
      <CommandGroup heading="Edit or review selection">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              withEditor(editor, (editor) => {
                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(slice.content);
                onSelect(text, value);
                return true;
              }, false);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandItem
          onSelect={() => {
            withEditor(editor, (editor) => {
              const pos = editor.state.selection.from;
              const text = editor ? getPrevText(editor, pos) : "";
              onSelect(text, "continue");
              return true;
            }, false);
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          Continue writing
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;

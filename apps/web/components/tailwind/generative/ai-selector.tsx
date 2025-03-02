"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { LucideCommand, Wand2 } from "lucide-react";
import type { FC, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useEditor, withEditor, addAIHighlight } from "@/lib/editor-wrapper";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import AISelectorCommands from "./ai-selector-commands";

interface AISelector {
  onAIComplete: (text: string, option: string) => void;
}

export const AISelector: FC<AISelector> = ({ onAIComplete }) => {
  const { editor } = useEditor();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => {
    setOpen(false);
  });

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    // id: "novel",
    [],
  );

  useEffect(() => {
    if (!open) {
      withEditor(editor, (ed) => {
        ed.chain().unsetHighlight().focus().run();
      });
    }
  }, [open, editor]);

  return (
    <div className="relative h-9" ref={containerRef}>
      <Tooltip content="Generate with AI">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-lg"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          onFocus={() => withEditor(editor, (ed) => addAIHighlight(ed))}
        >
          <Wand2 className="h-4 w-4 text-purple-500" />
        </Button>
      </Tooltip>
      {open && (
        <div className="novel-ai-command animate-in fade-in slide-in-from-top-1 fixed left-0 top-2 z-[99] w-72 items-center rounded-lg border border-border bg-background shadow-xl">
          <Command className="novel-command" onKeyDown={onKeyDown}>
            <CommandInput placeholder="Ask AI..." autoFocus />
            <CommandList className="novel-command-list small-scrollbar max-h-[400px] overflow-auto">
              <CommandEmpty className="px-4 py-2.5 text-sm">Write a prompt...</CommandEmpty>
              <CommandGroup className="px-2 pb-2">
                <CommandItem
                  className="flex gap-2 px-4"
                  value="generate"
                  onSelect={() => {
                    withEditor(editor, (ed) => {
                      const slice = ed.state.selection.content();
                      const text = ed.storage.markdown.serializer.serialize(slice.content);
                      onAIComplete(text, "generate");
                      setOpen(false);
                    });
                  }}
                >
                  <LucideCommand className="h-4 w-4 text-purple-500" />
                  Generate
                </CommandItem>

                <AISelectorCommands
                  onSelect={(val, option) => {
                    onAIComplete(val, option);
                    setOpen(false);
                    withEditor(editor, (ed) => {
                      ed.chain().unsetHighlight().focus().run();
                    });
                  }}
                />
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

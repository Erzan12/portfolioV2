"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight"; // You'll need to install 'lowlight'
import { useEffect } from "react";

// Initialize lowlight for code highlighting
const lowlight = createLowlight(common);

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Disable the default code block so Lowlight can take over
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-border",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ] as any,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // 'prose-sm' or 'prose-base' helps keep text sizes readable while editing
        class: "prose dark:prose-invert prose-olive max-w-none focus:outline-none min-h-[400px] border rounded-md p-4 bg-background",
      },
    },
  });

  // Keep editor in sync with external value
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="relative w-full">
      {/* 
         PRO TIP: Add a Toolbar here! 
         Without buttons for Bold, Italic, Link, etc., 
         you have to know keyboard shortcuts to format anything. 
      */}
      <EditorContent editor={editor} />
    </div>
  );
}
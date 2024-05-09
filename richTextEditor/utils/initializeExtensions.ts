import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Document from "@tiptap/extension-document";
import { AiExtension } from "./extensionAi";

const CustomDocument = Document.extend({
  content: "heading block*",
});
import Commands from "./commands";
import { suggestions } from "./suggestion";

export function initializeExtensions() {
  const tiptapExtensions = [
    CustomDocument,
    StarterKit.configure({
      document: false,
    }),
    Placeholder.configure({
      emptyEditorClass: "v-editor-empty",
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "Page title";
        }

        return "Type '/' for commands";
      },
    }),
    Commands.configure({
      suggestion: suggestions(),
    }),
    Focus.configure(),
    Link.configure({
      autolink: true, // default
      linkOnPaste: true, // default
      protocols: ["mailto"], // additional protocols - default: []
      openOnClick: true, // default
      HTMLAttributes: {
        rel: "noopener noreferrer",
        target: "_blank",
      },
    }),
    Underline.configure(),
  ];

  const bubbleMenu = [];
  const menu = document.querySelector(".menu");
  if (menu) {
    bubbleMenu.push(
      BubbleMenu.configure({
        element: menu as HTMLElement,
      })
    );
  }

  const customExtensions = [AiExtension];

  return [...tiptapExtensions, ...bubbleMenu, ...customExtensions];
}

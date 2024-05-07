import { VueRenderer } from "@tiptap/vue-3";
import type { Editor, Range } from "@tiptap/core";
import type {
  SuggestionProps,
  SuggestionKeyDownProps,
} from "@tiptap/suggestion";
import tippy, { type Instance, type GetReferenceClientRect } from "tippy.js";
import CommandsList from "../components/CommandsList.vue";

export const suggestions = () => {
  return {
    items: ({ query }: { query: string }) => {
      const items = [];

      items.push(
        {
          title: "Ask AI",
          slug: "ai",
          command: ({ editor }: { editor: Editor }) => {
            editor
              .chain()
              .deleteNode("paragraph")
              .focus()
              .setAiChatCompletion()
              .run();
          },
        },
        {
          title: "Text",
          slug: "paragraph",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().setParagraph().deleteRange(range).run();
          },
        },
        {
          title: "Heading 1",
          slug: "h1",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("heading", { level: 1 })
              .run();
          },
        },
        {
          title: "Heading 2",
          slug: "h2",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("heading", { level: 2 })
              .run();
          },
        },
        {
          title: "Heading 3",
          slug: "h3",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("heading", { level: 3 })
              .run();
          },
        },
        {
          title: "Bulleted List",
          slug: "ul",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
          },
        },
        {
          title: "Ordered List",
          slug: "ol",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
          },
        },
        {
          title: "Code Block",
          slug: "code",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
          },
        },
        {
          title: "Blockquote",
          slug: "blockquote",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run();
          },
        }
      );

      return items
        .map((item, index) => ({ ...item, position: index }))
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
    },
    render: () => {
      let component: VueRenderer;
      let popup: Instance[];

      return {
        onStart: (props: SuggestionProps) => {
          component = new VueRenderer(CommandsList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect as GetReferenceClientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props: SuggestionProps) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          });
        },

        onKeyDown(props: SuggestionKeyDownProps) {
          if (props.event.key === "Escape") {
            popup[0].hide();

            return true;
          }
          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  };
};

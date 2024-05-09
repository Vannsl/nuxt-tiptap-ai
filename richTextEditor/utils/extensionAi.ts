import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { attributeClientOnly } from "../constants/attribute";
import Ai from "../components/Ai.vue";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Ai: {
      setAiChatCompletion: () => ReturnType;
    };
  }
}

type AiOptions = {
  HTMLAttributes: Record<string, string>;
};

export const AiExtension = Node.create<AiOptions>({
  name: "ai",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group() {
    return "block";
  },

  addAttributes() {
    return {
      [attributeClientOnly]: {
        default: "true",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "ai",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ai", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setAiChatCompletion:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
          }),
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(Ai);
  },
});

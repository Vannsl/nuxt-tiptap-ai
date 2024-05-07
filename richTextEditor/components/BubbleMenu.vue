<script setup lang="ts">
import { BubbleMenu, type Editor, isTextSelection } from "@tiptap/vue-3";

defineProps<{
  editor: Editor;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shouldShowHandler({ editor, view, from, to, state }: any) {
  const { doc, selection } = state;
  const { empty } = selection;

  // Sometime check for `empty` is not enough.
  // Doubleclick an empty paragraph returns a node size of 2.
  // So we check also for an empty text size.
  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(state.selection);

  // Don't show bubble menu if
  // - there is no focus
  // - the focused element is empty
  // - the focused element is an element where the elements don't make sense
  if (
    !view.hasFocus() ||
    empty ||
    isEmptyTextBlock ||
    editor.isActive("zavvyAi") ||
    editor.isActive("actionTextAttachment") ||
    editor.isActive("codeBlock")
  )
    return false;

  return true;
}
</script>

<template>
  <BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" class="menu">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      type="button"
      :should-show="shouldShowHandler"
    >
      bold
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      type="button"
    >
      italic
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      type="button"
    >
      strike
    </button>
  </BubbleMenu>
</template>

<style scoped>
.menu {
  background: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
}

.is-active {
  color: blue;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: #333;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.5;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: color 0.15s;
}

button:hover {
  background-color: #f3f4f6;
}
</style>

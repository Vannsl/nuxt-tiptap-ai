<script setup lang="ts">
import { BubbleMenu, type Editor, isTextSelection } from "@tiptap/vue-3";
import { SparklesIcon } from "@heroicons/vue/20/solid";

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
    editor.isActive("ai") ||
    editor.isActive("actionTextAttachment") ||
    editor.isActive("codeBlock")
  )
    return false;

  return true;
}

function onSummarizeClick() {
  console.log("Missing implementation")
}
</script>

<template>
  <BubbleMenu
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    class="menu flex items-center"
  >
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      type="button"
      :should-show="shouldShowHandler"
    >
      <span class="sr-only">Bold</span>
      <svg class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
        <path
          d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"
        />
      </svg>
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      type="button"
    >
      <span class="sr-only">Italic</span>
      <svg class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
        <path
          d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"
        />
      </svg>
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      type="button"
    >
      <span class="sr-only">Strikethrough</span>
      <svg class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
        <path
          d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z"
        />
      </svg>
    </button>
    <div class="pl-3 border-l ">
      <SparklesIcon
        class="h-5 w-5 text-gray-400"
        aria-label="AI Actions"
      />
    </div>
    <button
      @click="onSummarizeClick"
      :class="{ 'is-active': editor.isActive('strike') }"
      type="button"
    >
      Summarize
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

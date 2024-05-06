<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { initializeExtensions } from "./utils/initializeExtensions";
import BubbleMenu from "./components/BubbleMenu.vue";

const model = defineModel<string>({ required: true });

const editor = useEditor({
  content: model.value,
  extensions: initializeExtensions(),
  onUpdate: () => {
    if (typeof editor.value === "undefined") {
      return;
    }
    model.value = editor.value.getHTML();
  },
});

watch(model, (value) => {
  if (typeof editor.value === "undefined") {
    return;
  }

  if (editor.value!.getHTML() === value) {
    return;
  }

  // editor.value.commands.setContent(value, false);
});
</script>

<template>
  <div v-if="editor">
    <EditorContent :editor="editor" class="v-editor" />
    <BubbleMenu :editor="editor" />
  </div>
</template>

<style scoped>
.v-editor :deep(.tiptap) {
  min-height: calc(100vh - 8rem);
}

.v-editor :deep(h1) {
  @apply text-7xl font-semibold mb-4;
}

.v-editor :deep(h2) {
  @apply text-4xl font-semibold mb-2;
}

.v-editor :deep(h3) {
  @apply text-3xl font-semibold mb-1;
}

.v-editor :deep(h4) {
  @apply text-2xl font-semibold mb-1;
}

.v-editor :deep(h5) {
  @apply text-xl font-semibold mb-1;
}

.v-editor :deep(h6) {
  @apply text-lg font-semibold mb-1;
}

.v-editor :deep(hr) {
  @apply my-1;
}

.v-editor :deep(ul) {
  margin-left: 1rem;
  list-style-type: disc;
}

.v-editor :deep(ol) {
  margin-left: 1rem;
  list-style-type: decimal;
}

.v-editor :deep(strong) {
  @apply font-bold;
}

.v-editor :deep(pre) {
  @apply p-4;
  @apply bg-gray-50;
  @apply rounded-lg;
}

.v-editor :deep(blockquote) {
  @apply border-gray-800;
  @apply pl-4;

  border-left-width: 3px;
}

.v-editor {
  overflow-y: auto;
  height: 100%;
}

.v-editor :deep(*:focus-visible) {
  outline: none;
}

.v-editor :deep(.ProseMirror) {
  height: 100%;
}

.v-editor :deep(.v-editor-empty::before),
.v-editor :deep(.is-empty::before) {
  color: #888;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.v-editor :deep(blockquote) {
  border: 0 solid #ccc;
  border-left-width: 0.3em;
  margin-left: 0.3em;
  padding-left: 0.6em;
}
</style>

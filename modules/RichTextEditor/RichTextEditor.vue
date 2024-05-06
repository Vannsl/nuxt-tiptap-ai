<script setup lang="ts">
import { watch } from "vue";
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

  editor.value.commands.setContent(value, false);
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
  font-size: 2rem;
  line-height: 1.6;
  font-weight: 600;
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

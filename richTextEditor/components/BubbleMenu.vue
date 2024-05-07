<script setup lang="ts">
import { BubbleMenu, Editor } from "@tiptap/vue-3";

defineProps<{
  editor: Editor;
}>();
</script>

<template>
  <BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" class="menu">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      type="button"
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

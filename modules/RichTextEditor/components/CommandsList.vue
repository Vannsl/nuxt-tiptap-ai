<script setup lang="ts">
import { ref, watch } from "vue";
import type { Editor } from "@tiptap/vue-3";

type SuggestionItem = {
  title: string;
  slug: string;
  command: () => void;
};

const props = defineProps<{
  items: SuggestionItem[];
  editor: Editor;
  command: (item: SuggestionItem) => void;
}>();

const selectedIndex = ref(0);

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  }
);

function upHandler() {
  selectedIndex.value =
    (selectedIndex.value + props.items.length - 1) % props.items.length;
}

function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
}
function onKeyDown({ event }: { event: KeyboardEvent }) {
  if (event.key === "ArrowUp") {
    upHandler();
    return true;
  }

  if (event.key === "ArrowDown") {
    downHandler();
    return true;
  }

  if (event.key === "Enter") {
    enterHandler();
    return true;
  }

  return false;
}

defineExpose({
  onKeyDown,
});

const wrapper = ref<HTMLElement | null>(null);

function enterHandler() {
  const item = props.items[selectedIndex.value];
  if (item) {
    if (item.slug === "image") {
      const label = wrapper.value?.querySelector("label");
      if (label) {
        label.click();
      }
      return;
    }
    props.command(item);
  }
}

function selectItem(index: number) {
  const item = props.items[index];
  if (item) {
    props.command(item);
  }
}
</script>

<template>
  <div ref="wrapper" class="wrapper">
    <ul v-if="items.length">
      <li v-for="(item, index) in items" :key="index">
        <button
          :class="{
            'is-active': index === selectedIndex,
          }"
          class="field"
          type="button"
          @click="selectItem(index)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
    <div v-else class="tw-p-2">No result</div>
  </div>
</template>

<style scoped>
.is-active {
  background-color: #f3f4f6;
}

.wrapper {
  position: relative;
  max-height: 30rem;
  width: fit-content;
  min-width: 212px;
  max-width: 100%;
  overflow: auto;
  border-radius: 0.375rem;
  padding: 0.25rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.field {
  background: white;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  text-align: left;
  cursor: pointer;
}

.field:hover {
  background-color: #f3f4f6;
}
</style>

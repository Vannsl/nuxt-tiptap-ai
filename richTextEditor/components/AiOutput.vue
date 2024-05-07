<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  MicrophoneIcon,
  BackspaceIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  LanguageIcon,
  PencilSquareIcon,
  ArrowUturnDownIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps<{
  text: string;
  showUndoAction: boolean;
  showShorteningAction: boolean;
  showEnrichmentAction: boolean;
}>();

defineEmits<{
  (e: "onInsertClick"): void;
  (e: "onAdjustmentClick", value: string): void;
  (e: "onDiscardClick"): void;
}>();

const sanitizedText = computed(() => sanitizeHtml(props.text));
</script>

<template>
  <p v-html="sanitizedText" />
  <div class="mt-4 flex items-center gap-2">
    <button
      type="button"
      class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="$emit('onInsertClick')"
    >
      Insert
      <CheckCircleIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
    </button>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Options
          <ChevronDownIcon
            class="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1" v-show="showUndoAction">
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full"
                @click="$emit('onAdjustmentClick', 'undo')"
              >
                <ArrowUturnDownIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Revert change
              </button>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full"
                @click="$emit('onAdjustmentClick', 'followUp')"
              >
                <PencilSquareIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Continue writing...
              </button>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem v-slot="{ active }" v-show="showEnrichmentAction">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full"
                @click="$emit('onAdjustmentClick', 'enrichment')"
              >
                <PlusCircleIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Enrich
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }" v-show="showShorteningAction">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full"
                @click="$emit('onAdjustmentClick', 'shortening')"
              >
                <MinusCircleIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Summarize
              </button>
            </MenuItem>
          </div>
          <div class="py-1">
            <div class="flex items-center px-4 py-2 text-sm text-gray-700">
              <MicrophoneIcon
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Change tone
            </div>
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full pl-12"
                @click="$emit('onAdjustmentClick', 'tone_professional')"
              >
                Professional
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full pl-12"
                @click="$emit('onAdjustmentClick', 'tone_friendly')"
              >
                Friendly
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full pl-12"
                @click="$emit('onAdjustmentClick', 'tone_straightforward')"
              >
                Straightforward
              </button>
            </MenuItem>
          </div>
          <div class="py-1">
            <div class="flex items-center px-4 py-2 text-sm text-gray-700">
              <LanguageIcon
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Translate into
            </div>
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full pl-12"
                @click="$emit('onAdjustmentClick', 'translation_english')"
              >
                English
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full pl-12"
                @click="$emit('onAdjustmentClick', 'translation_german')"
              >
                German
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                class="w-full pl-12"
                @click="$emit('onAdjustmentClick', 'translation_french')"
              >
                French
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <button
      type="button"
      class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      @click="$emit('onDiscardClick')"
    >
      Discard
      <BackspaceIcon class="-mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
    </button>
  </div>
</template>

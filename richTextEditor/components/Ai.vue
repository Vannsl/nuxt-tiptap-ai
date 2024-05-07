<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import dayjs from "dayjs";
import { MAX_PROMPT_TOKEN_LENGTH } from "../constants/maxPromptLength";
import { getLastWordsWithMaxChars } from "../utils/getLastWordsWithMaxChars";

type Output = {
  text: string;
  timestamp: Date;
};

const ACTION_SLUGS: string[] = [
  "chatCompletion",
  "followUp",
  "shortening",
  "enrichment",
  "translation",
];
type ActionSlug = (typeof ACTION_SLUGS)[number];
type ActionMethod = "replace" | "append";
type Action = {
  createPrompt: (
    text: string,
    targetLanguage?: string
  ) => Record<string, string>;
  promptType: string;
  method: ActionMethod;
};
const actions: Record<ActionSlug, Action> = {
  simplyPromptRelay: {
    createPrompt: (text: string) => ({
      text,
    }),
    promptType: "chatCompletion",
    method: "append",
  },
  followUp: {
    createPrompt: (text: string) => ({ text: getLastWordsWithMaxChars(text) }),
    promptType: "followUp",
    method: "append",
  },
  shortening: {
    createPrompt: (text: string) => ({ text }),
    promptType: "shortening",
    method: "replace",
  },
  enrichment: {
    createPrompt: (text: string) => ({ text }),
    promptType: "enrichment",
    method: "replace",
  },
  translation: {
    createPrompt: (text: string, targetLanguage?: string) => ({
      text,
      language: targetLanguage || "en",
    }),
    promptType: "translation",
    method: "replace",
  },
};

const props = defineProps(nodeViewProps);

const outputList = ref<Output[]>([]);
const latestOutput = computed<Output | null>(() => {
  if (outputList.value.length === 0) return null;
  return outputList.value[outputList.value.length - 1];
});

const timestamp = ref<Date | null>(null);
const timestampLabel = computed<string>(() => {
  let date: Date | null = null;
  if (latestOutput.value) {
    date = latestOutput.value.timestamp;
  } else if (timestamp.value) {
    date = timestamp.value;
  }
  return date ? dayjs(date).format("hh:mm A") : "";
});

function deleteNodeAndFocus() {
  props.deleteNode();
  props.editor.commands.focus();
}

function insertContentAndDeleteNode() {
  // inserts AI content directly before this node.
  props.editor
    .chain()
    .focus()
    .insertContentAt(
      props.editor.state.selection.$anchor.pos,
      latestOutput.value!.text,
      {
        updateSelection: true,
        parseOptions: {
          preserveWhitespace: "full",
        },
      }
    )
    .run();

  deleteNodeAndFocus();
}

function handleResponse(text: string, method: ActionMethod = "replace") {
  if (outputList.value.length >= 2) {
    outputList.value.shift();
  }
  let outputText: string = "";

  switch (method) {
    case "replace":
      outputText = text;
      break;
    case "append":
      outputText = latestOutput.value
        ? latestOutput.value.text + " " + text
        : text;
      break;
    default:
      outputText = text;
      break;
  }
  outputList.value.push({
    timestamp: timestamp.value || new Date(),
    text: outputText,
  });
}

const isLoading = ref(false);
async function executeActionCompletionPrompt(
  prompt: Record<string, string>,
  promptType: string,
  method: ActionMethod
) {
  isLoading.value = true;
  timestamp.value = new Date();
  try {
    const data: string = await $fetch("/api/ai", {
      method: "POST",
      body: { prompt },
    });

    handleResponse(data, method);
  } catch (err) {
    // Toast
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

async function executeAction(slug: ActionSlug, text: string): Promise<void> {
  const config = actions[slug];
  const prompt = config.createPrompt(text);
  await executeActionCompletionPrompt(prompt, config.promptType, config.method);
}

async function handleAdjustment(slug: ActionSlug | string): Promise<void> {
  if (slug.startsWith("translation")) {
    const targetLanguage = slug.split("_")[1];
    await handleTranslation(targetLanguage);
    return;
  }
  if (ACTION_SLUGS.includes(slug)) {
    await executeAction(slug as ActionSlug, latestOutput.value?.text || "");
    return;
  }
  if (slug === "undo") {
    outputList.value.pop();
    return;
  }
}

async function handleTranslation(targetLanguage: string): Promise<void> {
  const config = actions.translation;
  const prompt = config.createPrompt(
    latestOutput.value?.text || "",
    targetLanguage
  );
  await executeActionCompletionPrompt(prompt, config.promptType, config.method);
}
const inputWrapperElement = ref<HTMLElement | null>(null);
onMounted(async () => {
  if (inputWrapperElement.value) {
    inputWrapperElement.value.querySelector("input")?.select();
  }
});
</script>

<template>
  <NodeViewWrapper
    class="relative w-full my-2"
    @keydown.esc="deleteNodeAndFocus"
  >
    <div
      ref="inputWrapperElement"
      class="w-full p-4 rounded-lg border border-gray-200"
    >
      <p v-show="timestampLabel" class="mb-2 text-xs">
        {{ timestampLabel }}
      </p>
      <AiLoading v-if="isLoading" />
      <AiOutput
        v-else-if="latestOutput"
        :key="latestOutput.timestamp.toString()"
        :text="latestOutput.text"
        :should-show-undo-action="outputList.length > 1"
        :should-show-shortening-action="latestOutput.text.length > 40"
        :should-show-enrichment-action="
          latestOutput.text.length < MAX_PROMPT_TOKEN_LENGTH
        "
        @on-insert-click="insertContentAndDeleteNode"
        @on-adjustment-click="handleAdjustment"
        @on-discard-click="deleteNodeAndFocus"
      />
      <AiInput
        v-else
        @on-submit="
          (val: string) => executeAction('simplyPromptRelay', val)
        "
      />
    </div>
  </NodeViewWrapper>
</template>

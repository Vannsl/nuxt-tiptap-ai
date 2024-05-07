<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import dayjs from "dayjs";
import { MAX_PROMPT_TOKEN_LENGTH } from "../constants/maxPromptLength";
import { getLastWordsWithMaxChars } from "../utils/getLastWordsWithMaxChars";

type Output = {
  text: string;
  timestamp: Date;
  feedbackId: number;
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
  agentUuid: string;
  method: ActionMethod;
};
const actions: Record<ActionSlug, Action> = {
  simplyPromptRelay: {
    createPrompt: (text: string) => ({
      text,
    }),
    agentUuid: "chatCompletion",
    method: "append",
  },
  followUp: {
    createPrompt: (text: string) => ({ text: getLastWordsWithMaxChars(text) }),
    agentUuid: "followUp",
    method: "append",
  },
  shortening: {
    createPrompt: (text: string) => ({ text }),
    agentUuid: "shortening",
    method: "replace",
  },
  enrichment: {
    createPrompt: (text: string) => ({ text }),
    agentUuid: "enrichment",
    method: "replace",
  },
  translation: {
    createPrompt: (text: string, targetLanguage?: string) => ({
      text,
      language: targetLanguage || "en",
    }),
    agentUuid: "translation",
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

function insertContentAndDeleteNode(text: string) {
  // inserts AI content directly before this node.
  props.editor
    .chain()
    .focus()
    .insertContentAt(props.editor.state.selection.$anchor.pos, text, {
      updateSelection: true,
      parseOptions: {
        preserveWhitespace: "full",
      },
    })
    .run();

  deleteNodeAndFocus();
}

/**
 * Adds a new item to the output list, and removes the first item if the list already has more than two items.
 * Users can go back in history once.
 * @param output - The output to be added to the list.
 */
function pushOutput(
  { text, timestamp, feedbackId }: Output,
  method: ActionMethod
) {
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
    timestamp,
    text: outputText,
    feedbackId,
  });
}

function handleResponse(
  response: { text: string; feedback_id: number } | undefined,
  method: ActionMethod = "replace"
) {
  if (!response) {
    throw "Response is empty";
  }
  pushOutput(
    {
      text: response.text,
      timestamp: timestamp.value || new Date(),
      feedbackId: response.feedback_id,
    },
    method
  );
}

const isLoading = ref(false);
async function executeActionCompletionPrompt(
  prompt: Record<string, string>,
  agentUuid: string,
  method: ActionMethod
) {
  timestamp.value = new Date();
  try {
    const { data, pending, error, execute } = await useFetch("/api/ai", {
      method: "POST",
      body: { prompt },
    });
    console.log(data);

    //handleResponse(data, method);
  } catch (err) {
    // Toast
    console.error(err);
  }
}

async function executeAction(slug: ActionSlug, text: string): Promise<void> {
  const config = actions[slug];
  const prompt = config.createPrompt(text);
  await executeActionCompletionPrompt(prompt, config.agentUuid, config.method);
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
  await executeActionCompletionPrompt(prompt, config.agentUuid, config.method);
}
const inputWrapperElement = ref<HTMLElement | null>(null);
onMounted(async () => {
  if (inputWrapperElement.value) {
    inputWrapperElement.value.querySelector("input")?.select();
  }
});
</script>

<template>
  <NodeViewWrapper class="relative w-full" @keydown.esc="deleteNodeAndFocus">
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
        :feedback-id="latestOutput.feedbackId"
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
        @on-submit="
          (val: string) => executeAction('simplyPromptRelay', val)
        "
      />
    </div>
  </NodeViewWrapper>
</template>

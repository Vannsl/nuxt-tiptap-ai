import OpenAI from "openai";
import { getRandomItem } from "~/utils/exampleAnswers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const exampleResponse = (text: string) => ({
  choices: [
    {
      finish_reason: "stop",
      index: 0,
      message: {
        content: text,
        role: "assistant",
      },
      logprobs: null,
    },
  ],
  created: 1677664795,
  id: "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
  model: "gpt-3.5-turbo-0613",
  object: "chat.completion",
  usage: {
    completion_tokens: 17,
    prompt_tokens: 57,
    total_tokens: 74,
  },
});

const systemContent = {
  chatCompletion:
    "You will be provided with a question and you will respond in the same language as asked.",
  followUp: "You will read the text and add more information to it.",
  shorten:
    "Summarize content you are provided with for a second-grade student.",
  enrichment: "You will rewrite the text and enrich it with more details.",
  translation:
    "You will be provided with some sentences in any language, and your task is to translate it into {target}",
  tone: "You will be provided with some sentences in any language and tone, and your task is to make it sound {target} while keeping the same language.",
};

export default defineEventHandler(async (event) => {
  const body: {
    prompt: { text: string; target?: string };
    promptType: keyof typeof systemContent;
  } = await readBody(event);

  await sleep(500);

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: systemContent[body.promptType].replace(
  //         "{target}",
  //         body.prompt.target || ""
  //       ),
  //     },
  //     {
  //       role: "user",
  //       content: body.prompt.text,
  //     },
  //   ],
  //   temperature: 0,
  //   max_tokens: 64,
  //   top_p: 1,
  // });

  return exampleResponse(getRandomItem()).choices[0].message.content;
});

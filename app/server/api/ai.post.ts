import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const exampleResponse = {
  choices: [
    {
      finish_reason: "stop",
      index: 0,
      message: {
        content:
          "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
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
};

export default defineEventHandler(async (event) => {
  const body: { prompt: { text: string } } = await readBody(event);
  await sleep(2000);
  // MOCK RESPONSE TO OPEN AI

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "You will be provided with a question and you will respond in the same language as asked.",
  //     },
  //     {
  //       role: "user",
  //       content: body.prompt.text,
  //     },
  //   ],
  //   temperature: 0.7,
  //   max_tokens: 64,
  //   top_p: 1,
  // });

  return exampleResponse.choices[0].message.content;
});

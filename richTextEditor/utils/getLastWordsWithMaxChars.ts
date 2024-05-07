import { MAX_PROMPT_TOKEN_LENGTH } from "../constants/maxPromptLength";

function getLastWords(text: string, numberOfWords = 50) {
  // Split the text into an array of words using whitespace as the delimiter
  const words = text.split(/\s+/);

  // Calculate the index of the first word to include in the result
  const startIndex = Math.max(words.length - numberOfWords, 0);

  // Extract the last 30 words from the array
  const last30Words = words.slice(startIndex);

  // Join the last 30 words back into a single string
  const result = last30Words.join(" ");

  return result;
}

export function getLastWordsWithMaxChars(text: string): string {
  let result = text;
  let lastWordsLength = 50; // default value
  while (result.length > MAX_PROMPT_TOKEN_LENGTH && lastWordsLength > 10) {
    lastWordsLength = Math.max(lastWordsLength - 10, 10);
    const lastWords = getLastWords(result, lastWordsLength);
    result = lastWords.trim();
  }
  return result.length > MAX_PROMPT_TOKEN_LENGTH ? "" : result;
}

import { RunnableLambda } from "@langchain/core/runnables";
import { searchInputRunnableSchema } from "../utils/searchSchema";

const WEB_SEARCH_PATTERNS: RegExp[] = [
  // recent year: 2024–2039
  /\b20(2[4-9]|3[0-9])\b/,

  // freshness words
  /\b(latest|today|tonight|yesterday|tomorrow|now|current|currently|recent|recently|this (week|month|year)|right now|live|breaking|upcoming)\b/,

  // data that changes often
  /\b(price|prices|cost|stock|stocks|crypto|bitcoin|exchange rate|weather|forecast|temperature|score|scores|news|headlines|election|release date|launched|trending)\b/,

  // links / website names
  /(https?:\/\/|www\.)\S+|\b\S+\.(com|org|net|io|dev|ai|in)\b/,

  // asking to look something up
  /\b(search|google|look up|lookup|find online|browse|check online|sources?|links?|website)\b/,

  // "who is the current ceo/president..."
  /\bwho (is|are) (the )?(current |new )?(ceo|president|prime minister|pm|owner|champion|winner|leader)\b/,

  // software/product versions: v2.3, 19.1.0, version 5
  /\b(v?\d+\.\d+(\.\d+)?|version \d+)\b/,
];
//this will take query and tells ous which to use mode llm direct mode or use tavily for web search this is first step
export function routeSearchStrategy(q: string): "web" | "direct" {
  const trimedQuery = q.toLowerCase().trim();

  const isLongQuery = trimedQuery.length > 70;
  const matchesPattern = WEB_SEARCH_PATTERNS.some((pattern) =>
    pattern.test(trimedQuery),
  );
  return isLongQuery || matchesPattern ? "web" : "direct";
}

export const routerStep = RunnableLambda.from(async (input: { q: string }) => {
  const { query } = searchInputRunnableSchema.parse(input);

  const mode = routeSearchStrategy(query);

  return {
    query,
    mode,
  };
});

// this is search the internal tool.
// u give it a natural language query(the users query )
// it calls tavily under the hood
//it returns a clean array of search hits->searchresultschema

import { env } from "../shared/env";
import {
  SearchResultListSchema,
  SearchResultSchema,
  WebSearchResultList,
} from "./searchSchema";

export async function webSearch(q: string): Promise<WebSearchResultList> {
  const query = (q ?? "").trim();
  if (!query) return [];

  return await searchTavilyUtil(query);
}

export async function searchTavilyUtil(
  query: string,
): Promise<WebSearchResultList> {
  if (!env.TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY MISSING ERROR");
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 5,
      include_answer: false,
      include_images: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tavily search failed: ${response.status}`);
  }
  const data = await response.json();
  const result: any[] = Array.isArray(data?.results) ? data.results : [];

  const cleanedresult = result
    .map((r) =>
      SearchResultSchema.parse({
        title: String(r?.title ?? "").trim() || "untitled",
        url: String(r?.url ?? "").trim(),
        content: String(r?.content ?? "")
          .trim()
          .slice(0, 220),
      }),
    )
    .filter((r) => r.url);

  return SearchResultListSchema.parse(cleanedresult);
}

//.parse()  100% from Zod. parse() = The Security Bouncer
//.parse() is a synchronous validation method 
// in Zod that forces unknown data through a predefined schema. It acts as a strict gateway: 
// it returns the typed data if it matches all schema rules, or immediately throws a ZodError if any rule is broken.


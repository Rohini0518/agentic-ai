# LangChain JS — Reference Notes

Where the LangChain code in this project actually comes from, so you can look things up


## Official docs map

| What we used | Official doc |
|---|---|
| `ChatGoogleGenerativeAI` (Gemini) | https://docs.langchain.com/oss/javascript/integrations/chat/google |
| `ChatGroq` | https://docs.langchain.com/oss/javascript/integrations/chat/groq |
| `.withStructuredOutput()` + Zod | https://docs.langchain.com/oss/javascript/langchain/structured-output |
| Full API reference (every class/method) | https://reference.langchain.com/javascript |
| `ChatGoogleGenerativeAI` reference | https://reference.langchain.com/javascript/langchain-google-genai/ChatGoogleGenerativeAI |
| Install / version history | npm page per package, e.g. https://www.npmjs.com/package/@langchain/groq |

**Tip:** in VSCode, Ctrl+Click (Cmd+Click on Mac) any LangChain class or method name to jump
straight to its TypeScript definitions — same info as the reference site above, no browser needed.

**Note on `.pipe()` / LCEL:** the docs site was reorganized recently, so old course links to
`js.langchain.com/docs/expression_language/...` are likely dead. Search "LCEL" or "Runnable"
directly on `docs.langchain.com` instead of trusting an old URL.

## How this project is structured

- **`src/provider.ts`** — raw provider SDKs (`@google/genai`, `groq-sdk`), called directly.
  Each provider has a different response shape, so the code has to handle each one separately.
  Used only by `src/index.ts`.

- **`src/models/lc_model.ts`** — `createChatModel(forced?)`. LangChain's chat model wrapper
  classes (`ChatGoogleGenerativeAI`, `ChatGroq`) give every provider the *same* interface
  (`.invoke()`, `.pipe()`), so calling code never needs provider-specific branches. This function
  auto-detects which provider to use based on which API key is set in `.env`
  (`GEMINI_API_KEY` / `GROQ_API_KEY`), or you can force one with `createChatModel("groq")`.

- **`src/services/langchain.service.ts`** — uses `createChatModel()` from `lc_model.ts` to build
  a movie-recommendation prompt chain with `ChatPromptTemplate` + LCEL (`.pipe()`), including a
  structured-output version using a Zod schema.

`provider.ts` and `lc_model.ts` are two different approaches to the same problem (talk to an LLM
provider) — not duplicates of each other.

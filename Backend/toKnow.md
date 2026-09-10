Both provider.ts and lc_model.ts---- they look similar (both pick Gemini or Groq based on env keys) but they solve different problems
provider.ts uses each company's own raw SDK: @google/genai and groq-sdk.
lc_model.ts uses LangChain's wrapper classes around those same providers: @langchain/google-genai, @langchain/groq.
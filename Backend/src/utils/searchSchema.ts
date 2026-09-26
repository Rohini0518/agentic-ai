//lega contract backend->ai models-> and frontend

import {z} from "zod";
// 1. The Single Card Rules
export const SearchResultSchema=z.object({
    title:z.string().min(1),
    url:z.url(),
    content:z.string().optional().default("")

})
// 2. The Deck of Cards Rules
export const SearchResultListSchema=z.array(SearchResultSchema).max(10);

//what it does: It tells Zod what goes inside the array. It forces every item inside the [] to look exactly like the object you defined in step 1:SearchResultSchema.

export type WebSearchResultList=z.infer<typeof SearchResultListSchema>

export const OpenUrlInputSchema=z.object({
    url:z.url()
})

export const OpenUrlOutputSchema=z.object({
    url:z.url(),
    content:z.string().min(1)
});

export const SummarizeInputSchema=z.object({
    text:z.string().min(50,'Need a bit more text to summarize')
});

export const SummarizeOutputSchema=z.object({
    summary:z.string().min(1)
});


export const searchInputRunnableSchema=z.object({
    query:z.string().min(5,"Please ask a specific query"),

})

export type SearchInputRunnable=z.infer<typeof searchInputRunnableSchema>

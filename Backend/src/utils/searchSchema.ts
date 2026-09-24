//lega contract backend->ai models-> and frontend

import {z} from "zod";

export const SearchResultSchema=z.object({
    title:z.string().min(1),
    url:z.url(),
    content:z.string().optional().default("")

})

export const SearchResultListSchema=z.array(SearchResultSchema).max(10);


export type WebSearchResultList=z.infer<typeof SearchResultListSchema>
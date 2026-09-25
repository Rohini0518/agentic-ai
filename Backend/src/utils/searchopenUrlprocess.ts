import safeText from "./safeText";
import { convert } from 'html-to-text'
import { OpenUrlOutputSchema } from "./searchSchema";


export async function openUrl(url: string) {
  const normalizedUrl = validateUrl(url);
  //fetch the page by ourselfs
  //llm cant browser by own
  //generic node fetch
  //avoid instant 403 on strict websites
  //for safety we are using demo
  const res=await fetch(normalizedUrl,{
    headers:{
        'User-Agent':'agent-core/1.0(+demo)'
    }
  })
  if(!res.ok){
    const body= await safeText(res);
   
    throw new Error(`OpenURL failed ${res.status}-${body.slice(0,200)}`)
  }

  //step-3
  const contentType=res.headers.get('content-type')??'';
  const raw=await res.text();

  //step-4
  const text=contentType.includes('text/html')?
  convert(raw,{
    wordwrap:false,
    selectors:[
        { selector:'nav', format:'skip' },
        { selector:'header', format:'skip' },
        { selector:'footer', format:'skip' },
        { selector:'aside', format:'skip' },
        { selector:'script', format:'skip' },
        { selector:'style', format:'skip' },
        { selector:'noscript', format:'skip' },
        { selector:'form', format:'skip' },
        { selector:'iframe', format:'skip' },
        { selector:'svg', format:'skip' },
        { selector:'img', format:'skip' },
        { selector:'a', options:{ ignoreHref:true } }
    ]
  }):raw
//step:5
const cleaned=removeWhitespace(text);
const capped=cleaned.slice(0,8000);
return OpenUrlOutputSchema.parse({
    url:normalizedUrl,
    content:capped
})
}


export  function removeWhitespace (text:string){
  return text
    .replace(/\r\n/g,"\n")              // windows line endings -> \n
    .replace(/ /g," ")             // non-breaking spaces -> normal space
    .replace(/[​-‍﻿]/g,"") // invisible zero-width characters
    .replace(/[ \t]+/g," ")             // many spaces/tabs -> one space
    .split("\n")
    .map(line=>line.trim())             // trim each line
    .filter(line=>line.length>0)        // drop empty lines
    .join("\n")
    .trim();
}
function validateUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) {
      throw new Error("only valid Url https is allowed");
    }
    return parsed.toString();
  } catch {
    throw new Error("InValid Url");
  }
}

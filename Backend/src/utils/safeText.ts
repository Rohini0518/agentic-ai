export default async function safeText(res:Response){
  try{
    return await res.json();
  }
  catch{
    return "<no body>"
  }
}
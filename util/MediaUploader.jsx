import { createClient } from "@supabase/supabase-js"


const annonkey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseurl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseurl,annonkey)

export default function mediaUpload(file){
    return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }else{
            
            const timestamp =  new Date().getTime();
            const filename = timestamp+file.name
            supabase.storage.from("images").upload(filename , file ,
            {
                upsert: false,
                cacheControl:"3600"
            }).then(
                ()=>{
                    const publicurl = supabase.storage.from("images").getPublicUrl(filename).data.publicUrl;
                    resolve(publicurl)
                }
            
         ).catch(
            ()=>{
                reject("An error occured")
            }
         )
        }
    })
}
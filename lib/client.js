//how we connect to sanity so we can fetch data with ssr in any page
import { createClient } from "next-sanity";
//this is beacuse we have images
import imageUrlBuilder from '@sanity/image-url'


export const client = createClient ({
    projectId: "8asmwpae",
    dataset: "production",
    apiVersion: "2023-09-06",
    useCdn: "false",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

//this is for the images 
   const builder = imageUrlBuilder(client)

   export const urlFor = (source) => builder.image(source)
import sanityClient from "@sanity/client";
import dotenv from "dotenv";
dotenv.config();

export default sanityClient({
    projectId:"fwtcjfvm",
    dataset:"production",
    useCdn:false,    //if true then cache data.
    apiVersion:"2022-11-03",
    token:process.env.SANITY_API_TOKEN,
});
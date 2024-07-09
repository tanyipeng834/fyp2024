// import { createClient } from "@supabase/supabase-js";
// import { Database } from "./database.types";
import dotenv from 'dotenv'


dotenv.config();
console.log(process.env.SUPABASE_URL);
// const supabase =
//     createClient <
//     Database >
//     (process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

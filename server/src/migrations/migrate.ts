import { DB } from "https://deno.land/x/sqlite/mod.ts";

import initialCreate from "./InitialCreate.ts";

export default function migrate(db : DB){

    initialCreate(db); 
}
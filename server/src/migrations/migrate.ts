import { DB } from "https://deno.land/x/sqlite/mod.ts";

import initialCreate from "./InitialCreate.ts";
import seed from "./seed.ts";

export default async function migrate(name: string){

    const db = new DB("hazelnut.db");

    //Deno.removeSync("hazelnut.db");

    initialCreate(db); 

    //seed(db);
}
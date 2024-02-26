import { DB } from "https://deno.land/x/sqlite/mod.ts";

export default function initialCreate(db : DB){

    db.execute(`
        CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT,
            name TEXT,
            createdDate TEXT,
            modifiedDate TEXT
        )
    `);

}
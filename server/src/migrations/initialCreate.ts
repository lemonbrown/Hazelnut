import { DB } from "https://deno.land/x/sqlite/mod.ts";

export default function initialCreate(db : DB){

    db.execute(`
        CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT,
            name TEXT,
            refreshToken TEXT,
            createdDate TEXT,
            modifiedDate TEXT
        );

        CREATE TABLE IF NOT EXISTS thread(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            userId TEXT,
            tags TEXT,
            upvotes INTEGER,
            downvotes INTEGER,
            views INTETER,
            createdDate TEXT,
            modifiedDate TEXT
        );
    `);

}
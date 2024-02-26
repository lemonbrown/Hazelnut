import { DB } from "https://deno.land/x/sqlite/mod.ts";
import hashPassword from "../helpers/hashPassword.ts";

export default function seed(db : DB){    

    const hashedPassword = hashPassword("testest");

    db.execute(`INSERT INTO user (email, password, name, createdDate) VALUES ('test@test.com', '${hashedPassword}', 'testname', '${new Date(Date.now()).toJSON()}')`);


}
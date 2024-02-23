// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";

import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("test.db");


const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

app.get("/", (_req, res) => {
    res.status(200).send("Hello from Deno and Express!");
});

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


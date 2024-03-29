// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response, request } from "npm:express@4.18.2";
import { load } from "https://deno.land/std@0.217.0/dotenv/mod.ts";

// @deno-types="npm:@types/jsonwebtoken"
import jwt from "npm:jsonwebtoken";
// @deno-types="npm:@types/bcryptjs"
import bcrypt from "npm:bcryptjs";
import * as crypto from "https://deno.land/std@0.177.0/node/crypto.ts";
import { DB, QueryParameterSet } from "https://deno.land/x/sqlite/mod.ts";
import migrate from "./migrations/migrate.ts";
import CreateUserRequest from "./requests/CreateUserRequest.ts";
import LoginUserRequest from "./requests/LoginUserRequest.ts";
import User from "./models/User.ts";
import Thread from "./models/Thread.ts";
import CreateThreadRequest from "./requests/CreateThreadRequest.ts";
// @deno-types="npm:@types/sqlstring"
import sqlstring from "npm:sqlstring";

const env = await load();

migrate("hazelnut.db");

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

// For parsing application/json
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).send("Hello from Deno and Express!");
});

app.post("/api/users/register", async (_req: Request, res: Response) => {

    const request : CreateUserRequest = _req.body

    if(request.confirmPassword != request.password){
        res.status(400).send("Passwords must match");
        return;
    }

    if(request.password.length < 6){
        res.status(400).send("Password must be at least 6 characters");
        return;
    }

    const db = new DB("hazelnut.db");
    const existingUser : User = db.query(`SELECT * FROM user WHERE email = '${request.email}' `);

    if(!existingUser){
        res.status(400).send("Email is already registered");
        return;
  
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.password, salt);

    //create refresh token
    let randomNumbers = "";
    for(let i = 0; i < 32; i++){
        const randomNumber = Math.floor(Math.random() * 32);
        randomNumbers += randomNumber.toString();
    }

    const refreshToken = btoa(randomNumbers);

    db.execute(`INSERT INTO user (email, password, createdDate, refreshToken) VALUES ('${request.email}', '${hashedPassword}', '${new Date(Date.now()).toJSON()}', '${refreshToken}')`);
    const userId = db.query(`SELECT last_insert_rowid()`);

    const jwtKey = env["JWT_KEY"];
    const payload = { _id: userId, roles: [0] };
    const accessToken = jwt.sign(
        payload,
        jwtKey,
        { expiresIn: "14m" }
    );

    res.status(200).send(accessToken);
});

app.post("/api/users/login", async (_req: Request, res: Response) => {

    const request : LoginUserRequest = _req.body
    const db = new DB("hazelnut.db");
    const query = db.query(`SELECT * FROM user WHERE email = '${request.email}' `);
    const existingUser : User = query.map((user: any) => {
        return {
            id: user[0],
            email: user[1],
            password: user[2]
        } 
    })[0];

    if(!existingUser){
        res.status(401).send("Invalid email or password");
        return;
    }

    const isPasswordValid = await bcrypt.compare(request.password, existingUser.password);

    if(!isPasswordValid){
        res.status(401).send("Invalid email or password");
        return;
    }

    const jwtKey = env["JWT_KEY"];
    const payload = { _id: existingUser.id, roles: [0] };
    const accessToken = jwt.sign(
        payload,
        jwtKey,
        { expiresIn: "1y" }
    );

    res.status(200).send(accessToken);
});

app.get("/api/users", async (_req: Request, res: Response) => {

    const accessToken = _req.get("Authorization");

    if(!accessToken){
        res.status(400).send("Cannot find user token");
        return;
    }    

    const jwtKey = env["JWT_KEY"];
    let payload = {};
    
    try{
         payload = jwt.verify(accessToken.split(" ")[1], jwtKey);
    }
    catch(ex){

    }

    const db = new DB("hazelnut.db");
    const query = db.query(`SELECT id, email, password, name FROM user WHERE id = '${payload._id}' `);
    const existingUser : User = query.map((user: any) => {
        return {
            id: user[0],
            email: user[1],
            password: user[2],
            name: user[3]
        } 
    })[0];

    res.status(200).send({
        id: existingUser.id,
        name: existingUser.name
    });

});

//DESKTOP-Q4KKLK5

app.get("/api/threads/hot", async (_req: Request, res: Response) => {

    const db = new DB("hazelnut.db");
    const query = db.query(`SELECT id, title, content, tags, upvotes, uid FROM thread ORDER BY createdDate DESC `);

    const threads = query.map((thread) => {
        return {
            id: thread[0],
            title: thread[1],
            content: thread[2],
            tags: thread[3],
            upvotes: parseInt(thread[4]),
            uid: thread[5]
        }
    });

    res.status(200).send(threads);
});

app.post("/api/threads", async (_req: Request, res: Response) => {

    const accessToken = _req.get("Authorization");
    if(!accessToken){
        res.status(400).send("Cannot find user token");
        return;
    }    

    const jwtKey = env["JWT_KEY"];
    let payload = {};
    
    try{
         payload = jwt.verify(accessToken.split(" ")[1], jwtKey);
    }
    catch(ex){ }

    const userId = payload._id;

    const db = new DB("hazelnut.db");
    const request : CreateThreadRequest = _req.body;

    // //get tags from body
    // const regex = /(#[^ ]*)/g;
    // let tags = "";
    // for(const tag of request.content.matchAll(regex)){
    //     tags += tag[0] + ",";
    // }

    // tags = tags.slice(0,-1);
    
    const uid = crypto.randomBytes(3*4).toString('base64').replace("/", "");
    
    const thread : Thread = {
        userId: userId,
        uid: uid,
        title: request.title,
        content:  request.content,
        tags: request.tags,
        createdDate: new Date(Date.now()).toJSON()
    };

    const content = thread.content.replace("\r\n", "<br/>").replace("\r", "<br/>").replace("\n", "<br/>");

    db.query(`INSERT INTO thread (uid,title,content,tags,userId,upvotes,createdDate)
        VALUES ('${thread.uid}', '${thread.title}',:content,'${thread.tags}','${thread.userId}',1, '${thread.createdDate}')`
        , {content});

    res.status(200).send(thread);
});

app.get("/api/threads/:id", async (_req: Request, res: Response) => {

    let uid = _req.params.id; 

    const db = new DB("hazelnut.db");
    const query = db.query(`SELECT title, content, tags FROM thread WHERE uid = '${uid}' `);

    const thread : Thread = query.map((thread: any) => {
        return {
            title: thread[0],
            content: thread[1],
            tags: thread[2]
        } 
    })[0];

    res.status(200).send(thread);

});

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


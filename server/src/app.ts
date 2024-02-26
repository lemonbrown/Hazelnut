// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import { load } from "https://deno.land/std@0.217.0/dotenv/mod.ts";
import jwt from "npm:jsonwebtoken";
//import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// @deno-types="npm:@types/bcryptjs"
import bcrypt from "npm:bcryptjs";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import migrate from "./migrations/migrate.ts";
import CreateUserRequest from "./requests/CreateUserRequest.ts";
import LoginUserRequest from "./requests/LoginUserRequest.ts";
import User from "./models/User.ts";

const env = await load();

migrate("hazelnut.db");

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

// For parsing application/json
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).send("Hello from Deno and Express!");
});

app.post("/api/user/register", async (_req: Request, res: Response) => {

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

    db.execute(`INSERT INTO user (email, password, createdDate, refreshToken) VALUES ('${request.email}', '${hashedPassword}}', '${new Date(Date.now()).toJSON()}', '${refreshToken}')`);
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

app.post("/api/user/login", async (_req: Request, res: Response) => {

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

    console.log(existingUser)
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
        { expiresIn: "14m" }
    );

    res.status(200).send(accessToken);
});

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";


export default async function hashPassword(password: string){

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}
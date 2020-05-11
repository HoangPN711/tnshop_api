import {Request} from "express";

export class BaseContext {
    userId: string;
    sessionId: string;
    authAccessToken: string;

    constructor(req: Request){

        // @ts-ignore
        this.userId = req.user.id;
    }
}
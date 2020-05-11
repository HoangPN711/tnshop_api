import "reflect-metadata";
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import { Server } from '@overnightjs/core';
import {UserController} from "@01_users_controller/UserController";
import {AuthJwtController} from "@99_base_controller/AuthJwtController";


export class ApiServer  extends Server {

    public constructor() {
        super();
        this.initial();
    }

    private initial(): void{
        this.app.use(this.setupCORS);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        let userController = new UserController();
        let authController = new AuthJwtController();
        super.addControllers([userController, authController]);
    }

    public start(port: number) {

        this.app.listen(port, () => {
            console.log('Server listening on port: ' + port);
        })
    }

    private setupCORS(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Accept, X-Access-Token, X-Key, Authorization');
        res.header('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    }


}
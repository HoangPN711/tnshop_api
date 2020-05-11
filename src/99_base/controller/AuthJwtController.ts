import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import * as httpStatusCode from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import {BaseController} from "./BaseController";
import {IBaseResponseModel} from "@99_base_model/IBaseResponseModel";
import {UserAuthService} from "../service/UserAuthService"

@Controller('api/auth')
export class AuthJwtController extends BaseController{

    public constructor() {
        super();
    }

    @Post('')
    public async authUser(req: Request, res: Response){

        const { username, password } = req.body;
        const resultResponse = {} as IBaseResponseModel;
        const jwtConfig = {
            jwtSecret: '0n7gfEVifBZHJK2nN8X8XRHzmoUoAnNE',
            options: {
                expiresIn: 1800,
            },
        };

        try {
            const userAuthService = new UserAuthService();

            if (userAuthService.checkAuth(username, password)) {
                const accessToken = sign({ id: username }, jwtConfig.jwtSecret,           jwtConfig.options);
                resultResponse.statusCode = httpStatusCode.OK;
                resultResponse.data = {"access_token:" : accessToken };
                return this.responseSuccess(res,resultResponse);
            } else {
                resultResponse.message = "Authentication Error";
                resultResponse.statusCode = httpStatusCode.UNAUTHORIZED;
                return this.responseFailed(res, resultResponse);
            }
        } catch (err) {

            resultResponse.message = err.message;
            resultResponse.statusCode = httpStatusCode.BAD_REQUEST;
            return this.responseFailed(res, resultResponse);
        }
    }
}
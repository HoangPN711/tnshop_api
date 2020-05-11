import {Controller, Get, Post, Put, Delete, ClassMiddleware} from '@overnightjs/core';
import {Request, Response} from 'express';
import {BaseController} from "@99_base_controller/BaseController"
import {IBaseResponseModel} from "@99_base_model/IBaseResponseModel";
import * as httpStatusCode from "http-status-codes"
import {UserService} from "../service/UserService"
import {BaseUtils} from "@99_base_utils/BaseUtils";
import {UserProfileModel} from "../model/UserProfileModel";
import {BaseContext} from "@99_base_common/BaseContext";
import jwtAuth from "../../99_base/middeware/JwtAuthMiddeware";

@Controller('api/user')
@ClassMiddleware(jwtAuth)
export class UserController extends BaseController {

    public constructor() {
        super();
    }

    @Get()
    public async getAllUser(req: Request, res: Response) {

        const resultResponse = {} as IBaseResponseModel;
        const userService = new UserService();


        const userList = await userService.getUserList();

        resultResponse.data = userList;
        resultResponse.statusCode = httpStatusCode.OK;

        return this.responseSuccess(res, resultResponse);
    }

    @Get(':id')
    public async getUserById(req: Request, res: Response) {

        const resultResponse = {} as IBaseResponseModel;
        const userService = new UserService();
        const userList = await userService.getUserByUserId(req.params.id);

        resultResponse.statusCode = httpStatusCode.OK;
        resultResponse.data = BaseUtils.convertToJson(userList);

        return this.responseSuccess(res, resultResponse);
    }

    @Post('add')
    public async createUser(req: Request, res: Response) {
        const userService = new UserService();
        const resultResponse = {} as IBaseResponseModel;
        const context = new BaseContext();
        // @ts-ignore
        context.userId = req.user.id;

        const userModel = new UserProfileModel();

        userModel.userId = req.body.userId;
        userModel.fullName = req.body.fullName;
        userModel.birthday = req.body.birthday;
        userModel.address = req.body.address;

        const userCreated = await userService.createUser(context, userModel);
        resultResponse.statusCode = httpStatusCode.OK;
        resultResponse.data = BaseUtils.convertToJson(userCreated);

        return this.responseSuccess(res,resultResponse);
    }

    @Put('update')
    public async updateUser(req: Request, res: Response) {
        const userService = new UserService();
        const resultResponse = {} as IBaseResponseModel;
        const context = new BaseContext();
        // @ts-ignore
        context.userId = req.user.id;
        const userModel = new UserProfileModel();
        const reqBody = req.body;
        userModel.id = reqBody.pk;
        userModel.userId = reqBody.userId;
        userModel.fullName = reqBody.fullName;
        userModel.birthday = reqBody.birthday;
        userModel.address = reqBody.address;

        const userCreated = await userService.updateUser(context, userModel);
        resultResponse.statusCode = httpStatusCode.OK;
        resultResponse.data = BaseUtils.convertToJson(userCreated);

        return this.responseSuccess(res,resultResponse);
    }

    @Delete('delete')
    public deleteUser(req: Request, res: Response){

        const userService = new UserService();
        const resultResponse = {} as IBaseResponseModel;

        userService.deleteUser(req.body.pk);

        resultResponse.statusCode = httpStatusCode.OK;
        return this.responseSuccess(res, resultResponse);
    }
}
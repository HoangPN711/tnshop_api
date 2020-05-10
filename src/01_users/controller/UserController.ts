import {Controller, Get, Post, Put, Delete} from '@overnightjs/core';
import {Request, Response} from 'express';
import {BaseController} from "@99_base_controller/BaseController"
import {IBaseResponseModel} from "@99_base_model/IBaseResponseModel";
import * as httpStatusCode from "http-status-codes"
import {UserService} from "../service/UserService"
import {BaseUtils} from "@99_base_utils/BaseUtils";
import {UserProfileModel} from "../model/UserProfileModel";
import {BaseContext} from "@99_base_common/BaseContext";

@Controller('api/user')
export class UserController extends BaseController {

    public constructor() {
        super();
    }

    @Get()
    public async getAllUser(req: Request, res: Response) {

        const result = {} as IBaseResponseModel;
        const userService = new UserService();


        const userList = await userService.getUserList();

        result.data = BaseUtils.convertToJson(userList);
        result.statusCode = httpStatusCode.OK;

        return this.responseSuccess(res, result);
    }

    @Get(':id')
    public async getUserById(req: Request, res: Response) {

        const result = {} as IBaseResponseModel;
        const userService = new UserService();
        const userList = await userService.getUserByUserId(req.params.id);
        result.statusCode = httpStatusCode.OK;
        result.data = BaseUtils.convertToJson(userList);

        return this.responseSuccess(res, result);
    }

    @Post('add')
    public async createUser(req: Request, res: Response) {
        const userService = new UserService();
        const result = {} as IBaseResponseModel;
        const context = new BaseContext();
        context.userId = "admin";

        const userModel = new UserProfileModel();

        userModel.userId = req.body.userId;
        userModel.fullName = req.body.fullName;
        userModel.birthday = req.body.birthday;
        userModel.sex = req.body.sex;

        const userCreated = await userService.createUser(context, userModel);
        result.statusCode = httpStatusCode.OK;
        result.data = BaseUtils.convertToJson(userCreated);

        return this.responseSuccess(res,result);
    }

    @Put('update')
    public async updateUser(req: Request, res: Response) {
        const userService = new UserService();
        const result = {} as IBaseResponseModel;
        const context = new BaseContext();

        context.userId = "hoangpn";

        const userModel = new UserProfileModel();
        const reqBody = req.body;
        userModel.id = reqBody.pk;
        userModel.userId = reqBody.userId;
        userModel.fullName = reqBody.fullName;
        userModel.birthday = reqBody.birthday;
        userModel.sex = reqBody.sex;

        const userCreated = await userService.updateUser(context, userModel);
        result.statusCode = httpStatusCode.OK;
        result.data = BaseUtils.convertToJson(userCreated);

        return this.responseSuccess(res,result);
    }

    @Delete('delete')
    public deleteUser(req: Request, res: Response){

        const userService = new UserService();
        const result = {} as IBaseResponseModel;

        userService.deleteUser(req.body.pk);

        result.statusCode = httpStatusCode.OK;
        return this.responseSuccess(res, result);
    }
}
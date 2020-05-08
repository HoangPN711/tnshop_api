import { Response } from "express";
import {IBaseResponseModel} from "../model/IBaseResponseModel"
import * as httpStatusCode from "http-status-codes";

export class BaseController {

    protected constructor() {

    }


    public responseSuccess(res: Response, result: IBaseResponseModel) : object {

        let statusCd = !result.statusCode ? result.statusCode : httpStatusCode.OK;
        let data = result.data;

        return res.status(statusCd).send(data)
    }

    public responseFailed(res: Response, result: IBaseResponseModel) : void  {
        let statusCd = !result.statusCode ? result.statusCode : httpStatusCode.INTERNAL_SERVER_ERROR;
        let data = {
            errorCode : result.errorCode,
            message : result.message,
        };

        res.status(statusCd).send(data)
    }

}

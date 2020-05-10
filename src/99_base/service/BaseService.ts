import {BaseContext} from "../common/BaseContext";
import {BaseModel} from "../model/BaseModel";

export class BaseService {

    protected makeWho(context: BaseContext, model: BaseModel, isCreate?: boolean) {

        if (isCreate) {
            model.createdBy = context.userId;
        }
        model.updatedBy = context.userId;
        return model;
    }
}
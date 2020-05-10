import {BaseModel} from "@99_base_model/BaseModel";

export class UserProfileModel extends BaseModel{

    public userId : string;
    public fullName : string;
    public birthday : string;
    public sex : string;

}
import {BaseModel} from "./BaseModel";
import {RoleModel} from "./RoleModel";

export class UserAuthModel extends BaseModel {

    userId:string;
    password:string;
    loginedStatus:boolean;
    lastLoginTime:string;
    lockFlag:boolean;
    loginFailCount:number;
    roles: RoleModel[];
}
import {EntityRepository} from "typeorm";
import {BaseRepository} from "./BaseRepository";
import {UserAuthEntity} from "./entity/UserAuthEntity"
import {UserAuthModel} from "../model/UserAuthModel";
import {BaseUtils} from "@99_base_utils/BaseUtils";

@EntityRepository(UserAuthEntity)
export class UserAuthRepository extends BaseRepository<UserAuthEntity>{

    public async getUserByUsername(username:string) : Promise<UserAuthModel | null> {

        let queryCondition = this.makeQueryCondition();
        queryCondition.where = {userId: username};

        let data = await this.findWithCondition(queryCondition);

        const result = data.map(userAuthEntity => {
            const userAuthModel = new UserAuthModel();
            this.mapBaseEntityToBaseModel(userAuthEntity, userAuthModel);
            userAuthModel.userId = userAuthEntity.userId;
            userAuthModel.lastLoginTime = BaseUtils.dateAsYYYYMMDDHHMMSS(userAuthEntity.lastLoginTime);
            userAuthModel.lockFlag = userAuthEntity.lockFlag;
            userAuthModel.loginFailCount = userAuthEntity.loginFailCount;
            return userAuthModel
        });

        if( !result || result.length != 1) {
            return null;
        }

        return result[0];
    }

    public async createAuthUser(userAuthModel: UserAuthModel): Promise<UserAuthModel>{

        const userAuthEntity = new UserAuthEntity();
        this.mapBaseModelToBaseEntity(userAuthModel, userAuthEntity);
        userAuthEntity.userId = userAuthModel.userId;
        userAuthEntity.password = userAuthModel.password;

        // userAuthEntity.roles = userAuthModel.roles;
        const userAuthCreated = await this.createAndSave(userAuthEntity);

        let result = new UserAuthModel();
        this.mapBaseEntityToBaseModel(userAuthCreated, result);
        result.userId = userAuthCreated.userId;
        result.password = userAuthCreated.password;

        return result;
    }

    public async updateLoginStatusInfo(userAuthModel: UserAuthModel, successFlag:boolean): Promise<UserAuthModel>{

        const userAuthEntity = new UserAuthEntity();
        this.mapBaseModelToBaseEntity(userAuthModel, userAuthEntity);

        if(successFlag == true){
            userAuthEntity.lastLoginTime = new Date();
            userAuthEntity.loginFailCount = 0;
        }else{
            if(userAuthModel.loginFailCount == 5) {
                userAuthEntity.lockFlag = true;
            }else{
                userAuthEntity.loginFailCount = userAuthModel.loginFailCount + 1;
            }
        }

        return userAuthModel;
    }

}
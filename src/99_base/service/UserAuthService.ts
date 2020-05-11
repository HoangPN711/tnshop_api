import {getCustomRepository} from "typeorm";
import {BaseService} from "./BaseService";
import {UserAuthRepository} from "../repository/UserAuthRepository"
import {UserAuthModel} from "@99_base_model/UserAuthModel";

export class UserAuthService extends BaseService{

    public async checkAuth(username:string, password:string) : Promise<UserAuthModel | undefined>{

        let userAuthRepository = getCustomRepository(UserAuthRepository);
        const userAuth = await userAuthRepository.getUserByUsername(username);
        if(userAuth != null){
            if(userAuth.password == password) {
                let result = await userAuthRepository.updateLoginStatusInfo(userAuth, true);
                result.loginedStatus = true;
                return result;
            }else {
                let result = await userAuthRepository.updateLoginStatusInfo(userAuth, false);
                result.loginedStatus = false;
                return  result;
            }

        }else {
            return undefined;
        }
    }
}
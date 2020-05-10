import {getCustomRepository} from "typeorm";
import {BaseService} from "./BaseService";
import {UserAuthRepository} from "../repository/UserAuthRepository"

export class UserAuthService extends BaseService{

    public checkAuth(username:string, password:string){
        let userAuthRepository = getCustomRepository(UserAuthRepository);

    }
}
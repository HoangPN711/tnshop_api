import {getCustomRepository} from "typeorm";
import {UserRepository} from "../repository/UserRepository";
import {UserModel} from "../model/UserModel";
import {BaseService} from "@99_base_service/BaseService";
import {BaseContext} from "@99_base_common/BaseContext";

export class UserService extends BaseService{

    public async getUserList(): Promise<UserModel[]> {
        const userRepository = getCustomRepository(UserRepository);
        let result = await userRepository.findAll();

        return result;
    }

    public async getUserByUserId(userId:string): Promise<UserModel[]> {
        const userRepository = getCustomRepository(UserRepository);
        let result = await userRepository.findByUserId(userId);

        return result;
    }

    public async createUser(context: BaseContext, userModel:UserModel): Promise<UserModel> {
        const userRepository = getCustomRepository(UserRepository);
        this.makeWho(context,userModel,true);
        let result = await userRepository.createUser(userModel);

        return result;
    }

    public async updateUser(context: BaseContext, userModel:UserModel): Promise<UserModel> {
        const userRepository = getCustomRepository(UserRepository);
        this.makeWho(context,userModel,false);
        let result = await userRepository.updateUser(userModel);

        return result;
    }

    public deleteUser(id:number)  {
        const userRepository = getCustomRepository(UserRepository);
        userRepository.deleteById(id);

        return 'delete successful';
    }
}
import {getCustomRepository} from "typeorm";
import {UserProfileRepository} from "../repository/UserProfileRepository";
import {UserProfileModel} from "../model/UserProfileModel";
import {BaseService} from "@99_base_service/BaseService";
import {BaseContext} from "@99_base_common/BaseContext";

export class UserService extends BaseService{

    public async getUserList(): Promise<UserProfileModel[]> {
        const userProfileRepository = getCustomRepository(UserProfileRepository);
        let result = await userProfileRepository.findAll();

        return result;
    }

    public async getUserByUserId(userId:string): Promise<UserProfileModel[]> {
        const userProfileRepository = getCustomRepository(UserProfileRepository);
        let result = await userProfileRepository.findByUserId(userId);

        return result;
    }

    public async createUser(context: BaseContext, userModel:UserProfileModel): Promise<UserProfileModel> {
        const userProfileRepository = getCustomRepository(UserProfileRepository);
        this.makeWho(context,userModel,true);
        let result = await userProfileRepository.createUser(userModel);

        return result;
    }

    public async updateUser(context: BaseContext, userModel:UserProfileModel): Promise<UserProfileModel> {
        const userProfileRepository = getCustomRepository(UserProfileRepository);
        this.makeWho(context,userModel,false);
        let result = await userProfileRepository.updateUser(userModel);

        return result;
    }

    public deleteUser(id:number)  {
        const userProfileRepository = getCustomRepository(UserProfileRepository);
        userProfileRepository.deleteById(id);

        return 'delete successful';
    }
}
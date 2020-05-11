import {EntityRepository} from "typeorm"
import {UserProfileEntity} from "./entity/UserProfileEntity"
import {BaseRepository} from "@99_base_repository/BaseRepository";
import {UserProfileModel} from "../model/UserProfileModel";

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends BaseRepository<UserProfileEntity> {

    public async findAll(): Promise<UserProfileModel[]> {
        let data = await this.find();
        let result = data.map(entity => {
            const userProfileModel = new UserProfileModel();
            this.mapBaseEntityToBaseModel(entity, userProfileModel);
            userProfileModel.userId = entity.userId;
            userProfileModel.fullName = entity.fullName;
            userProfileModel.address = entity.address;
            userProfileModel.birthday = entity.birthday;
            return userProfileModel
        });
        return result;
    }

    public async findByUserId(userId: string): Promise<UserProfileModel[]> {

        let queryCondition = this.makeQueryCondition();
        queryCondition.where = {userId: userId};

        let data = await this.findWithCondition(queryCondition);

        const result = data.map(entity => {
            const userProfileModel = new UserProfileModel();
            this.mapBaseEntityToBaseModel(entity, userProfileModel);
            userProfileModel.userId = entity.userId;
            userProfileModel.fullName = entity.fullName;
            userProfileModel.address = entity.address;
            userProfileModel.birthday = entity.birthday;
            return userProfileModel
        });

        return result;
    }

    public async createUser(userProfileModel: UserProfileModel): Promise<UserProfileModel> {

        const userProfileEntity = new UserProfileEntity();
        userProfileEntity.userId = userProfileModel.userId;
        userProfileEntity.fullName = userProfileModel.fullName;
        userProfileEntity.address = userProfileModel.address;
        userProfileEntity.birthday = userProfileModel.birthday;
        userProfileEntity.createdBy = userProfileModel.createdBy;

        let userCreated = await this.createAndSave(userProfileEntity);
        let result = new UserProfileModel();
        this.mapBaseEntityToBaseModel(userCreated, result);
        result.userId = userCreated.userId;
        result.fullName = userCreated.fullName;
        result.address = userCreated.address;
        result.birthday = userCreated.birthday;
        return result;
    }

    public async updateUser(userProfileModel: UserProfileModel): Promise<UserProfileModel> {

        const userProfileEntity = new UserProfileEntity();
        this.mapBaseEntityToBaseModel(userProfileEntity, userProfileModel);


        userProfileEntity.fullName = userProfileModel.fullName;

        userProfileEntity.address = userProfileModel.address;

        userProfileEntity.birthday = userProfileModel.birthday;

        userProfileEntity.updatedBy = userProfileModel.updatedBy;

        let userCreated = await this.createAndSave(userProfileEntity);
        let result = new UserProfileModel();
        this.mapBaseEntityToBaseModel(userCreated, result);
        result.userId = userCreated.userId;
        result.fullName = userCreated.fullName;
        result.address = userCreated.address;
        result.birthday = userCreated.birthday;
        return result;

    }

}
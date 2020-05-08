import {EntityRepository} from "typeorm"
import {UserEntity} from "../entity/UserEntity"
import {BaseRepository} from "@99_base_repository/BaseRepository";
import {UserModel} from "../model/UserModel";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {

    public async findAll(): Promise<UserModel[]>{
        let data = await this.find();
        let result = data.map(entity => {
            const userModel = new UserModel();
            this.mapBaseEntityToBaseModel(entity, userModel);
            userModel.userId = entity.userId;
            userModel.fullName = entity.fullName;
            userModel.sex = entity.sex;
            userModel.birthday = entity.birthday;
            return userModel
        });
        return result;
    }
   public async findByUserId(userId: string): Promise<UserModel[]> {

        let queryCondition = this.makeQueryCondition();
       queryCondition.where = {userId : userId};

       let data = await this.findWithCondition(queryCondition);

       const result = data.map(entity => {
           const userModel = new UserModel();
           this.mapBaseEntityToBaseModel(entity, userModel);
           userModel.userId = entity.userId;
           userModel.fullName = entity.fullName;
           userModel.sex = entity.sex;
           userModel.birthday = entity.birthday;
           return userModel
       });

       return result;
    }

    public async createUser(userModel: UserModel) : Promise<UserModel> {

        const userEntity = new UserEntity();
        userEntity.userId = userModel.userId;
        userEntity.fullName = userModel.fullName;
        userEntity.sex = userModel.sex;
        userEntity.birthday = userModel.birthday;
        userEntity.createdBy = userModel.createdBy;

        let userCreated =  await this.createAndSave(userEntity);
        let result = new UserModel();
        this.mapBaseEntityToBaseModel(userCreated, result);
        result.userId = userCreated.userId;
        result.fullName = userCreated.fullName;
        result.sex = userCreated.sex;
        result.birthday = userCreated.birthday;
        return result;
    }

    public async updateUser(userModel: UserModel) : Promise<UserModel> {

        const userEntityById = await this.findById([userModel.id]);

        if(userEntityById && userEntityById.length != 1){
            console.log("database error");
        }

        const userEntity = userEntityById[0];
        if(userModel.fullName) {
            userEntity.fullName = userModel.fullName;
        }
        if(userModel.sex) {
            userEntity.sex = userModel.sex;
        }
        if(userModel.birthday) {
            userEntity.birthday = userModel.birthday;
        }
        userEntity.updatedBy = userModel.updatedBy;

        let userCreated =  await this.createAndSave(userEntity);
        let result = new UserModel();
        this.mapBaseEntityToBaseModel(userCreated, result);
        result.userId = userCreated.userId;
        result.fullName = userCreated.fullName;
        result.sex = userCreated.sex;
        result.birthday = userCreated.birthday;
        return result;
    }

}
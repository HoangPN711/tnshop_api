import {Entity, Column} from "typeorm"
import {BaseEntity} from "@99_base_entity/BaseEntity";

@Entity("api_user")
export class UserEntity extends BaseEntity{

    @Column({name :"user_id"})
    userId : string;

    @Column({name :"full_name"})
    fullName : string;

    @Column({name :"birthday"})
    birthday: string;

    @Column({name :"sex"})
    sex: string;
}

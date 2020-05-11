import {Entity, Column} from "typeorm"
import {BaseEntity} from "@99_base_repository/entity/BaseEntity";

@Entity("user_profile")
export class UserProfileEntity extends BaseEntity{

    @Column({name :"user_id", type:"varchar", length:100})
    userId : string;

    @Column({name :"full_name", type:"varchar", length:500})
    fullName : string;

    @Column({name :"birthday", type:"varchar", length:10, nullable:true})
    birthday: string;

    @Column({name :"sex", type:"varchar", length:500, nullable:true})
    address: string;
}

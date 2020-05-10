import {Entity, Column} from "typeorm"
import {BaseEntity} from "./BaseEntity";

@Entity("auth_role")
export class UserRoleEntity extends BaseEntity{

    @Column({name:"user_id"})
    userId:string;

    @Column({name:"role_id"})
    roleId:string;
}
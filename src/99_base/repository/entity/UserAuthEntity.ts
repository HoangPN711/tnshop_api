import {Entity, Column} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity("auth_user")
export class UserAuthEntity extends BaseEntity{

    @Column({name:"user_id"})
    userId:string;

    @Column({name:"password"})
    password: string;

    @Column({name:"last_login_time", type:"datetime", default: "now()"})
    lastLoginTime: Date;

    @Column({name:"lock_flag", type:"boolean", default:false})
    lockFlag:boolean;
}
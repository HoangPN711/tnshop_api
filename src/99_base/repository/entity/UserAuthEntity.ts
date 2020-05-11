import {Entity, Column, ManyToMany, JoinTable} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {RoleEntity} from "./RoleEntity";

@Entity("auth_user")
export class UserAuthEntity extends BaseEntity{

    @Column({name:"user_id"})
    userId:string;

    @Column({name:"password"})
    password: string;

    @Column({name:"last_login_time", type:"datetime",nullable:true})
    lastLoginTime: Date;

    @Column({name:"lock_flag", type:"boolean", default:false, nullable:true})
    lockFlag:boolean;

    @Column({name:"login_fail_count", type:"int", default:0, nullable:true})
    loginFailCount:number;

    @ManyToMany(type => RoleEntity, roles => roles.users, {cascade : false, onDelete: "NO ACTION", nullable:true})
    @JoinTable({name:"auth_user_role"})
    roles : RoleEntity[];

}
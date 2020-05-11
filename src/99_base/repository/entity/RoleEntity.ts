import {Entity, Column, ManyToMany, JoinTable} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {UserAuthEntity} from "./UserAuthEntity";

@Entity("role_define")
export class RoleEntity extends BaseEntity {

    @Column({name:"role_alias", type:"char", length:2})
    roleAlias:string;

    @Column({name:"group_name", type:"varchar", length:100})
    groupName:string;

    @Column({name:"is_available", type:"boolean", nullable:true})
    isAvailable:boolean;

    @ManyToMany(type => UserAuthEntity, {onDelete:"NO ACTION", nullable:true})
    @JoinTable({name:"auth_user_role"})
    users : UserAuthEntity[]
}
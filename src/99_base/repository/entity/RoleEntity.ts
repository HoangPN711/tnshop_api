import {Entity, Column} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity("role_define")
export class RoleDefineEntity extends BaseEntity {

    @Column({name:"role_id"})
    roleId:string;

    @Column({name:"group_name"})
    groupName:string;

    @Column({name:"is_available", type:"boolean", nullable:true})
    isAvailable:boolean;
}
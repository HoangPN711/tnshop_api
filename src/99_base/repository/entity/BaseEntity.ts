import {Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"

export abstract class BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name:"created_at", nullable:true})
    createdAt : Date;

    @Column({name:"created_by", nullable:true, type:"varchar", length:100})
    createdBy : string;

    @UpdateDateColumn({name:"updated_at", nullable:true})
    updatedAt: Date;

    @Column({name:"updated_by", nullable:true, type:"varchar", length:100})
    updatedBy: string;
}

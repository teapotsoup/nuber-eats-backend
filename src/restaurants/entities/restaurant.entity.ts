import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


//dto에서 안쓸꺼면 @InputType({isAbstract:true})
@ObjectType()
@Entity()
export class Restaurant{

    @PrimaryGeneratedColumn()
    @Field(type=>Number)
    id:number;

    @Field(type=>String)
    @Column()
    @IsString()
    @Length(5, 10)
    name: string;

    @Field(type=>Boolean)
    @Column()
    @IsBoolean()
    isVegan:boolean

    @Field(type=>String)
    @Column()
    address:string

    @Field(type=>String)
    @Column()
    ownerName:string

    @Field(type=>String)
    @Column()
    categoryName:string
}
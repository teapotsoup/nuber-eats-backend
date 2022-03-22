import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
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

    @Field(type=>Boolean,{nullable: true})//nullable하면 isVegan이 없다
    @Column({default: true})
    @IsOptional()
    @IsBoolean()
    isVegan:boolean

    @Field(type=>String,{defaultValue: "what is your address"})
    @Column()
    @IsString()
    address:string

    // @Field(type=>String)
    // @Column()
    // @IsString()
    // ownerName:string

    // @Field(type=>String)
    // @Column()
    // @IsString()
    // categoryName:string
}
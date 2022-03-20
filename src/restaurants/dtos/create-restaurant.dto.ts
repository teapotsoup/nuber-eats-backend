import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { IsBoolean, IsString,  Length } from "class-validator";
import { Restaurant } from "../entities/restaurant.entity";

// @ArgsType()
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ["id"], InputType){}
// export class CreateRestaurantDto{

//     @Field(type=>String) 
//     @IsString()
//     @Length(5, 10)
//     name:string;

//     @Field(type=>Boolean)
//     @IsBoolean()
//     isVegan:boolean;

//     @Field(type=>String)
//     @IsString() 
//     address:string;

//     @Field(type=>String)
//     @IsString()
//     ownerName:string;

//     // @Field(type=>String)
//     // @IsString()
//     // categoryName:string;
// }
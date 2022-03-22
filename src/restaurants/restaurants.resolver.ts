import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { number } from "joi";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant) //GraphQL Query/Mutation으로 DB에 접근하는 RestaurantService의 메서드들 활용.
export class RestaurantResolver{
    constructor(private readonly restaurantService: RestaurantService){}
    @Query((returns)=>[Restaurant])//같은 의미인데 표현이 다른 그래프큐엘 방식
    //@Args('veganOnly') veganOnly:boolean
    restaurants():Promise<Restaurant[]>{//같은 의미인데 표현이 다른 타입스크립트 방식
        return this.restaurantService.getAll();
    }
    @Mutation(returns => Boolean)
    async createRestaurant(
        @Args('input') createRestaurantDto: CreateRestaurantDto,
    ):Promise<boolean>{
        console.log(createRestaurantDto)
        try{
            await this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        }
        catch(e){
            console.log(e)
            return false}
    }
    @Mutation(() =>Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto:UpdateRestaurantDto,
    ): Promise<boolean>{
        try{
            await this.restaurantService.updateRestaurant(updateRestaurantDto)
            return true
        }catch(e){
            if(e){
                console.log(e);
                return false;
            }
        }
    }
}
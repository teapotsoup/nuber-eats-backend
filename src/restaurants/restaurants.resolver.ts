import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(of => Restaurant)
export class RestaurantResolver{
    @Query((returns)=>[Restaurant])//같은 의미인데 표현이 다른 그래프큐엘 방식
    restaurants(@Args('veganOnly') veganOnly:boolean){//같은 의미인데 표현이 다른 타입스크립트 방식
        return [];
    }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() createRestaurantDto: CreateRestaurantDto,
    ):boolean{
        console.log(createRestaurantDto);
        return true;
    }
}
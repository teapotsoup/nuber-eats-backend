import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService{
    constructor(
        @InjectRepository(Restaurant) //전달받은 Restaurant entity를 기반으로 Repository 생성.
        private readonly restaurants: Repository<Restaurant>
        ){} 
    getAll(): Promise<Restaurant[]>{ //restaurants는 restaurant entity의 repository
        return this.restaurants.find(); //Repository의 메서드들로 DB에 접근하는 방식 지정.
    }
    createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>{ //리턴 타입 프로미스 타입은 Restaurant
        const newRestaurant = this.restaurants.create(createRestaurantDto)
        return this.restaurants.save(newRestaurant)
    }
}

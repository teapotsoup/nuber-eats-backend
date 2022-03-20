import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])], // TypeOrmModule의 Restaurant 엔티티를 다른 곳에서 Inject할 수 있도록 import하기.
    providers: [RestaurantResolver, RestaurantService], //RestaurantService 주입 => RestaurantResolver에서 사용 가능
})
export class RestaurantModule {}

//전체 흐름:  AppModule - TypeOrmModule - RestaurantsModule - RestaurantResolver - RestaurantService

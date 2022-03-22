import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile:process.env.NODE_ENV === "prod",
      validationSchema: Joi.object({
        NODE_ENV:Joi.string().valid('dev', 'prod').required(),
        DB_HOST:Joi.string().required(),
        DB_PORT:Joi.string().required(),
        DB_USERNAME:Joi.string().required(),
        DB_PASSWORD:Joi.string().required(),
        DB_NAME:Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST, //'localhost',
      port: +process.env.DB_PORT, //5432,
      username: process.env.DB_USERNAME, //'postgres',
      password: process.env.DB_PASSWORD, //'090209',
      database: process.env.DB_NAME, //nuber-eats',
      synchronize: process.env.NODE_ENV !== "prod", //prod환경이 아니면 true
      logging: process.env.NODE_ENV !== "prod", //true면 DB에서 돌아가는 쿼리문들 로그 확인 가능
      entities:[User] //TypeOrmModule에서 Restaurant라고 하는 entity를 가지고 있다. Restaurant은 DB가 된다
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({//forRoot는 루트모듈을 설정하는 것
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

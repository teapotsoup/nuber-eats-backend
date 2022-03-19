import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantModule } from './restaurants/restaurants.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".dev.env" : ".test.env",
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
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({//forRoot는 루트모듈을 설정하는 것
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

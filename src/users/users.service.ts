import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";

import { User } from "./entities/user.entity";


@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>
    ){}
    async createAccount({email, password, role
    } : CreateAccountInput):Promise<{ok:boolean, error?:string}>{
        try{
            const exists = await this.users.findOne({email});
            if(exists){
                return {ok:false, error:'There is a user with that email already'}
            }
            await this.users.save(this.users.create({email, password, role}))
            return {ok:true}
        }
        catch(e){
            return {ok:false, error:"Couldn't create account"}; //1:26 
        }
        //check new user
        //create user @ hash the password
        //
    }
    async login({
        email, 
        password,
    }: LoginInput): Promise<{ok:boolean; error?: string, token?:string}>{
        try{
            const user = await this.users.findOne({email})
            if(!user){
                return{
                    ok:false,
                    error:"User not found"
                } 
            }
            const passwordCorrect = await user.checkPassword(password)
            if(!passwordCorrect){
                return{
                    ok:false,
                    error: 'Wrong password'
                }
            }
            return{
                ok:true,
                token: 'lalalalaalala',
            }
        }catch(error){
            return{
                ok:false,
                error,
            }
        }
    }
}

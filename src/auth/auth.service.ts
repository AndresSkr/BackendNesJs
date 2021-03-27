import { Injectable } from '@nestjs/common';
import { UserService } from '../routes/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        
        if (user) {
            const ismach = await this.userService.compareHash(pass,user.password)
            if(!ismach){
                return null
            }
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload = {username: user.username, sub: user._id}
        return{
            access_token :  this.jwtService.sign(payload),
        };
    }
}

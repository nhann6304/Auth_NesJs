import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from 'interfaces/common/user.interface';
import { comparePassWordHelper } from 'src/helpers/hashPass.helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }


    async login(user: IUser) {
        try {
            const payload = { user_email: user.user_email, sub: user._id };
            return {
                message: "Đăng nhập thành công",
                access_token: this.jwtService.sign(payload),
                statusCode: 201
            }
        } catch (error) {
            return new BadRequestException("Đăng nhập thất bại")
        }
    }

    async validateUser(user_email: string, user_password: string): Promise<any> {
        const user: IUser = await this.usersService.findByEmail(user_email);
        if (!user) {
            return null;
        }
        const isValidPassword = await comparePassWordHelper(user_password, user.user_password);
        if (!isValidPassword) {
            return null;
        }
        return user;
    }

}
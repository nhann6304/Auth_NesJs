
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'interfaces/common/jwt.interface';
import { UsersService } from 'src/apis/users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET"),
        });
    }

    async validate(payload: JwtPayload) {
        const infoUser = await this.userService.findByEmail(payload.user_email)

        return {
            message: "Lấy người dùng thành công",
            metadata: infoUser,
            statusCode: 201
        }
    }
}
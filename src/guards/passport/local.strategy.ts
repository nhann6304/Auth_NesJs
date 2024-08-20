import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/apis/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'user_email',
            passwordField: 'user_password',
        });
    }

    async validate(user_email: string, user_password: string): Promise<any> {
        const user = await this.authService.validateUser(user_email, user_password);
        if (!user) {
            throw new UnauthorizedException("Email hoặc Password sai!!!!");
        }
        return user;
    }
}

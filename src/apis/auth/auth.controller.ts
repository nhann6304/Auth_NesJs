import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LocalStrategySto } from "./auth.dto";
import { Request as req } from "express";
import { JwtAuthGuard, LocalAuthGuard } from "src/guards/passport/local-auth.guard";
import { IUser } from "interfaces/common/user.interface";


@Controller("auth")
@ApiTags('Auth-Api')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: "Đăng nhập" })
    @Post('login')
    @ApiBody({ type: LocalStrategySto })
    async login(@Request() req: req) {
        return this.authService.login(req.user as IUser)
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Lấy Profile theo token" })
    getProfile(@Request() req) {
        return req.user;
    }

}
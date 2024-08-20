import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LocalStrategyDto } from "./auth.dto";
import { Request as req } from "express";
import { JwtAuthGuard, LocalAuthGuard, Public } from "src/guards/passport/local-auth.guard";
import { IUser } from "interfaces/common/user.interface";
import { CreateUserDto } from "../users/users.dto";
import { UsersService } from "../users/users.service";
import { MailerService } from "@nestjs-modules/mailer";


@Controller("auth")
@ApiTags('Auth-Api')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly userService: UsersService,
        private readonly mailerService: MailerService
    ) {
    }

    @ApiOperation({ summary: "Đăng ký" })
    @Post("register")
    @Public()
    @ApiBody({ type: CreateUserDto })
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: "Đăng nhập" })
    @Post('login')
    @Public()
    @ApiBody({ type: LocalStrategyDto })
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

    @Get("mail")
    @Public()
    testMail() {
        this.mailerService.sendMail({
            to: "huynhthanhnhan632004@gmail.com",
            subject: "Test Email",
            text: "NesJs_Leaning",
            html: "<h1><b>NesJs_Leaning Test Mail</b></h1>"
        })
        return "OK"
    }

}
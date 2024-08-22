import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./apis/auth/auth.module";
import { NoteModule } from "./apis/note/note.module";
import { UsersModule } from "./apis/users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/passport/local-auth.guard";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        AuthModule,
        NoteModule,
        UsersModule,
        // tạo biến mồi trường lấy từ file env
        ConfigModule.forRoot({ isGlobal: true }),
        //Cấu hình  database mongooseDb
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>("MONGODB_URI"),
            }),
            inject: [ConfigService]
        }),
        //Cấu hình send email
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    // ignoreTLS: true,
                    secure: true,
                    auth: {
                        user: configService.get<string>("MAIL_USER"),
                        pass: configService.get<string>("MAIL_PASSWORD"),
                    },
                },
                defaults: {
                    from: '"No Reply" <no-reply@localhost>',
                },
                // preview: true,
                template: {
                    dir: process.cwd() + '/src/mail/template/',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})

export class AppModule { } 
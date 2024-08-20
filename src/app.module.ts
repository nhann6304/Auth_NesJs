import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./apis/auth/auth.module";
import { NoteModule } from "./apis/note/note.module";
import { UsersModule } from "./apis/users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/passport/local-auth.guard";


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
        })
    ],
    // providers: [
    //     {
    //         provide: APP_GUARD,
    //         useClass: JwtAuthGuard
    //     }
    // ]
})

export class AppModule { } 
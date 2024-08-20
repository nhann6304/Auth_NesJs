import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IUser } from "interfaces/common/user.interface";



export class createAuthDto implements Partial<IUser> {
    @ApiProperty({ default: "" })
    @IsNotEmpty({ message: "User name không đượcc để trống" })
    user_name?: string;

    @ApiProperty({ default: "" })
    @IsNotEmpty({ message: "Password name không đượcc để trống" })
    user_password?: string;
}

export class LocalStrategySto implements Partial<IUser> {
    @ApiProperty({ default: "huynhthanhnhan632004@gmail.com" })
    @IsNotEmpty({ message: "User name không đượcc để trống" })
    user_email?: string;

    @ApiProperty({ default: "123" })
    @IsNotEmpty({ message: "Password name không đượcc để trống" })
    user_password?: string;
}
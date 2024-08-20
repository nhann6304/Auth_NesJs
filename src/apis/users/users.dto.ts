import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { IUser } from "interfaces/common/user.interface";


export class CreateUserDto implements Partial<IUser> {
    _id: string;
    @IsNotEmpty({ message: "user_name không dược để trống" })
    @ApiProperty({ default: "Huỳnh Thành Nhân" })
    user_name: string

    @IsNotEmpty({ message: "user_email không dược để trống" })
    @IsEmail({}, { message: "Email không đúng định đạng" })
    @ApiProperty({ default: "huynhthanhnhan632004@gmail.com" })
    user_email: string

    @IsNotEmpty({ message: "user_password không dược để trống" })
    @ApiProperty({ default: "123" })
    user_password: string

    user_phone: number
    user_address: string
    user_image: string
    is_active: boolean;
    codeId: string;
    timeExpired: string;
    user_role?: "USER";
    user_accountType?: "ACTIVE";

}


export class UpdateUserDto implements Partial<IUser> {
    @IsMongoId({ message: "Id không hợp lệ" })
    @IsNotEmpty({ message: "Id không được để trống" })
    @ApiProperty({ default: "66c18160244ce3ce7572f3fd" })
    _id: string
    @IsOptional()
    @ApiProperty({ default: "" })
    user_name: string
    @ApiProperty({ default: "" })

    @IsOptional()
    @ApiProperty({ default: "" })
    user_phone?: number;

    @IsOptional()
    @ApiProperty({ default: "" })
    user_address?: string;

    @IsOptional()
    @ApiProperty({ default: "" })
    user_image?: string;
}


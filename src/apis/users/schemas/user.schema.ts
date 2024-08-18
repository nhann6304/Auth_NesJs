import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'interfaces/common/user.interface';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
// Tạo bảng User trong database
export class User implements Partial<IUser> {
    @Prop()
    user_name: string

    @Prop()
    user_email: string

    @Prop()
    user_password: string

    @Prop()
    user_phone: number

    @Prop()
    user_address: string

    @Prop()
    user_image: string

    @Prop()
    is_active: boolean

    @Prop({ default: 'USER' })
    user_role?: "USER" | "ADMIN";

    @Prop({ default: 'ACTIVE' })
    user_accountType?: "ACTIVE" | "BLOCK";

}

export const UserSchema = SchemaFactory.createForClass(User);
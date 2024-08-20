import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPasswordHelper } from 'src/helpers/hashPass.helpers';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

  ) { }

  // Kiểm tra email đã tồn tại
  isEmailExit = async (user_email: string): Promise<boolean> => {
    const isExistUser = await this.userModel.exists({ user_email })
    if (isExistUser) {
      return true
    } else {
      return false
    }
  }


  async create(createUserDto: CreateUserDto) {

    const isExistEmail = await this.isEmailExit(createUserDto.user_email);

    if (isExistEmail === true) {
      throw new BadRequestException(`Email ${createUserDto.user_email} đã tồn tại trong hệ thống`)
    }

    const hashPassword = await hashPasswordHelper(createUserDto.user_password);
    const newUser = await this.userModel.create({
      ...createUserDto,
      user_password: hashPassword,
      is_active: false,
      codeId: uuidv4(),
      timeExpired: dayjs().add(1, "minutes"),
      user_role: "USER",
      user_accountType: "ACTIVE",
    })

    console.log(newUser);
    return {
      message: "Tạo người dùng thành công",
      newUser
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    const result = await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto })
    if (result.acknowledged) {
      return {
        message: "Update người dùng thành công",
        statusCode: 201
      }
    }

    return await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto })
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return this.userModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("Không tìm thấy Id trong hệ thông")
    }
  }

  async findByEmail(user_email: string) {
    return this.userModel.findOne({ user_email })
  }
}

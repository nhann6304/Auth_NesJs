import * as bcrypt from "bcrypt"

const saltRounds = 10;

//plainPassword  password mà người dùng nhập vào chưa hash có thẻ nhìn thấy gọi là plain

export const hashPasswordHelper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        console.log(error);
    }

}

export const comparePassWordHelper = async (plainPassword: string, hashPassword: string): Promise<boolean> => {// plainPassword mật khẩu nhìn bằng mắt  hashPassword mật khẩu đã hash
    try {
        return await bcrypt.compare(plainPassword, hashPassword);
    } catch (error) {
        console.log(error);
    }
}


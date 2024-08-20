
export interface IUser {
    _id: any
    user_name: string;
    user_email: string;
    user_password: string;
    user_phone: number;
    user_address: string;
    user_image: string;
    is_active: boolean;
    codeId?: string;
    timeExpired?: string; // Thời gian hết hạn xác nhận Email
    user_role?: "USER" | "ADMIN";
    user_accountType?: "ACTIVE" | "BLOCK";
}

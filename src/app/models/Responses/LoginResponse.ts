export interface LoginResponse {
    token: string;
    expiresIn: number;
    roles: string
}
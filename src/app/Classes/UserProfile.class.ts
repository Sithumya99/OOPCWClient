import { userLoginRequest } from "../Interfaces/BasicData.interface";

export class UserProfile {
    username: string;
    role: string;

    constructor(username: string, role: string) {
        this.username = username;
        this.role = role;
    }
}
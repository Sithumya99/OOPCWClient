import { UserProfile } from "../../Classes/UserProfile.class";
import { UserProfileImplementation } from "./UserProfileImplementation.implementation";


export class UserProfileFacade {
    private static impl: UserProfileImplementation = new UserProfileImplementation();

    public static setAuth(token: string) {
        this.impl.setAuthToken(token);
    }

    public static getAuth(): string | undefined {
        return this.impl.getAuthToken();
    }

    public static setUserDetails(field: string, value: string) {
        this.impl.setUserDetails(field, value);
    }

    public static loginUser() {
        console.log(this.impl.getUser());
        this.impl.loginUser();
    }

    public static getUser(): UserProfile | undefined {
        return this.impl.getUser();
    }

}
import { UserProfile } from "../../Classes/UserProfile.class";
import { fieldInterface } from "../../Interfaces/BasicData.interface";
import { ErrorMsgFacade } from "../ErrorMsg/ErrorMsgFacade.facade";
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
        if (this.validateLogin()) {
            this.impl.loginUser();
        }
    }

    public static validateLogin(): boolean {
        if (this.impl.getUserLoginDetails().username == "") {
            ErrorMsgFacade.setErrorMsg("Username must be provided");
            return false;
        } else if (this.impl.getUserLoginDetails().password == "") {
            ErrorMsgFacade.setErrorMsg("Password must be provided");
            return false;
        }
        return true;
    }

    public static getUser(): UserProfile | undefined {
        return this.impl.getUser();
    }

    public static getLoginFields(): fieldInterface[] {
        let loginFields: fieldInterface[] = [];

        const username: fieldInterface = {
            name: "username",
            label: "Username",
            type: 'text',
            setValue: (name: string, value: string) => {
                UserProfileFacade.setUserDetails(name, value);
            }
        };

        const password: fieldInterface = {
            name: "password",
            label: "Password",
            type: 'password',
            setValue: (name: string, value: string) => {
                UserProfileFacade.setUserDetails(name, value);
            }
        };

        loginFields = [username, password];
        return loginFields;
    }

    public static register(role: string) {
        if (this.validateLogin()) {
            this.impl.registerUser(role);
        }
    }

}
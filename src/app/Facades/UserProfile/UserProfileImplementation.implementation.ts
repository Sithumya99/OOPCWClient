import { Observable } from "rxjs";
import { UserProfile } from "../../Classes/UserProfile.class";
import { BasicdataFacade } from "../Basicdata/BasicdataFacade.facade";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { pages, userLoginRequest } from "../../Interfaces/BasicData.interface";
import { CommandFacade } from "../Commands/CommandFacade.facade";
import { UserProfileFacade } from "./UserProfileFacade.facade";

export class UserProfileImplementation {
    private authToken: string | undefined;
    private user: UserProfile | undefined;
    private userLoginDetails: userLoginRequest;

    constructor() {
        this.userLoginDetails = {
            username: "",
            password: ""
        };
    }

    setAuthToken(authToken: string) {
        this.authToken = authToken;
    }

    getAuthToken(): string| undefined {
        return this.authToken;
    }

    setUserDetails(property: string, value: string) {
        if (property == "username") {
            this.userLoginDetails.username = value;
        } else if (property == "password") {
            this.userLoginDetails.password = value;
        }
    }

    getUser(): UserProfile | undefined {
        return this.user;
    }

    getUserLoginDetails(): userLoginRequest {
        return this.userLoginDetails;
    }

    loginUser(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            CommunicationService.http.postFromTicketServer("login", this.userLoginDetails).subscribe(
                async (result) => {
                    this.user = new UserProfile(result.username, result.role);
                    UserProfileFacade.setAuth(result.token);
                    BasicdataFacade.loadTicketApp();
                    resolve(result);
                    console.log(result);
                },
                async (err) => {
                    reject(err);
                    console.log(err);
                }
            );
        });
    }
}
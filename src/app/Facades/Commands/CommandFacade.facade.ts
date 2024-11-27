import { Observable } from "rxjs";
import { command } from "../../Interfaces/BasicData.interface";
import { CommandImplementation } from "./CommandImplementation.implementation";
import { UserProfileFacade } from "../UserProfile/UserProfileFacade.facade";


export class CommandFacade {
    private static impl: CommandImplementation = new CommandImplementation();

    public static setCommands(cmds: command[]) {
        this.impl.setCommands(cmds);
    }

    public static getCommands(): Observable<command[]> {
        return this.impl.getCommands();
    }

    public static loadCommands() {
        if (UserProfileFacade.getUser() !== undefined) {
            let role: string = UserProfileFacade.getUser()!.role;
            this.impl.loadCommands(role);
        }
    }
}
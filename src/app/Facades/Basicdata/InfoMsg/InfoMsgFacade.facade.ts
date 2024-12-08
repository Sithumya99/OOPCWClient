import { Observable } from "rxjs";
import { InfoMsgImplementation } from "./InfoMsgImplementation.implementation";

export class InfoMsgFacade {
    private static impl: InfoMsgImplementation = new InfoMsgImplementation();
    
    public static getInfoMsg(): Observable<string> {
        return this.impl.getInfoMsg();
    }

    public static setInfoMsg(msg: string) {
        this.impl.setInfoMsg(msg);
    }
}
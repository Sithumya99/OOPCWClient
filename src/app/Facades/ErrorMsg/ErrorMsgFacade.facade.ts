import { Observable } from "rxjs";
import { ErrorMsgImplementation } from "./ErrorMsgImplementation.implementation";

export class ErrorMsgFacade {
    private static impl: ErrorMsgImplementation = new ErrorMsgImplementation();

    public static getErrorMsg(): Observable<string> {
        return this.impl.getErrorMsg();
    }

    public static setErrorMsg(msg: string) {
        this.impl.setErrorMsg(msg);
    }
}
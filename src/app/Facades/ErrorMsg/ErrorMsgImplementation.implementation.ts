import { BehaviorSubject, Observable } from "rxjs";

export class ErrorMsgImplementation {
    private errorMsg: BehaviorSubject<string> = new BehaviorSubject<string>("");

    setErrorMsg(msg: string) {
        this.errorMsg.next(msg);
    }

    getErrorMsg(): Observable<string> {
        return this.errorMsg.asObservable();
    }
}
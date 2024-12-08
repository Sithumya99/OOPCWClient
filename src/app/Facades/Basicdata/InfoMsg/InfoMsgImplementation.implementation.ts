import { BehaviorSubject, Observable } from "rxjs";

export class InfoMsgImplementation {
    private infoMsg: BehaviorSubject<string> = new BehaviorSubject<string>("");

    setInfoMsg(msg: string) {
        this.infoMsg.next(msg);
    }

    getInfoMsg(): Observable<string> {
        return this.infoMsg.asObservable();
    }
}
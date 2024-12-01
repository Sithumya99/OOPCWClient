import { BehaviorSubject, Observable } from "rxjs";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { SessionConfigFacade } from "./SessionConfigFacade.facade";
import { sessionConfigInterface } from "../../Interfaces/BasicData.interface";
import { BasicdataFacade } from "../Basicdata/BasicdataFacade.facade";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorMsgFacade } from "../ErrorMsg/ErrorMsgFacade.facade";

export class SessionConfigImplementation {
    private isSessionActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getIsSessionActive(): Observable<boolean> {
        return this.isSessionActive.asObservable();
    }

    setIsSessionActive(value: boolean) {
        this.isSessionActive.next(value);
    }

    startSession(session: sessionConfigInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            CommunicationService.http.postFromTicketServer("startsession", session).subscribe(
                async (response) => {
                    BasicdataFacade.setCustomerRetrievalRate(session.customerRetrievalRate);
                    SessionConfigFacade.setSessionConfigActive(true);
                    resolve(response);
                },
                async (err: HttpErrorResponse) => {
                    ErrorMsgFacade.setErrorMsg(err.error.message);
                    reject(err);
                }
            )
        });
    }

    stopSession(): Promise<void> {
        return new Promise((resolve, reject) => {
            CommunicationService.http.postFromTicketServer("stopsession", {}).subscribe(
                async (response) => {
                    SessionConfigFacade.setSessionConfigActive(false);
                    resolve(response);
                },
                async (err: HttpErrorResponse) => {
                    ErrorMsgFacade.setErrorMsg(err.error.message);
                    reject(err);
                }
            )
        });
    }
}
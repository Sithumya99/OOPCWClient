import { BehaviorSubject, Observable } from "rxjs";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { SessionConfigFacade } from "./SessionConfigFacade.facade";
import { sessionConfigInterface } from "../../Interfaces/BasicData.interface";

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
                    resolve(response);
                },
                async (err) => {
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
                async (err) => {
                    reject(err);
                }
            )
        });
    }
}
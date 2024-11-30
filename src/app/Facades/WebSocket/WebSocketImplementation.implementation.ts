import { BehaviorSubject, Observable } from "rxjs";

export class WebSocketImplementation {
    private webSocketMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");

    getWebSocketMessage(): Observable<string> {
        return this.webSocketMessage.asObservable();
    }
    
    setWebSocketMessage(message: string) {
        this.webSocketMessage.next(message);
    }
}
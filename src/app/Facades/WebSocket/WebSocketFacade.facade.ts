import { Observable } from "rxjs";
import { WebSocketImplementation } from "./WebSocketImplementation.implementation";
import { WebSocketService } from "../../Services/WebSocketService.service";

export class WebSocketFacade {
    private static impl: WebSocketImplementation = new WebSocketImplementation();

    public static getWebSocketMessage(): Observable<string> {
        return this.impl.getWebSocketMessage();
    }

    public static setWebSocketMessage(message: string) {
        this.impl.setWebSocketMessage(message);
    }

    public static connectWebSocket() {
        WebSocketService.wbService.connect();
    }
}
import { Injectable } from "@angular/core";
import { WebSocketFacade } from "../Facades/WebSocket/WebSocketFacade.facade";

@Injectable({
    providedIn: 'root',
})

export class WebSocketService {

    static wbService: WebSocketService;
    private socket: WebSocket | null = null;
    private webSocketUrl: string = 'ws://localhost:8080/ws/tickets';

    constructor() {
        WebSocketService.wbService = this;
         // Disconnect WebSocket on page refresh
        window.addEventListener('beforeunload', () => {
            this.disconnect();
        });
    }

    connect() {
        if (this.socket) {
            return;
        }

        this.socket = new WebSocket(this.webSocketUrl);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
        };

        this.socket.onmessage = (event) => {
            console.log("WebSocket message ", event.data);
            WebSocketFacade.setWebSocketMessage(event.data);
        }

        this.socket.onclose = (event) => {
            console.log("WebSocket closed ", event);
            this.socket = null;
        }

        this.socket.onerror = (error) => {
            console.log("WebSocket error ", error);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
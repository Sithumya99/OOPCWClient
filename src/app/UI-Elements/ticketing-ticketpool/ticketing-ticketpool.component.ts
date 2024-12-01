import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Ticket } from "../../Classes/Ticket.class";
import { BasicdataFacade } from "../../Facades/Basicdata/BasicdataFacade.facade";
import { pages } from "../../Interfaces/BasicData.interface";
import { WebSocketFacade } from "../../Facades/WebSocket/WebSocketFacade.facade";
import { SessionConfigFacade } from "../../Facades/SessionConfig/SessionConfigFacade.facade";

@Component({
    selector: 'app-ticketing-ticketpool',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ticketing-ticketpool.component.html',
    styleUrl: './ticketing-ticketpool.component.scss',
})

export class TicketPoolComponent {
    tickets: Ticket[] = [];
    isSessionActive: boolean = false;

    constructor() {
        SessionConfigFacade.getSessionConfigActive().subscribe((isActive: boolean) => {
            this.isSessionActive = isActive;
        });

        BasicdataFacade.getTicketPool().subscribe((ticketList: Ticket[]) => {
            console.log("tickets subject: " ,ticketList);
            this.tickets = ticketList;
        });

        WebSocketFacade.getWebSocketMessage().subscribe((message: string) => {
            if (message.toLocaleLowerCase() == "ticket_pool_changed" || message.toLocaleLowerCase() == "ticket_pool_start") {
                console.log(message);
                BasicdataFacade.getTicketsFromServer();
            } else if (message.toLocaleLowerCase() == "ticket_pool_stop") {
                console.log(message);
                SessionConfigFacade.setSessionConfigActive(false);
                BasicdataFacade.setTicketPool([]);
            }
        });
    }

    setTicketPage(ticket: Ticket) {
        BasicdataFacade.setCurrentTicket(ticket);
        BasicdataFacade.setCurrentPage(pages.ticketPage);
    }
}
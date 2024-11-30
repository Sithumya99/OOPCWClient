import { Injectable } from "@angular/core";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { BasicdataImplementation } from "./BasicdataImplementation.implementation";
import { command, fieldInterface, pages, ticket, ticketReq } from "../../Interfaces/BasicData.interface";
import { UserProfileFacade } from "../UserProfile/UserProfileFacade.facade";
import { Observable } from "rxjs";
import { CommandFacade } from "../Commands/CommandFacade.facade";
import { Ticket } from "../../Classes/Ticket.class";
import { WebSocketFacade } from "../WebSocket/WebSocketFacade.facade";
import { SessionConfigFacade } from "../SessionConfig/SessionConfigFacade.facade";

@Injectable({
    providedIn: 'root',
})

export class BasicdataFacade {
    private static impl: BasicdataImplementation = new BasicdataImplementation();
    private static newTicket: ticketReq;

    public static setCurrentPage(currentPage: pages) {
        this.impl.setCurrentPage(currentPage);
    }

    public static getCurrentPage(): Observable<pages> {
        return this.impl.getCurrentPage();
    }

    public static setTickets(ticketList: ticket[]) {
        this.impl.setTickets(ticketList);
    }

    public static getTickets(): Ticket[] {
        return this.impl.getTickets();
    }

    public static setTicketPool(ticketsList: Ticket[]) {
        this.impl.setTicketPool(ticketsList);
    }

    public static getTicketPool(): Observable<Ticket[]> {
        return this.impl.getTicketPool();
    }

    public static getAddTicketFields(): fieldInterface[] {
        let addTicketFields: fieldInterface[] = [];

        const eventName: fieldInterface = {
            name: "eventName",
            label: "Event Name",
            type: 'text',
            setValue: (name: string, value: string) => {
                this.newTicket.eventName = value;
            }
        };

        const price: fieldInterface = {
            name: "price",
            label: "Price",
            type: 'number',
            setValue: (name: string, value: number) => {
                this.newTicket.price = value;
            }
        };

        addTicketFields = [eventName, price];
        return addTicketFields;
    }

    public static getTicketsFromServer() {
        this.impl.getTicketPoolFromServer();
    }

    public static loadTicketApp(isSessionActive: boolean) {
        CommandFacade.loadCommands();
        if (isSessionActive) {
            BasicdataFacade.getTicketsFromServer();
        }
        BasicdataFacade.setCurrentPage(pages.ticketPoolPage);
        WebSocketFacade.connectWebSocket();
    }

    public static addTicket() {
        this.impl.addTicket(this.newTicket);
    }

    public static buyTicket(ticket: Ticket) {
        this.impl.buyTicket(ticket);
    }

    public static getCurrentTicket(): Observable<Ticket|undefined> {
        return this.impl.getCurrentTicket();
    }

    public static setCurrentTicket(ticket: Ticket) {
        this.impl.setCurrentTicket(ticket);
    }
}
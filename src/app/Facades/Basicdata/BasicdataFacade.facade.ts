import { Injectable } from "@angular/core";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { BasicdataImplementation } from "./BasicdataImplementation.implementation";
import { command, fieldInterface, pages, ticket, ticketReq } from "../../Interfaces/BasicData.interface";
import { UserProfileFacade } from "../UserProfile/UserProfileFacade.facade";
import { interval, map, Observable, takeWhile } from "rxjs";
import { CommandFacade } from "../Commands/CommandFacade.facade";
import { Ticket } from "../../Classes/Ticket.class";
import { WebSocketFacade } from "../WebSocket/WebSocketFacade.facade";
import { SessionConfigFacade } from "../SessionConfig/SessionConfigFacade.facade";
import { ErrorMsgFacade } from "../ErrorMsg/ErrorMsgFacade.facade";

export class BasicdataFacade {
    private static impl: BasicdataImplementation = new BasicdataImplementation();
    private static newTicket: ticketReq = {
        eventName: "",
        price: 0
    };
    private static customerRetrievalRate: number = 0;

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
        if (this.validateNewTicket()) {
            this.impl.addTicket(this.newTicket);
        }
    }

    public static validateNewTicket(): boolean {
        if (this.newTicket.price < 0) {
            ErrorMsgFacade.setErrorMsg("Price of ticket cannot be negative");
            return false;
        } else if (this.newTicket.eventName == "") {
            ErrorMsgFacade.setErrorMsg("Event name cannot be empty");
            return false;
        }
        return true;
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

    public static setCustomerRetrievalRate(rate: number) {
        BasicdataFacade.customerRetrievalRate = rate;
    }

    public static getCustomerRetrievalRate(): number {
        return BasicdataFacade.customerRetrievalRate;
    }

    public static startCountDown() {
        this.impl.setWaitingTime(this.customerRetrievalRate);

        interval(1000).pipe(
            takeWhile(() => this.impl.getWaitingTimeValue() > 0),
            map(() => this.impl.getWaitingTimeValue() - 1000)
        ).subscribe(
            (remainingTime) => {
                this.impl.setWaitingTime(Math.max(remainingTime, 0));
            }
        )
    }

    public static getWaitingTime(): Observable<number> {
        return this.impl.getWaitingTime();
    }

    public static resetTicket(): void {
        this.newTicket = {
            eventName: "",
            price: 0
        };
    }
}
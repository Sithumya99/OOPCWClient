import { BehaviorSubject, Observable } from "rxjs";
import { pages, ticket } from "../../Interfaces/BasicData.interface";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { Ticket } from "../../Classes/Ticket.class";
import { BasicdataFacade } from "./BasicdataFacade.facade";

export class BasicdataImplementation {

    currentPage: BehaviorSubject<pages> =  new BehaviorSubject<pages>(pages.loginPage);
    ticketpool: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
    tickets: Ticket[] = [];

    constructor() {}

    getCurrentPage(): Observable<pages> {
        return this.currentPage.asObservable();
    }

    setCurrentPage(page: pages) {
        this.currentPage.next(page);
    }

    setTickets(ticketList: ticket[]) {
        this.tickets = [];
        for (let i = 0; i < ticketList.length; i++) {
            let newTicket: Ticket = new Ticket(ticketList[i]);
            this.tickets.push(newTicket);
        }
        BasicdataFacade.setTicketPool(this.tickets);
    }

    getTickets(): Ticket[] {
        return this.tickets;
    }

    setTicketPool(ticketsList: Ticket[]) {
        this.ticketpool.next(ticketsList);
    }

    getTicketPool(): Observable<Ticket[]> {
        return this.ticketpool.asObservable();
    }

    getTicketPoolFromServer(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            CommunicationService.http.getFromTicketServer("gettickets").subscribe(
                async (response) => {
                    console.log(response);
                    BasicdataFacade.setTickets(response);
                    resolve(response);
                },
                async (error) => {
                    reject(error);
                }
            );
        });
    }
}
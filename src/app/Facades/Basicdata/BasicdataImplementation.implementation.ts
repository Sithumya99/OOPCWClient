import { BehaviorSubject, Observable } from "rxjs";
import { pages, ticket, ticketReq } from "../../Interfaces/BasicData.interface";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { Ticket } from "../../Classes/Ticket.class";
import { BasicdataFacade } from "./BasicdataFacade.facade";

export class BasicdataImplementation {

    currentPage: BehaviorSubject<pages> =  new BehaviorSubject<pages>(pages.loginPage);
    ticketpool: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
    currentTicket: BehaviorSubject<Ticket | undefined> = new BehaviorSubject<Ticket | undefined>(undefined); 
    tickets: Ticket[] = [];

    constructor() {}

    getCurrentPage(): Observable<pages> {
        return this.currentPage.asObservable();
    }

    setCurrentPage(page: pages) {
        this.currentPage.next(page);
    }

    getCurrentTicket(): Observable<Ticket|undefined> {
        return this.currentTicket.asObservable();
    }

    setCurrentTicket(ticket: Ticket) {
        this.currentTicket.next(ticket);
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

    addTicket(newTicket: ticketReq): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            CommunicationService.http.postFromTicketServer("addticket", newTicket).subscribe(
                async (response) => {
                    BasicdataFacade.getTicketsFromServer();
                    resolve(response);
                },
                async (error) => {
                    reject(error);
                }
            )
        });
    }

    buyTicket(ticket: Ticket): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            CommunicationService.http.postFromTicketServer("buyticket", ticket).subscribe(
                async (response) => {
                    console.log("ticket buy: success");
                    resolve(response);
                },
                async (error) => {
                    reject(error);
                }
            )
        });
    }
}
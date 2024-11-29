import { Injectable } from "@angular/core";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { BasicdataImplementation } from "./BasicdataImplementation.implementation";
import { command, pages, ticket } from "../../Interfaces/BasicData.interface";
import { UserProfileFacade } from "../UserProfile/UserProfileFacade.facade";
import { Observable } from "rxjs";
import { CommandFacade } from "../Commands/CommandFacade.facade";
import { Ticket } from "../../Classes/Ticket.class";

@Injectable({
    providedIn: 'root',
})

export class BasicdataFacade {
    private static impl: BasicdataImplementation = new BasicdataImplementation();

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

    public static loadTicketApp() {
        this.impl.getTicketPoolFromServer();
        BasicdataFacade.setCurrentPage(pages.ticketPoolPage);
        CommandFacade.loadCommands();
    }
}
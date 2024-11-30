import { Component, Input } from "@angular/core";
import { Ticket } from "../../Classes/Ticket.class";
import { BasicdataFacade } from "../../Facades/Basicdata/BasicdataFacade.facade";
import { ticket } from "../../Interfaces/BasicData.interface";
import { UserProfile } from "../../Classes/UserProfile.class";
import { UserProfileFacade } from "../../Facades/UserProfile/UserProfileFacade.facade";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-ticketing-ticket',
    templateUrl: './ticketing-ticket.component.html',
    imports: [CommonModule],
    standalone: true
})

export class TicketingTicketComponent {

    ticket: ticket = {
        tickedId: "",
        eventName: "",
        price: 0
    };
    currentTicket: Ticket | undefined;

    constructor() {
        BasicdataFacade.getCurrentTicket().subscribe((t) => {
            if (t !== undefined) {
                this.currentTicket = t;
                this.ticket = {
                    tickedId: t.ticketId,
                    eventName: t.eventName,
                    price: t.price
                };
            }
        });
    }

    buyTicket() {
        BasicdataFacade.buyTicket(this.currentTicket!);
    }

    showBuyTicket(): boolean {
        return UserProfileFacade.getUser()!.role == "Customer";
    }
}
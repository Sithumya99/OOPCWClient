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
        id: "",
        eventName: "",
        price: 0
    };
    currentTicket: Ticket | undefined;
    waitingTime: number = 0;

    constructor() {
        BasicdataFacade.getCurrentTicket().subscribe((t) => {
            if (t !== undefined) {
                this.currentTicket = t;
                this.ticket = {
                    id: t.ticketId,
                    eventName: t.eventName,
                    price: t.price
                };
            }
        });

        BasicdataFacade.getWaitingTime().subscribe((time: number) => {
            this.waitingTime = time;
        });
    }

    buyTicket() {
        BasicdataFacade.buyTicket(this.currentTicket!);
    }

    showBuyTicket(): boolean {
        if (UserProfileFacade.getUser()!.role == "Customer") {
            if (this.waitingTime > 0) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
}
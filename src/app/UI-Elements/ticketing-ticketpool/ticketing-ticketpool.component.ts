import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Ticket } from "../../Classes/Ticket.class";
import { BasicdataFacade } from "../../Facades/Basicdata/BasicdataFacade.facade";

@Component({
    selector: 'app-ticketing-ticketpool',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ticketing-ticketpool.component.html',
})

export class TicketPoolComponent {
    tickets: Ticket[] = [];

    constructor() {
        BasicdataFacade.getTicketPool().subscribe((ticketList: Ticket[]) => {
            console.log("tickets subject: " ,ticketList);
            this.tickets = ticketList;
        });
    }
}
import { Component, OnInit } from "@angular/core";
import { fieldInterface } from "../../Interfaces/BasicData.interface";
import { BasicdataFacade } from "../../Facades/Basicdata/BasicdataFacade.facade";
import { InputComponent } from "../input/input.component";

@Component({
    selector: 'app-ticketing-add-ticket',
    templateUrl: './ticketing-add-ticket.component.html',
    imports: [InputComponent],
    standalone: true
})

export class TicketingAddTicketComponent implements OnInit {
    addTicketFields: fieldInterface[] = [];

    ngOnInit(): void {
        this.addTicketFields = BasicdataFacade.getAddTicketFields();
    }

    addTicket() {
        BasicdataFacade.addTicket();
    }
}
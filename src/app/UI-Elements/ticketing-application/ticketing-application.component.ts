import { Component } from "@angular/core";
import { TicketPoolComponent } from "../ticketing-ticketpool/ticketing-ticketpool.component";
import { TicketingLoginComponent } from "../ticketing-login/ticketing-login.component";
import { TicketingNavbarComponent } from "../ticketing-navbar/ticketing-navbar.component";
import { pages } from "../../Interfaces/BasicData.interface";
import { BasicdataFacade } from "../../Facades/Basicdata/BasicdataFacade.facade";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-ticketing-application',
    imports: [
        TicketPoolComponent,
        TicketingLoginComponent,
        TicketingNavbarComponent,
        CommonModule
    ],
    templateUrl: './ticketing-application.component.html',
    standalone: true,
    styleUrl: ''
})

export class TicketingApplication {
    currentPage: pages = pages.loginPage;

    constructor() {
        BasicdataFacade.getCurrentPage().subscribe(
            (page: pages) => {
                this.currentPage = page;
            }
        );
    }
}
import { Component } from "@angular/core";
import { TicketPoolComponent } from "../ticketing-ticketpool/ticketing-ticketpool.component";
import { TicketingLoginComponent } from "../ticketing-login/ticketing-login.component";
import { TicketingNavbarComponent } from "../ticketing-navbar/ticketing-navbar.component";
import { pages } from "../../Interfaces/BasicData.interface";
import { BasicdataFacade } from "../../Facades/Basicdata/BasicdataFacade.facade";
import { CommonModule } from "@angular/common";
import { TicketingAddTicketComponent } from "../ticketing-add-ticket/ticketing-add-ticket.component";
import { SessionConfigComponent } from "../session-config/session-config.component";
import { TicketingTicketComponent } from "../ticketing-ticket/ticketing-ticket.component";
import { ErrorDlgComponent } from "../error-dlg/error-dlg.component";
import { ErrorMsgFacade } from "../../Facades/ErrorMsg/ErrorMsgFacade.facade";
import { InfoDlgComponent } from "../info-dlg/info-dlg.component";
import { InfoMsgFacade } from "../../Facades/Basicdata/InfoMsg/InfoMsgFacade.facade";

@Component({
    selector: 'app-ticketing-application',
    imports: [
        CommonModule,
        TicketPoolComponent,
        TicketingLoginComponent,
        TicketingNavbarComponent,
        TicketingAddTicketComponent,
        SessionConfigComponent,
        TicketingTicketComponent,
        ErrorDlgComponent,
        InfoDlgComponent
    ],
    templateUrl: './ticketing-application.component.html',
    standalone: true,
    styleUrl: './ticketing-application.component.scss'
})

export class TicketingApplication {
    pageEnum  = pages;
    currentPage: pages = pages.loginPage;
    showErrorDlg: boolean = false;
    errorMsg: string = "";
    showInfoDlg: boolean = false;
    infoMsg: string = "";

    constructor() {
        BasicdataFacade.getCurrentPage().subscribe(
            (page: pages) => {
                this.currentPage = page;
            }
        );

        ErrorMsgFacade.getErrorMsg().subscribe(
            (msg: string) => {
                if (msg !== "") {
                    this.showErrorDlg = true;
                    this.errorMsg = msg;
                }
            }
        );

        InfoMsgFacade.getInfoMsg().subscribe(
            (msg: string) => {
                if (msg !== "") {
                    this.showInfoDlg = true;
                    this.infoMsg = msg;
                }
            }
        );
    }

    closeDialog(event: boolean) {
        this.showErrorDlg = false;
        this.showInfoDlg = false;
    }
}
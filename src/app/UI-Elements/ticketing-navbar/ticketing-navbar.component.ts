import { Component } from "@angular/core";
import { CommandFacade } from "../../Facades/Commands/CommandFacade.facade";
import { command } from "../../Interfaces/BasicData.interface";

@Component({
    selector: 'app-ticketing-navbar',
    standalone: true,
    imports: [],
    templateUrl: './ticketing-navbar.component.html',
    styleUrl: ''
})

export class TicketingNavbarComponent {

    navbarCommands: command[] = [];

    constructor() {
        CommandFacade.getCommands().subscribe(
            (cmds: command[]) => {
                this.navbarCommands = cmds;
            }
        );
    }
}
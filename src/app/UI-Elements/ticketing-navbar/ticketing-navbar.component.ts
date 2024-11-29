import { Component } from "@angular/core";
import { CommandFacade } from "../../Facades/Commands/CommandFacade.facade";
import { command } from "../../Interfaces/BasicData.interface";
import { CommandComponent } from "../Command/Command.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-ticketing-navbar',
    standalone: true,
    templateUrl: './ticketing-navbar.component.html',
    imports: [CommonModule, CommandComponent],
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
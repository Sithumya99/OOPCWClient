import { BehaviorSubject, Observable } from "rxjs";
import { command, pages } from "../../Interfaces/BasicData.interface";
import { BasicdataFacade } from "../Basicdata/BasicdataFacade.facade";
import { tick } from "@angular/core/testing";
import { CommandFacade } from "./CommandFacade.facade";


export class CommandImplementation {
    navCommands: BehaviorSubject<command[]> = new BehaviorSubject<command[]>([]);

    loadCommands(role: string) {
        let navCmds: command[] = [];

        let configuration: command = {
            name: "Configuration",
            execute: () => {
                BasicdataFacade.setCurrentPage(pages.configurationPage);
            }
        };

        let ticketpool: command = {
            name: "Ticket pool",
            execute: () => {
                BasicdataFacade.setCurrentPage(pages.ticketPoolPage);
            }
        };

        let addticket: command = {
            name: "Add ticket",
            execute: () => {
                BasicdataFacade.setCurrentPage(pages.addTicketspage);
            }
        };

        let vendorTickets: command = {
            name: "Vendor Tickets",
            execute: () => {
                BasicdataFacade.setCurrentPage(pages.vendorTicketspage);
            }
        };

        switch (role) {
            case "Admin":
                navCmds = [configuration, ticketpool];
                break;
            case "Customer":
                navCmds = [ticketpool];
                break;
            case "Vendor":
                navCmds = [ticketpool, addticket, vendorTickets];
                break;
            default:
                break;
        }

        CommandFacade.setCommands(navCmds);
    }

    setCommands(cmds: command[]) {
        this.navCommands.next(cmds);
    }

    getCommands(): Observable<command[]> {
        return this.navCommands.asObservable();
    }
}
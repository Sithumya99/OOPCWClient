import { ticket } from "../Interfaces/BasicData.interface";

export class Ticket {
    ticketId: string;
    eventName: string;
    price: number;

    constructor(ticket: ticket) {
        this.ticketId = ticket.id;
        this.eventName = ticket.eventName;
        this.price = ticket.price;
    }
}
import { ticket } from "../Interfaces/BasicData.interface";

export class Ticket {
    eventName: string;
    price: number;

    constructor(ticket: ticket) {
        this.eventName = ticket.eventName;
        this.price = ticket.price;
    }
}
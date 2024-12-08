export interface userLoginRequest {
    username: string;
    password: string;
}

export interface command {
    name: string;
    execute: () => void;
}

export enum pages {
    configurationPage,
    ticketPoolPage,
    addTicketspage,
    ticketPage,
    vendorTicketspage,
    loginPage
}

export interface ticket {
    id: string;
    eventName: string;
    price: number;
}

export interface ticketReq {
    eventName: string;
    price: number;
}

export interface fieldInterface {
    type: string;
    label: string;
    name: string;
    setValue: (name: string, value: any) => void;
}

export interface sessionConfigInterface {
    totalTickets: number;
    ticketReleaseRate: number;
    customerRetrievalRate: number;
    maxTicketCapacity: number;
}
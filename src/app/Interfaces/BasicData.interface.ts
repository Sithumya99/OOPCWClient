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
    eventName: string;
    price: number;
}
import { Observable } from "rxjs";
import { fieldInterface, sessionConfigInterface } from "../../Interfaces/BasicData.interface";
import { SessionConfigImplementation } from "./SessionConfigImplementation.implementation";
import { ErrorMsgFacade } from "../ErrorMsg/ErrorMsgFacade.facade";

export class SessionConfigFacade {
    private static impl: SessionConfigImplementation = new SessionConfigImplementation();
    private static sessionConfigDetails: sessionConfigInterface = {
        totalTickets: 0,
        ticketReleaseRate: 0,
        customerRetrievalRate: 0,
        maxTicketCapacity: 0
    };
    private static customerRetrievalRate: number = 0;

    public static getSessionConfigFields(): fieldInterface[] {
        let fields: fieldInterface[] = [];

        const totalTickets: fieldInterface = {
            name: "totalTickets",
            label: "Total Tickets",
            type: 'number',
            setValue: (name: string, value: number) => {
                SessionConfigFacade.sessionConfigDetails.totalTickets = value;
            }
        };

        const ticketReleaseRate: fieldInterface = {
            name: "ticketReleaseRate",
            label: "Ticket Release Rate",
            type: 'number',
            setValue: (name: string, value: number) => {
                SessionConfigFacade.sessionConfigDetails.ticketReleaseRate = value;
            }
        };

        const customerRetrievalRate: fieldInterface = {
            name: "customerRetrievalRate",
            label: "Customer Retrieval Rate",
            type: 'number',
            setValue: (name: string, value: number) => {
                SessionConfigFacade.sessionConfigDetails.customerRetrievalRate = value;
            }
        };

        const maxTicketCapacity: fieldInterface = {
            name: "maxTicketCapacity",
            label: "Max Ticket Capacity",
            type: 'number',
            setValue: (name: string, value: number) => {
                SessionConfigFacade.sessionConfigDetails.maxTicketCapacity = value;
            }
        };

        fields = [totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity];
        return fields;
    }

    public static setSessionConfigActive(isActive: boolean) {
        this.impl.setIsSessionActive(isActive);
    }

    public static getSessionConfigActive(): Observable<boolean> {
        return this.impl.getIsSessionActive();
    }

    public static setCustomerRetrievalRate(value: number) {
        SessionConfigFacade.customerRetrievalRate = value;
    }

    public static getCustomerRetrievalRate(): number {
        return SessionConfigFacade.customerRetrievalRate;
    }

    public static startSession() {
        if (this.validateConfig()) {
            this.impl.startSession(this.sessionConfigDetails);
        }
    }

    public static stopSession() {
        this.impl.stopSession();
    }

    public static validateConfig(): boolean {
        for (const key of Object.keys(this.sessionConfigDetails) as (keyof sessionConfigInterface)[]) {
            if (this.sessionConfigDetails[key] < 0) {
                ErrorMsgFacade.setErrorMsg(`${key}` + " cannot be negative");
                return false;
            }

            switch(key) {
                case 'totalTickets':
                    if (this.sessionConfigDetails[key] >= 60) {
                        ErrorMsgFacade.setErrorMsg("Total tickets must be less than 60");
                        return false;
                    }
                    break;
                case 'ticketReleaseRate':
                    if (this.sessionConfigDetails[key] >= 60001) {
                        ErrorMsgFacade.setErrorMsg("Tickets release rate must be less than 60001");
                        return false;
                    }
                    break;
                case 'customerRetrievalRate':
                    if (this.sessionConfigDetails[key] >= 60001) {
                        ErrorMsgFacade.setErrorMsg("Customer retrieval rate must be less than 60001");
                        return false;
                    }
                    break;
                case 'maxTicketCapacity':
                    if (this.sessionConfigDetails[key] >= 100) {
                        ErrorMsgFacade.setErrorMsg("Max Capacity must be less than 100");
                        return false;
                    }
                    break;
            }
        }
        return true;
    }
}
import { TestBed } from "@angular/core/testing";
import { BasicdataFacade } from "./BasicdataFacade.facade";
import { pages } from "../../Interfaces/BasicData.interface";
import { ErrorMsgFacade } from "../ErrorMsg/ErrorMsgFacade.facade";
import { BasicdataImplementation } from "./BasicdataImplementation.implementation";
import { CommandFacade } from "../Commands/CommandFacade.facade";
import { WebSocketFacade } from "../WebSocket/WebSocketFacade.facade";

describe('BasicdataFacade', () => {

    beforeEach(() => {
        spyOn(ErrorMsgFacade, 'setErrorMsg');
    });

    it('set current page', () => {
        spyOn(BasicdataFacade['impl'], 'setCurrentPage');
        const currentPage = pages.ticketPage;
        BasicdataFacade.setCurrentPage(currentPage);

        expect(BasicdataFacade['impl'].setCurrentPage).toHaveBeenCalledWith(currentPage);
    });

    it('emit current page', () => {
        const mockPage = pages.ticketPage;
        BasicdataFacade.setCurrentPage(mockPage);

        BasicdataFacade.getCurrentPage().subscribe((page) => {
            expect(page).toBe(mockPage);
        });
    });

    it('should set and get customer retrieval rate correctly', () => {
        BasicdataFacade.setCustomerRetrievalRate(5000);
        const rate = BasicdataFacade.getCustomerRetrievalRate();

        expect(rate).toBe(5000);
    });

    it('should validate a new ticket and call addTicket if valid', () => {
        spyOn(BasicdataFacade['impl'], 'addTicket');
        BasicdataFacade['newTicket'] = { eventName: 'Test Event', price: 100 };
        BasicdataFacade.addTicket();

        expect(BasicdataFacade['impl'].addTicket).toHaveBeenCalledWith({ eventName: 'Test Event', price: 100 });
    });

    it('should not add a ticket and set an error message if the ticket price is negative', () => {
        spyOn(BasicdataFacade['impl'], 'addTicket');
        (BasicdataFacade as any).newTicket = { eventName: 'Test Event', price: -10 };
        expect(BasicdataFacade['newTicket']).toEqual({ eventName: 'Test Event', price: -10 });
        BasicdataFacade.addTicket();

        expect(BasicdataFacade['impl'].addTicket).not.toHaveBeenCalled();
        expect(BasicdataFacade['newTicket'].price).toBeLessThan(0);
        expect(ErrorMsgFacade.setErrorMsg).toHaveBeenCalledWith("Price of ticket cannot be negative");
    });


    it('should start a countdown and update waiting time correctly', () => {
        spyOn(BasicdataFacade['impl'], 'setWaitingTime');
        spyOn(BasicdataFacade['impl'], 'getWaitingTimeValue').and.returnValues(5000, 4000, 3000, 0);
        BasicdataFacade.setCustomerRetrievalRate(5000);

        BasicdataFacade.startCountDown();

        expect(BasicdataFacade['impl'].setWaitingTime).toHaveBeenCalledWith(5000);
        expect(BasicdataFacade['impl'].setWaitingTime).toHaveBeenCalled();
    });

    it('should load the ticket app and connect WebSocket when session is active', () => {
        spyOn(BasicdataFacade['impl'], 'getTicketPoolFromServer');
        spyOn(BasicdataFacade['impl'], 'setCurrentPage');
        spyOn(CommandFacade, 'loadCommands');
        spyOn(WebSocketFacade, 'connectWebSocket');
        BasicdataFacade.loadTicketApp(true);

        expect(CommandFacade.loadCommands).toHaveBeenCalled();
        expect(BasicdataFacade['impl'].getTicketPoolFromServer).toHaveBeenCalled();
        expect(BasicdataFacade['impl'].setCurrentPage).toHaveBeenCalledWith(pages.ticketPoolPage);
        expect(WebSocketFacade.connectWebSocket).toHaveBeenCalled();
    });

    it('should only load the ticket app without connecting WebSocket when session is inactive', () => {
        spyOn(BasicdataFacade['impl'], 'getTicketPoolFromServer');
        spyOn(BasicdataFacade['impl'], 'setCurrentPage');
        spyOn(CommandFacade, 'loadCommands');
        spyOn(WebSocketFacade, 'connectWebSocket');
        BasicdataFacade.loadTicketApp(false);

        expect(CommandFacade.loadCommands).toHaveBeenCalled();
        expect(BasicdataFacade['impl'].getTicketPoolFromServer).not.toHaveBeenCalled();
        expect(BasicdataFacade['impl'].setCurrentPage).toHaveBeenCalledWith(pages.ticketPoolPage);
        expect(WebSocketFacade.connectWebSocket).toHaveBeenCalled();
    });
});

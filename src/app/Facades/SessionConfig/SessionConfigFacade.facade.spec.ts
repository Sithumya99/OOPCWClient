import { Observable, of } from 'rxjs';
import { SessionConfigFacade } from './SessionConfigFacade.facade';
import { ErrorMsgFacade } from '../ErrorMsg/ErrorMsgFacade.facade';

describe('SessionConfigFacade', () => {

    beforeEach(() => {

        (SessionConfigFacade as any).sessionConfigDetails = {
        totalTickets: 0,
        ticketReleaseRate: 0,
        customerRetrievalRate: 0,
        maxTicketCapacity: 0,
        };
    });

    it('should return a list of session configuration fields', () => {
        const fields = SessionConfigFacade.getSessionConfigFields();

        expect(fields.length).toBe(4);
        expect(fields[0].name).toBe('totalTickets');
        expect(fields[1].name).toBe('ticketReleaseRate');
        expect(fields[2].name).toBe('customerRetrievalRate');
        expect(fields[3].name).toBe('maxTicketCapacity');
    });

    it('should set and get session configuration active state', () => {
        spyOn(SessionConfigFacade['impl'], 'setIsSessionActive');
        spyOn(SessionConfigFacade, 'getSessionConfigActive').and.returnValue(of(true));

        SessionConfigFacade.setSessionConfigActive(true);
        expect(SessionConfigFacade['impl'].setIsSessionActive).toHaveBeenCalledWith(true);

        SessionConfigFacade.getSessionConfigActive().subscribe((isActive) => {
            expect(isActive).toEqual(true);
        });
    });

    it('should set and get customer retrieval rate', () => {
        SessionConfigFacade.setCustomerRetrievalRate(50);
        expect(SessionConfigFacade.getCustomerRetrievalRate()).toBe(50);
    });

    it('should start a session with valid configuration', () => {
        spyOn(SessionConfigFacade, 'validateConfig').and.returnValue(true);
        spyOn(SessionConfigFacade['impl'], 'startSession');

        const validConfig = {
        totalTickets: 10,
        ticketReleaseRate: 5,
        customerRetrievalRate: 5,
        maxTicketCapacity: 20,
        };
        (SessionConfigFacade as any).sessionConfigDetails = validConfig;

        SessionConfigFacade.startSession();

        expect(SessionConfigFacade.validateConfig).toHaveBeenCalled();
        expect(SessionConfigFacade['impl'].startSession).toHaveBeenCalledWith(validConfig);
    });

    it('should not start a session with invalid configuration', () => {
        spyOn(SessionConfigFacade, 'validateConfig').and.returnValue(false);
        spyOn(SessionConfigFacade['impl'], 'startSession');

        SessionConfigFacade.startSession();

        expect(SessionConfigFacade.validateConfig).toHaveBeenCalled();
        expect(SessionConfigFacade['impl'].startSession).not.toHaveBeenCalled();
    });

    it('should stop a session', () => {
        spyOn(SessionConfigFacade['impl'], 'stopSession');
        SessionConfigFacade.stopSession();
        expect(SessionConfigFacade['impl'].stopSession).toHaveBeenCalled();
    });

    it('should validate configuration correctly', () => {
        spyOn(ErrorMsgFacade, 'setErrorMsg');
        const invalidConfig = {
        totalTickets: -70,
        ticketReleaseRate: -1,
        customerRetrievalRate: 60002,
        maxTicketCapacity: 101,
        };
        (SessionConfigFacade as any).sessionConfigDetails = invalidConfig;

        const isValid = SessionConfigFacade.validateConfig();

        expect(isValid).toBeFalse();
        expect(ErrorMsgFacade.setErrorMsg).toHaveBeenCalledWith('totalTickets cannot be negative');
        expect(ErrorMsgFacade.setErrorMsg).not.toHaveBeenCalledWith('Customer retrieval rate must be less than 60001');
    });

    it('should validate a valid configuration', () => {
        spyOn(ErrorMsgFacade, 'setErrorMsg');
        const validConfig = {
        totalTickets: 50,
        ticketReleaseRate: 5000,
        customerRetrievalRate: 5000,
        maxTicketCapacity: 50,
        };
        (SessionConfigFacade as any).sessionConfigDetails = validConfig;

        const isValid = SessionConfigFacade.validateConfig();

        expect(isValid).toBeTrue();
        expect(ErrorMsgFacade.setErrorMsg).not.toHaveBeenCalled();
    });
});

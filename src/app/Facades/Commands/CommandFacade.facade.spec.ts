import { of } from 'rxjs';
import { command } from '../../Interfaces/BasicData.interface';
import { CommandFacade } from './CommandFacade.facade';
import { UserProfile } from '../../Classes/UserProfile.class';
import { UserProfileFacade } from '../UserProfile/UserProfileFacade.facade';

describe('CommandFacade', () => {

    it('should call setCommands on the implementation when setCommands is invoked', () => {
        spyOn(CommandFacade['impl'], 'setCommands');
        const mockCommands: command[] = [{ name: 'Test Command', execute: () => {} }];
        CommandFacade.setCommands(mockCommands);

        expect(CommandFacade['impl'].setCommands).toHaveBeenCalledWith(mockCommands);
    });

    it('should call getCommands on the implementation and return an observable', (done) => {
        const mockCommands: command[] = [{ name: 'Test Command', execute: () => {} }];
        CommandFacade.setCommands(mockCommands);

        CommandFacade.getCommands().subscribe((commands: command[]) => {
            expect(commands).toEqual(mockCommands);
            done();
        });
    });

    it('should call loadCommands on the implementation with the user role when loadCommands is invoked and a user exists', () => {
        const mockUser: UserProfile = new UserProfile("Tom", "Admin");
        spyOn(UserProfileFacade, 'getUser').and.returnValue(mockUser);
        spyOn(CommandFacade['impl'], 'loadCommands');

        CommandFacade.loadCommands();

        expect(UserProfileFacade.getUser).toHaveBeenCalled();
        expect(CommandFacade['impl'].loadCommands).toHaveBeenCalledWith('Admin');
    });

    it('should not call loadCommands on the implementation if no user exists', () => {
        spyOn(CommandFacade['impl'], 'loadCommands');
        spyOn(UserProfileFacade, 'getUser').and.returnValue(undefined);

        CommandFacade.loadCommands();

        expect(UserProfileFacade.getUser).toHaveBeenCalled();
        expect(CommandFacade['impl'].loadCommands).not.toHaveBeenCalled();
    });
});
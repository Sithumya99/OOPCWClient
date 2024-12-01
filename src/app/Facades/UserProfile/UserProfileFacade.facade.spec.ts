import { UserProfile } from "../../Classes/UserProfile.class";
import { userLoginRequest } from "../../Interfaces/BasicData.interface";
import { UserProfileFacade } from "./UserProfileFacade.facade";


describe('UserProfileFacade', () => {
  let mockImpl: jasmine.SpyObj<any>;

  beforeEach(() => {
    mockImpl = jasmine.createSpyObj('UserProfileImplementation', [
      'setAuthToken',
      'getAuthToken',
      'setUserDetails',
      'getUser',
      'loginUser',
      'registerUser',
    ]);

    (UserProfileFacade as any).impl = mockImpl;
  });

  it('should set authentication token', () => {
    const token = 'sample-token';
    UserProfileFacade.setAuth(token);
    expect(mockImpl.setAuthToken).toHaveBeenCalledWith(token);
  });

  it('should get authentication token', () => {
    const token = 'sample-token';
    mockImpl.getAuthToken.and.returnValue(token);

    const result = UserProfileFacade.getAuth();
    expect(result).toBe(token);
    expect(mockImpl.getAuthToken).toHaveBeenCalled();
  });

  it('should set user details', () => {
    const field = 'username';
    const value = 'testUser';

    UserProfileFacade.setUserDetails(field, value);
    expect(mockImpl.setUserDetails).toHaveBeenCalledWith(field, value);
  });

  it('should login user', () => {

    UserProfileFacade.loginUser();
    expect(mockImpl.loginUser).toHaveBeenCalledWith();
  });

  it('should get user profile', () => {
    const userMock: UserProfile = new UserProfile("Tom", "Admin");
    mockImpl.getUser.and.returnValue(userMock);

    const result = UserProfileFacade.getUser();
    expect(result).toEqual(userMock);
    expect(mockImpl.getUser).toHaveBeenCalled();
  });

  it('should return login fields', () => {
    const fields = UserProfileFacade.getLoginFields();
    expect(fields.length).toBe(2);
    expect(fields[0].name).toBe('username');
    expect(fields[1].name).toBe('password');
  });

  it('should register a user with a specific role', () => {
    const role = "Admin";

    UserProfileFacade.register(role);
    expect(mockImpl.registerUser).toHaveBeenCalledWith(role);
  });
});
